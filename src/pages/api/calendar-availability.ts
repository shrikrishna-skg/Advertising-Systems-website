import type { APIRoute } from 'astro';
import { google } from 'googleapis';
import { checkRateLimit, getClientIp, jsonResponse } from '../../lib/server-security';

/** Business-hour slots (30-min demo) we offer, in HH:mm format. */
const OFFERED_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

const SLOT_DURATION_MS = 30 * 60 * 1000;
const MAX_SCHEDULE_DAYS = 90;
const cache = new Map<string, { slots: string[]; expiresAt: number }>();

function getCalendarClient() {
  const clientId = import.meta.env.GOOGLE_CLIENT_ID;
  const clientSecret = import.meta.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = import.meta.env.GOOGLE_REFRESH_TOKEN;
  const calendarId = import.meta.env.GOOGLE_CALENDAR_ID || 'primary';

  if (!clientId || !clientSecret || !refreshToken) return null;

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, undefined);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  return { calendar, calendarId };
}

/** Returns available time slots for the given date (YYYY-MM-DD) by querying Google Calendar freebusy. */
export const GET: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`calendar-availability:${ip}`, 60, 60 * 1000);
  if (!rateLimit.allowed) {
    return jsonResponse(
      { error: 'Too many availability checks. Please try again later.' },
      429,
      { 'Retry-After': String(rateLimit.retryAfter) }
    );
  }

  const url = new URL(request.url);
  const dateStr = url.searchParams.get('date');
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return jsonResponse({ error: 'Query param "date" (YYYY-MM-DD) is required' }, 400);
  }

  const requested = new Date(`${dateStr}T12:00:00.000Z`);
  if (Number.isNaN(requested.getTime())) {
    return jsonResponse({ error: 'Date is invalid' }, 400);
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setUTCDate(maxDate.getUTCDate() + MAX_SCHEDULE_DAYS);
  if (requested < today || requested > maxDate) {
    return jsonResponse({ error: `Date must be within the next ${MAX_SCHEDULE_DAYS} days` }, 400);
  }

  const cached = cache.get(dateStr);
  if (cached && cached.expiresAt > Date.now()) {
    return jsonResponse({ slots: cached.slots });
  }

  const client = getCalendarClient();
  if (!client) {
    return jsonResponse({ slots: OFFERED_SLOTS });
  }

  const { calendar, calendarId } = client;
  const timeMin = `${dateStr}T00:00:00.000Z`;
  const timeMax = `${dateStr}T23:59:59.999Z`;

  try {
    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: calendarId }],
      },
    });

    const busyList = res.data.calendars?.[calendarId]?.busy ?? [];
    const now = Date.now();

    const available: string[] = [];
    for (const slot of OFFERED_SLOTS) {
      const slotStart = new Date(`${dateStr}T${slot}:00.000Z`).getTime();
      const slotEnd = slotStart + SLOT_DURATION_MS;
      if (slotEnd <= now) continue;
      const overlaps = busyList.some(
        (b) => new Date(b.start!).getTime() < slotEnd && new Date(b.end!).getTime() > slotStart
      );
      if (!overlaps) available.push(slot);
    }

    cache.set(dateStr, { slots: available, expiresAt: Date.now() + 5 * 60 * 1000 });
    return jsonResponse({ slots: available });
  } catch (err) {
    console.error('Calendar freebusy error:', err);
    return jsonResponse({ slots: OFFERED_SLOTS });
  }
};
