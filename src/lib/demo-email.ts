import nodemailer from 'nodemailer';
import { buildDemoConfirmationEmail } from './demo-confirmation-email';

type SendDemoConfirmationEmailParams = {
  name: string;
  email: string;
  company: string;
  demoTimeText: string;
  startTime?: string;
  endTime?: string;
  durationMinutes: number;
  meetingLink?: string;
  calendarEventLink?: string;
};

type SendDemoConfirmationEmailResult = {
  success: boolean;
  skipped?: boolean;
  messageId?: string;
  error?: string;
};

function getSiteUrl() {
  return (import.meta.env.PUBLIC_SITE_URL || 'https://www.advertisingsystems.ai').replace(/\/$/, '');
}

function getMailConfig() {
  const enabled = import.meta.env.DEMO_CONFIRMATION_EMAIL_ENABLED !== 'false';
  const host = import.meta.env.SPRING_MAIL_HOST || 'smtp.gmail.com';
  const port = Number(import.meta.env.SPRING_MAIL_PORT || 587);
  const username = import.meta.env.SPRING_MAIL_USERNAME;
  const password = import.meta.env.SPRING_MAIL_PASSWORD;
  const fromName = import.meta.env.SPRING_MAIL_FROM_NAME || 'AdvertisingSystems';
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
    secure: port === 465,
  };
}

export async function sendDemoConfirmationEmail(
  params: SendDemoConfirmationEmailParams
): Promise<SendDemoConfirmationEmailResult> {
  const config = getMailConfig();
  if (!config) return { success: false, skipped: true, error: 'SMTP not configured' };

  const siteUrl = getSiteUrl();
  const email = buildDemoConfirmationEmail({
    name: params.name,
    company: params.company,
    demoTimeText: params.demoTimeText,
    startTime: params.startTime,
    endTime: params.endTime,
    durationMinutes: params.durationMinutes,
    meetingLink: params.meetingLink,
    calendarEventLink: params.calendarEventLink,
    sampleReportUrl: `${siteUrl}/sample-report`,
    expediaReportUrl: `${siteUrl}/expedia-report`,
    bookDemoUrl: `${siteUrl}/book-demo`,
    supportEmail: config.replyTo,
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
      to: params.email,
      replyTo: config.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    return { success: true, messageId: result.messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'SMTP send failed';
    console.error('Demo confirmation email failed:', message);
    return { success: false, error: message };
  }
}
