import type { APIRoute } from 'astro';
import { checkRateLimit, getClientIp, isAllowedOrigin, jsonResponse } from '../../lib/server-security';
import { getPostHogServer } from '../../lib/posthog-server';
import {
  getDemoInternalNotifyEmail,
  sendDemoConfirmationEmail,
  sendDemoInternalNotificationEmail,
} from '../../lib/demo-email';
import {
  ADVERTISING_SYSTEMS_PRODUCT,
  ADVERTISING_SYSTEMS_SOURCE,
  buildIntakeIdempotencyKey,
  hashIntakeIdempotencyKey,
  normalizeIntakeContext,
  sendCentralIntakeEvent,
} from '../../lib/multisystems-intake';
import {
  DEMO_DURATION_MINUTES,
  DEMO_TIME_ZONE,
  type DemoSlot,
  formatDemoDateForDescription,
  getDemoCalendarClient,
  getDemoSlotRange,
  parseDemoDatetime,
  rangesOverlap,
} from '../../lib/demo-calendar';

const MAX_BODY_BYTES = 16 * 1024;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  phone: 40,
  plan: 80,
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

/** Create a demo request event on Google Calendar if credentials are configured.
 *  Calendar used is the one owned by the account that issued GOOGLE_REFRESH_TOKEN
 *  (intended: shrikrishna@multisystems.ai). */
async function createCalendarEvent(params: {
  name: string;
  email: string;
  company: string;
  phone?: string;
  plan?: string;
  numberOfLocations?: string;
  companySize?: string;
  monthlyAdSpend?: string;
  internalNotifyEmail?: string;
  preferredDatetime?: { date: string; time: DemoSlot; localDateTime: string };
  message?: string;
}): Promise<{
  success: boolean;
  eventId?: string;
  error?: string;
  code?: string;
  inviteSent?: boolean;
  meetCreated?: boolean;
  meetingLink?: string;
  calendarEventLink?: string;
  demoTimeText?: string;
}> {
  const client = getDemoCalendarClient();
  if (!client) {
    return { success: false, code: 'calendar_unavailable', error: 'Calendar not configured (missing env)' };
  }

  try {
    const { calendar, calendarId } = client;
    const preferredDatetime = params.preferredDatetime;
    if (!preferredDatetime) {
      return { success: false, code: 'preferred_datetime_required', error: 'Preferred date and time is required' };
    }
    const slotRange = getDemoSlotRange(preferredDatetime.date, preferredDatetime.time);

    if (!slotRange) {
      return { success: false, error: 'Preferred date and time is invalid' };
    }

    const busy = await calendar.freebusy.query({
      requestBody: {
        timeMin: slotRange.start.toISOString(),
        timeMax: slotRange.end.toISOString(),
        timeZone: DEMO_TIME_ZONE,
        items: [{ id: calendarId }],
      },
    });
    const busyList = busy.data.calendars?.[calendarId]?.busy ?? [];
    const slotUnavailable = busyList.some((b) => rangesOverlap(slotRange.start, slotRange.end, b.start, b.end));
    if (slotUnavailable) {
      return { success: false, code: 'slot_unavailable', error: 'Selected time is no longer available' };
    }

    const title = `Advertising Systems Demo - ${params.company} (${params.name})`;
    const demoTimeText = formatDemoDateForDescription(preferredDatetime.date, preferredDatetime.time);
    const desc = [
      'Advertising Systems demo booking',
      'Source: Advertising Systems Website',
      '',
      `Name: ${params.name}`,
      `Email: ${params.email}`,
      params.phone && `Phone: ${params.phone}`,
      `Company: ${params.company}`,
      params.plan && `Plan interest: ${params.plan}`,
      params.numberOfLocations && `Number of locations: ${params.numberOfLocations}`,
      params.companySize && `Company size: ${params.companySize}`,
      params.monthlyAdSpend && `Monthly ad spend: ${params.monthlyAdSpend}`,
      `Preferred demo time: ${demoTimeText}`,
      params.message && `Message: ${params.message}`,
    ].filter(Boolean).join('\n');

    const sendCalendarInvites = import.meta.env.DEMO_SEND_CALENDAR_INVITES !== 'false';
    const createGoogleMeet = import.meta.env.DEMO_CREATE_GOOGLE_MEET !== 'false';
    const eventLocation = import.meta.env.DEMO_EVENT_LOCATION || undefined;
    const requestId = `ads-demo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const attendees = sendCalendarInvites
      ? [{ email: params.email, displayName: params.name }]
      : undefined;

    if (
      attendees &&
      params.internalNotifyEmail &&
      params.internalNotifyEmail.toLowerCase() !== params.email.toLowerCase()
    ) {
      attendees.push({
        email: params.internalNotifyEmail,
        displayName: 'Advertising Systems',
      });
    }

    const event = await calendar.events.insert({
      calendarId,
      sendUpdates: sendCalendarInvites ? 'all' : 'none',
      conferenceDataVersion: createGoogleMeet ? 1 : 0,
      requestBody: {
        summary: title,
        description: desc,
        location: eventLocation,
        conferenceData: createGoogleMeet
          ? {
              createRequest: {
                requestId,
                conferenceSolutionKey: { type: 'hangoutsMeet' },
              },
            }
          : undefined,
        start: {
          dateTime: slotRange.start.toISOString(),
          timeZone: DEMO_TIME_ZONE,
        },
        end: {
          dateTime: slotRange.end.toISOString(),
          timeZone: DEMO_TIME_ZONE,
        },
        attendees,
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 15 },
          ],
        },
        source: {
          title: 'Advertising Systems Website',
          url: 'https://www.advertisingsystems.ai/book-demo',
        },
        extendedProperties: {
          private: {
            source: 'advertising-systems-website',
            // extendedProperties.private is Record<string, string>, and plan is
            // optional — an undefined here failed the events.insert overload,
            // which then made every event.data.* below unresolvable (6 of the
            // 12 CI type errors came from this one line). '' matches the
            // previous wire behaviour: JSON.stringify drops undefined values.
            selectedPlan: params.plan ?? '',
            preferredLocalDateTime: preferredDatetime.localDateTime,
            timeZone: DEMO_TIME_ZONE,
            durationMinutes: String(DEMO_DURATION_MINUTES),
          },
        },
      },
    });

    // Only use the conference link returned by this newly created event.
    // Do not reuse static locations or fallback URLs as meeting links.
    const meetingLink =
      event.data.hangoutLink ??
      event.data.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === 'video' && entry.uri)?.uri ??
      undefined;

    return {
      success: true,
      eventId: event.data.id ?? undefined,
      inviteSent: sendCalendarInvites,
      meetCreated: Boolean(createGoogleMeet && event.data.conferenceData?.entryPoints?.length),
      meetingLink,
      calendarEventLink: event.data.htmlLink ?? undefined,
      demoTimeText,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Calendar API error';
    return { success: false, code: 'calendar_unavailable', error: message };
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
  const plan = getString(body, 'plan', FIELD_LIMITS.plan);
  const numberOfLocations = getString(body, 'number_of_locations', FIELD_LIMITS.numberOfLocations);
  const companySize = getString(body, 'company_size', FIELD_LIMITS.companySize);
  const monthlyAdSpend = getString(body, 'monthly_ad_spend', FIELD_LIMITS.monthlyAdSpend);
  const preferredDatetimeRaw = getString(body, 'preferred_datetime', FIELD_LIMITS.preferredDatetime);
  const message = getString(body, 'message', FIELD_LIMITS.message);
  const clientSubmissionId = getString(body, 'client_submission_id', 160);

  for (const field of [name, email, phone, company, plan, numberOfLocations, companySize, monthlyAdSpend, preferredDatetimeRaw, message]) {
    if (field.error) errors.push(field.error);
  }

  if (!name.value || !email.value || !company.value) {
    errors.push('Name, email, and company are required');
  }
  if (email.value && !EMAIL_RE.test(email.value)) {
    errors.push('Email is invalid');
  }

  const preferredDatetime = parseDemoDatetime(preferredDatetimeRaw.value);
  if (preferredDatetime.error) errors.push(preferredDatetime.error);
  if (!preferredDatetime.value) errors.push('Please choose an available demo time');

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
      plan: plan.value,
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

  const bookedSlot = preferredDatetime.value;
  if (!bookedSlot) {
    return jsonResponse({ error: 'Please choose an available demo time' }, 400);
  }
  const bookedRange = getDemoSlotRange(bookedSlot.date, bookedSlot.time);
  if (!bookedRange) {
    return jsonResponse({ error: 'Preferred date and time is invalid' }, 400);
  }
  const context = normalizeIntakeContext(body, {
    landingPage: '/book-demo',
    cta: 'Book a Demo',
  });
  const idempotencyKey = clientSubmissionId.value
    ? buildIntakeIdempotencyKey('demo', [clientSubmissionId.value])
    : hashIntakeIdempotencyKey('demo', [
        email.value,
        company.value,
        bookedRange?.start.toISOString(),
        context.cta,
      ]);

  const internalNotifyEmail = getDemoInternalNotifyEmail();
  const calendarResult = await createCalendarEvent({
    name: name.value!,
    email: email.value!,
    company: company.value!,
    phone: phone.value,
    plan: plan.value,
    numberOfLocations: numberOfLocations.value,
    companySize: companySize.value,
    monthlyAdSpend: monthlyAdSpend.value,
    internalNotifyEmail,
    preferredDatetime: preferredDatetime.value,
    message: message.value,
  });

  if (calendarResult.code === 'slot_unavailable') {
    posthog?.capture({
      distinctId,
      event: 'demo_calendar_slot_unavailable',
      properties: {
        $session_id: sessionId,
        source: 'api',
      },
    });

    return jsonResponse(
      { error: 'That time was just booked. Please pick another available time.' },
      409
    );
  }

  if (calendarResult.success) {
    // Send our branded confirmation only after Google Calendar accepts the event
    // and, by default, sends the calendar invite to the attendee.
    const confirmationEmail = await sendDemoConfirmationEmail({
      name: name.value!,
      email: email.value!,
      company: company.value!,
      demoTimeText: calendarResult.demoTimeText || 'your selected demo time',
      startTime: bookedRange?.start.toISOString(),
      endTime: bookedRange?.end.toISOString(),
      durationMinutes: DEMO_DURATION_MINUTES,
      phone: phone.value,
      plan: plan.value,
      numberOfLocations: numberOfLocations.value,
      meetingLink: calendarResult.meetingLink,
      calendarEventLink: calendarResult.calendarEventLink,
    });
    const staffNotificationEmail = await sendDemoInternalNotificationEmail({
      name: name.value!,
      email: email.value!,
      company: company.value!,
      phone: phone.value,
      plan: plan.value,
      numberOfLocations: numberOfLocations.value,
      companySize: companySize.value,
      monthlyAdSpend: monthlyAdSpend.value,
      message: message.value,
      demoTimeText: calendarResult.demoTimeText || 'the selected demo time',
      startTime: bookedRange?.start.toISOString(),
      endTime: bookedRange?.end.toISOString(),
      durationMinutes: DEMO_DURATION_MINUTES,
      meetingLink: calendarResult.meetingLink,
      calendarEventLink: calendarResult.calendarEventLink,
      internalNotifyEmail,
    });

    posthog?.capture({
      distinctId,
      event: 'demo_calendar_booked',
      properties: {
        $session_id: sessionId,
        calendar_event_id: calendarResult.eventId,
        confirmation_email_sent: confirmationEmail.success,
        confirmation_email_skipped: confirmationEmail.skipped === true,
        staff_notification_email_sent: staffNotificationEmail.success,
        staff_notification_email_skipped: staffNotificationEmail.skipped === true,
        source: 'api',
      },
    });

    if (confirmationEmail.success) {
      posthog?.capture({
        distinctId,
        event: 'demo_confirmation_email_sent',
        properties: {
          $session_id: sessionId,
          source: 'api',
        },
      });
    } else if (!confirmationEmail.skipped) {
      posthog?.capture({
        distinctId,
        event: 'demo_confirmation_email_failed',
        properties: {
          $session_id: sessionId,
          error_message: confirmationEmail.error,
          source: 'api',
        },
      });
    }
    if (staffNotificationEmail.success) {
      posthog?.capture({
        distinctId,
        event: 'demo_staff_notification_email_sent',
        properties: {
          $session_id: sessionId,
          notification_email: internalNotifyEmail,
          source: 'api',
        },
      });
    } else if (!staffNotificationEmail.skipped) {
      posthog?.capture({
        distinctId,
        event: 'demo_staff_notification_email_failed',
        properties: {
          $session_id: sessionId,
          error_message: staffNotificationEmail.error,
          notification_email: internalNotifyEmail,
          source: 'api',
        },
      });
    }

    const centralIntake = bookedRange
      ? await sendCentralIntakeEvent({
          eventType: 'demo_booking.created',
          source: ADVERTISING_SYSTEMS_SOURCE,
          idempotencyKey,
          occurredAt: new Date().toISOString(),
          lead: {
            fullName: name.value!,
            email: email.value!,
            phone: phone.value,
            company: company.value!,
            plan: plan.value,
            numberOfLocations: numberOfLocations.value,
            companySize: companySize.value,
            monthlyAdSpend: monthlyAdSpend.value,
          },
          booking: {
            startTime: bookedRange.start.toISOString(),
            endTime: bookedRange.end.toISOString(),
            calendarEventId: calendarResult.eventId,
            calendarEventUrl: calendarResult.calendarEventLink,
            meetingUrl: calendarResult.meetingLink,
            calendarAvailabilityChecked: true,
            availabilitySource: 'google_calendar_freebusy',
            calendarInviteSent: calendarResult.inviteSent === true,
            confirmationEmailSent: confirmationEmail.success,
            staffNotificationEmail: internalNotifyEmail,
            staffNotificationEmailSent: staffNotificationEmail.success,
            status: confirmationEmail.success ? 'booked' : 'booked_confirmation_pending',
          },
          contact: {
            message: message.value,
            productInterest: ADVERTISING_SYSTEMS_PRODUCT,
            planInterest: plan.value,
          },
          context,
        })
      : { configured: false, sent: false, skipped: true };
    if (centralIntake.configured && !centralIntake.sent) {
      console.warn('book-demo: central intake forwarding failed', {
        status: centralIntake.status,
        requestId: centralIntake.requestId,
      });
    }

    return jsonResponse({
      success: true,
      status: 'booked',
      message: calendarResult.inviteSent
        ? confirmationEmail.success
          ? "You're booked. We sent the calendar invite and a confirmation email with the Google Meet link and next steps."
          : "You're booked. We sent a calendar invite to your email with the Google Meet link and next steps."
        : "You're booked. Your demo is on our calendar, and we'll email the meeting details shortly.",
    });
  }

  // Calendar failed. Forward the attempted lead for staff visibility, but do not
  // tell the visitor the time is booked unless Google Calendar accepted it.
  posthog?.capture({
    distinctId,
    event: 'demo_calendar_failed',
    properties: {
      $session_id: sessionId,
      error_message: calendarResult.error,
      source: 'api',
    },
  });

  const centralIntake = bookedRange
    ? await sendCentralIntakeEvent({
        eventType: 'demo_booking.created',
        source: ADVERTISING_SYSTEMS_SOURCE,
        idempotencyKey,
        occurredAt: new Date().toISOString(),
        lead: {
          fullName: name.value!,
          email: email.value!,
          phone: phone.value,
          company: company.value!,
          plan: plan.value,
          numberOfLocations: numberOfLocations.value,
          companySize: companySize.value,
          monthlyAdSpend: monthlyAdSpend.value,
        },
        booking: {
          startTime: bookedRange.start.toISOString(),
          endTime: bookedRange.end.toISOString(),
          calendarAvailabilityChecked: false,
          availabilitySource: 'google_calendar_freebusy',
          calendarError: calendarResult.error,
          calendarInviteSent: false,
          confirmationEmailSent: false,
          status: 'calendar_unavailable',
        },
        contact: {
          message: message.value,
          productInterest: ADVERTISING_SYSTEMS_PRODUCT,
          planInterest: plan.value,
        },
        context,
      })
    : { configured: false, sent: false, skipped: true };
  if (centralIntake.configured && !centralIntake.sent) {
    console.warn('book-demo: central intake forwarding failed', {
      status: centralIntake.status,
      requestId: centralIntake.requestId,
    });
  }

  return jsonResponse(
    {
      error: 'Calendar availability could not be verified. Please refresh and choose another available time.',
    },
    503
  );
};
