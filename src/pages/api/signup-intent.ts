import type { APIRoute } from 'astro';
import { getPostHogServer } from '../../lib/posthog-server';
import { checkRateLimit, getClientIp, isAllowedOrigin, jsonResponse, sanitizeText } from '../../lib/server-security';
import { sendIntakeConfirmationEmail } from '../../lib/intake-confirmation-email';
import {
  ADVERTISING_SYSTEMS_PRODUCT,
  ADVERTISING_SYSTEMS_SOURCE,
  buildIntakeIdempotencyKey,
  hashIntakeIdempotencyKey,
  normalizeIntakeContext,
  sendCentralIntakeEvent,
} from '../../lib/multisystems-intake';

const MAX_BODY_BYTES = 10 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Multi-line fields keep their newlines; every other field loses all control chars. */
const MULTILINE_FIELDS = new Set(['message']);

function getString(body: Record<string, unknown>, key: string, limit: number) {
  const cleaned = sanitizeText(body[key], { multiline: MULTILINE_FIELDS.has(key) });
  return cleaned ? cleaned.slice(0, limit) : undefined;
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
  const minuteLimit = checkRateLimit(`signup-intent:minute:${ip}`, 8, 60 * 1000);
  const hourLimit = checkRateLimit(`signup-intent:hour:${ip}`, 40, 60 * 60 * 1000);
  if (!minuteLimit.allowed || !hourLimit.allowed) {
    return jsonResponse(
      { error: 'Too many signup requests. Please try again later.' },
      429,
      { 'Retry-After': String(Math.max(minuteLimit.retryAfter, hourLimit.retryAfter)) }
    );
  }

  const parsed = await readJsonBody(request);
  if (parsed.response) return parsed.response;
  const body = parsed.body!;

  if (getString(body, 'password', 10_000)) {
    return jsonResponse({ error: 'Password must be created only in the secure app signup flow.' }, 400);
  }

  const fullName = getString(body, 'name', 120);
  const email = getString(body, 'email', 254);
  const company = getString(body, 'company', 160);
  const plan = getString(body, 'plan', 80);

  if (!fullName || !email || !company) {
    return jsonResponse({ error: 'Name, work email, and company are required.' }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return jsonResponse({ error: 'Email is invalid.' }, 400);
  }

  const context = normalizeIntakeContext(body, {
    landingPage: '/signup',
    cta: 'Start Signup',
  });
  const clientSubmissionId = getString(body, 'client_submission_id', 160);
  const idempotencyKey = clientSubmissionId
    ? buildIntakeIdempotencyKey('signup', [clientSubmissionId])
    : hashIntakeIdempotencyKey('signup', [email, company, context.cta]);

  const intake = await sendCentralIntakeEvent({
    eventType: 'signup_intent.created',
    source: ADVERTISING_SYSTEMS_SOURCE,
    idempotencyKey,
    occurredAt: new Date().toISOString(),
    lead: {
      fullName,
      email,
      company,
    },
    signup: {
      productInterest: ADVERTISING_SYSTEMS_PRODUCT,
      plan,
    },
    context,
  });

  if (intake.configured && !intake.sent) {
    return jsonResponse({ error: 'Could not start signup. Please try again.' }, 502);
  }

  const confirmation = await sendIntakeConfirmationEmail({
    kind: 'signup',
    email,
    name: fullName,
    company,
  });
  if (!confirmation.success && !confirmation.skipped) {
    console.warn('signup-intent: AdvertisingSystems confirmation email failed');
  }

  if (request.headers.get('X-Analytics-Consent') === 'accepted') {
    const posthog = getPostHogServer();
    posthog?.capture({
      distinctId: email,
      event: 'signup_intent_created',
      properties: {
        company,
        plan,
        central_intake_sent: intake.sent,
      },
    });
  }

  return jsonResponse({
    success: true,
    redirect_url: 'https://app.advertisingsystems.ai/signup',
    message: 'Signup started. Continue in the secure app to create your account and password.',
  });
};
