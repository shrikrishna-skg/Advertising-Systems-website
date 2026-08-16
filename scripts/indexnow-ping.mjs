/**
 * IndexNow ping — tells Bing (and every IndexNow-participating engine) which
 * URLs changed, within hours instead of crawl-cycle days. Bing's index feeds
 * Microsoft Copilot and ChatGPT search, so this is also our fastest path into
 * AI answers. Google does not support IndexNow; it discovers via sitemap.
 *
 * Run after a production deploy:  npm run indexnow
 * Key file served at /<key>.txt from public/ (IndexNow ownership proof).
 */
const HOST = 'www.advertisingsystems.ai';
const KEY = 'a74b2762c4cb2743dac8142451e86098';

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) throw new Error('No URLs found in sitemap');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});

// 200/202 = accepted. 4xx = key not yet served or bad payload — fix before retrying.
console.log(`IndexNow: submitted ${urls.length} URLs — HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exit(1);
