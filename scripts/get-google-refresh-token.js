/**
 * One-time script to get a Google OAuth refresh token for the Book Demo Calendar API.
 * Run from project root. Sign in as shrikrishna@multisystems.ai so events are created on that calendar.
 *
 * Usage: node scripts/get-google-refresh-token.js
 * Requires .env with GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.
 */

import { readFileSync } from 'fs';
import { createInterface } from 'readline';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function loadEnv() {
  try {
    const raw = readFileSync(join(root, '.env'), 'utf8');
    const env = {};
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
    }
    return env;
  } catch (e) {
    console.error('Could not read .env:', e.message);
    process.exit(1);
  }
}

const env = loadEnv();
const clientId = env.GOOGLE_CLIENT_ID;
const clientSecret = env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error('Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env');
  process.exit(1);
}

const redirectUri = env.GOOGLE_REDIRECT_URI || 'http://localhost';
const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
const scopes = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly',
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: scopes,
});

console.log('Sign in with the Google account whose calendar should receive demo bookings.\n');
console.log(`Using redirect URI: ${redirectUri}\n`);
console.log('Open this URL in your browser, sign in, then paste the full redirect URL (or the "code" query param) below:\n');
console.log(url);
console.log('');

const rl = createInterface({ input: process.stdin, output: process.stdout });
rl.question('Paste the redirect URL or authorization code: ', async (input) => {
  rl.close();
  let code = input.trim();
  if (code.startsWith('http')) {
    try {
      const u = new URL(code);
      code = u.searchParams.get('code') || '';
    } catch {
      console.error('Invalid URL');
      process.exit(1);
    }
  }
  if (!code) {
    console.error('No code found');
    process.exit(1);
  }
  try {
    const { tokens } = await oauth2Client.getToken(code);
    if (tokens.refresh_token) {
      console.log('\nAdd this to your .env as GOOGLE_REFRESH_TOKEN:\n');
      console.log('GOOGLE_REFRESH_TOKEN=' + tokens.refresh_token);
    } else {
      console.log('No refresh_token in response. Use prompt=consent and sign in as shrikrishna@multisystems.ai.');
    }
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
});
