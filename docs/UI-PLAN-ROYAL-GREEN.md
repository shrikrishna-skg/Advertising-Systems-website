# Advertising Systems UI Plan — Inspired by ReputationSystems.ai, Royal Green Theme

## 1. Reference: ReputationSystems.ai

### Structure & sections (in order)
| Section | Purpose |
|--------|---------|
| **Hero** | Trust badge (“Trusted by 100+…”), one clear problem headline, short value prop, dual CTA (Get Started / Book Demo), trust line (no CC, setup in minutes) |
| **Trust bar** | Short neutral trust proof, such as businesses served or support availability |
| **Stats** | 4 metrics in cards (e.g. 10,000+ Reviews, 95% Response Rate, +0.4★, 8hrs/wk Saved) |
| **Pain points** | “Does this sound familiar?” — 3 cards with quote + short title (Review Overload, Sinking Ratings, Time-Consuming Responses), then “There’s a better way” |
| **Features** | 3 main features, each: title, subtitle, 3 bullets, quote, CTA link; icons/logos for platforms |
| **Integrations** | “Works with what you already use” — grid of platform logos |
| **Testimonials** | 3 quotes with name, role, company; optional small metric per card |
| **Pricing** | 3 tiers (Starter / Professional / Enterprise), single CTA per tier, “All plans include…” line |
| **Final CTA** | Headline + same dual CTA + trust line |
| **Footer** | Links, legal, branding |

### UX patterns
- **Dual CTAs**: Primary (Get Started) + secondary (Book a Demo); both often repeated.
- **Trust**: No credit card, setup in minutes, cancel anytime; neutral proof and support notes.
- **Social proof**: “100+ businesses”, concrete metrics (reviews, response rate, time saved).
- **Feature pages**: Deep-dive per feature (hero, problem bullets, “how we solve it”, feature list, related features, integrations, FAQ, CTA).
- **Book-demo page**: Clear signup and personalized demo paths with short benefit lists.

---

## 2. Advertising Systems alignment

Your site already follows the same flow. Keep this order and intent; only refine content and visuals.

| Your section | ReputationSystems equivalent | Notes |
|--------------|------------------------------|--------|
| Hero | Hero | Match: trust badge, one problem headline, value prop, dual CTA, trust line. |
| StatsBar | Stats + trust bar | Keep 4 metrics; optionally add 3 trust pills above or below. |
| PainPoints | Pain points | Keep “Does this sound familiar?” + 3 pain cards + “There’s a better way.” |
| Features | Features | Keep 3 feature blocks with title, bullets, quote, CTA. |
| Integrations | Integrations | Logo grid “Works with what you already use.” |
| Testimonials | Testimonials | 3 quotes, name/role/company, optional metric. |
| Pricing | Pricing | 3 tiers, clear CTAs, “All plans include…” |
| FAQ | (inline or separate) | Keep. |
| FinalCTA | Final CTA | Same headline + dual CTA + trust line. |
| Footer | Footer | Keep. |

No structural change needed; focus on **royal green theme** and **copy/visual polish** where useful.

---

## 3. Royal green color system

Replace current emerald/blue with a single **royal green** family. Use these as the source of truth for CSS variables and Tailwind.

### Palette

| Role | Hex | Usage |
|------|-----|--------|
| **Royal green (primary)** | `#0D5C2E` | Primary buttons, key accents, logo accent, active states |
| **Royal green light** | `#136A3F` | Hover states, secondary buttons, links |
| **Royal green bright** | `#1B7A4B` | Highlights, gradient end, focus rings |
| **Royal green pale** | `#228B52` | Softer accents, dark-mode primary |
| **Royal green tint** | `#E8F5EE` | Light backgrounds, glows, badge backgrounds |
| **Royal green tint strong** | `#C8E6D4` | Borders on light, hover backgrounds |
| **Royal green deep** | `#0A3D1F` | Dark mode primary, footer accents |

### Where to apply

- **Navbar**: Logo mark and “Systems” → royal green; remove blue (`#3B82F6`). CTA button and hover borders → royal green.
- **Hero**: Trust badge dot, gradient headline, primary CTA, secondary CTA border hover, trust line — all royal green. Glow and mesh → royal green tints.
- **StatsBar**: Metric accents and any “fill” bars → royal green.
- **PainPoints**: Card hover border, any icon or accent → royal green.
- **Features**: Gradient text, “Explore…” links, card hovers, progress/gradient fills → royal green.
- **Integrations**: Section accent or “dot” decor → royal green (optional).
- **Testimonials**: Quote mark or metric color → royal green.
- **Pricing**: “Most popular” badge, primary CTA buttons, checkmarks → royal green.
- **FAQ**: Accordion active/expand accent → royal green.
- **FinalCTA**: Same as Hero (primary + secondary CTAs, glow).
- **Footer**: Background can stay dark; links or “Systems” accent → royal green pale.
- **Dark mode**: Use royal green bright/pale for buttons and accents so they stay visible.

---

## 4. Implementation checklist

### Global (e.g. `src/styles/global.css`)

- [ ] Add royal green palette to `@theme` (e.g. `--color-royal-green-*`).
- [ ] Replace emerald-based CSS variables with royal green equivalents:
  - `--hero-glow`, `--mesh-c1/c2/c3`, `--bar-fill-*`, `--section-line-color`, `--surface-glass-border-hover`, `--badge-glow`, etc.
- [ ] Update `.text-gradient` to use royal green range (e.g. `#0D5C2E` → `#1B7A4B`).
- [ ] Dark mode: same variables with royal green bright/pale for contrast.

### Components

- [ ] **Navbar**: Logo SVG stroke/fill `#3B82F6` → royal green; “Systems” and all emerald-500/600 → royal green; CTA and border hovers → royal green.
- [ ] **Hero**: Replace `emerald-*` in badge, buttons, mockup (e.g. `-38%`) and any gradient/glow with royal green.
- [ ] **StatsBar**: Any emerald/blue → royal green.
- [ ] **PainPoints**: Hover borders and accents → royal green.
- [ ] **Features**: Gradient text, link color, card hovers, bar fills → royal green.
- [ ] **Integrations**: Optional accent → royal green.
- [ ] **Testimonials**: Accent color → royal green.
- [ ] **Pricing**: Badge and buttons → royal green.
- [ ] **FAQ**: Active/hover state → royal green.
- [ ] **FinalCTA**: Same as Hero (royal green CTAs and optional glow).
- [ ] **Footer**: Link hover or brand accent → royal green.

### Optional (from ReputationSystems)

- [ ] Add neutral trust proof under or over StatsBar, avoiding unverified security or uptime claims.
- [ ] Ensure book-demo page has clear “Get Started” and “Book a Demo” paths with short bullets.
- [ ] Feature subpages: same content pattern (hero, problem list, solution, feature list, related features, FAQ, CTA).

---

## 5. Summary

- **Structure**: Already aligned with ReputationSystems.ai; no section reorder needed.
- **Color**: One coherent **royal green** palette replacing emerald and blue everywhere (navbar logo, buttons, gradients, glows, accents).
- **Next step**: Apply the palette in `global.css` and then sweep components (navbar first, then hero, then rest) so the whole site reads as a single royal-green brand.
