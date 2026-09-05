/**
 * End-to-end proof that a hostile form submission cannot inject a mail header.
 *
 * Run: npm run check:mail
 *
 * `sanitizeText` is unit-checked in check-input-sanitize.ts. This one goes the
 * whole way instead: it takes the attack string, runs it through the SAME
 * helper the /api/book-demo route uses, feeds the result to the REAL email
 * builder, and hands that to nodemailer's own message compiler. Then it reads
 * the raw RFC-822 bytes nodemailer would have put on the wire and asserts no
 * extra header appeared.
 *
 * `streamTransport` compiles the real MIME message without opening a
 * connection, so this needs no SMTP credentials and sends nothing. (Not
 * `jsonTransport` — that hands back the structured fields it was given, which
 * would prove nothing about how they get encoded onto the wire.)
 *
 * MEASURED, 2026-08-16 — read this before assuming the guard is load-bearing:
 * with `sanitizeText` bypassed and the raw attack string passed straight in,
 * these assertions STILL pass. Nodemailer 9 collapses the CR/LF itself while
 * encoding the Subject, so the injection never worked in the first place.
 * That makes the guard defence in depth, not a patch for an open hole. It is
 * still worth keeping — it holds if the mail library is swapped, downgraded,
 * or if a field is ever routed somewhere nodemailer is not doing the encoding
 * — but do not let anyone claim this test closed a live vulnerability.
 */
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { sanitizeText } from '../src/lib/server-security.ts';
import { buildDemoInternalNotificationEmail } from '../src/lib/demo-internal-notification-email.ts';

const ATTACK = 'Acme Hotels\r\nBcc: attacker@example.com\r\nX-Injected: yes';

/** Exactly what src/pages/api/book-demo.ts does to the `company` field. */
const company = sanitizeText(ATTACK)!;
const name = sanitizeText('Jane\r\nX-Also-Injected: yes')!;

const email = buildDemoInternalNotificationEmail({
  name,
  email: 'jane@example.com',
  company,
  demoTimeText: 'Monday 10:00',
  durationMinutes: 30,
  siteUrl: 'https://advertisingsystems.ai',
});

const transporter = nodemailer.createTransport({ streamTransport: true, buffer: true });
const info = await transporter.sendMail({
  from: 'noreply@advertisingsystems.ai',
  to: 'team@advertisingsystems.ai',
  replyTo: 'jane@example.com',
  subject: email.subject,
  html: email.html,
  text: email.text,
});

const raw = (info.message as Buffer).toString('utf8');
const headerBlock = raw.split(/\r?\n\r?\n/)[0] ?? '';

console.log('mail header injection —');

/**
 * A real header starts at column 0. A line beginning with whitespace is a
 * FOLDED continuation of the header above it (RFC 822 §3.1.1) — which is
 * exactly what a long Subject becomes, and is not a header of its own.
 * So the test is "does a new header start", not "does this text appear":
 * the attack string surviving as Subject TEXT is the intended outcome.
 */
const headerNames = headerBlock
  .split(/\r?\n/)
  .filter((line) => !/^\s/.test(line))
  .map((line) => line.split(':')[0].toLowerCase());

assert.ok(!headerNames.includes('bcc'), 'a Bcc header was injected');
assert.ok(!headerNames.includes('cc'), 'a Cc header was injected');
console.log('  ok  no Bcc/Cc header created');

assert.ok(!headerNames.some((h) => h.startsWith('x-')), `arbitrary header injected: ${headerNames}`);
console.log('  ok  no arbitrary X- headers created');

assert.ok(headerNames.includes('subject'), 'the Subject header is missing entirely');
assert.equal(
  headerBlock.match(/^To:.*$/im)?.[0],
  'To: team@advertisingsystems.ai',
  'the To header was tampered with',
);
console.log('  ok  Subject present, To header untouched');

// The definitive check: the SMTP envelope is the recipient list the mail server
// actually delivers to. If injection had worked, the attacker would be in here.
assert.deepEqual(info.envelope.to, ['team@advertisingsystems.ai'], 'envelope recipients were altered');
console.log('  ok  SMTP envelope contains only the intended recipient');

// Neutralised, not swallowed — the submission is still readable by a human.
assert.ok(raw.includes('Acme Hotels'), 'the legitimate part of the value was lost');
console.log('  ok  submitted value still readable in the message');

console.log('\n5 checks passed');
