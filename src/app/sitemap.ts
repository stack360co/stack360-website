import type { MetadataRoute } from 'next';
import { getBlogPost, getBlogSlugs } from '@/constants/component/blog-posts-data';
import { getHireTechSlugs } from '@/constants/component/hire-tech-data';
import { getCaseStudySlugs } from '@/constants/component/our-work-case-studies-data';
import { CAPABILITY_PAGES, type CapabilitySlug } from '@/constants/component/what-we-build-data';
import { SITE_URL } from '@/constants/site';

/** Stable lastModified — avoids false “freshness” on every deploy. */
const LAST_MODIFIED = new Date('2026-08-10');

const ROUTES = [
  '/',
  '/contact',
  '/what-we-build',
  '/what-we-build/erp',
  '/what-we-build/crm',
  '/what-we-build/ai-solutions',
  '/what-we-build/saas',
  '/what-we-build/custom-software',
  '/what-we-build/mobile-apps',
  '/what-we-build/web-apps',
  '/what-we-build/cloud',
  '/what-we-build/devops',
  '/what-we-build/automation',
  '/what-we-build/legacy-modernization',
  '/what-we-build/software-maintenance',
  '/what-we-build/marketplace-development',
  '/what-we-build/qa-testing',
  '/what-we-build/digital-marketing',
  '/who-we-help',
  '/who-we-help/industries',
  '/who-we-help/startups',
  '/who-we-help/smes',
  '/who-we-help/enterprises',
  '/our-work',
  '/our-work/case-studies',
  ...getCaseStudySlugs().map((slug) => `/our-work/case-studies/${slug}`),
  '/our-work/featured-projects',
  '/our-work/project-timelines',
  '/our-work/client-success-stories',
  '/blog',
  ...getBlogSlugs().map((slug) => `/blog/${slug}`),
  '/our-work/faqs',
  '/who-we-are',
  '/who-we-are/history',
  '/who-we-are/culture',
  '/who-we-are/how-we-work',
  '/work-with-us',
  '/work-with-us/software-partner',
  '/work-with-us/hire',
  ...getHireTechSlugs().map((slug) => `/work-with-us/hire/${slug}`),
  '/work-with-us/hire/dedicated-team',
  '/work-with-us/careers',
  '/privacy',
  '/terms',
] as readonly string[];

/** Service pages and posts carry the date their content last changed; everything else uses the site date. */
function pageLastModified(path: string): Date {
  if (path.startsWith('/blog/')) {
    const post = getBlogPost(path.replace('/blog/', ''));
    if (post) {
      return new Date(post.updated ?? post.date);
    }
  }
  const slug = path.replace('/what-we-build/', '') as CapabilitySlug;
  const updated = path.startsWith('/what-we-build/') ? CAPABILITY_PAGES[slug]?.updated : undefined;
  return updated ? new Date(updated) : LAST_MODIFIED;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: pageLastModified(path),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.split('/').length <= 2 ? 0.8 : 0.6,
  }));
}
