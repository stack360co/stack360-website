import { HIRE_TECH_PAGES } from '@/constants/component/hire-tech-data';
import { CASE_STUDIES_DETAILS } from '@/constants/component/our-work-case-studies-data';
import { WHO_WE_ARE_HUB } from '@/constants/component/section-hubs-data';
import {
  CAPABILITY_PAGES,
  CAPABILITY_SERVICE_NAMES,
  type CapabilitySlug,
} from '@/constants/component/what-we-build-data';
import { SITE_EMAIL, SITE_NAME, SITE_URL } from '@/constants/site';

export const dynamic = 'force-static';

const SERVICE_ORDER: readonly CapabilitySlug[] = [
  'custom-software',
  'web-apps',
  'mobile-apps',
  'ai-solutions',
  'saas',
  'erp',
  'crm',
  'cloud',
  'devops',
  'automation',
  'marketplace-development',
  'legacy-modernization',
  'software-maintenance',
];

const COMPANY_PAGES = [
  { label: 'About Stack360', path: '/who-we-are' },
  { label: 'Our history', path: '/who-we-are/history' },
  { label: 'Our culture and founder', path: '/who-we-are/culture' },
  { label: 'How we work', path: '/who-we-are/how-we-work' },
  { label: 'Working with us as a software partner', path: '/work-with-us/software-partner' },
  { label: 'Client success stories', path: '/our-work/client-success-stories' },
  { label: 'Frequently asked questions', path: '/our-work/faqs' },
  { label: 'Contact', path: '/contact' },
] as const;

const link = (label: string, path: string, note?: string) =>
  `- [${label}](${SITE_URL}${path})${note ? `: ${note}` : ''}`;

/**
 * A plain-text guide to the site for AI assistants (llmstxt.org format). It is built from the
 * same data as the pages, so it changes when they do.
 */
export function GET() {
  const facts = WHO_WE_ARE_HUB.facts;
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${facts?.summary ?? ''}`,
    '',
    ...(facts?.items.map((item) => `- ${item.label}: ${item.value}`) ?? []),
    '- Code and intellectual property: owned by the client',
    `- Contact: ${SITE_EMAIL}, ${SITE_URL}/contact`,
    '',
    '## Services',
    '',
    ...SERVICE_ORDER.map((slug) =>
      link(
        CAPABILITY_SERVICE_NAMES[slug],
        `/what-we-build/${slug}`,
        CAPABILITY_PAGES[slug].hero.description
      )
    ),
    '',
    '## Hire developers',
    '',
    link('Hire developers', '/work-with-us/hire', 'Full-time remote engineers placed in your team'),
    ...HIRE_TECH_PAGES.map((page) =>
      link(`Hire ${page.linkLabel}`, `/work-with-us/hire/${page.slug}`, page.meta.description)
    ),
    '',
    '## Case studies',
    '',
    ...CASE_STUDIES_DETAILS.map((study) =>
      link(study.name, `/our-work/case-studies/${study.slug}`, study.tagline)
    ),
    '',
    '## Company',
    '',
    ...COMPANY_PAGES.map((page) => link(page.label, page.path)),
    '',
    '## Optional',
    '',
    link('Blog', '/blog'),
    link('Featured projects', '/our-work/featured-projects'),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
