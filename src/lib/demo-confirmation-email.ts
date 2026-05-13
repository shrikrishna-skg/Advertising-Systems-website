import { escape } from 'html-escaper';

export type DemoConfirmationEmailParams = {
  name: string;
  company: string;
  demoTimeText: string;
  durationMinutes: number;
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
    return url.toString();
  } catch {
    return 'https://www.advertisingsystems.ai/logos/advertisingsystems-logo.svg';
  }
}

function renderButton(label: string, href: string) {
  return `
    <a href="${safe(href)}" style="display:inline-block;background:#16b97a;color:#ffffff;border:1px solid #16b97a;border-radius:14px;padding:15px 22px;font-size:15px;font-weight:800;line-height:1;text-decoration:none;">
      ${safe(label)}
    </a>
  `;
}

function renderMiniCard(label: string, value: string, accent: string) {
  return `
    <td width="33.33%" style="padding:0 6px 12px 0;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="height:100%;background:#ffffff;border:1px solid #e4eaf2;border-radius:16px;">
        <tr>
          <td style="padding:14px 14px 13px;">
            <div style="width:9px;height:9px;border-radius:999px;background:${accent};margin-bottom:10px;"></div>
            <p style="margin:0 0 4px;color:#728097;font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;">${safe(label)}</p>
            <p style="margin:0;color:#151922;font-size:14px;line-height:1.3;font-weight:800;">${safe(value)}</p>
          </td>
        </tr>
      </table>
    </td>
  `;
}

export function buildDemoConfirmationEmail(params: DemoConfirmationEmailParams) {
  const greetingName = firstName(params.name);
  const subject = 'Your Advertising Systems demo is booked';
  const preview = `Your Google Meet link and demo time for ${params.demoTimeText}.`;
  const meetingUrl = params.meetingLink || params.calendarEventLink || params.bookDemoUrl;
  const isGoogleMeet = Boolean(params.meetingLink);
  const logoUrl = getLogoUrl(params.bookDemoUrl);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap" rel="stylesheet">
    <title>${safe(subject)}</title>
  </head>
  <body style="margin:0;background:#f5f7fb;color:#151922;font-family:'DM Sans',Arial,'Helvetica Neue',Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${safe(preview)}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fb;margin:0;padding:26px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #dde6f1;border-radius:24px;overflow:hidden;box-shadow:0 18px 48px rgba(21,25,34,0.08);">
            <tr>
              <td style="padding:26px 28px 18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <table role="presentation" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="42" style="width:42px;vertical-align:middle;">
                            <img src="${safe(logoUrl)}" width="40" height="40" alt="Advertising Systems logo" style="display:block;width:40px;height:40px;border:0;outline:none;text-decoration:none;">
                          </td>
                          <td style="padding-left:10px;vertical-align:middle;">
                            <p style="margin:0;color:#151922;font-size:18px;line-height:1.1;font-weight:800;letter-spacing:-0.02em;">Advertising Systems</p>
                            <p style="margin:4px 0 0;color:#8b95a7;font-size:10px;line-height:1;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">by Multisystems</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 28px 4px;">
                <div style="display:inline-block;margin-bottom:16px;border:1px solid #b8f0d3;background:#ecfdf5;color:#087a55;border-radius:999px;padding:7px 11px;font-size:12px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;">
                  Demo booked
                </div>
                <h1 style="margin:0;color:#151922;font-size:32px;line-height:1.08;font-weight:800;letter-spacing:-0.035em;">
                  ${safe(greetingName)}, your Google Meet is ready.
                </h1>
                <p style="margin:13px 0 0;color:#5d697d;font-size:16px;line-height:1.6;">
                  Your Advertising Systems demo is confirmed. Use the link below when it is time to join.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fbff;border:1px solid #dfe7f2;border-radius:20px;">
                  <tr>
                    <td style="padding:21px 22px;">
                      <p style="margin:0 0 7px;color:#748199;font-size:12px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;">Demo time</p>
                      <p style="margin:0;color:#151922;font-size:21px;line-height:1.35;font-weight:800;">${safe(params.demoTimeText)}</p>
                      <div style="margin-top:16px;">
                        ${renderButton(isGoogleMeet ? 'Join Google Meet' : 'Open Meeting Details', meetingUrl)}
                      </div>
                      <p style="margin:15px 0 0;color:#647084;font-size:13px;line-height:1.55;word-break:break-word;">
                        ${isGoogleMeet ? 'Google Meet link:' : 'Meeting details:'}
                        <a href="${safe(meetingUrl)}" style="color:#2563eb;font-weight:700;text-decoration:none;">${safe(meetingUrl)}</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 22px 2px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    ${renderMiniCard('Length', `${params.durationMinutes} minutes`, '#16b97a')}
                    ${renderMiniCard('Focus', 'Ad performance', '#2f7df6')}
                    ${renderMiniCard('Output', 'Clear next step', '#8b5cf6')}
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 28px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;border:1px solid #e8edf4;border-radius:18px;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <p style="margin:0;color:#151922;font-size:15px;font-weight:800;">Before the call</p>
                      <p style="margin:7px 0 0;color:#667386;font-size:14px;line-height:1.62;">
                        Bring the one thing you want to understand better: ad spend, OTA performance, reporting, or where bookings are leaking. We will keep the call practical.
                      </p>
                    </td>
                  </tr>
                </table>
                <p style="margin:18px 0 0;color:#7a8596;font-size:13px;line-height:1.6;">
                  Questions or need to reschedule? Reply to this email or contact
                  <a href="mailto:${safe(params.supportEmail)}" style="color:#2563eb;font-weight:800;text-decoration:none;">${safe(params.supportEmail)}</a>.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#f9fbfe;border-top:1px solid #e4eaf2;padding:18px 28px;">
                <p style="margin:0;color:#96a1b3;font-size:12px;line-height:1.55;">
                  Advertising Systems by Multisystems. This email was sent because a demo was booked on advertisingsystems.ai.
                </p>
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
    `Demo time: ${params.demoTimeText}`,
    `Duration: ${params.durationMinutes} minutes`,
    `${isGoogleMeet ? 'Google Meet' : 'Meeting details'}: ${meetingUrl}`,
    '',
    'Before the call: bring the one thing you want to understand better: ad spend, OTA performance, reporting, or where bookings are leaking.',
    '',
    `Questions or rescheduling: ${params.supportEmail}`,
  ].filter(Boolean).join('\n');

  return { subject, preview, html, text };
}
