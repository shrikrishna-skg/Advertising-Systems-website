import type { APIRoute } from 'astro';
import { getPostHogServer } from '../../lib/posthog-server';
import { checkRateLimit, getClientIp, isAllowedOrigin, jsonResponse } from '../../lib/server-security';
import { sendIntakeConfirmationEmail } from '../../lib/intake-confirmation-email';
import {
  ADVERTISING_SYSTEMS_PRODUCT,
  ADVERTISING_SYSTEMS_SOURCE,
  buildIntakeIdempotencyKey,
  hashIntakeIdempotencyKey,
  normalizeIntakeContext,
  sendCentralIntakeEvent,
} from '../../lib/multisystems-intake';

const MAX_BODY_BYTES = 8 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(body: Record<string, unknown>, key: string, limit: number) {
  const value = body[key];
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, limit) : undefined;
}

async function readJsonBody(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return { body: null, response: jsonResponse({ error: 'Content-Type must be application/json' }, 415) };
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return { body: null, response: jsonResponse({ error: 'Request body is too large' }, 413) };
  }

  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return { body: null, response: jsonResponse({ error: 'Request body is too large' }, 413) };
    }
    return { body: JSON.parse(raw) as Record<string, unknown>, response: null };
  } catch {
    return { body: null, response: jsonResponse({ error: 'Invalid JSON body' }, 400) };
  }
}

export const POST: APIRoute = async ({ request }) => {
  if (!isAllowedOrigin(request)) {
    return jsonResponse({ error: 'Request origin is not allowed' }, 403);
  }

  const ip = getClientIp(request);
  const minuteLimit = checkRateLimit(`newsletter:minute:${ip}`, 10, 60 * 1000);
  const hourLimit = checkRateLimit(`newsletter:hour:${ip}`, 50, 60 * 60 * 1000);
  if (!minuteLimit.allowed || !hourLimit.allowed) {
    return jsonResponse(
      { error: 'Too many subscription requests. Please try again later.' },
      429,
      { 'Retry-After': String(Math.max(minuteLimit.retryAfter, hourLimit.retryAfter)) }
    );
  }

  const parsed = await readJsonBody(request);
  if (parsed.response) return parsed.response;
  const body = parsed.body!;

  if (getString(body, 'website', 120)) {
    return jsonResponse({ success: true, message: "You're subscribed." });
  }

  const email = getString(body, 'email', 254);
  if (!email) {
    return jsonResponse({ error: 'Email is required.' }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return jsonResponse({ error: 'Email is invalid.' }, 400);
  }

  const context = normalizeIntakeContext(body, {
    landingPage: '/blog',
    cta: 'Newsletter Subscribe',
  });
  const clientSubmissionId = getString(body, 'client_submission_id', 160);
  const idempotencyKey = clientSubmissionId
    ? buildIntakeIdempotencyKey('newsletter', [clientSubmissionId])
    : hashIntakeIdempotencyKey('newsletter', [email, context.landingPage]);

  const intake = await sendCentralIntakeEvent({
    eventType: 'newsletter_subscriber.created',
    source: ADVERTISING_SYSTEMS_SOURCE,
    idempotencyKey,
    occurredAt: new Date().toISOString(),
    lead: {
      email,
    },
    newsletter: {
      productInterest: ADVERTISING_SYSTEMS_PRODUCT,
    },
    context,
  });

  if (intake.configured && !intake.sent) {
    return jsonResponse({ error: 'Could not subscribe this email. Please try again.' }, 502);
  }

  const confirmation = await sendIntakeConfirmationEmail({
    kind: 'newsletter',
    email,
  });
  if (!confirmation.success && !confirmation.skipped) {
    console.warn('newsletter: AdvertisingSystems confirmation email failed');
  }

  if (request.headers.get('X-Analytics-Consent') === 'accepted') {
    const posthog = getPostHogServer();
    posthog?.capture({
      distinctId: email,
      event: 'newsletter_subscriber_created',
      properties: {
        central_intake_sent: intake.sent,
        landing_page: context.landingPage,
      },
    });
  }

  return jsonResponse({
    success: true,
    message: "You're subscribed to AdvertisingSystems updates.",
  });
};
