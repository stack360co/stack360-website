import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_OFFICES,
  SITE_PHONE_E164,
  SITE_SOCIAL,
  SITE_URL,
} from '@/constants/site';

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/stack360-icon.png`,
    description: SITE_DESCRIPTION,
    email: SITE_EMAIL,
    telephone: SITE_PHONE_E164,
    sameAs: [
      SITE_SOCIAL.linkedin,
      SITE_SOCIAL.github,
      SITE_SOCIAL.x,
      SITE_SOCIAL.instagram,
      SITE_SOCIAL.facebook,
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
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
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
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/stack360-icon.png` },
    },
  };
}
