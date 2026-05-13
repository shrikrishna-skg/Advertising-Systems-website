import { google } from 'googleapis';

export const DEMO_TIME_ZONE = import.meta.env.DEMO_TIME_ZONE || 'America/Chicago';
export const DEMO_DURATION_MINUTES = Number(import.meta.env.DEMO_DURATION_MINUTES || 30);
export const MAX_SCHEDULE_DAYS = 90;
export const OFFERED_DEMO_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
] as const;

export type DemoSlot = typeof OFFERED_DEMO_SLOTS[number];

const SLOT_SET = new Set<string>(OFFERED_DEMO_SLOTS);
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DATETIME_RE = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})(?::\d{2})?$/;

export function isOfferedDemoSlot(value: string): value is DemoSlot {
  return SLOT_SET.has(value);
}

function getZonedParts(date: Date, timeZone = DEMO_TIME_ZONE) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)])
  ) as Record<string, number>;

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour === 24 ? 0 : parts.hour,
    minute: parts.minute,
    second: parts.second,
  };
}

function isValidDateString(dateStr: string) {
  const match = dateStr.match(DATE_RE);
  if (!match) return false;

  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.toISOString().slice(0, 10) === dateStr;
}

export function getTodayInDemoTimeZone() {
  const nowParts = getZonedParts(new Date());
  return `${nowParts.year}-${String(nowParts.month).padStart(2, '0')}-${String(nowParts.day).padStart(2, '0')}`;
}

export function addDaysToDateString(dateStr: string, days: number) {
  const match = dateStr.match(DATE_RE);
  if (!match) return dateStr;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function validateDemoDate(dateStr: string) {
  const match = dateStr.match(DATE_RE);
  if (!match || !isValidDateString(dateStr)) return { value: undefined, error: 'Date is invalid' };

  const requested = Number(`${match[1]}${match[2]}${match[3]}`);
  const today = Number(getTodayInDemoTimeZone().replace(/-/g, ''));
  const max = Number(addDaysToDateString(getTodayInDemoTimeZone(), MAX_SCHEDULE_DAYS).replace(/-/g, ''));

  if (requested < today || requested > max) {
    return { value: undefined, error: `Date must be within the next ${MAX_SCHEDULE_DAYS} days` };
  }

  return { value: dateStr, error: undefined };
}

export function getDemoDateDay(dateStr: string) {
  const match = dateStr.match(DATE_RE);
  if (!match || !isValidDateString(dateStr)) return null;
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))).getUTCDay();
}

export function isDemoBookableDay(dateStr: string) {
  const day = getDemoDateDay(dateStr);
  return day !== null && day >= 1 && day <= 6;
}

export function getNextBookableDemoDate(fromDateStr = getTodayInDemoTimeZone()) {
  for (let i = 1; i <= MAX_SCHEDULE_DAYS; i += 1) {
    const dateStr = addDaysToDateString(fromDateStr, i);
    if (isDemoBookableDay(dateStr)) return dateStr;
  }

  return addDaysToDateString(fromDateStr, 1);
}

export function parseDemoDatetime(value?: string) {
  if (!value) return { value: undefined, error: undefined };

  const match = value.match(DATETIME_RE);
  if (!match) return { value: undefined, error: 'Preferred date and time is invalid' };

  const date = validateDemoDate(match[1]);
  if (date.error) return { value: undefined, error: date.error.replace('Date', 'Preferred date') };
  if (!isDemoBookableDay(match[1])) return { value: undefined, error: 'Demos are available Monday through Saturday' };
  if (!isOfferedDemoSlot(match[2])) return { value: undefined, error: 'Preferred time is not available' };
  if (!isSlotInFuture(match[1], match[2])) return { value: undefined, error: 'Preferred time has already passed' };

  return {
    value: {
      date: match[1],
      time: match[2] as DemoSlot,
      localDateTime: `${match[1]}T${match[2]}:00`,
    },
    error: undefined,
  };
}

export function zonedTimeToUtc(dateStr: string, timeStr: string, timeZone = DEMO_TIME_ZONE) {
  const dateMatch = dateStr.match(DATE_RE);
  const timeMatch = timeStr.match(/^(\d{2}):(\d{2})$/);
  if (!dateMatch || !timeMatch) return null;

  const target = {
    year: Number(dateMatch[1]),
    month: Number(dateMatch[2]),
    day: Number(dateMatch[3]),
    hour: Number(timeMatch[1]),
    minute: Number(timeMatch[2]),
    second: 0,
  };

  let utc = new Date(Date.UTC(target.year, target.month - 1, target.day, target.hour, target.minute, 0));

  for (let i = 0; i < 3; i += 1) {
    const parts = getZonedParts(utc, timeZone);
    const zonedAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    const targetAsUtc = Date.UTC(target.year, target.month - 1, target.day, target.hour, target.minute, target.second);
    utc = new Date(utc.getTime() - (zonedAsUtc - targetAsUtc));
  }

  return utc;
}

export function getDemoSlotRange(dateStr: string, timeStr: string) {
  const start = zonedTimeToUtc(dateStr, timeStr);
  if (!start) return null;

  const end = new Date(start.getTime() + DEMO_DURATION_MINUTES * 60 * 1000);
  return { start, end };
}

export function isSlotInFuture(dateStr: string, timeStr: string) {
  const range = getDemoSlotRange(dateStr, timeStr);
  return Boolean(range && range.start.getTime() > Date.now());
}

export function getDemoCalendarClient() {
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

export function rangesOverlap(aStart: Date, aEnd: Date, bStart?: string | null, bEnd?: string | null) {
  if (!bStart || !bEnd) return false;
  return new Date(bStart).getTime() < aEnd.getTime() && new Date(bEnd).getTime() > aStart.getTime();
}

export function formatDemoDateForDescription(dateStr: string, timeStr: string) {
  const range = getDemoSlotRange(dateStr, timeStr);
  if (!range) return `${dateStr} ${timeStr} ${DEMO_TIME_ZONE}`;

  return new Intl.DateTimeFormat('en-US', {
    timeZone: DEMO_TIME_ZONE,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(range.start);
}
