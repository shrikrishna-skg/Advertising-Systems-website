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

const MAX_BODY_BYTES = 12 * 1024;
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
  const minuteLimit = checkRateLimit(`contact:minute:${ip}`, 6, 60 * 1000);
  const hourLimit = checkRateLimit(`contact:hour:${ip}`, 30, 60 * 60 * 1000);
  if (!minuteLimit.allowed || !hourLimit.allowed) {
    return jsonResponse(
      { error: 'Too many contact requests. Please try again later.' },
      429,
      { 'Retry-After': String(Math.max(minuteLimit.retryAfter, hourLimit.retryAfter)) }
    );
  }

  const parsed = await readJsonBody(request);
  if (parsed.response) return parsed.response;
  const body = parsed.body!;

  if (getString(body, 'website', 120)) {
    return jsonResponse({ success: true, message: "Thanks. We've received your message." });
  }

  const fullName = getString(body, 'name', 120);
  const email = getString(body, 'email', 254);
  const company = getString(body, 'company', 160);
  const phone = getString(body, 'phone', 40);
  const message = getString(body, 'message', 5000);

  if (!fullName || !email || !message) {
    return jsonResponse({ error: 'Name, email, and message are required.' }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return jsonResponse({ error: 'Email is invalid.' }, 400);
  }

  const context = normalizeIntakeContext(body, {
    landingPage: '/contact',
    cta: 'Contact Sales',
  });
  const clientSubmissionId = getString(body, 'client_submission_id', 160);
  const idempotencyKey = clientSubmissionId
    ? buildIntakeIdempotencyKey('contact', [clientSubmissionId])
    : hashIntakeIdempotencyKey('contact', [email, message, context.landingPage]);

  const intake = await sendCentralIntakeEvent({
    eventType: 'contact_submission.created',
    source: ADVERTISING_SYSTEMS_SOURCE,
    idempotencyKey,
    occurredAt: new Date().toISOString(),
    lead: {
      fullName,
      email,
      phone,
      company,
    },
    contact: {
      message,
      productInterest: ADVERTISING_SYSTEMS_PRODUCT,
    },
    context,
  });

  if (intake.configured && !intake.sent) {
    return jsonResponse({ error: 'Could not submit your message. Please try again.' }, 502);
  }

  const confirmation = await sendIntakeConfirmationEmail({
    kind: 'contact',
    email,
    name: fullName,
    company,
  });
  if (!confirmation.success && !confirmation.skipped) {
    console.warn('contact: AdvertisingSystems confirmation email failed');
  }

  if (request.headers.get('X-Analytics-Consent') === 'accepted') {
    const posthog = getPostHogServer();
    posthog?.capture({
      distinctId: email,
      event: 'contact_submission_created',
      properties: {
        company,
        has_phone: Boolean(phone),
        central_intake_sent: intake.sent,
      },
    });
  }

  return jsonResponse({
    success: true,
    message: "Thanks. We've received your message and will reply shortly.",
  });
};
