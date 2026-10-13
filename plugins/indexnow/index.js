/**
 * IndexNow: after each production deploy, tell Bing (and the other IndexNow engines)
 * which pages changed, so they are recrawled within hours instead of weeks.
 *
 * "Changed" means new, removed, or with a new <lastmod> in the sitemap. Blog posts and
 * service pages take <lastmod> from their `updated` field, so bump it when a page changes.
 *
 * The key file lives at /public/<KEY>.txt. This plugin never fails a build.
 */

const SITE = 'https://stack360.co';
const KEY = '40d3470e3b0b1ec1963f74f93aa97871';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

let liveBeforeDeploy = null;

async function readSitemap(origin) {
  const res = await fetch(`${origin}/sitemap.xml`, { headers: { 'cache-control': 'no-cache' } });
  if (!res.ok) {
    throw new Error(`${origin}/sitemap.xml returned ${res.status}`);
  }
  const xml = await res.text();
  const pages = new Map();
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? '';
    if (loc?.startsWith(SITE)) {
      pages.set(loc, lastmod);
    }
  }
  return pages;
}

function changedUrls(before, after) {
  const urls = [];
  for (const [loc, lastmod] of after) {
    if (before.get(loc) !== lastmod) {
      urls.push(loc);
    }
  }
  for (const loc of before.keys()) {
    if (!after.has(loc)) {
      urls.push(loc);
    }
  }
  return urls;
}

const isProduction = () => process.env.CONTEXT === 'production';

module.exports = {
  async onPreBuild() {
    if (!isProduction()) {
      return;
    }
    try {
      liveBeforeDeploy = await readSitemap(SITE);
    } catch (error) {
      console.log(`IndexNow: could not read the live sitemap, skipping this deploy (${error.message})`);
    }
  },

  async onSuccess({ utils }) {
    if (!isProduction()) {
      console.log('IndexNow: not a production deploy, nothing sent');
      return;
    }
    if (!liveBeforeDeploy) {
      return;
    }
    try {
      // The deploy permalink serves exactly this build, even before CDN caches refresh.
      const deployed = await readSitemap(process.env.DEPLOY_URL || SITE);
      const urlList = changedUrls(liveBeforeDeploy, deployed).slice(0, 10000);
      if (urlList.length === 0) {
        console.log('IndexNow: no pages changed');
        return;
      }
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: new URL(SITE).host,
          key: KEY,
          keyLocation: `${SITE}/${KEY}.txt`,
          urlList,
        }),
      });
      const summary = `IndexNow: sent ${urlList.length} changed URL(s), response ${res.status}`;
      console.log(`${summary}\n${urlList.join('\n')}`);
      utils.status.show({ title: 'IndexNow', summary });
    } catch (error) {
      console.log(`IndexNow: skipped (${error.message})`);
    }
  },
};
