# Google Calendar OAuth (Book Demo)

Demo requests from the Book Demo form create events on **shrikrishna@multisystems.ai**’s Google Calendar.

## Setup

1. **Credentials**  
   Your `.env` already has:
   - `GOOGLE_CLIENT_ID` — OAuth client ID (813229226122-...)
   - `GOOGLE_CLIENT_SECRET` — OAuth client secret

2. **Refresh token (one-time)**  
   The API needs a refresh token for **shrikrishna@multisystems.ai** (used for both creating demo events and reading calendar availability):

   ```bash
   node scripts/get-google-refresh-token.js
   ```

   - Open the printed URL in a browser.
   - Sign in with **shrikrishna@multisystems.ai**.
   - After authorizing, you’ll be redirected to `http://localhost?code=...` (the page may show “can’t connect” — that’s fine).
   - Copy the **full URL** from the address bar and paste it into the script.
   - The script will print `GOOGLE_REFRESH_TOKEN=...`; add that line to your `.env`.

3. **Google Cloud Console**  
   For the OAuth client (813229226122-...):
   - **Authorized redirect URIs** must include: `http://localhost`
   - **Google Calendar API** must be enabled for the project.

## Runtime options

Add these to `.env` for the production booking flow:

```bash
GOOGLE_CALENDAR_ID=primary
GOOGLE_REDIRECT_URI=http://localhost
DEMO_TIME_ZONE=America/Chicago
DEMO_DURATION_MINUTES=30
DEMO_SEND_CALENDAR_INVITES=true
DEMO_CREATE_GOOGLE_MEET=true
DEMO_EVENT_LOCATION=
DEMO_CONFIRMATION_EMAIL_ENABLED=true
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=no-reply@multisystems.ai
SPRING_MAIL_PASSWORD=your-smtp-app-password
SPRING_MAIL_FROM_NAME=Advertising Systems
DEMO_REPLY_TO_EMAIL=contact@multisystems.ai
```

- `GOOGLE_CALENDAR_ID` can stay `primary`, or use a shared calendar ID if demos should land on a team calendar.
- `GOOGLE_REDIRECT_URI` must match an authorized redirect URI on the OAuth client when generating the refresh token.
- `DEMO_SEND_CALENDAR_INVITES=true` sends the prospect a Google Calendar invite from the connected calendar account. This is the default unless explicitly set to `false`.
- `DEMO_CREATE_GOOGLE_MEET=true` creates a Google Meet link on the event automatically.
- `DEMO_EVENT_LOCATION` can be a Zoom link, Google Meet link, phone number, or office address.
- `DEMO_CONFIRMATION_EMAIL_ENABLED=true` sends a branded Advertising Systems confirmation email after the Calendar event is created.
- `SPRING_MAIL_*` configures the SMTP account used for the branded confirmation email, which is sent after Google Calendar accepts the event and invite.

After `GOOGLE_REFRESH_TOKEN` is set in `.env`, the Book Demo API will read live availability and create events on that account’s calendar.
