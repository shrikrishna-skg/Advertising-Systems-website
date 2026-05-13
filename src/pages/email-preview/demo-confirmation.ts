import type { APIRoute } from 'astro';
import { buildDemoConfirmationEmail } from '../../lib/demo-confirmation-email';

export const GET: APIRoute = () => {
  const email = buildDemoConfirmationEmail({
    name: 'Shrikrishna',
    company: 'Aero Design Systems',
    demoTimeText: 'Friday, May 15, 2026 at 9:00 AM CDT',
    durationMinutes: 30,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    calendarEventLink: 'https://calendar.google.com/calendar/event?action=TEMPLATE',
    sampleReportUrl: 'https://advertisingsystems.ai/sample-report',
    expediaReportUrl: 'https://advertisingsystems.ai/expedia-report',
    bookDemoUrl: 'https://advertisingsystems.ai/book-demo',
    supportEmail: 'contact@multisystems.ai',
  });

  return new Response(email.html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
};
