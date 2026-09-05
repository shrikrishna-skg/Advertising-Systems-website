# Advertising Systems SEO repair

Inspected September 4 Chicago time / September 5 UTC. This task covers advertisingsystems.ai, not the separate application.

## Search Console findings

Google reported 21 indexed and 56 excluded URLs: 7 alternate canonicals, 3 redirects, 2 noindex, 38 discovered-not-indexed, 6 crawled-not-indexed. These are historical known URLs, not a count against the current 58-page sitemap. All 38 discovered entries use the old www host. The noindex examples are both host variants of /ota-advertising/implementation, already redirected to /ota-advertising and removed from the sitemap in the previous repair. No 404 or soft 404 category was present. Manual actions and security issues both showed no issues detected. Core Web Vitals had insufficient field data.

Crawled-not-indexed examples: /signup/ on both hosts, /blog/meta-retargeting-for-hotels, /knowledge-base, /vs/google-ads, /blog/death-of-manual-bidding-2026. Current canonical destinations pass the live HTTP/HTML audit; indexing remains Google's decision.

## Performance baseline

| Scope and dates | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| Domain, June 3–September 2 | 58 | about 14,800 | 0.4% | 10.5 |
| Marketing page filter, June 3–September 2 | 58 | about 15,200 | 0.4% | 10.8 |
| Marketing page filter, August 6–September 2 | 13 | about 12,800 | 0.1% | 9.0 |

Marketing filter: `^https?://(www\.)?advertisingsystems\.ai/`. Keep both historic www and current apex; exclude application subdomains. Page-filtered aggregation differs from domain aggregation; do not directly subtract the totals. Filtered totals may be partial.

[Marketing-only report](https://search.google.com/u/5/search-console/performance/search-analytics?resource_id=sc-domain%3Aadvertisingsystems.ai&page=~%5Ehttps%3F%3A%2F%2F%28www%5C.%29%3Fadvertisingsystems%5C.ai%2F)

The query "expedia travelads" had 0 clicks / 11,138 impressions, average position 7.2. Of these, 11,025 occurred August 21 and 11,012 were from Turkey. The decision guide received 11,132 of the query's page impressions; the blog guide received 6. This concentration is an anomaly, not proof of sustained qualified demand or a proven bot cause. Compare US/target-market and daily data separately before judging CTR or attributing gains to this release.

## Repairs

- Submitted https://advertisingsystems.ai/sitemap.xml. Google returned Success, 58 discovered URLs, read September 4. The old www registration is retained during consolidation.
- Reused the existing canonical helper in the shared layout. Parent-organization and reference URLs now use the current apex hosts.
- Corrected Organization sameAs: other products are siblings, not the same organization. Kept this product's Multisystems profile as its identity link.
- Removed duplicate Home breadcrumbs from shared visible navigation and JSON-LD.
- Unknown blog, decision-guide and comparison slugs now render a real 404 at the requested URL, avoiding a temporary redirect to /404. Existing /report and implementation redirects stay permanent.
- Clarified TravelAds definition, CPC/budget controls, title and description; distinguished attributed bookings from incremental demand. Updated only that guide's sitemap modification date.
- Added npm run check:seo to CI: all sitemap pages, canonical URLs, indexability, H1s, JSON-LD, breadcrumbs, missing routes and existing redirects.

## Validation and follow-up

Local build and Astro check passed with 0 errors and 0 warnings (11 hints). Input/mail checks passed. All 58 routes passed the SEO check. Desktop 1440px and mobile 390px captures show readable copy, one Home breadcrumb and no horizontal overflow. No design replacement was made.

Confirm deployment and CI success, then rerun `npm run check:seo -- https://advertisingsystems.ai` and use Google's live URL test/indexing request for priority pages. Google-selected apex canonicals and actual indexing remain pending until recrawl.

September 12: review canonical selection, sitemap processing and priority-page indexing. October 3 (or after complete data arrives): compare 28-day marketing performance, with the August 21 anomaly identified separately. These future checks are documented, not automatically scheduled.

Sources: [Expedia TravelAds](https://partner.expediagroup.com/en-us/solutions/advertise-with-us/sponsored-listings), [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Schema.org sameAs](https://schema.org/sameAs).

Optional design documentation follow-up: `$impeccable init`; a broader visual polish pass is separate from this SEO repair.
