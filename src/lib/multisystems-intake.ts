import { createHash, createHmac, randomUUID } from 'node:crypto';

export const ADVERTISING_SYSTEMS_SOURCE = 'advertising-systems';
export const ADVERTISING_SYSTEMS_PRODUCT = 'AdvertisingSystems';

export type CentralIntakeEventType =
  | 'demo_booking.created'
  | 'contact_submission.created'
  | 'signup_intent.created'
  | 'newsletter_subscriber.created';

export type IntakeContext = {
  sourceSite: typeof ADVERTISING_SYSTEMS_SOURCE;
  landingPage: string;
  referrer?: string;
  cta?: string;
  posthogDistinctId?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
};

export type CentralIntakePayload = {
  eventType: CentralIntakeEventType;
  source: typeof ADVERTISING_SYSTEMS_SOURCE;
  idempotencyKey: string;
  occurredAt?: string;
  lead?: Record<string, unknown>;
  booking?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  newsletter?: Record<string, unknown>;
  signup?: Record<string, unknown>;
  context?: IntakeContext;
};

export type CentralIntakeResult = {
  configured: boolean;
  sent: boolean;
  skipped?: boolean;
  status?: number;
  requestId?: string;
  error?: string;
};

function getCentralOrigin() {
  return (import.meta.env.MULTISYSTEMS_CENTRAL_ORIGIN || 'https://www.multisystems.ai').replace(/\/$/, '');
}

function getCentralSecret() {
  const secret = import.meta.env.MULTISYSTEMS_LEAD_INTAKE_SECRET;
  return typeof secret === 'string' && secret.length >= 32 ? secret : '';
}

function cleanString(value: unknown, limit: number) {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, limit) : undefined;
}

function record(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

export function normalizeIntakeContext(
  body: Record<string, unknown>,
  defaults: { landingPage: string; cta: string }
): IntakeContext {
  const context = record(body.context);
  const utm = record(context.utm);
  return {
    sourceSite: ADVERTISING_SYSTEMS_SOURCE,
    landingPage:
      cleanString(context.landingPage, 500) ||
      cleanString(body.landing_page, 500) ||
      defaults.landingPage,
    referrer:
      cleanString(context.referrer, 500) ||
      cleanString(body.referrer, 500),
    cta:
      cleanString(context.cta, 120) ||
      cleanString(body.cta, 120) ||
      defaults.cta,
    posthogDistinctId:
      cleanString(context.posthogDistinctId, 200) ||
      cleanString(body.posthog_distinct_id, 200),
    utm: {
      source:
        cleanString(utm.source, 120) ||
        cleanString(body.utm_source, 120),
      medium:
        cleanString(utm.medium, 120) ||
        cleanString(body.utm_medium, 120),
      campaign:
        cleanString(utm.campaign, 160) ||
        cleanString(body.utm_campaign, 160),
    },
  };
}

export function buildIntakeIdempotencyKey(kind: string, values: Array<unknown>) {
  const explicit = values
    .map((value) => cleanString(value, 160))
    .find(Boolean);
  if (explicit) return `${ADVERTISING_SYSTEMS_SOURCE}:${kind}:${explicit}`.slice(0, 200);

  return `${ADVERTISING_SYSTEMS_SOURCE}:${kind}:${randomUUID()}`;
}

export function hashIntakeIdempotencyKey(kind: string, values: Array<unknown>) {
  const source = values
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean)
    .join('|');
  const digest = createHash('sha256').update(source || randomUUID()).digest('hex').slice(0, 40);
  return `${ADVERTISING_SYSTEMS_SOURCE}:${kind}:${digest}`;
}

export async function sendCentralIntakeEvent(
  payload: CentralIntakePayload
): Promise<CentralIntakeResult> {
  const secret = getCentralSecret();
  if (!secret) {
    console.warn('multisystems-intake: MULTISYSTEMS_LEAD_INTAKE_SECRET is not configured');
    return { configured: false, sent: false, skipped: true, error: 'Central intake secret is not configured.' };
  }

  const timestamp = String(Date.now());
  const nonce = randomUUID();
  const rawBody = JSON.stringify({
    ...payload,
    source: ADVERTISING_SYSTEMS_SOURCE,
    context: {
      ...payload.context,
      sourceSite: ADVERTISING_SYSTEMS_SOURCE,
    },
  });
  const signature = createHmac('sha256', secret)
    .update(`${timestamp}.${nonce}.${rawBody}`)
    .digest('hex');

  try {
    const response = await fetch(`${getCentralOrigin()}/api/lead-intake`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-ms-source': ADVERTISING_SYSTEMS_SOURCE,
        'x-ms-timestamp': timestamp,
        'x-ms-nonce': nonce,
        'x-ms-signature': signature,
      },
      body: rawBody,
    });

    const body = await response.json().catch(() => ({})) as { requestId?: string; error?: string };
    if (!response.ok) {
      console.error('multisystems-intake: central API rejected event', {
        eventType: payload.eventType,
        status: response.status,
        error: body.error,
      });
      return {
        configured: true,
        sent: false,
        status: response.status,
        requestId: body.requestId,
        error: body.error || `Central intake failed with status ${response.status}.`,
      };
    }

    return { configured: true, sent: true, status: response.status, requestId: body.requestId };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Central intake request failed.';
    console.error('multisystems-intake: request failed', {
      eventType: payload.eventType,
      message,
    });
    return { configured: true, sent: false, error: message };
  }
}
