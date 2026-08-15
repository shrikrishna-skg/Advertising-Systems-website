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
- **JSON-LD** — Organization, SoftwareApplication, WebPage (name, description, url, isPartOf), FAQPage, BreadcrumbList (when breadcrumbs passed), plus optional page `jsonLd`.

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
- Explicit `Allow: /` for Googlebot, Bingbot, Slurp, and optional LLM bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
- `Sitemap: https://www.advertisingsystems.ai/sitemap.xml`
- Served with `Cache-Control: public, max-age=86400`.

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
