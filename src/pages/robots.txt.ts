import type { APIRoute } from 'astro';

const siteUrl = 'https://www.advertisingsystems.ai';

export const GET: APIRoute = () => {
  const robotsTxt = `# Advertising Systems – robots.txt
# All indexable pages use meta robots "index, follow". 404 uses "noindex, follow".

User-agent: *
Allow: /

# Search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# LLM / AI crawlers
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

# Sitemap (required for discovery)
Sitemap: ${siteUrl}/sitemap.xml

# Machine-readable summary for crawlers
# ${siteUrl}/llms.txt
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
