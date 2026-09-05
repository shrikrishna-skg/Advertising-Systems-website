import { escape } from 'html-escaper';

export type DemoConfirmationEmailParams = {
  name: string;
  company: string;
  demoTimeText: string;
  startTime?: string;
  endTime?: string;
  durationMinutes: number;
  phone?: string;
  plan?: string;
  numberOfLocations?: string;
  meetingLink?: string;
  calendarEventLink?: string;
  sampleReportUrl: string;
  expediaReportUrl: string;
  bookDemoUrl: string;
  supportEmail: string;
};

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || 'there';
}

function safe(value?: string) {
  return escape(value || '');
}

function getLogoUrl(bookDemoUrl: string) {
  try {
    const url = new URL('/logos/advertisingsystems-logo.svg', bookDemoUrl);
    if (url.hostname === 'advertisingsystems.ai') {
      url.hostname = 'www.advertisingsystems.ai';
    }
    url.searchParams.set('v', '20260601');
    return url.toString();
  } catch {
    return 'https://advertisingsystems.ai/logos/advertisingsystems-logo.svg?v=20260601';
  }
}

function renderButton(label: string, href: string) {
  return `
    <a href="${safe(href)}" style="display:inline-block;padding:11px 18px;background:#2563eb;color:#ffffff;border-radius:8px;text-decoration:none;font-size:15px;line-height:22px;font-weight:700;">
      ${safe(label)}
    </a>
  `;
}

function renderMeetingActions(params: DemoConfirmationEmailParams) {
  const meetButton = params.meetingLink
    ? `<p style="margin:24px 0 0;">${renderButton('Join Google Meet', params.meetingLink)}</p>`
    : '';
  const eventLink = params.calendarEventLink
    ? `<p style="margin:${params.meetingLink ? '10px' : '24px'} 0 0;"><a href="${safe(params.calendarEventLink)}" style="color:#2563eb;text-decoration:none;font-size:16px;line-height:24px;font-weight:500;">View calendar event</a></p>`
    : '';

  return `${meetButton}${eventLink}`;
}

function formatDemoDetails(params: DemoConfirmationEmailParams) {
  if (!params.startTime || !params.endTime) {
    return {
      date: params.demoTimeText,
      time: `${params.durationMinutes} minutes`,
      timeZone: 'America/Chicago',
    };
  }

  const start = new Date(params.startTime);
  const end = new Date(params.endTime);
  const date = start.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/Chicago',
  });
  const startTime = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Chicago',
  });
  const endTime = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Chicago',
  });

  return {
    date,
    time: `${startTime} - ${endTime} CT`,
    timeZone: 'America/Chicago',
  };
}

function renderDetailRow(label: string, value: string, shaded = false) {
  return `
    <tr${shaded ? ' style="background:#f9fafb;"' : ''}>
      <td style="padding:10px 12px;color:#6b7280;font-weight:700;font-size:15px;line-height:22px;">${safe(label)}</td>
      <td style="padding:10px 12px;color:#111827;font-size:16px;line-height:24px;font-weight:500;">${safe(value)}</td>
    </tr>
  `;
}

function renderOptionalRows(params: DemoConfirmationEmailParams) {
  return [
    params.plan && renderDetailRow('Plan interest', params.plan),
    params.numberOfLocations && renderDetailRow('Locations', params.numberOfLocations, true),
  ].filter(Boolean).join('');
}

export function buildDemoConfirmationEmail(params: DemoConfirmationEmailParams) {
  const greetingName = firstName(params.name);
  const subject = 'Your Advertising Systems demo is confirmed';
  const preview = `Your Google Meet link and demo time for ${params.demoTimeText}.`;
  const logoUrl = getLogoUrl(params.bookDemoUrl);
  const details = formatDemoDetails(params);
  const coverage = 'We will review your hotel advertising goals, current campaign setup, ROAS reporting, budget pacing, and the best next steps for your team.';
  const prep = 'If helpful, have your current monthly ad spend, connected ad accounts or OTA channels, and top booking goals ready. We will keep the discussion practical and focused on what improves measurable booking revenue.';
  const meetingActions = renderMeetingActions(params);
  const optionalRows = renderOptionalRows(params);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>${safe(subject)}</title>
  </head>
  <body style="margin:0;padding:24px;background:#f4f4f5;color:#111827;font-family:'Trebuchet MS','Segoe UI',Tahoma,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${safe(preview)}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;margin:0;padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #f1f5f9;">
            <tr>
              <td style="padding:28px 32px 24px;text-align:center;border-bottom:1px solid #eef2f7;">
                <img src="${safe(logoUrl)}" width="38" height="50" alt="Advertising Systems" style="display:inline-block;width:38px;height:50px;margin-bottom:10px;border:0;outline:none;text-decoration:none;">
                <p style="margin:0;font-size:14px;font-weight:700;line-height:20px;color:#374151;">Advertising Systems</p>
                <p style="margin:2px 0 0;font-size:11px;font-weight:600;letter-spacing:0.08em;line-height:16px;color:#9ca3af;text-transform:uppercase;">by Multisystems</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <h1 style="font-size:20px;line-height:28px;margin:0 0 16px;color:#111827;font-weight:800;">Your Advertising Systems demo is confirmed</h1>
                <p style="margin:0 0 18px;color:#4b5563;font-size:16px;line-height:24px;">Hi ${safe(greetingName)},</p>
                <p style="margin:0 0 22px;color:#4b5563;font-size:16px;line-height:24px;">Your Advertising Systems demo is booked. A Google Calendar invite has also been sent to this email address.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;margin-top:18px;">
                  ${renderDetailRow('Date', details.date)}
                  ${renderDetailRow('Time', details.time, true)}
                  ${renderDetailRow('Timezone', details.timeZone)}
                  ${renderDetailRow('Company', params.company || 'Not provided', true)}
                  ${optionalRows}
                </table>

                ${meetingActions}

                <p style="margin:20px 0 0;color:#4b5563;font-size:16px;line-height:24px;">
                  <strong style="color:#111827;">What we will cover:</strong> ${safe(coverage)}
                </p>
                <p style="margin:16px 0 0;color:#4b5563;font-size:16px;line-height:24px;">
                  <strong style="color:#111827;">Before the call:</strong> ${safe(prep)}
                </p>
                <p style="margin:20px 0 0;color:#6b7280;font-size:16px;line-height:24px;">Need to change the time? Reply to this email and we will help.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px;text-align:center;border-top:1px solid #eef2f7;">
                <p style="margin:0;font-size:12px;line-height:18px;color:#9ca3af;">Advertising Systems - advertisingsystems.ai</p>
                <p style="margin:6px 0 0;"><a href="${safe(params.bookDemoUrl)}" style="color:#2563eb;text-decoration:none;font-size:12px;line-height:18px;">www.advertisingsystems.ai</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `${greetingName}, your Advertising Systems demo is booked.`,
    '',
    `Date: ${details.date}`,
    `Time: ${details.time}`,
    `Timezone: ${details.timeZone}`,
    `Company: ${params.company || 'Not provided'}`,
    params.plan ? `Plan interest: ${params.plan}` : '',
    params.numberOfLocations ? `Locations: ${params.numberOfLocations}` : '',
    params.meetingLink ? `Google Meet: ${params.meetingLink}` : '',
    params.calendarEventLink ? `Calendar event: ${params.calendarEventLink}` : '',
    '',
    `What we will cover: ${coverage}`,
    `Before the call: ${prep}`,
    '',
    `Need to change the time? Reply to this email or contact ${params.supportEmail}.`,
  ].filter(Boolean).join('\n');

  return { subject, preview, html, text };
}
