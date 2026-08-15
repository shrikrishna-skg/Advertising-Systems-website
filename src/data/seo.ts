/**
 * Central SEO defaults and guidelines for Advertising Systems.
 * Use these in Layout and pages for consistent indexing and rich results.
 *
 * Search engine criteria we follow:
 * - Unique <title> per page (50–60 chars ideal; max ~70)
 * - Unique meta description per page (150–160 chars ideal; max ~320)
 * - Canonical URL absolute, no trailing slash (matches sitemap)
 * - robots: index, follow on all indexable pages; noindex on 404
 * - Open Graph and Twitter Card meta on every page
 * - JSON-LD: Organization, SoftwareApplication, WebPage, FAQPage, BreadcrumbList where applicable
 * - One logical H1 per page; clear heading hierarchy (H1 → H2 → H3)
 * - Semantic HTML: <main>, <article>, <section>, <nav>
 */

export const siteUrl = 'https://www.advertisingsystems.ai';

export const defaultTitle = 'Advertising Systems — AI-Powered Advertising Management | by Multisystems';

export const defaultDescription =
  'Stop wasting ad spend. AI-powered campaign management, optimization, and analytics across Google Ads, Meta Ads, and OTAs — all in one dashboard.';

/** Recommended max lengths for meta (Google typically truncates beyond these). */
export const seoLimits = {
  titleMaxChars: 70,
  descriptionMaxChars: 160,
} as const;

/**
 * Build canonical URL for a path. Ensures no double slashes and no trailing slash (except for root).
 */
export function canonicalUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  const normalized = p.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  return `${siteUrl}${normalized}`;
}
