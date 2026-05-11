# AdvertisingSystems Website

Marketing website for [AdvertisingSystems](https://advertisingsystems.ai) — AI-powered advertising management by Multisystems.

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

Run `node scripts/get-google-refresh-token.js` once to obtain the refresh token.

> **Never commit `.env` or expose secrets to the client.** All Google API calls run server-side only.

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

## Responsive Design

The site is optimized for all screen sizes:

- **Mobile-first** Tailwind breakpoints (`sm`, `md`, `lg`, `xl`)
- **Fluid typography** via CSS `clamp()` — scales smoothly between breakpoints
- **Touch targets** — minimum 44×44px on coarse-pointer devices (WCAG 2.5.5)
- **Safe-area insets** — `viewport-fit=cover` + CSS env() for notched devices
- **Reduced motion** — all animations disabled when `prefers-reduced-motion: reduce`
- **High-contrast** — glassmorphism replaced with solid borders under forced-colors
- **Print styles** — clean black-on-white output with href annotations
