import type { APIRoute } from 'astro';

const siteUrl = 'https://www.advertisingsystems.ai';

// Bot tokens verified Aug 2026 against OpenAI/Anthropic/Perplexity docs.
// Search-citation bots gate whether we appear in AI answers (ChatGPT search,
// Claude search, Perplexity, Copilot). Training bots are allowed deliberately:
// parametric brand presence in future models is the point of this site.
// User-triggered fetchers (ChatGPT-User, Claude-User, Perplexity-User) ignore
// robots.txt by design — nothing to declare for them.
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

# AI search / citation crawlers (drive visibility in AI answers)
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: DuckAssistBot
Allow: /

# AI training crawlers (allowed: brand presence in future models)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: CCBot
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
