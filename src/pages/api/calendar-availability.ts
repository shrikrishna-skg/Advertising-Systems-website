import type { APIRoute } from 'astro';
import { checkRateLimit, getClientIp, jsonResponse } from '../../lib/server-security';
import {
  addDaysToDateString,
  DEMO_DURATION_MINUTES,
  DEMO_TIME_ZONE,
  getDemoCalendarClient,
  getDemoSlotRange,
  isDemoBookableDay,
  isSlotInFuture,
  OFFERED_DEMO_SLOTS,
  rangesOverlap,
  validateDemoDate,
  zonedTimeToUtc,
} from '../../lib/demo-calendar';

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
  if (!dateStr) {
    return jsonResponse({ error: 'Query param "date" (YYYY-MM-DD) is required' }, 400);
  }

  const validatedDate = validateDemoDate(dateStr);
  if (validatedDate.error) return jsonResponse({ error: validatedDate.error }, 400);

  if (!isDemoBookableDay(dateStr)) {
    return jsonResponse({
      slots: [],
      timeZone: DEMO_TIME_ZONE,
      durationMinutes: DEMO_DURATION_MINUTES,
      closedReason: 'Demos are available Monday through Saturday, 9:00 AM to 5:00 PM Central Time.',
    });
  }

  const fallbackSlots = OFFERED_DEMO_SLOTS.filter((slot) => isSlotInFuture(dateStr, slot));
  const client = getDemoCalendarClient();
  if (!client) {
    return jsonResponse({
      slots: fallbackSlots,
      timeZone: DEMO_TIME_ZONE,
      durationMinutes: DEMO_DURATION_MINUTES,
    });
  }

  const { calendar, calendarId } = client;
  const timeMin = zonedTimeToUtc(dateStr, '00:00');
  const timeMax = zonedTimeToUtc(addDaysToDateString(dateStr, 1), '00:00');

  if (!timeMin || !timeMax) {
    return jsonResponse({ error: 'Date is invalid' }, 400);
  }

  try {
    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: DEMO_TIME_ZONE,
        items: [{ id: calendarId }],
      },
    });

    const busyList = res.data.calendars?.[calendarId]?.busy ?? [];
    const available: string[] = [];
    for (const slot of OFFERED_DEMO_SLOTS) {
      const range = getDemoSlotRange(dateStr, slot);
      if (!range || !isSlotInFuture(dateStr, slot)) continue;
      const overlaps = busyList.some((b) => rangesOverlap(range.start, range.end, b.start, b.end));
      if (!overlaps) available.push(slot);
    }

    return jsonResponse({
      slots: available,
      timeZone: DEMO_TIME_ZONE,
      durationMinutes: DEMO_DURATION_MINUTES,
    });
  } catch (err) {
    console.error('Calendar freebusy error:', err);
    return jsonResponse({
      slots: fallbackSlots,
      timeZone: DEMO_TIME_ZONE,
      durationMinutes: DEMO_DURATION_MINUTES,
    });
  }
};
