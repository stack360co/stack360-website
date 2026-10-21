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
    absoluteTitle: 'Stack360 | Software Development Agency, 200+ Projects',
    description: SITE_DESCRIPTION,
    path: '/',
  }),

  contact: pageMeta({
    absoluteTitle: 'Contact Stack360 | We Reply Within One Business Day',
    description:
      'Talk to Stack360 about a project or developers you need. Book a 20-minute call or send a message, and we reply within one business day.',
    path: '/contact',
  }),

  terms: pageMeta({
    title: 'Terms of Use for the Website and Its Content',
    description:
      "The terms for using the Stack360 website: what our service pages describe, how we write and review the site's content, intellectual property and contact.",
    path: '/terms',
  }),

  privacy: pageMeta({
    title: 'Privacy Policy: How We Handle Your Data',
    description:
      'How Stack360 collects and uses contact and inquiry information when you use our website or request talent or project support.',
    path: '/privacy',
  }),

  whatWeBuild: pageMeta({
    title: 'Software Development Services: Web, Mobile, AI',
    description:
      'Custom software, web and mobile apps, AI, SaaS, ERP, CRM, cloud, DevOps and automation, built by our Lahore team for US and UK companies.',
    path: '/what-we-build',
  }),

  whatWeBuildErp: pageMeta({
    absoluteTitle: 'Custom ERP Software Development Company | Stack360',
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
    absoluteTitle: 'Custom CRM Development Company | Stack360',
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
    absoluteTitle: 'AI Development Company: RAG, Chatbots, Agents | Stack360',
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
    absoluteTitle: 'SaaS Development Company: MVP to Scale | Stack360',
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
    absoluteTitle: 'DevOps Consulting and CI/CD Services | Stack360',
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

  whatWeBuildLegacyModernization: pageMeta({
    absoluteTitle: 'Legacy Software Modernization Services | Stack360',
    description:
      'Modernize legacy software without stopping the business. We upgrade old frameworks, data feeds and hosting in stages, as for Autobuffy and Coach Catalyst.',
    path: '/what-we-build/legacy-modernization',
    keywords: [
      'legacy software modernization',
      'application modernization services',
      'angularjs migration',
      'legacy system upgrade',
    ],
  }),

  whatWeBuildSoftwareMaintenance: pageMeta({
    absoluteTitle: 'Software Maintenance and Support Services | Stack360',
    description:
      'Keep live software secure, fast and working after launch. Stack360 handles updates, bug fixes, monitoring and small improvements for web and mobile products.',
    path: '/what-we-build/software-maintenance',
    keywords: [
      'software maintenance services',
      'application support and maintenance',
      'app maintenance services',
      'software support company',
    ],
  }),

  whatWeBuildMarketplaceDevelopment: pageMeta({
    absoluteTitle: 'Marketplace Development Company | Stack360',
    description:
      'Build a two-sided marketplace with listings, bookings, Stripe payments and payouts. Stack360 built Cad Cam Masters, Cinekit, Cercle and Truck-4.',
    path: '/what-we-build/marketplace-development',
    keywords: [
      'marketplace development company',
      'marketplace app development',
      'rental marketplace development',
      'b2b marketplace development',
    ],
  }),

  whatWeBuildQaTesting: pageMeta({
    absoluteTitle: 'QA and Test Automation Services | Stack360',
    description:
      'QA and test automation that catches problems before customers do: unit, integration and Selenium browser tests, code checks in CI and manual testing.',
    path: '/what-we-build/qa-testing',
    keywords: [
      'qa testing services',
      'test automation services',
      'software testing company',
      'selenium testing services',
    ],
  }),

  whatWeBuildDigitalMarketing: pageMeta({
    absoluteTitle: 'SEO and Google Ads Services | Stack360',
    description:
      'SEO and Google Ads run from inside your website: technical SEO, GA4 tracking, Business Profile and search campaigns, as we do for Luxe Excursions.',
    path: '/what-we-build/digital-marketing',
    keywords: [
      'seo services',
      'google ads management',
      'technical seo services',
      'google business profile management',
    ],
  }),

  whoWeHelp: pageMeta({
    title: 'Who We Help: Startups, SMEs and Enterprises',
    description:
      'How we work with startups, SMEs and enterprises, from MVPs built in one to three months to systems we have supported for 30 months.',
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
      'From zero to funded — build investor-ready MVPs in weeks. Scalable architecture, clear scope, and agile delivery for startups that need to move fast.',
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
      'Enterprise software development: dedicated teams, legacy system integration and cloud work on AWS, Azure and GCP, from our Lahore team for US and UK companies.',
    path: '/who-we-help/enterprises',
    keywords:
      'enterprise software development, dedicated development team, legacy system integration, enterprise cloud migration',
  }),

  ourWork: pageMeta({
    title: 'Our Work: Case Studies and Client Projects',
    description:
      'Case studies with team sizes and hours, 28 featured projects with durations, and client stories from 200+ projects delivered since 2019.',
    path: '/our-work',
  }),

  ourWorkCaseStudies: pageMeta({
    title: 'Software Case Studies: Teams, Hours, Results',
    description:
      'Eight in-depth case studies, including AutoBuffy, Coach Catalyst, ATC, BuffyHub and Cercle, with team size, hours and what we built.',
    path: '/our-work/case-studies',
  }),

  ourWorkFeaturedProjects: pageMeta({
    title: 'Featured Projects: Apps and Platforms We Built',
    description:
      '28 projects we have delivered, grouped by domain, with how long each took, the stack and the result, from AI chatbots to marketplaces.',
    path: '/our-work/featured-projects',
  }),

  ourWorkProjectTimelines: pageMeta({
    title: 'Software Project Timeline Estimator',
    description:
      'See how long software projects like yours took, from 28 projects we delivered since 2019: ranges by project type, the projects behind them and team sizes.',
    path: '/our-work/project-timelines',
  }),

  ourWorkClientSuccessStories: pageMeta({
    title: 'Client Success Stories and Reviews',
    description:
      'Client stories about working with Stack360 on marketplaces, SaaS products and internal systems, told in their own words, with the outcomes they saw.',
    path: '/our-work/client-success-stories',
  }),

  ourWorkBlog: pageMeta({
    title: 'Software Development Blog',
    description:
      'First-hand articles from our engineers on hiring developers, project timelines, migrations, AI features and payments, from real projects.',
    path: '/blog',
  }),

  ourWorkFaqs: pageMeta({
    title: 'FAQs: Working With Stack360',
    description:
      'Answers to common questions about our web and mobile development, interface design, marketing, site performance and how we ensure quality.',
    path: '/our-work/faqs',
  }),

  whoWeAre: pageMeta({
    absoluteTitle: 'About Stack360 | Software House in DHA Lahore Since 2019',
    description:
      'Stack360 is a software house in DHA Lahore that has built software and placed dedicated developers for US and UK companies since 2019. Meet the team.',
    path: '/who-we-are',
  }),

  whoWeAreHistory: pageMeta({
    title: 'Our History: Stack360 Since 2019',
    description:
      'How Stack360 grew from its founding in 2019 into a Lahore team that has delivered 200+ projects for companies in the US and UK.',
    path: '/who-we-are/history',
  }),

  whoWeAreCulture: pageMeta({
    title: 'Our Culture and Leadership',
    description:
      'How our engineers work, what we value, and the people who lead Stack360, including our CEO and founder, Azmat Rana.',
    path: '/who-we-are/culture',
  }),

  whoWeAreHowWeWork: pageMeta({
    title: 'How We Work: Discovery to Delivery',
    description:
      'How a project runs with us: a discovery call with a founder, a plan within two business days, weekly demos and support after launch.',
    path: '/who-we-are/how-we-work',
  }),

  whoWeAreLahore: pageMeta({
    absoluteTitle: 'Stack360 Lahore Office: Address, Hours and Directions',
    description:
      'Stack360’s office is at 82-G, First Floor, DHA Phase 1, Lahore 54660. Open Monday to Friday, 10 AM to 10 PM. Directions, contact details and our team.',
    path: '/who-we-are/lahore',
  }),

  workWithUs: pageMeta({
    title: 'Work With Us: Partner, Hire or Join',
    description:
      'Three ways to work with Stack360: build a product with us, hire developers or a dedicated team, or join our team in Lahore.',
    path: '/work-with-us',
  }),

  workWithUsSoftwarePartner: pageMeta({
    title: 'Software Development Partner: Start in 48 Hours',
    description:
      'Engage Stack360 as your software partner — staff augmentation and full product delivery for roadmap-critical systems.',
    path: '/work-with-us/software-partner',
  }),

  workWithUsHire: pageMeta({
    title: 'Hire Developers: Shortlists Within 2 Days',
    description:
      'Hire vetted full-time developers or a dedicated team: React, React Native, Swift, Flutter, Node.js, Rails, Angular, Python, Vue and .NET. Shortlists in 2 days.',
    path: '/work-with-us/hire',
  }),

  workWithUsDedicatedTeam: pageMeta({
    title: 'Hire a Dedicated Development Team',
    description:
      'Single engineers or a managed dedicated team with a project manager, QA, UI/UX and DevOps. Vetted with four checks and shortlisted within 2 days.',
    path: '/work-with-us/hire/dedicated-team',
  }),

  workWithUsCareers: pageMeta({
    title: 'Careers at Stack360 in Lahore',
    description:
      'Open roles and internships at Stack360 in Lahore, and how our hiring process works. Join a team building software for US and UK clients.',
    path: '/work-with-us/careers',
  }),
} satisfies Record<string, Metadata>;

export type SeoKey = keyof typeof seo;
