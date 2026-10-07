import type { Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/constants/site';

type PageMetaInput = {
  /** Segment title (template appends `| Stack360`) unless `absoluteTitle` set. */
  title?: string;
  absoluteTitle?: string;
  description: string;
  /** Path for canonical + OG url, e.g. `/contact` or `/`. */
  path: string;
  keywords?: string | string[];
};

/**
 * Every page sets its own openGraph, which replaces the root's wholesale, so the generated
 * share images (app/opengraph-image.tsx, app/twitter-image.tsx) are referenced here explicitly.
 */
const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} | ${SITE_TAGLINE}`,
};
const TWITTER_IMAGE = '/twitter-image';

/**
 * Build page Metadata with Open Graph, Twitter, and canonical.
 * Nested OG/Twitter do not inherit page title/description — set explicitly.
 */
export function pageMeta({
  title,
  absoluteTitle,
  description,
  path,
  keywords,
}: PageMetaInput): Metadata {
  const canonical = path === '/' ? '/' : path;
  const shareTitle = absoluteTitle ?? (title ? `${title} | ${SITE_NAME}` : SITE_NAME);

  return {
    ...(absoluteTitle ? { title: { absolute: absoluteTitle } } : title ? { title } : {}),
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: canonical,
      title: shareTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [TWITTER_IMAGE],
    },
  };
}

/**
 * Central SEO registry for the App Router.
 * Page files: `export const metadata = seo.<key>`
 * Layouts: `export const metadata = seo.root` / `seo.pages`
 */
export const seo = {
  root: {
    title: {
      default: `${SITE_NAME} | ${SITE_TAGLINE}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [{ url: '/apple-icon.png' }],
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      title: `${SITE_NAME} | ${SITE_TAGLINE}`,
      description: SITE_DESCRIPTION,
      url: '/',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} | ${SITE_TAGLINE}`,
      description: SITE_DESCRIPTION,
    },
  },

  pages: {
    description:
      'Architecting complex software ecosystems for enterprise scale — ERP, CRM, AI, SaaS, and the platform layer underneath.',
    keywords: 'custom software architecture, software development, ERP, CRM, AI solutions, SaaS',
  },

  home: pageMeta({
    absoluteTitle: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      'Stack360 designs and builds complex software ecosystems — ERP, CRM, AI, SaaS, mobile, web, cloud, and DevOps — for startups, SMEs, and enterprises.',
    path: '/',
  }),

  contact: pageMeta({
    title: 'Contact',
    description:
      'Talk to Stack360 about your next build — partnerships desk for project inquiries and talent requests.',
    path: '/contact',
  }),

  terms: pageMeta({
    title: 'Terms of Use',
    description:
      'Terms governing use of the Stack360 website and engagement with our software architecture services.',
    path: '/terms',
  }),

  privacy: pageMeta({
    title: 'Privacy Policy',
    description:
      'How Stack360 collects and uses contact and inquiry information when you use our website or request talent or project support.',
    path: '/privacy',
  }),

  whatWeBuild: pageMeta({
    title: 'What We Build',
    description:
      'ERP, CRM, AI, SaaS, mobile, web, cloud, DevOps, and automation — systems Stack360 architects end to end.',
    path: '/what-we-build',
  }),

  whatWeBuildErp: pageMeta({
    absoluteTitle: 'Enterprise Software Development Company | Stack360',
    description:
      'Build scalable enterprise software with Stack360. We develop custom enterprise applications that connect systems, streamline operations, and drive growth.',
    path: '/what-we-build/erp',
    keywords: [
      'Enterprise Software Development',
      'Enterprise software development services',
      'Enterprise software development company',
      'Enterprise application development',
      'Enterprise application development services',
      'Custom enterprise software development',
      'Enterprise app development',
      'Enterprise mobile app development',
      'Custom enterprise application development',
    ],
  }),

  whatWeBuildCrm: pageMeta({
    absoluteTitle: 'CRM Development Company | Custom CRM Solutions',
    description:
      'Build custom CRM software with Stack360. We develop scalable CRM solutions that connect customer data, automate workflows, and improve business growth.',
    path: '/what-we-build/crm',
    keywords: [
      'CRM Development Company',
      'CRM development services',
      'CRM software development company',
      'Custom CRM development',
      'CRM development',
      'CRM software development',
      'Custom CRM development services',
      'Custom CRM software development',
      'CRM software development services',
      'Custom CRM software development company',
      'Custom CRM development software solutions',
    ],
  }),

  whatWeBuildAiSolutions: pageMeta({
    absoluteTitle: 'AI Development Services | AI Solutions Company',
    description:
      'Build intelligent AI solutions with Stack360. We provide AI consulting and development services for custom applications, automation, agents, chatbots, and more.',
    path: '/what-we-build/ai-solutions',
    keywords: [
      'AI Development Services',
      'AI consulting services',
      'AI software development services',
      'Generative AI development services',
      'AI chatbot development services',
      'Custom AI solutions',
      'AI application development services',
      'AI security solutions',
      'AI compliance solutions',
      'Hire AI developers',
      'Generative AI consulting services',
      'Agentic AI solutions',
      'AI chatbot solutions',
      'AI development company',
      'AI agent development company',
      'AI agent development services',
      'AI/ML development company',
      'AI/ML development services',
    ],
  }),

  whatWeBuildSaas: pageMeta({
    absoluteTitle: 'SaaS Development Services & Company | Stack360',
    description:
      'Build scalable SaaS products with Stack360. Our SaaS development services cover custom platforms, MVPs, integrations, automation, and AI-powered solutions.',
    path: '/what-we-build/saas',
    keywords: [
      'SaaS Development Services',
      'SaaS development company',
      'SaaS application development services',
      'SaaS development',
      'SaaS product development',
      'SaaS application development',
      'SaaS application development company',
      'SaaS product development services',
      'SaaS software development services',
      'Custom SaaS development',
      'SaaS app development services',
      'SaaS product development company',
      'SaaS app development',
      'SaaS app development company',
      'SaaS development agency',
      'SaaS software development company',
      'Hire SaaS developers',
      'SaaS based product development company',
      'AI SaaS development company',
      'Custom SaaS development services',
      'Hire SaaS developer',
      'Outsourcing SaaS development',
      'SaaS application development solutions',
      'SaaS MVP development',
      'SaaS platform development',
    ],
  }),

  whatWeBuildCustomSoftware: pageMeta({
    absoluteTitle: 'Custom Software Development Company | Stack360',
    description:
      'Build custom software with Stack360. We develop scalable applications tailored to your workflows, users, integrations, and business goals.',
    path: '/what-we-build/custom-software',
    keywords: [
      'Custom Software Development',
      'Custom software development company',
      'Custom software development services',
      'Custom software application development',
      'Custom enterprise software development',
      'Custom enterprise software development services',
      'Custom software development company in USA',
      'Custom software developer',
      'Custom healthcare software development',
      'Custom healthcare software development company',
      'Custom healthcare software development services',
    ],
  }),

  whatWeBuildMobileApps: pageMeta({
    absoluteTitle: 'Custom Mobile App Development Company | Stack360',
    description:
      'Build custom mobile apps with Stack360. We develop scalable Android, iOS, and cross-platform applications tailored to your users and business goals.',
    path: '/what-we-build/mobile-apps',
    keywords: [
      'Custom Mobile App Development Company',
      'custom mobile app development',
      'custom mobile app development services',
      'hire mobile app developers',
      'mobile app development company in USA',
      'mobile app development firm',
      'enterprise mobile app development',
      'cross-platform mobile app development',
      'cross-platform mobile app development services',
      'Flutter mobile app development services',
      'Android mobile app development company',
      'mobile app development consulting',
      'ecommerce mobile app development',
      'fintech mobile app development services',
      'healthcare mobile app development services',
      'React Native mobile app development company',
      'offshore mobile app development',
      'outsource mobile app development',
      'hire dedicated mobile app developers',
    ],
  }),

  whatWeBuildWebApps: pageMeta({
    absoluteTitle: 'Web App Development Company | Stack360',
    description:
      'Stack360 is a web app development company building scalable web applications, custom websites, ecommerce platforms, and integrated digital experiences.',
    path: '/what-we-build/web-apps',
    keywords: [
      'Web App Development Company',
      'Website development services',
      'Website development',
      'Website development company',
      'Ecommerce website development',
      'Website development agency',
      'Custom website development',
      'Website design and development',
    ],
  }),

  whatWeBuildCloud: pageMeta({
    absoluteTitle: 'Cloud Migration Services & Cloud Solutions | Stack360',
    description:
      'Cloud migration, managed cloud and security from Stack360. We modernize infrastructure and build scalable applications for growing businesses.',
    path: '/what-we-build/cloud',
    keywords: [
      'Cloud Migration Services',
      'Managed cloud services',
      'Cloud managed data center services',
      'Cloud security services',
      'Cloud tech services',
      'Cloud application development services',
      'Managed cloud security services',
      'Cloud migration consulting services',
    ],
  }),

  whatWeBuildDevops: pageMeta({
    absoluteTitle: 'DevOps Consulting Services | DevOps Solutions | Stack360',
    description:
      'Stack360 DevOps consulting: automated infrastructure, faster and safer deployments, stronger reliability, and optimized cloud environments.',
    path: '/what-we-build/devops',
    keywords: [
      'DevOps Consulting Services',
      'DevOps consulting',
      'DevOps automation',
      'DevOps development services',
    ],
  }),

  whatWeBuildAutomation: pageMeta({
    absoluteTitle: 'Business Process Automation Services | Stack360',
    description:
      'Automate repetitive business processes with Stack360. We build workflows that connect your systems, cut manual work, and scale operations.',
    path: '/what-we-build/automation',
    keywords: ['Business Process Automation Services', 'QA Automation Services'],
  }),

  whoWeHelp: pageMeta({
    title: 'Who We Help',
    description:
      'Stack360 partners with startups, SMEs, and enterprises across Healthcare, FinTech, and Logistics.',
    path: '/who-we-help',
  }),

  whoWeHelpIndustries: pageMeta({
    title: 'Industry Software Solutions',
    description:
      'Future-proof software for Healthcare, FinTech, E-commerce, Logistics, and more. HIPAA and PCI-DSS aligned delivery with proven, measurable outcomes.',
    path: '/who-we-help/industries',
    keywords:
      'industry software development, healthcare software, fintech development, ecommerce platform, logistics software, HIPAA compliant software, PCI-DSS development',
  }),

  whoWeHelpStartups: pageMeta({
    title: 'Startup MVP Development',
    description:
      'From zero to funded — build investor-ready MVPs in weeks. Scalable architecture, transparent pricing, and agile delivery for startups that need to move fast.',
    path: '/who-we-help/startups',
    keywords:
      'startup MVP development, investor-ready software, startup software partner, agile MVP, scalable startup architecture, funded startup development',
  }),

  whoWeHelpSmes: pageMeta({
    title: 'SME Digital Transformation',
    description:
      'Scale your business with tailored tech: legacy modernization, automation, and custom software without operational disruption, on flexible terms.',
    path: '/who-we-help/smes',
    keywords:
      'SME software development, digital transformation SME, legacy modernization, business automation, custom software SME, ROI software development',
  }),

  whoWeHelpEnterprises: pageMeta({
    title: 'Enterprise Software Development',
    description:
      'Enterprise-grade security with startup agility. SOC 2 and ISO aligned delivery, dedicated teams, legacy integration, and 24/7 support on AWS, Azure, and GCP.',
    path: '/who-we-help/enterprises',
    keywords:
      'enterprise software development, SOC 2 software partner, ISO compliant development, dedicated development team, legacy system integration, enterprise cloud migration',
  }),

  ourWork: pageMeta({
    title: 'Our Work',
    description:
      'Case studies, featured projects, client success stories, and studio insights from Stack360.',
    path: '/our-work',
  }),

  ourWorkCaseStudies: pageMeta({
    title: 'Case Studies',
    description:
      'See how Stack360 helped clients succeed — Autobuffy, Coach Catalyst, ATC, BuffyHub, Cercle, and more.',
    path: '/our-work/case-studies',
  }),

  ourWorkFeaturedProjects: pageMeta({
    title: 'Featured Projects',
    description:
      'Highest-impact systems Stack360 has shipped — engineering depth with measurable outcomes.',
    path: '/our-work/featured-projects',
  }),

  ourWorkClientSuccessStories: pageMeta({
    title: 'Client Success Stories',
    description: 'Partners describing the outcomes they saw after launching with Stack360.',
    path: '/our-work/client-success-stories',
  }),

  ourWorkBlog: pageMeta({
    title: 'Blog',
    description:
      'Engineering notes from Stack360 — language features, craft, and how we think about building systems that last.',
    path: '/blog',
  }),

  ourWorkFaqs: pageMeta({
    title: 'FAQs',
    description: 'Answers on Stack360 services, quality, performance, and how engagements work.',
    path: '/our-work/faqs',
  }),

  whoWeAre: pageMeta({
    title: 'Who We Are',
    description:
      'Meet Stack360: our history, our engineering culture, and how we design, build, and ship complex software for startups, SMEs, and enterprises.',
    path: '/who-we-are',
  }),

  whoWeAreHistory: pageMeta({
    title: 'Our History',
    description:
      'From a technical garage to a custom software architecture studio — the Stack360 story.',
    path: '/who-we-are/history',
  }),

  whoWeAreCulture: pageMeta({
    title: 'Our Culture',
    description:
      'A zero-fluff engineering culture — clean execution, architectural honesty, and delivery discipline.',
    path: '/who-we-are/culture',
  }),

  whoWeAreHowWeWork: pageMeta({
    title: 'How We Work',
    description:
      'Daily iterations, architectural planning, and staging discipline — how Stack360 ships systems.',
    path: '/who-we-are/how-we-work',
  }),

  workWithUs: pageMeta({
    title: 'Work With Us',
    description: 'Engage Stack360 as a software partner or explore careers at the studio.',
    path: '/work-with-us',
  }),

  workWithUsSoftwarePartner: pageMeta({
    title: 'Software Partner',
    description:
      'Engage Stack360 as your software partner — staff augmentation and full product delivery for roadmap-critical systems.',
    path: '/work-with-us/software-partner',
  }),

  workWithUsHire: pageMeta({
    title: 'Hire Talent',
    description:
      'Hire vetted full-time remote software engineers — React, Angular, Node, Python, .NET, Java, and more. Shortlists in 2 days.',
    path: '/work-with-us/hire',
  }),

  workWithUsCareers: pageMeta({
    title: 'Careers',
    description:
      'Open roles, internships, and the Stack360 hiring process — join a studio that ships complex systems with discipline.',
    path: '/work-with-us/careers',
  }),
} satisfies Record<string, Metadata>;

export type SeoKey = keyof typeof seo;
