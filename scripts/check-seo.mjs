import assert from 'node:assert/strict';
import { canonicalUrl } from '../src/data/seo.ts';

const base = process.argv[2] || 'http://127.0.0.1:4327';
const get = (path) => fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(20000) });
const sitemap = await get('/sitemap.xml');
assert.equal(sitemap.status, 200);
const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(urls.length > 0, 'Sitemap must contain URLs');
assert.equal(new Set(urls).size, urls.length, 'Sitemap URLs must be unique');
for (let offset = 0; offset < urls.length; offset += 6) {
  await Promise.all(urls.slice(offset, offset + 6).map(async (url) => {
    const expected = canonicalUrl(new URL(url).pathname);
    assert.equal(url, expected, `Non-canonical sitemap URL: ${url}`);
    const response = await get(new URL(url).pathname);
    assert.equal(response.status, 200, url);
    const html = await response.text();
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `H1: ${url}`);
    const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
    assert.equal(canonical.length, 1, `Canonical count: ${url}`);
    assert.ok(canonical[0][0].includes(`href="${expected}"`), `Canonical destination: ${url}`);
    assert.ok(!/<meta\b[^>]*name="(?:robots|googlebot)"[^>]*content="[^"]*noindex/i.test(html), `Noindex: ${url}`);
    const breadcrumb = html.match(/<nav\b[^>]*aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    if (breadcrumb) assert.equal([...breadcrumb.matchAll(/itemprop="name">Home</g)].length, 1, `Visible Home breadcrumb: ${url}`);
    for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      const schema = JSON.parse(match[1]);
      if (schema['@type'] === 'Organization' && schema.name === 'Advertising Systems') {
        assert.ok((schema.sameAs || []).every((link) => link === 'https://multisystems.ai/products/advertising-systems'), 'Sibling products must not be sameAs');
      }
      if (schema['@type'] === 'BreadcrumbList') {
        const items = schema.itemListElement.map((item) => item.item);
        assert.equal(new Set(items).size, items.length, `Duplicate breadcrumb: ${url}`);
      }
    }
  }));
}
for (const path of ['/missing-seo-check', '/blog/missing-seo-check', '/decision-guides/missing-seo-check', '/vs/missing-seo-check']) {
  const response = await get(path);
  assert.equal(response.status, 404, `Missing route must return direct 404: ${path}`);
  assert.equal(response.headers.get('location'), null, path);
}
for (const [path, target] of [['/report', '/expedia-report'], ['/ota-advertising/implementation', '/ota-advertising']]) {
  const response = await get(path);
  assert.ok([301, 308].includes(response.status), `Legacy redirect: ${path}`);
  assert.equal(new URL(response.headers.get('location'), base).pathname, target);
}
console.log(`SEO check passed: ${urls.length} canonical, indexable pages; valid JSON-LD; missing-route 404s; legacy redirects.`);
