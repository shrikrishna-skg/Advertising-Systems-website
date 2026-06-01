import type { APIRoute } from 'astro';
import { buildDemoInternalNotificationEmail } from '../../lib/demo-internal-notification-email';

export const GET: APIRoute = ({ url }) => {
  const siteUrl = url.origin;
  const email = buildDemoInternalNotificationEmail({
    name: 'Shrikrishna',
    email: 'shrikrishna.skg@gmail.com',
    company: 'Hotel Growth Group',
    phone: '(555) 010-1200',
    plan: 'Scale',
    numberOfLocations: '12',
    companySize: '11-50',
    monthlyAdSpend: '$40k/mo',
    message: 'Looking to improve reporting, booking attribution, and paid ad pacing across hotel campaigns.',
    demoTimeText: 'Thursday, May 21, 2026 at 9:00 AM CDT',
    startTime: '2026-05-21T14:00:00.000Z',
    endTime: '2026-05-21T14:30:00.000Z',
    durationMinutes: 30,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    calendarEventLink: 'https://calendar.google.com/calendar/event?action=TEMPLATE',
    siteUrl,
  });

  return new Response(email.html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
};
