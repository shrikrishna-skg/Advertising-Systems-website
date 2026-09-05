import nodemailer from 'nodemailer';
import { buildDemoConfirmationEmail } from './demo-confirmation-email';
import { buildDemoInternalNotificationEmail } from './demo-internal-notification-email';

const DEFAULT_INTERNAL_NOTIFY_EMAIL = 'shrikrishna@multisystems.ai';

type DemoEmailBaseParams = {
  name: string;
  email: string;
  company: string;
  phone?: string;
  plan?: string;
  numberOfLocations?: string;
  companySize?: string;
  monthlyAdSpend?: string;
  message?: string;
  demoTimeText: string;
  startTime?: string;
  endTime?: string;
  durationMinutes: number;
  meetingLink?: string;
  calendarEventLink?: string;
};

type SendDemoConfirmationEmailParams = DemoEmailBaseParams;

type SendDemoInternalNotificationEmailParams = DemoEmailBaseParams & {
  internalNotifyEmail?: string;
};

type SendDemoEmailResult = {
  success: boolean;
  skipped?: boolean;
  messageId?: string;
  error?: string;
};

function getSiteUrl() {
  return (import.meta.env.PUBLIC_SITE_URL || 'https://advertisingsystems.ai').replace(/\/$/, '');
}

export function getDemoInternalNotifyEmail() {
  const configured = import.meta.env.DEMO_INTERNAL_NOTIFY_EMAIL?.trim();
  return configured || DEFAULT_INTERNAL_NOTIFY_EMAIL;
}

function getMailConfig() {
  const enabled = import.meta.env.DEMO_CONFIRMATION_EMAIL_ENABLED !== 'false';
  const host = import.meta.env.SPRING_MAIL_HOST || 'smtp.gmail.com';
  const port = Number(import.meta.env.SPRING_MAIL_PORT || 587);
  const username = import.meta.env.SPRING_MAIL_USERNAME;
  const password = import.meta.env.SPRING_MAIL_PASSWORD;
  const fromName = import.meta.env.SPRING_MAIL_FROM_NAME || 'Advertising Systems';
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

type MailConfig = NonNullable<ReturnType<typeof getMailConfig>>;

function createTransporter(config: MailConfig) {
  return nodemailer.createTransport({
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
}

export async function sendDemoConfirmationEmail(
  params: SendDemoConfirmationEmailParams
): Promise<SendDemoEmailResult> {
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
    phone: params.phone,
    plan: params.plan,
    numberOfLocations: params.numberOfLocations,
    meetingLink: params.meetingLink,
    calendarEventLink: params.calendarEventLink,
    sampleReportUrl: `${siteUrl}/sample-report`,
    expediaReportUrl: `${siteUrl}/expedia-report`,
    bookDemoUrl: `${siteUrl}/book-demo`,
    supportEmail: config.replyTo,
  });

  try {
    const transporter = createTransporter(config);

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

export async function sendDemoInternalNotificationEmail(
  params: SendDemoInternalNotificationEmailParams
): Promise<SendDemoEmailResult> {
  const config = getMailConfig();
  if (!config) return { success: false, skipped: true, error: 'SMTP not configured' };

  const to = params.internalNotifyEmail?.trim() || getDemoInternalNotifyEmail();
  if (!to) return { success: false, skipped: true, error: 'Internal notification email is not configured' };

  const siteUrl = getSiteUrl();
  const email = buildDemoInternalNotificationEmail({
    name: params.name,
    email: params.email,
    company: params.company,
    phone: params.phone,
    plan: params.plan,
    numberOfLocations: params.numberOfLocations,
    companySize: params.companySize,
    monthlyAdSpend: params.monthlyAdSpend,
    message: params.message,
    demoTimeText: params.demoTimeText,
    startTime: params.startTime,
    endTime: params.endTime,
    durationMinutes: params.durationMinutes,
    meetingLink: params.meetingLink,
    calendarEventLink: params.calendarEventLink,
    siteUrl,
  });

  try {
    const transporter = createTransporter(config);

    const result = await transporter.sendMail({
      from: config.from,
      to,
      replyTo: params.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    return { success: true, messageId: result.messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'SMTP send failed';
    console.error('Demo staff notification email failed:', message);
    return { success: false, error: message };
  }
}
