import type { APIRoute } from 'astro';
import { getAllSlugs } from '../data/blog-posts';

const siteUrl = 'https://advertisingsystems.ai';

const blogUrls = getAllSlugs().map((slug) => ({ url: `/blog/${slug}`, priority: '0.7', changefreq: 'monthly' }));

const pages = [
  // Core — highest value pages
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/pricing', priority: '0.9', changefreq: 'weekly' },
  { url: '/book-demo', priority: '0.9', changefreq: 'monthly' },
  { url: '/ota-advertising', priority: '0.9', changefreq: 'weekly' },
  { url: '/signup', priority: '0.9', changefreq: 'monthly' },

  // Features
  { url: '/features', priority: '0.9', changefreq: 'monthly' },
  { url: '/features/campaign-management', priority: '0.8', changefreq: 'monthly' },
  { url: '/features/ai-optimization', priority: '0.8', changefreq: 'monthly' },
  { url: '/features/analytics', priority: '0.8', changefreq: 'monthly' },
  { url: '/features/automation', priority: '0.8', changefreq: 'monthly' },
  { url: '/features/budget-intelligence', priority: '0.8', changefreq: 'monthly' },

  // OTA sub-page
  { url: '/ota-advertising/implementation', priority: '0.7', changefreq: 'monthly' },

  // Competitor comparisons
  { url: '/vs/google-ads', priority: '0.8', changefreq: 'monthly' },
  { url: '/vs/meta-ads', priority: '0.8', changefreq: 'monthly' },
  { url: '/vs/manual', priority: '0.7', changefreq: 'monthly' },
  { url: '/vs/madgicx', priority: '0.7', changefreq: 'monthly' },
  { url: '/vs/optmyzr', priority: '0.7', changefreq: 'monthly' },

  // Content & discovery
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  ...blogUrls,
  { url: '/integrations', priority: '0.8', changefreq: 'monthly' },
  { url: '/case-studies', priority: '0.7', changefreq: 'monthly' },
  { url: '/pricing-intelligence', priority: '0.7', changefreq: 'monthly' },
  { url: '/faq', priority: '0.7', changefreq: 'monthly' },
  { url: '/knowledge-base', priority: '0.6', changefreq: 'monthly' },

  // Company
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.6', changefreq: 'monthly' },
  { url: '/careers', priority: '0.5', changefreq: 'monthly' },

  // Legal
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/cookies', priority: '0.3', changefreq: 'yearly' },
  { url: '/security', priority: '0.4', changefreq: 'yearly' },
];

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
