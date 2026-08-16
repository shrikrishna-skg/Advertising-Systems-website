# SEO & Indexing Guide — Advertising Systems

This document describes how the site is configured for search engine indexing and SEO so Google and other engines can discover and index pages correctly.

## Indexing criteria (what we follow)

- **Every indexable page** uses `robots: index, follow` and allows `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1`.
- **404 page** uses `noindex, follow` so error pages are not indexed.
- **Canonical URLs** are absolute (e.g. `https://www.advertisingsystems.ai/about`), no trailing slash, and match the sitemap.
- **Sitemap** lists all indexable URLs (404 is excluded) at `https://www.advertisingsystems.ai/sitemap.xml`.
- **robots.txt** allows crawlers and points to the sitemap.

## Per-page SEO (Layout + pages)

### Layout (`src/layouts/Layout.astro`)

- **Title** — Unique per page; default provided by Layout.
- **Meta description** — Unique per page; ~150–160 chars recommended.
- **Canonical** — Built from `siteUrl` + normalized pathname (no trailing slash).
- **Robots** — `index, follow` by default; set `noindex={true}` for 404 (or other non-indexable pages).
- **Googlebot / Bingbot** — Same as `robots` for consistency.
- **theme-color** — Set for mobile browsers.
- **Open Graph** — `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`, `og:site_name`, `og:locale`.
- **Twitter Card** — `summary_large_image` with title, description, image.
- **JSON-LD** — Organization (with family `sameAs` graph), WebSite (`name`/`alternateName` — this is what Google reads for the site name shown in results), SoftwareApplication (prices mirror `src/data/pricing.ts`; never add ratings we don't collect), WebPage (references `#website`/`#organization` by `@id`), BreadcrumbList (when breadcrumbs passed), plus optional page `jsonLd`.
- **FAQPage JSON-LD is page-scoped, not global** — emitted by `FAQSection.astro`/`HomeFAQ.astro` next to the questions actually rendered (and via `jsonLd` on `/faq`). Never re-add a site-wide FAQ schema: markup must match visible content. Note: Google retired FAQ rich results (May 2026); we keep the markup for entity/AI clarity, not SERP features.

### Pages

- Each page passes **title** and **description** to Layout; 404 also passes **noindex={true}**.
- Breadcrumbs are passed where applicable for BreadcrumbList and WebPage breadcrumb.
- No indexable page should omit title or description.

## Sitemap (`src/pages/sitemap.xml.ts`)

- Contains all public routes; **404 is not listed**.
- Each entry has `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`.
- Referenced in Layout via `<link rel="sitemap" href="/sitemap.xml">` and in `robots.txt`.

## robots.txt (`src/pages/robots.txt.ts`)

- `User-agent: *` → `Allow: /`
- Explicit `Allow: /` for search engines, AI **search/citation** bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot, DuckAssistBot — these gate visibility in ChatGPT/Claude/Perplexity answers) and AI **training** bots (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, meta-externalagent, Amazonbot, CCBot — allowed deliberately for brand presence in future models).
- `Sitemap: https://www.advertisingsystems.ai/sitemap.xml`
- Served with `Cache-Control: public, max-age=86400`.
- **Never add a `robots.txt` to `public/`** — a static file silently shadows this dynamic route on Vercel (that bug shipped once already).

## IndexNow (`scripts/indexnow-ping.mjs`)

- `npm run indexnow` after a production deploy submits every sitemap URL to Bing within hours. Bing's index feeds Microsoft Copilot and ChatGPT search.
- Ownership key is served from `public/a74b2762c4cb2743dac8142451e86098.txt`. Google ignores IndexNow — it uses the sitemap.

## Sitelinks (the "full menu under our result" goal)

Sitelinks are granted algorithmically by Google — no markup forces them (SiteNavigationElement schema is confirmed unused; the sitelinks searchbox was retired Nov 2024). What we control, per Google's official guidance: compact informative titles, logical crawlable structure with the important pages linked from home, concise anchor text, no repetitive content. Plus: hold the #1 spot for the brand query, keep GSC + Bing WMT verified with the sitemap submitted. Expect the full 4–6 link block only after months of consistent brand-query dominance — "Advertising Systems" being a generic phrase makes consistent branding (always "Advertising Systems by Multisystems") matter more.

## Central SEO helpers (`src/data/seo.ts`)

- `siteUrl`, `defaultTitle`, `defaultDescription` for reuse.
- `seoLimits.titleMaxChars` (70) and `descriptionMaxChars` (160).
- `canonicalUrl(path)` to build canonical URLs.

## Checklist for new pages

1. Pass **title** and **description** to Layout (unique, within length guidelines).
2. Pass **breadcrumbs** if the page is not the homepage (for BreadcrumbList and WebPage).
3. Add the URL to **sitemap** in `src/pages/sitemap.xml.ts` with appropriate priority and changefreq.
4. Use a single **H1** per page and a clear heading hierarchy (H1 → H2 → H3).
5. Use semantic HTML: `<main>`, `<section>`, `<article>`, `<nav>` where appropriate.

## Optional: page-specific OG image

To override the default OG image for a page, pass `ogImage="/path/to/image.png"` to Layout. Image should be 1200×630 for best results.

## Verifying indexing

- **Google**: [Search Console](https://search.google.com/search-console) — submit sitemap, check Coverage and URL Inspection.
- **Bing**: [Bing Webmaster Tools](https://www.bing.com/webmasters) — submit sitemap.
- Validate structured data: [Google Rich Results Test](https://search.google.com/test/rich-results) or [Schema Markup Validator](https://validator.schema.org/).
