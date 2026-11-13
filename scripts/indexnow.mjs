/**
 * IndexNow: after each production build on AWS Amplify, tell Bing (and the other IndexNow
 * engines) which pages changed, so they are recrawled within hours instead of weeks.
 *
 * "Changed" means new, removed, or with a new <lastmod> in the sitemap. Blog posts and service
 * pages take <lastmod> from their `updated` field, so bump it when a page changes.
 *
 * Runs in amplify.yml's postBuild, before the new build goes live: the live sitemap is the
 * "before", and the sitemap this build just wrote is the "after". Bing crawls on its own schedule,
 * well after the deploy finishes. The key file lives at /public/<KEY>.txt.
 * This script never fails a build.
 */
import { readFile } from 'node:fs/promises';

const SITE = 'https://stack360.co';
const KEY = '40d3470e3b0b1ec1963f74f93aa97871';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BUILT_SITEMAP = '.next/server/app/sitemap.xml.body';

function parseSitemap(xml) {
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

async function main() {
  // Amplify sets AWS_BRANCH. Only the production branch is the live site.
  if (process.env.AWS_BRANCH && process.env.AWS_BRANCH !== 'main') {
    console.log(`IndexNow: branch ${process.env.AWS_BRANCH} is not production, nothing sent`);
    return;
  }
  const res = await fetch(`${SITE}/sitemap.xml`, { headers: { 'cache-control': 'no-cache' } });
  if (!res.ok) {
    console.log(`IndexNow: the live sitemap returned ${res.status}, skipping this build`);
    return;
  }
  const before = parseSitemap(await res.text());
  const after = parseSitemap(await readFile(BUILT_SITEMAP, 'utf8'));
  const urlList = changedUrls(before, after).slice(0, 10000);
  if (urlList.length === 0) {
    console.log('IndexNow: no pages changed');
    return;
  }
  const sent = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow: sent ${urlList.length} changed URL(s), response ${sent.status}`);
  console.log(urlList.join('\n'));
}

main().catch((error) => {
  console.log(`IndexNow: skipped (${error.message})`);
});
