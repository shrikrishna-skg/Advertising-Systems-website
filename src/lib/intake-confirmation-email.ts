import { escape } from 'html-escaper';
import nodemailer from 'nodemailer';
import { ADVERTISING_SYSTEMS_PRODUCT } from './multisystems-intake';

export type ConfirmationKind = 'contact' | 'signup' | 'newsletter';

type SendIntakeConfirmationEmailParams = {
  kind: ConfirmationKind;
  email: string;
  name?: string;
  company?: string;
};

type SendIntakeConfirmationEmailResult = {
  success: boolean;
  skipped?: boolean;
  messageId?: string;
  error?: string;
};

type IntakeEmailCopy = {
  subject: string;
  preview: string;
  title: string;
  intro: string;
  details: Array<{ label: string; value: string }>;
  actionLabel: string;
  actionPath: string;
  nextLabel: string;
  nextText: string;
};

function getMailConfig() {
  const enabled = import.meta.env.DEMO_CONFIRMATION_EMAIL_ENABLED !== 'false';
  const host = import.meta.env.SPRING_MAIL_HOST || 'smtp.gmail.com';
  const port = Number(import.meta.env.SPRING_MAIL_PORT || 587);
  const username = import.meta.env.SPRING_MAIL_USERNAME;
  const password = import.meta.env.SPRING_MAIL_PASSWORD;
  const fromName = import.meta.env.SPRING_MAIL_FROM_NAME || ADVERTISING_SYSTEMS_PRODUCT;
  const from =
    import.meta.env.ADVERTISING_SYSTEMS_EMAIL_FROM ||
    import.meta.env.DEMO_EMAIL_FROM ||
    `${fromName} <no-reply@advertisingsystems.ai>`;
  const replyTo = import.meta.env.DEMO_REPLY_TO_EMAIL || 'contact@multisystems.ai';

  if (!enabled || !username || !password) return null;

  return {
    host,
    port,
    username,
    password,
    from,
    replyTo,
    siteUrl: (import.meta.env.PUBLIC_SITE_URL || 'https://www.advertisingsystems.ai').replace(/\/$/, ''),
    secure: port === 465,
  };
}

function safe(value?: string) {
  return escape(value || '');
}

function firstName(name?: string) {
  return name?.trim().split(/\s+/)[0] || 'there';
}

function absoluteUrl(siteUrl: string, pathOrUrl: string) {
  try {
    return new URL(pathOrUrl, `${siteUrl}/`).toString();
  } catch {
    return siteUrl;
  }
}

function getLogoUrl(siteUrl: string) {
  try {
    const url = new URL('/logos/advertisingsystems-logo.svg', siteUrl);
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
    <a href="${safe(href)}" style="display:inline-block;padding:11px 18px;background:#2563eb;color:#ffffff;border-radius:8px;text-decoration:none;font-size:15px;line-height:22px;font-weight:700;">
      ${safe(label)}
    </a>
  `;
}

function renderDetailRow(label: string, value: string, shaded = false) {
  return `
    <tr${shaded ? ' style="background:#f9fafb;"' : ''}>
      <td style="padding:10px 12px;color:#6b7280;font-weight:700;font-size:15px;line-height:22px;">${safe(label)}</td>
      <td style="padding:10px 12px;color:#111827;font-size:16px;line-height:24px;font-weight:500;">${safe(value)}</td>
    </tr>
  `;
}

function getCopy(kind: ConfirmationKind, company?: string): IntakeEmailCopy {
  const companyName = company?.trim() || 'Not provided';

  if (kind === 'signup') {
    return {
      subject: `Your ${ADVERTISING_SYSTEMS_PRODUCT} signup request is received`,
      preview: `We received your ${ADVERTISING_SYSTEMS_PRODUCT} signup request.`,
      title: `Your ${ADVERTISING_SYSTEMS_PRODUCT} signup request is received`,
      intro: `We received your ${ADVERTISING_SYSTEMS_PRODUCT} signup request. For security, create or finish your account password only in the secure AdvertisingSystems app.`,
      details: [
        { label: 'Status', value: 'Signup request received' },
        { label: 'Product', value: ADVERTISING_SYSTEMS_PRODUCT },
        { label: 'Company', value: companyName },
      ],
      actionLabel: 'Continue secure signup',
      actionPath: 'https://app.advertisingsystems.ai/signup',
      nextLabel: 'What happens next:',
      nextText: 'Use the secure signup flow to create your account. Our team will follow up if we need anything else for setup.',
    };
  }

  if (kind === 'newsletter') {
    return {
      subject: `You're subscribed to ${ADVERTISING_SYSTEMS_PRODUCT} updates`,
      preview: `You're subscribed to ${ADVERTISING_SYSTEMS_PRODUCT} updates.`,
      title: `You're subscribed to ${ADVERTISING_SYSTEMS_PRODUCT} updates`,
      intro: `You are subscribed to ${ADVERTISING_SYSTEMS_PRODUCT} updates for hotel advertising, OTA ads, ROAS reporting, and budget automation.`,
      details: [
        { label: 'Status', value: 'Subscription confirmed' },
        { label: 'Product', value: ADVERTISING_SYSTEMS_PRODUCT },
        { label: 'Updates', value: 'Advertising insights and product news' },
      ],
      actionLabel: 'Visit learning center',
      actionPath: '/blog',
      nextLabel: 'What you will receive:',
      nextText: 'We will send practical AdvertisingSystems updates, product news, and hotel advertising guidance. To change your subscription, reply to this email.',
    };
  }

  return {
    subject: `We received your ${ADVERTISING_SYSTEMS_PRODUCT} message`,
    preview: `We received your message for ${ADVERTISING_SYSTEMS_PRODUCT}.`,
    title: `We received your ${ADVERTISING_SYSTEMS_PRODUCT} message`,
    intro: `Thanks for reaching out to ${ADVERTISING_SYSTEMS_PRODUCT}. Our team will review your message and reply from contact@multisystems.ai.`,
    details: [
      { label: 'Status', value: 'Message received' },
      { label: 'Product', value: ADVERTISING_SYSTEMS_PRODUCT },
      { label: 'Company', value: companyName },
    ],
    actionLabel: 'Book a demo',
    actionPath: '/book-demo',
    nextLabel: 'What happens next:',
    nextText: 'Our team will review your request and reply with the next best step. If you want to pick a time now, you can book a demo.',
  };
}

export function buildIntakeConfirmationEmail({
  kind,
  name,
  company,
  replyTo,
  siteUrl,
}: {
  kind: ConfirmationKind;
  name?: string;
  company?: string;
  replyTo: string;
  siteUrl: string;
}) {
  const copy = getCopy(kind, company);
  const greetingName = firstName(name);
  const actionUrl = absoluteUrl(siteUrl, copy.actionPath);
  const logoUrl = getLogoUrl(siteUrl);
  const detailRows = copy.details.map((detail, index) => renderDetailRow(detail.label, detail.value, index % 2 === 1)).join('');

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>${safe(copy.subject)}</title>
  </head>
  <body style="margin:0;padding:24px;background:#f4f4f5;color:#111827;font-family:'Trebuchet MS','Segoe UI',Tahoma,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${safe(copy.preview)}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;margin:0;padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 24px;text-align:center;border-bottom:1px solid #e5e7eb;">
                <img src="${safe(logoUrl)}" width="44" height="44" alt="${ADVERTISING_SYSTEMS_PRODUCT}" style="display:inline-block;width:44px;height:44px;margin-bottom:12px;border:0;outline:none;text-decoration:none;">
                <p style="margin:0;font-size:14px;font-weight:700;line-height:20px;color:#374151;">${ADVERTISING_SYSTEMS_PRODUCT}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <h1 style="font-size:20px;line-height:28px;margin:0 0 16px;color:#111827;font-weight:800;">${safe(copy.title)}</h1>
                <p style="margin:0 0 18px;color:#4b5563;font-size:16px;line-height:24px;">Hi ${safe(greetingName)},</p>
                <p style="margin:0 0 22px;color:#4b5563;font-size:16px;line-height:24px;">${safe(copy.intro)}</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;margin-top:18px;">
                  ${detailRows}
                </table>

                <p style="margin:24px 0 0;">${renderButton(copy.actionLabel, actionUrl)}</p>

                <p style="margin:20px 0 0;color:#4b5563;font-size:16px;line-height:24px;">
                  <strong style="color:#111827;">${safe(copy.nextLabel)}</strong> ${safe(copy.nextText)}
                </p>
                <p style="margin:20px 0 0;color:#6b7280;font-size:16px;line-height:24px;">Questions? Reply to this email and we will help.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px;text-align:center;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:12px;line-height:18px;color:#9ca3af;">${ADVERTISING_SYSTEMS_PRODUCT} - advertisingsystems.ai</p>
                <p style="margin:6px 0 0;"><a href="${safe(siteUrl)}" style="color:#2563eb;text-decoration:none;font-size:12px;line-height:18px;">www.advertisingsystems.ai</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `Hi ${greetingName},`,
    '',
    copy.intro,
    '',
    ...copy.details.map((detail) => `${detail.label}: ${detail.value}`),
    '',
    `${copy.actionLabel}: ${actionUrl}`,
    '',
    `${copy.nextLabel} ${copy.nextText}`,
    '',
    `Questions? Reply to this email or contact ${replyTo}.`,
  ].filter(Boolean).join('\n');

  return { subject: copy.subject, preview: copy.preview, html, text };
}

export async function sendIntakeConfirmationEmail({
  kind,
  email,
  name,
  company,
}: SendIntakeConfirmationEmailParams): Promise<SendIntakeConfirmationEmailResult> {
  const config = getMailConfig();
  if (!config) return { success: false, skipped: true, error: 'SMTP not configured' };

  const emailContent = buildIntakeConfirmationEmail({
    kind,
    name,
    company,
    replyTo: config.replyTo,
    siteUrl: config.siteUrl,
  });

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.username,
        pass: config.password,
      },
      tls: {
        minVersion: 'TLSv1.2',
      },
    });

    const result = await transporter.sendMail({
      from: config.from,
      to: email,
      replyTo: config.replyTo,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    return { success: true, messageId: result.messageId };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SMTP send failed';
    console.error('Intake confirmation email failed:', { kind, message });
    return { success: false, error: message };
  }
}
