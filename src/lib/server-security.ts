/**
 * Control characters are stripped from every submitted field before it is used.
 *
 * WHY: `company` from the demo form is interpolated into a mail Subject header
 * (`demo-internal-notification-email.ts`), and `name` into a display name. A
 * CR/LF inside either would terminate that header and let the rest of the value
 * be read as new headers — the classic header-injection shape. Nodemailer very
 * likely neutralises this itself (its published CVE covers `List-*` headers,
 * not Subject), so this is defence in depth, not a patch for a known hole. It
 * holds regardless of what the mail library does, which is the point: the input
 * boundary is the part we control.
 *
 * The four API routes each had their own `getString` doing trim + length cap
 * and nothing else. They all call through here now, so the next change to this
 * rule happens once.
 *
 * Replaced with a SPACE rather than removed, deliberately: "Acme\r\nBcc: x"
 * becomes "Acme  Bcc: x" — visibly odd in the inbox — instead of the silent
 * "AcmeBcc: x", which reads like a legitimate company name.
 */
const CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F]/g;
/** Same, but keeps U+000A so textarea bodies survive intact. */
const CONTROL_CHARS_KEEP_LF = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F]/g;

export function sanitizeText(value: unknown, options: { multiline?: boolean } = {}) {
  if (typeof value !== 'string') return undefined;

  const cleaned = options.multiline
    ? value.replace(/\r\n?/g, '\n').replace(CONTROL_CHARS_KEEP_LF, ' ')
    : value.replace(CONTROL_CHARS, ' ');

  const trimmed = cleaned.trim();
  return trimmed || undefined;
}

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitBucket>();

export function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return (
    forwarded ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
  return { allowed: existing.count <= limit, retryAfter };
}

export function jsonResponse(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}

export function isAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  const requestOrigin = new URL(request.url).origin;
  return new Set([
    requestOrigin,
    'https://advertisingsystems.ai',
    'https://www.advertisingsystems.ai',
  ]).has(origin);
}
