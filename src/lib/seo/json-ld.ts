import type { Metadata } from 'next';
import { CULTURE_FOUNDER } from '@/constants/component/who-we-are-culture-data';
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_OFFICES,
  SITE_PHONE_E164,
  SITE_PROFILES,
  SITE_SOCIAL,
  SITE_URL,
} from '@/constants/site';

type JsonLd = Record<string, unknown>;

/** One stable identifier, so every page's schema points at the same company record. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
/** Azmat Rana's one record: the company's founder and the reviewer on the service pages. */
export const FOUNDER_ID = `${SITE_URL}/who-we-are/culture#azmat-rana`;

const LANGUAGE = 'en-US';

function absoluteUrl(path: string): string {
  if (path.startsWith('http')) {
    return path;
  }
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: 'Stack 360',
    url: SITE_URL,
    logo: `${SITE_URL}/stack360-icon.png`,
    description: SITE_DESCRIPTION,
    email: SITE_EMAIL,
    telephone: SITE_PHONE_E164,
    founder: { '@id': FOUNDER_ID },
    foundingDate: '2019',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 49 },
    knowsAbout: [
      'Custom software development',
      'Web application development',
      'Mobile app development',
      'AI solutions',
      'SaaS development',
      'ERP and CRM development',
      'Cloud and DevOps',
      'Staff augmentation',
    ],
    sameAs: [
      SITE_SOCIAL.linkedin,
      SITE_SOCIAL.github,
      SITE_SOCIAL.instagram,
      SITE_SOCIAL.facebook,
      ...Object.values(SITE_PROFILES),
    ],
    address: SITE_OFFICES.map((office) => ({
      '@type': 'PostalAddress',
      streetAddress: office.streetAddress,
      addressLocality: office.addressLocality,
      addressRegion: office.addressRegion,
      ...('postalCode' in office ? { postalCode: office.postalCode } : {}),
      addressCountry: office.addressCountry,
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_PHONE_E164,
        email: SITE_EMAIL,
        contactType: 'sales',
        availableLanguage: ['English'],
      },
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: LANGUAGE,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function founderJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: CULTURE_FOUNDER.name,
    jobTitle: CULTURE_FOUNDER.role,
    description: `${CULTURE_FOUNDER.role} of ${SITE_NAME}, the software development agency he founded in 2019.`,
    image: absoluteUrl(CULTURE_FOUNDER.image.src),
    url: absoluteUrl('/who-we-are/culture'),
    worksFor: { '@id': ORGANIZATION_ID },
  };
}

export function faqPageJsonLd(
  items: readonly { question: string; answer: string }[],
  pageUrl: string
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: pageUrl.startsWith('http') ? pageUrl : `${SITE_URL}${pageUrl}`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path === '/' ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author?: { name: string; role: string; url?: string };
}): JsonLd {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    articleSection: post.category,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: `${SITE_URL}/opengraph-image`,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
          // An on-site profile anchor doubles as the Person @id (e.g. the founder node).
          ...(post.author.url?.startsWith('/')
            ? { '@id': `${SITE_URL}${post.author.url}`, url: `${SITE_URL}${post.author.url}` }
            : post.author.url
              ? { url: post.author.url }
              : {}),
          worksFor: { '@id': ORGANIZATION_ID },
        }
      : { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/stack360-icon.png` },
    },
  };
}

/**
 * Short breadcrumb labels for the fixed pages, so the trail reads "Who We Are > Our History"
 * however the page titles are worded for search.
 */
const PAGE_LABELS: Readonly<Record<string, string>> = {
  '/contact': 'Contact',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Use',
  '/what-we-build': 'What We Build',
  '/who-we-help': 'Who We Help',
  '/who-we-help/industries': 'Industries',
  '/who-we-help/startups': 'Startups',
  '/who-we-help/smes': 'SMEs',
  '/who-we-help/enterprises': 'Enterprises',
  '/our-work': 'Our Work',
  '/our-work/case-studies': 'Case Studies',
  '/our-work/featured-projects': 'Featured Projects',
  '/our-work/client-success-stories': 'Client Success Stories',
  '/our-work/faqs': 'FAQs',
  '/who-we-are': 'Who We Are',
  '/who-we-are/history': 'Our History',
  '/who-we-are/culture': 'Our Culture',
  '/who-we-are/how-we-work': 'How We Work',
  '/work-with-us': 'Work With Us',
  '/work-with-us/software-partner': 'Software Partner',
  '/work-with-us/hire': 'Hire Talent',
  '/work-with-us/careers': 'Careers',
};

function breadcrumbTrail(path: string, label: string) {
  const parts = path.split('/').filter(Boolean);
  const trail = [{ name: 'Home', path: '/' }];
  parts.forEach((_, index) => {
    const prefix = `/${parts.slice(0, index + 1).join('/')}`;
    const name = index === parts.length - 1 ? label : PAGE_LABELS[prefix];
    if (name) {
      trail.push({ name, path: prefix });
    }
  });
  return trail;
}

export interface PageSchemaInput {
  path: string;
  name: string;
  description?: string;
  type?: 'WebPage' | 'AboutPage' | 'CollectionPage' | 'ContactPage';
  /** This page's label in the breadcrumb trail. Defaults to its PAGE_LABELS entry, then the name. */
  crumb?: string;
  /** Questions shown on the page. Their presence makes the page an FAQPage. */
  faqs?: readonly { question: string; answer: string }[];
  /** The `@id` of what the page is about: a Service, the Organization. */
  about?: string;
  /** True on pages that show the "Reviewed by Azmat Rana" byline. */
  reviewedByFounder?: boolean;
  /** When the page content last changed (YYYY-MM-DD). */
  dateModified?: string;
}

/**
 * The page itself and its breadcrumb trail, linked to the site-wide WebSite, Organization
 * and founder records by `@id`.
 */
export function pageJsonLd(input: PageSchemaInput): JsonLd[] {
  const url = absoluteUrl(input.path);
  const crumbs =
    input.path === '/'
      ? []
      : breadcrumbTrail(input.path, input.crumb ?? PAGE_LABELS[input.path] ?? input.name);

  const page: JsonLd = {
    '@context': 'https://schema.org',
    '@type': input.faqs ? 'FAQPage' : (input.type ?? 'WebPage'),
    '@id': `${url}#webpage`,
    url,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    inLanguage: LANGUAGE,
    isPartOf: { '@id': WEBSITE_ID },
    ...(crumbs.length > 0 ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(input.about ? { about: { '@id': input.about } } : {}),
    ...(input.reviewedByFounder ? { reviewedBy: { '@id': FOUNDER_ID } } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.faqs
      ? {
          mainEntity: input.faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : {}),
  };

  if (crumbs.length === 0) {
    return [page];
  }
  return [page, { ...breadcrumbJsonLd(crumbs), '@id': `${url}#breadcrumb` }];
}

/** `pageJsonLd` for a page whose name, description and path already live in `seo`. */
export function pageJsonLdFromMeta(
  meta: Metadata,
  options: Omit<PageSchemaInput, 'path' | 'name' | 'description'> = {}
): JsonLd[] {
  const { title, description, alternates } = meta;
  const name =
    typeof title === 'string' ? title : title && 'absolute' in title ? title.absolute : SITE_NAME;
  const canonical = alternates?.canonical;
  return pageJsonLd({
    ...options,
    path: typeof canonical === 'string' ? canonical : '/',
    name,
    ...(description ? { description } : {}),
  });
}

export function serviceJsonLd(service: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
}): JsonLd {
  const url = absoluteUrl(service.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url,
    provider: { '@id': ORGANIZATION_ID },
  };
}

export function caseStudyJsonLd(study: {
  path: string;
  headline: string;
  description: string;
  image: string;
}): JsonLd {
  const url = absoluteUrl(study.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: study.headline,
    description: study.description,
    image: absoluteUrl(study.image),
    articleSection: 'Case studies',
    inLanguage: LANGUAGE,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
  };
}
