import type { APIRoute } from 'astro';
import { google } from 'googleapis';
import { checkRateLimit, getClientIp, isAllowedOrigin, jsonResponse } from '../../lib/server-security';
import { getPostHogServer } from '../../lib/posthog-server';

const OFFERED_SLOTS = new Set(['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00']);
const DEMO_TIME_ZONE = import.meta.env.DEMO_TIME_ZONE || 'America/Chicago';
const MAX_BODY_BYTES = 16 * 1024;
const MAX_SCHEDULE_DAYS = 90;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  phone: 40,
  numberOfLocations: 24,
  companySize: 80,
  monthlyAdSpend: 80,
  preferredDatetime: 40,
  message: 1200,
};

function getString(body: Record<string, unknown>, key: string, limit: number) {
  const value = body[key];
  if (typeof value !== 'string') return { value: undefined, error: undefined };

  const trimmed = value.trim();
  if (!trimmed) return { value: undefined, error: undefined };
  if (trimmed.length > limit) return { value: undefined, error: `${key} is too long` };
  return { value: trimmed, error: undefined };
}

function parsePreferredDatetime(value?: string) {
  if (!value) return { value: undefined, error: undefined };

  const match = value.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})(?::\d{2})?$/);
  if (!match) return { value: undefined, error: 'Preferred date and time is invalid' };
  if (!OFFERED_SLOTS.has(match[2])) return { value: undefined, error: 'Preferred time is not available' };

  const startDate = new Date(`${match[1]}T${match[2]}:00`);
  if (Number.isNaN(startDate.getTime())) return { value: undefined, error: 'Preferred date and time is invalid' };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + MAX_SCHEDULE_DAYS);
  if (startDate < today || startDate > maxDate) {
    return { value: undefined, error: `Preferred date must be within the next ${MAX_SCHEDULE_DAYS} days` };
  }

  return { value: startDate, error: undefined };
}

/** Create a demo request event on Google Calendar if credentials are configured.
 *  Calendar used is the one owned by the account that issued GOOGLE_REFRESH_TOKEN
 *  (intended: shrikrishna@multisystems.ai). */
async function createCalendarEvent(params: {
  name: string;
  email: string;
  company: string;
  phone?: string;
  numberOfLocations?: string;
  companySize?: string;
  monthlyAdSpend?: string;
  preferredDatetime?: string;
  message?: string;
}): Promise<{ success: boolean; eventId?: string; error?: string }> {
  const clientId = import.meta.env.GOOGLE_CLIENT_ID;
  const clientSecret = import.meta.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = import.meta.env.GOOGLE_REFRESH_TOKEN;
  const calendarId = import.meta.env.GOOGLE_CALENDAR_ID || 'primary';

  if (!clientId || !clientSecret || !refreshToken) {
    return { success: false, error: 'Calendar not configured (missing env)' };
  }

  try {
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, undefined);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const title = `Demo request: ${params.company} — ${params.name}`;
    const desc = [
      `Name: ${params.name}`,
      `Email: ${params.email}`,
      params.phone && `Phone: ${params.phone}`,
      `Company: ${params.company}`,
      params.numberOfLocations && `Number of locations: ${params.numberOfLocations}`,
      params.companySize && `Company size: ${params.companySize}`,
      params.monthlyAdSpend && `Monthly ad spend: ${params.monthlyAdSpend}`,
      params.message && `Message: ${params.message}`,
    ].filter(Boolean).join('\n');

    let startDate: Date;
    let endDate: Date;
    if (params.preferredDatetime) {
      startDate = new Date(params.preferredDatetime);
      if (isNaN(startDate.getTime())) {
        startDate = new Date();
        startDate.setDate(startDate.getDate() + 1);
        startDate.setHours(10, 0, 0, 0);
      }
      endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + 30);
    } else {
      startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(10, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setMinutes(30, 0, 0);
    }

    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: title,
        description: desc,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: DEMO_TIME_ZONE,
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: DEMO_TIME_ZONE,
        },
      },
    });

    return { success: true, eventId: event.data.id ?? undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Calendar API error';
    return { success: false, error: message };
  }
}

export const POST: APIRoute = async ({ request }) => {
  if (!isAllowedOrigin(request)) {
    return jsonResponse({ error: 'Request origin is not allowed' }, 403);
  }

  const ip = getClientIp(request);
  const minuteLimit = checkRateLimit(`book-demo:minute:${ip}`, 5, 60 * 1000);
  const hourLimit = checkRateLimit(`book-demo:hour:${ip}`, 20, 60 * 60 * 1000);
  if (!minuteLimit.allowed || !hourLimit.allowed) {
    return jsonResponse(
      { error: 'Too many demo requests. Please try again later.' },
      429,
      { 'Retry-After': String(Math.max(minuteLimit.retryAfter, hourLimit.retryAfter)) }
    );
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return jsonResponse({ error: 'Content-Type must be application/json' }, 415);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: 'Request body is too large' }, 413);
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return jsonResponse({ error: 'Request body is too large' }, 413);
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (typeof body.website === 'string' && body.website.trim()) {
    return jsonResponse({
      success: true,
      message: "Thanks! We've received your request and will be in touch to schedule your demo.",
    });
  }

  const errors: string[] = [];
  const name = getString(body, 'name', FIELD_LIMITS.name);
  const email = getString(body, 'email', FIELD_LIMITS.email);
  const phone = getString(body, 'phone', FIELD_LIMITS.phone);
  const company = getString(body, 'company', FIELD_LIMITS.company);
  const numberOfLocations = getString(body, 'number_of_locations', FIELD_LIMITS.numberOfLocations);
  const companySize = getString(body, 'company_size', FIELD_LIMITS.companySize);
  const monthlyAdSpend = getString(body, 'monthly_ad_spend', FIELD_LIMITS.monthlyAdSpend);
  const preferredDatetimeRaw = getString(body, 'preferred_datetime', FIELD_LIMITS.preferredDatetime);
  const message = getString(body, 'message', FIELD_LIMITS.message);

  for (const field of [name, email, phone, company, numberOfLocations, companySize, monthlyAdSpend, preferredDatetimeRaw, message]) {
    if (field.error) errors.push(field.error);
  }

  if (!name.value || !email.value || !company.value) {
    errors.push('Name, email, and company are required');
  }
  if (email.value && !EMAIL_RE.test(email.value)) {
    errors.push('Email is invalid');
  }

  const preferredDatetime = parsePreferredDatetime(preferredDatetimeRaw.value);
  if (preferredDatetime.error) errors.push(preferredDatetime.error);

  if (errors.length > 0) {
    return jsonResponse({ error: errors[0] }, 400);
  }

  const analyticsConsent = request.headers.get('X-Analytics-Consent') === 'accepted';
  const sessionId = request.headers.get('X-PostHog-Session-Id') || undefined;
  const posthog = analyticsConsent ? getPostHogServer() : null;
  const distinctId = email.value!;

  posthog?.capture({
    distinctId,
    event: 'demo_requested',
    properties: {
      $session_id: sessionId,
      company: company.value,
      has_phone: Boolean(phone.value),
      has_preferred_datetime: Boolean(preferredDatetime.value),
      number_of_locations: numberOfLocations.value,
      source: 'api',
    },
  });

  posthog?.identify({
    distinctId,
    properties: {
      email: email.value,
      name: name.value,
      company: company.value,
    },
  });

  const calendarResult = await createCalendarEvent({
    name: name.value!,
    email: email.value!,
    company: company.value!,
    phone: phone.value,
    numberOfLocations: numberOfLocations.value,
    companySize: companySize.value,
    monthlyAdSpend: monthlyAdSpend.value,
    preferredDatetime: preferredDatetime.value?.toISOString(),
    message: message.value,
  });

  if (calendarResult.success) {
    posthog?.capture({
      distinctId,
      event: 'demo_calendar_booked',
      properties: {
        $session_id: sessionId,
        calendar_event_id: calendarResult.eventId,
        source: 'api',
      },
    });
    return jsonResponse({
      success: true,
      message: "Thanks! We've received your request and will confirm your demo time shortly.",
    });
  }

  // Calendar failed but we still acknowledge the request (e.g. env not set or API error)
  return jsonResponse({
    success: true,
    message: "Thanks! We've received your request and will be in touch to schedule your demo.",
  });
};
