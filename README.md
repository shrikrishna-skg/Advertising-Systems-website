# Advertising Systems Website

Marketing website for [AdvertisingSystems](https://www.advertisingsystems.ai) — AI-powered advertising management.

Built with **Astro 6**, **React 19**, **TailwindCSS v4**, and **TypeScript**.

## Stack

| Layer | Technology |
| :---- | :--------- |
| Framework | Astro 6 (SSR, Node adapter) |
| UI Components | React 19 + Radix UI |
| Styling | TailwindCSS v4 (Vite plugin) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Calendar API | Google Calendar (OAuth 2.0) |
| CI/CD | GitHub Actions |

## Project Structure

```
/
├── .github/workflows/ci.yml   # CI: typecheck → build
├── public/                    # Static assets (favicon, og-image, etc.)
├── scripts/                   # One-off utility scripts
├── src/
│   ├── components/            # Astro + React components
│   │   └── ui/                # Reusable React UI primitives
│   ├── data/                  # Static data (features, pricing, FAQ, …)
│   ├── layouts/               # Layout.astro (SEO, dark mode, schemas)
│   ├── pages/                 # File-based routes (.astro + API routes)
│   └── styles/
│       └── global.css         # TailwindCSS v4 theme + global styles
└── package.json
```

## Commands

All commands are run from the project root:

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview production build locally |
| `npx astro check` | TypeScript type check |

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```sh
cp .env.example .env
```

| Variable | Description |
| :------- | :---------- |
| `GOOGLE_CLIENT_ID` | OAuth 2.0 client ID from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 client secret |
| `GOOGLE_REFRESH_TOKEN` | Offline refresh token for the calendar owner account |
| `GOOGLE_CALENDAR_ID` | Calendar ID (default: `primary`) |
| `SPRING_MAIL_HOST` | SMTP host for AdvertisingSystems customer confirmation emails |
| `SPRING_MAIL_PORT` | SMTP port, usually `587` for Gmail STARTTLS |
| `SPRING_MAIL_USERNAME` | SMTP username for the verified AdvertisingSystems sender mailbox |
| `SPRING_MAIL_PASSWORD` | SMTP app password or provider password |
| `SPRING_MAIL_FROM_NAME` | Customer-visible sender name, default `Advertising Systems` |
| `ADVERTISING_SYSTEMS_EMAIL_FROM` | Customer-visible From header, e.g. `Advertising Systems <no-reply@advertisingsystems.ai>`; sender domain must be verified |
| `DEMO_REPLY_TO_EMAIL` | Customer replies go here, default `contact@multisystems.ai` |
| `DEMO_INTERNAL_NOTIFY_EMAIL` | Internal demo notification recipient, default `shrikrishna@multisystems.ai` |
| `DEMO_CONFIRMATION_EMAIL_ENABLED` | Set `false` to skip branded confirmation emails |
| `MULTISYSTEMS_CENTRAL_ORIGIN` | Multisystems origin for signed central intake requests, default `https://www.multisystems.ai` |
| `MULTISYSTEMS_LEAD_INTAKE_SECRET` | Server-only HMAC secret matching `LEAD_INTAKE_ADVERTISING_SYSTEMS_SECRET` in Multisystems |

Run `node scripts/get-google-refresh-token.js` once to obtain the refresh token.

> **Never commit `.env` or expose secrets to the client.** Google Calendar, SMTP, and Multisystems intake calls run server-side only. Public API responses intentionally avoid exposing whether SMTP or central-intake secrets are configured.

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`) runs on every push/PR to `main`/`master`:

1. **Type Check** — `npx astro check`
2. **Build** — `npm run build` (uses GitHub Actions secrets for env vars; falls back to placeholders if unset)
3. **Artifact** — Uploads `dist/` for 7 days

### Required GitHub Secrets

Add these in **Settings → Secrets and variables → Actions**:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `GOOGLE_CALENDAR_ID` (optional)
- `SPRING_MAIL_USERNAME`
- `SPRING_MAIL_PASSWORD`
- `ADVERTISING_SYSTEMS_EMAIL_FROM`
- `DEMO_REPLY_TO_EMAIL`
- `SPRING_MAIL_HOST` / `SPRING_MAIL_PORT` (optional if using Gmail defaults)
- `MULTISYSTEMS_LEAD_INTAKE_SECRET`
- `MULTISYSTEMS_CENTRAL_ORIGIN` (optional; defaults to production Multisystems)

## Responsive Design

The site is optimized for all screen sizes:

- **Mobile-first** Tailwind breakpoints (`sm`, `md`, `lg`, `xl`)
- **Fluid typography** via CSS `clamp()` — scales smoothly between breakpoints
- **Touch targets** — minimum 44×44px on coarse-pointer devices (WCAG 2.5.5)
- **Safe-area insets** — `viewport-fit=cover` + CSS env() for notched devices
- **Reduced motion** — all animations disabled when `prefers-reduced-motion: reduce`
- **High-contrast** — glassmorphism replaced with solid borders under forced-colors
- **Print styles** — clean black-on-white output with href annotations
