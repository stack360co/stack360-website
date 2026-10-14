/** Capability pages under /what-we-build — sourced from stack360.co/services where available. */

import { getCaseStudySlugs } from '@/constants/component/our-work-case-studies-data';
import { PORTFOLIO_PROJECTS_BY_SLUG } from '@/constants/component/our-work-portfolio-data';
import { CULTURE_FOUNDER } from '@/constants/component/who-we-are-culture-data';

export type CapabilitySlug =
  | 'erp'
  | 'crm'
  | 'ai-solutions'
  | 'saas'
  | 'custom-software'
  | 'mobile-apps'
  | 'web-apps'
  | 'cloud'
  | 'devops'
  | 'automation'
  | 'legacy-modernization'
  | 'software-maintenance'
  | 'marketplace-development'
  | 'qa-testing'
  | 'digital-marketing';

export interface CapabilityFaq {
  id: string;
  question: string;
  answer: string;
}

export interface CapabilityProjectRef {
  slug: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  href: string;
}

/** A real project told as a short story: the problem, what we changed, what it took. */
export interface CapabilityStory {
  eyebrow: string;
  title: string;
  intro: string;
  problem: string;
  changes: readonly string[];
  outcome: string;
  facts: readonly { label: string; value: string }[];
  href: string;
  linkLabel: string;
}

export interface CapabilityReviewer {
  name: string;
  role: string;
  image: string;
  href: string;
}

/** Azmat Rana reviews these pages (confirmed by the team 2026-10-12). */
const FOUNDER_REVIEWER: CapabilityReviewer = {
  name: CULTURE_FOUNDER.name,
  role: CULTURE_FOUNDER.role,
  image: CULTURE_FOUNDER.image.src,
  href: '/who-we-are/culture#azmat-rana',
};

/** Ownership answer shared by every reviewed capability page. */
const OWNERSHIP_FAQ: CapabilityFaq = {
  id: 'ownership',
  question: 'Who owns the code and intellectual property?',
  answer:
    'You do. Everything we build for you, including the source code and the intellectual property in it, belongs to you.',
};

export interface CapabilityPageData {
  slug: CapabilitySlug;
  hero: {
    eyebrow: string;
    title: string;
    highlight?: string;
    description: string;
    cta?: { label: string; href: string };
  };
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilities: { title: string; description: string }[];
  /** Optional project story rendered after the capabilities section. */
  story?: CapabilityStory;
  /** Who reviewed the page; shown under the hero and in the page schema. */
  reviewer?: CapabilityReviewer;
  /** Date the page content last changed (YYYY-MM-DD). Shown beside the byline; update it when you edit the page. */
  updated?: string;
  processTitle: string;
  processIntro: string;
  process: { title: string; description: string; phase?: string }[];
  /** One blog post that goes deeper on this service, shown with the related services. */
  reading?: { href: string; label: string };
  /** Optional facts row under the process: what working together looks like day to day. */
  engagement?: { title: string; items: readonly { label: string; value: string }[] };
  /** Optional outcomes section rendered after tech. */
  benefitsTitle?: string;
  benefitsIntro?: string;
  benefits?: { title: string; description: string }[];
  tech: string[];
  techTitle?: string;
  techIntro?: string;
  projects: CapabilityProjectRef[];
  projectsTitle?: string;
  projectsIntro?: string;
  projectsCtaLabel?: string;
  faqs: CapabilityFaq[];
  faqsTitle?: string;
  faqsIntro?: string;
  /** When true, renders the shared partner testimonials carousel. */
  showTestimonials?: boolean;
  cta: {
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

/** Slugs that have an in-depth case study — link to the deep dive, not the portfolio. */
const CASE_STUDY_SLUGS = new Set(getCaseStudySlugs());

/**
 * Build a capability project reference from the shared portfolio registry so
 * /what-we-build links stay in sync with the Featured Projects archive.
 */
function projectRef(slug: string): CapabilityProjectRef {
  const project = PORTFOLIO_PROJECTS_BY_SLUG[slug];
  if (!project) {
    throw new Error(`Unknown portfolio project slug referenced in what-we-build: "${slug}"`);
  }
  return {
    slug: project.slug,
    title: project.name,
    subtitle: project.industry,
    metric: project.metric,
    metricLabel: project.metricLabel,
    href: CASE_STUDY_SLUGS.has(slug)
      ? `/our-work/case-studies/${slug}`
      : `/our-work/featured-projects#${slug}`,
  };
}

export const CAPABILITY_PAGES: Record<CapabilitySlug, CapabilityPageData> = {
  'web-apps': {
    slug: 'web-apps',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    reading: {
      href: '/blog/slow-react-app',
      label: 'Your React app is slow. It’s probably not React.',
    },
    hero: {
      eyebrow: 'What We Build · Web Apps',
      title: 'Web App Development',
      highlight: 'For Products People Log In To',
      description:
        'A web app is software your customers or staff log in to and use in a browser, such as a marketplace, a portal or an ordering system. We build them in React, Next.js and Rails, from Cercle’s fashion rentals to Autobuffy’s 100,000-part store.',
      cta: { label: 'Build Your Web App', href: '/contact' },
    },
    capabilitiesTitle: 'What Our Web Apps Do',
    capabilitiesIntro:
      'Most web apps exist so customers or staff can get something done without calling you: book, buy, file, track or approve.',
    capabilities: [
      {
        title: 'Marketplaces and stores',
        description:
          'Listings, carts, checkout and payouts. Cinekit rents camera gear across the UK, Europe and the US, with Stripe holding security deposits.',
      },
      {
        title: 'Portals and dashboards',
        description:
          'Logged-in views for customers or staff. NPTAAS cut a client review process from weeks to days with automated audit scoring and reports.',
      },
      {
        title: 'Guided forms and workflows',
        description:
          'Step-by-step questions that turn plain answers into the exact format a process needs. LegalAtoms prepares court-ready filings this way.',
      },
      {
        title: 'Integrations behind the screen',
        description:
          'Payments, shipping, email and inventory feeds. Autobuffy connects Stripe, PayPal, UPS, USPS, FedEx and AfterShip.',
      },
      {
        title: 'Speed on large catalogs',
        description:
          'Caching, background jobs and Elasticsearch where search has to stay fast across thousands of products or records.',
      },
    ],
    story: {
      eyebrow: 'Project story · Cercle',
      title: 'Building a fashion rental marketplace that keeps up with demand',
      intro:
        'Cercle is a UK marketplace for renting high-end fashion. Lenders list luxury clothing and accessories to earn from them, and renters wear them for a fraction of the retail price. It had to be fast, handle payments and returns reliably, and sell through social channels as well as the site.',
      problem:
        'Slow pages raised bounce rates and cost sales. Checkout had no store credit, so refunds and cancellations were clumsy. Shoppers expected to buy from social channels too, worn items needed cleaning and repair before they could be rented again, and bugs left delivery and payment statuses wrong.',
      changes: [
        'Sped up product data handling and image caching, and moved heavy work into Sidekiq background jobs so pages stay responsive.',
        'Built a wallet and store-credit flow for refunds and cancellations, with encryption and secure tokenisation.',
        'Integrated the Facebook commerce APIs, so the catalog, inventory and orders stay in sync between the site and Facebook.',
        'Connected Advanced Clothing Solutions, so used items ship from the renter, get cleaned and repaired, and return to stock.',
        'Fixed the Solidus admin configuration so delivery and payment statuses stay accurate.',
      ],
      outcome:
        'Faster pages cut bounce rates and supported higher sales, renting and returning became smoother, and store credits kept refunds on the platform. Most web app work looks like this: speed, payments and the integrations behind the screen decide whether people come back.',
      facts: [
        { label: 'Team', value: '2 engineers' },
        { label: 'Effort', value: '2,112 hours' },
        { label: 'Payments', value: 'Stripe and store credits' },
        { label: 'Stack', value: 'Ruby on Rails, Solidus, Next.js, PostgreSQL' },
      ],
      href: '/our-work/case-studies/cercle',
      linkLabel: 'Read the full Cercle case study',
    },
    processTitle: 'From Concept To Launch',
    processIntro:
      'A web app is built in small, working pieces, so you can use it and change course before it is finished.',
    process: [
      {
        phase: 'Discover',
        title: 'Map The Journeys',
        description:
          'We list who uses the app, what each person needs to get done and which systems it must connect to.',
      },
      {
        phase: 'Develop',
        title: 'Build In Weekly Steps',
        description:
          'You see working screens in a weekly demo, checked against the milestones agreed at the start.',
      },
      {
        phase: 'Launch',
        title: 'Launch And Measure',
        description:
          'We test on staging, launch, then watch speed, errors and drop-off and fix what they show.',
      },
    ],
    techTitle: 'Technology Behind Our Websites',
    techIntro:
      'The frameworks behind the web apps in our portfolio. We choose per project, based on the team that will maintain it.',
    tech: [
      'react',
      'nextdotjs',
      'nodedotjs',
      'python',
      'dotnet',
      'wordpress',
      'shopify',
      'postgresql',
      'mongodb',
      'amazonaws',
      'microsoftazure',
      'google',
      'graphql',
    ],
    benefitsTitle: 'Website, Web App Or Both?',
    benefitsIntro:
      'A marketing website and a web application solve different problems, and many businesses need both. This is how we tell them apart.',
    benefits: [
      {
        title: 'A website informs',
        description:
          'It explains what you offer, ranks in search and turns visitors into enquiries. Content and speed matter most.',
      },
      {
        title: 'A web app does work',
        description:
          'Customers log in to buy, book, rent, track or manage something. Accounts, data and reliability matter most.',
      },
      {
        title: 'Search needs server rendering',
        description:
          'Pages that should rank, such as product and category pages, need server-side rendering. Autobuffy gained search visibility after we added it.',
      },
      {
        title: 'Speed is a feature',
        description:
          'Slow pages on Cercle were costing sales until heavy work moved into background jobs and images were cached.',
      },
      {
        title: 'Payments shape the build',
        description:
          'Subscriptions, deposits, store credit, refunds and payouts all need planning in the data model before checkout is designed.',
      },
      {
        title: 'Plan the integrations',
        description:
          'Most of the hard work sits behind the screen: inventory feeds, shipping, social catalogs and accounting.',
      },
    ],
    projectsTitle: 'Web Projects In Action',
    projectsIntro: 'Web apps from our portfolio and what each one was built to do.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('autobuffy'), projectRef('buffyhub'), projectRef('cinekit')],
    faqsTitle: 'Website Development FAQs',
    faqsIntro: 'What buyers ask before they commission a web app.',
    faqs: [
      {
        id: 'web-includes',
        question: 'What does web app development include?',
        answer:
          'Design, front end, backend, database, integrations, testing and hosting, plus the admin tools your team uses to run it day to day.',
      },
      {
        id: 'web-vs-site',
        question: 'Should we build a website or a web application?',
        answer:
          'A website explains what you offer and wins enquiries. A web application is something people log in to and use. Many businesses need both, often on the same domain.',
      },
      {
        id: 'web-ecommerce',
        question: 'Can you develop ecommerce and marketplace platforms?',
        answer:
          'Yes. Autobuffy sells more than 100,000 auto parts, Cercle runs fashion rentals with store credits and returns, and Cad Cam Masters is a B2B dental marketplace.',
      },
      {
        id: 'web-integrate',
        question: 'Can you integrate a web app with existing business systems?',
        answer:
          'Yes. Cercle syncs its catalog and orders with Facebook and works with a clothing-renewal partner, and Autobuffy pulls vendor inventory through its own microservice.',
      },
      {
        id: 'web-faster',
        question: 'Can you make an existing web app faster?',
        answer:
          'Usually, yes. We profile first, then fix what is slow: background jobs and image caching on Cercle, Elasticsearch for part search on Autobuffy.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Have A Web App In Mind?',
      description:
        'Tell us who will use it and what they need to get done. We reply within one business day to set up a discovery call.',
      primary: { label: 'Build Your Web App', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  'mobile-apps': {
    slug: 'mobile-apps',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    reading: {
      href: '/blog/react-native-or-flutter',
      label: 'React Native or Flutter? How we choose for client apps',
    },
    hero: {
      eyebrow: 'What We Build · Mobile Apps',
      title: 'Mobile App Development',
      highlight: 'For iOS And Android',
      description:
        'We build iOS and Android apps in React Native, Flutter and Swift, and take them through App Store and Google Play release. Nextflag, a map-based social app, is one we made faster and more stable for both platforms.',
      cta: { label: 'Build Your Mobile App', href: '/contact' },
    },
    capabilitiesTitle: 'What We Build For Mobile',
    capabilitiesIntro:
      'People judge an app in its first few minutes, on speed, stability and whether it does the thing they downloaded it for.',
    capabilities: [
      {
        title: 'Native iOS apps',
        description:
          'Swift apps for features that lean on the device. Slumber & Sprout gives parents sleep tracking and routines for their children in a native iOS app.',
      },
      {
        title: 'Cross-platform apps',
        description:
          'One React Native or Flutter codebase for iOS and Android. Nextflag and Trusted Tastes run on React Native.',
      },
      {
        title: 'White-label apps',
        description:
          'One codebase configured per customer. StoreBevy lets small retailers launch their own branded store app.',
      },
      {
        title: 'Backends and notifications',
        description:
          'APIs, background jobs and push notifications. Slumber & Sprout’s Rails backend recalculates sleep schedules with Sidekiq when a routine changes.',
      },
      {
        title: 'Store releases',
        description:
          'Signing, TestFlight and Play Console tracks, and store listings for both platforms, planned from the first sprint.',
      },
    ],
    story: {
      eyebrow: 'Project story · Nextflag',
      title: 'Making a social travel app dependable again',
      intro:
        'Nextflag lets people drop flags on places they love, follow friends and plan trips from real recommendations. It is a React Native app on iOS and Android with a Rails GraphQL backend. When it reached us, it was slow, crashed during uploads and lost new users halfway through sign-up.',
      problem:
        'React Native and its native packages had fallen behind, so the app lagged. The post-upload screen crashed often. People could not reliably find flagged places, which is the whole point of the app, and searching a region was weak. Onboarding bugs dropped sessions and lost progress mid-flow.',
      changes: [
        'Upgraded React Native, its packages and the iOS pods, then tuned the app for smoother performance.',
        'Rewrote the post-upload flow and removed the code that made it crash.',
        'Added a map screen with geolocated markers and filters by flag type, so flagged places are easy to find again.',
        'Built a search screen that uses location data to surface flags and wishlist items by city.',
        'Saved onboarding progress at every step and added session resume, so new users no longer lose their place.',
        'Swapped the static splash screen for an animated one that loads faster and takes up less storage.',
      ],
      outcome:
        'The app is stable on both platforms, flagged places are easy to find again and more new users finish onboarding. It is a common pattern in mobile work: the biggest gains came from fixing an app people already used, before adding anything new.',
      facts: [
        { label: 'Team', value: '2 engineers' },
        { label: 'Effort', value: '1,602 hours' },
        { label: 'Platforms', value: 'iOS and Android' },
        { label: 'Stack', value: 'React Native, Redux, Rails GraphQL, PostgreSQL' },
      ],
      href: '/our-work/case-studies/nextflag',
      linkLabel: 'Read the full Nextflag case study',
    },
    processTitle: 'From Concept To Scale',
    processIntro:
      'Mobile work is planned around the app stores as much as the code, so releases never become the bottleneck.',
    process: [
      {
        phase: 'Discover',
        title: 'Pick The Platforms',
        description:
          'We choose native, React Native or Flutter based on the features you need and who will maintain the app.',
      },
      {
        phase: 'Develop',
        title: 'Test On Real Phones',
        description:
          'Builds go out through TestFlight and Play Console testing tracks, so you try the app on your own phone every week.',
      },
      {
        phase: 'Release',
        title: 'Ship To Both Stores',
        description:
          'We handle signing, listings and store review, then keep the app current with each iOS and Android release.',
      },
    ],
    techTitle: 'Technology Behind Mobile Apps',
    techIntro: 'The mobile frameworks and backends behind the apps we have shipped.',
    tech: [
      'swift',
      'kotlin',
      'reactnative',
      'flutter',
      'nodedotjs',
      'python',
      'dotnet',
      'react',
      'nextdotjs',
      'amazonaws',
      'microsoftazure',
      'graphql',
    ],
    benefitsTitle: 'Native, Cross-Platform Or A Web App?',
    benefitsIntro:
      'The right build depends on what the app has to do and who will maintain it. This is how we usually decide.',
    benefits: [
      {
        title: 'Native Swift or Kotlin',
        description:
          'When the app leans on the device, such as health data, background location, widgets or heavy animation, or when you only need one platform.',
      },
      {
        title: 'React Native',
        description:
          'When a React web team will share knowledge and some code, and the app is mostly screens, feeds, forms and API calls. Nextflag is built this way.',
      },
      {
        title: 'Flutter',
        description:
          'When a custom design has to look identical on every phone. StoreBevy’s white-label store app is built in Flutter.',
      },
      {
        title: 'A fast web app instead',
        description:
          'When people visit occasionally and need neither offline use nor push notifications, a mobile-friendly web app can do the job without store reviews.',
      },
      {
        title: 'Plan the store releases',
        description:
          'App Store and Google Play review, signing and staged rollouts take real time, so they belong in the delivery plan from day one.',
      },
      {
        title: 'Plan for after launch',
        description:
          'Operating-system updates and package upgrades keep coming. Nextflag’s slowdown came from falling behind on them, so keep time for upkeep every year.',
      },
    ],
    projectsTitle: 'Mobile Apps In Action',
    projectsIntro: 'Apps from our portfolio across iOS and Android.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('slumber-sprout'), projectRef('nuvana'), projectRef('cashkart')],
    faqsTitle: 'Mobile App Development FAQs',
    faqsIntro: 'What teams ask before they build or take over an app.',
    faqs: [
      {
        id: 'mobile-native-vs-cross',
        question: 'Should I choose native or cross-platform mobile app development?',
        answer:
          'Go native when the app depends on device features such as health data, background location or widgets, or when you only need one platform. Choose cross-platform when you need iOS and Android from one team and the app is mostly screens, feeds and API calls, which describes most business apps.',
      },
      {
        id: 'mobile-flutter-rn',
        question: 'What is the difference between Flutter and React Native?',
        answer:
          'React Native uses native components and suits teams that already write React. Flutter draws every pixel itself, which keeps a custom design identical across devices. Both ship to iOS and Android from one codebase, and we build in both.',
      },
      {
        id: 'mobile-android-ios',
        question: 'Can you develop both Android and iOS applications?',
        answer:
          'Yes, natively in Swift and Kotlin or with React Native and Flutter. Nextflag and Trusted Tastes are mobile apps we have built.',
      },
      {
        id: 'mobile-takeover',
        question: 'Can you take over an app another team built?',
        answer:
          'Yes. Most of our Nextflag work was exactly that: upgrading an outdated React Native setup, fixing the crashes users hit and rescuing a broken onboarding flow before adding features.',
      },
      {
        id: 'mobile-stores',
        question: 'Will you publish the app to the App Store and Google Play?',
        answer:
          'Yes. We handle signing, test builds, store listings and replies to review feedback, or work inside the release process you already have.',
      },
      OWNERSHIP_FAQ,
      {
        id: 'mobile-integrate',
        question: 'Can you integrate mobile apps with existing business systems?',
        answer:
          'Yes. Apps usually talk to your backend through an API, as Nextflag does with its Rails GraphQL server, and from there to CRMs, payment providers and other business systems.',
      },
    ],
    cta: {
      title: 'Planning An App?',
      description:
        'Tell us what it should do and who it is for. We reply within one business day to set up a discovery call.',
      primary: { label: 'Build Your Mobile App', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  devops: {
    slug: 'devops',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    hero: {
      eyebrow: 'What We Build · DevOps',
      title: 'DevOps Consulting',
      highlight: 'That Makes Releases Routine',
      description:
        'DevOps makes releasing software routine: automated builds, tests and deploys, monitoring that reaches a person, and infrastructure defined in code. For Truck-4 we set up pipelines that deploy every service to Kubernetes the same way.',
      cta: { label: 'Improve Your DevOps', href: '/contact' },
    },
    capabilitiesTitle: 'What We Set Up',
    capabilitiesIntro:
      'If releasing needs a particular person and a checklist, every deploy is a risk and every fix waits for them.',
    capabilities: [
      {
        title: 'CI/CD pipelines',
        description:
          'Pipelines that build, test and deploy every change the same way, from Azure DevOps on Truck-4 to Capistrano deploys on BuffyHub.',
      },
      {
        title: 'Containers and Kubernetes',
        description:
          'Docker for environments that behave the same everywhere, and Kubernetes when a product has many services to scale separately.',
      },
      {
        title: 'Checks before release',
        description:
          'Unit and integration tests plus SonarQube analysis that stop risky changes before they reach production.',
      },
      {
        title: 'Monitoring and alerts',
        description:
          'Error tracking with tools like Sentry, uptime checks and alerts that reach an engineer before customers notice a problem.',
      },
      {
        title: 'Environments defined in code',
        description:
          'Helm charts and configuration files that describe each environment, so it can be reviewed, repeated and rebuilt.',
      },
    ],
    story: {
      eyebrow: 'Project story · Truck-4',
      title: 'Repeatable releases for a microservices marketplace',
      intro:
        'Truck-4 is a marketplace for renting, leasing and buying trucks, tractors and trailers, built as a set of microservices holding more than 2 million shipper records. With many services to build, test and deploy, releases had to be repeatable and safe.',
      problem:
        'Deploying many services onto Kubernetes by hand was slow and error-prone, and integration bugs between services surfaced late. Services depended on each other, so one slow call could drag down response times, and uploaded files could carry malware into the platform.',
      changes: [
        'Automated builds and deployments with Azure DevOps pipelines and Helm charts, so every release follows the same steps.',
        'Added SonarQube and CI checks that catch code and integration problems before they reach production.',
        'Ran each service on Kubernetes, so it can be deployed and scaled on its own.',
        'Used RabbitMQ for asynchronous messaging between services, so one slow service does not hold up the others.',
        'Scanned every upload with ClamAV in real time before it is accepted.',
        'Added fallbacks and monitoring so sign-in keeps working when an upstream service fails.',
      ],
      outcome:
        'Releases are automated and repeatable, problems surface in the pipeline instead of in production, and Kubernetes scaling cut operations cost while raising throughput. That is the point of DevOps: make shipping routine, so the team can release more often with less risk.',
      facts: [
        { label: 'Team', value: '3 engineers' },
        { label: 'Effort', value: '1,232 hours' },
        { label: 'Shipper records', value: '2M+' },
        { label: 'Stack', value: 'Kubernetes, Helm, Azure DevOps, RabbitMQ' },
      ],
      href: '/our-work/case-studies/truck-4',
      linkLabel: 'Read the full Truck-4 case study',
    },
    processTitle: 'From Code To Production',
    processIntro:
      'We start from how you ship today and automate the slowest, riskiest steps first.',
    process: [
      {
        phase: 'Assess',
        title: 'Review How You Ship',
        description:
          'We follow one change from commit to production and note every manual step, wait and failure point.',
      },
      {
        phase: 'Automate',
        title: 'Script The Release',
        description:
          'Builds, tests and deploys go into a pipeline, with a staging environment in front of production.',
      },
      {
        phase: 'Monitor',
        title: 'Watch And Improve',
        description:
          'Alerts and dashboards show errors and slow responses, and we fix the causes in order of impact.',
      },
    ],
    techTitle: 'Technology Behind Our DevOps',
    techIntro: 'The pipeline, container and monitoring tools used across our projects.',
    tech: [
      'amazonaws',
      'microsoftazure',
      'google',
      'docker',
      'kubernetes',
      'github',
      'gitlab',
      'jenkins',
      'terraform',
      'ansible',
      'prometheus',
      'grafana',
    ],
    benefitsTitle: 'Where DevOps Pays Off First',
    benefitsIntro:
      'You do not need every tool at once. These are the changes that usually make the biggest difference, in roughly this order.',
    benefits: [
      {
        title: 'One-step deploys',
        description:
          'If releasing takes a person and a checklist, automate it first. Truck-4 deploys every service the same way with pipelines and Helm.',
      },
      {
        title: 'Tests on every change',
        description:
          'Automated tests and code checks on each pull request catch problems while they are cheap to fix.',
      },
      {
        title: 'A staging copy of production',
        description: 'Every change runs on staging before customers see it.',
      },
      {
        title: 'Monitoring that reaches a person',
        description:
          'Logs and alerts for errors, slow responses and failed jobs, routed to someone who can act on them.',
      },
      {
        title: 'Infrastructure as code',
        description:
          'Servers and settings defined in files can be reviewed, repeated and rebuilt after a failure.',
      },
      {
        title: 'Rollbacks that work',
        description: 'Every deploy should be easy to undo. Practice it before you need it.',
      },
    ],
    projectsTitle: 'DevOps In Action',
    projectsIntro: 'Projects where we set up the pipelines, hosting and monitoring.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('truck-4'), projectRef('buffyhub'), projectRef('atc')],
    faqsTitle: 'DevOps Consulting FAQs',
    faqsIntro: 'What engineering leads ask before changing how they release.',
    faqs: [
      {
        id: 'devops-includes',
        question: 'What does DevOps consulting include?',
        answer:
          'Reviewing how you build, test, release and run your software today, then setting up the pipelines, environments, monitoring and infrastructure as code that make releases routine.',
      },
      {
        id: 'devops-cicd',
        question: 'Can you build CI/CD pipelines for existing applications?',
        answer:
          'Yes. The Truck-4 pipelines in Azure DevOps build, check and deploy each service to Kubernetes with Helm.',
      },
      {
        id: 'devops-kubernetes',
        question: 'Do we need Kubernetes?',
        answer:
          'Not always. It suits products with many services, like Truck-4. A single application often runs more simply on a managed container service.',
      },
      {
        id: 'devops-reliability',
        question: 'How do you improve DevOps infrastructure reliability?',
        answer:
          'Monitoring and alerts first, then fallbacks for the services you depend on, automated deploys with easy rollback and regular test restores of your backups.',
      },
      {
        id: 'devops-migrate',
        question: 'Can you help migrate applications to cloud infrastructure?',
        answer:
          'Yes. We move one service or environment at a time, with pipelines and monitoring in place before any traffic switches over.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Want Releases Your Team Stops Worrying About?',
      description:
        'Tell us how you deploy today and what goes wrong. We reply within one business day to set up a discovery call.',
      primary: { label: 'Improve Your DevOps', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  'ai-solutions': {
    slug: 'ai-solutions',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    reading: {
      href: '/blog/stop-ai-chatbot-hallucinations',
      label: 'How to stop an AI chatbot from making things up',
    },
    hero: {
      eyebrow: 'What We Build · AI Solutions',
      title: 'AI Development',
      highlight: 'That Works From Your Own Data',
      description:
        'We build AI features that work from your own data: assistants that answer from your documents, document reading, and automated decisions with a person in the loop. Money Ball, our sports-stats assistant, checks a live database before it answers.',
      cta: { label: 'Build Your AI Solution', href: '/contact' },
    },
    capabilitiesTitle: 'Where We Use AI',
    capabilitiesIntro:
      'AI is worth building when the input is messy, such as documents, free text or open questions, and a wrong answer can be caught.',
    capabilities: [
      {
        title: 'Answers from your records',
        description:
          'Chat and search over your own databases and documents, using retrieval so each answer comes from a real record.',
      },
      {
        title: 'Document reading',
        description:
          'OCR and handwriting recognition that pull fields out of scans and forms. Natif.ai processes incoming documents this way.',
      },
      {
        title: 'Routing and triage',
        description:
          'Models that read free-text messages and send each one to the right team. Contakti routes support tickets across email, chat, SMS and voice.',
      },
      {
        title: 'Writing assistance',
        description:
          'Drafting tools that work inside an existing workflow, such as email replies a person reviews before they go out.',
      },
      {
        title: 'AI at the core of a product',
        description:
          'Generative features a product is built around, such as Aiode’s virtual musicians that help producers compose.',
      },
    ],
    story: {
      eyebrow: 'Project story · Money Ball',
      title: 'Stopping an AI chatbot from making up sports stats',
      intro:
        'Money Ball lets NFL fans and analysts ask for player and team numbers in plain English. The hard part of a product like this is trust: the answer has to be right, and football stats change every week.',
      problem:
        'General language models answer confidently even when they are wrong. They are wrong most often on specialized figures that change quickly, such as this season’s player and team stats. A chatbot that invents numbers is worse than no chatbot at all.',
      changes: [
        'Built a retrieval-augmented generation (RAG) setup that makes the model query the live sports database before it answers, so replies rest on current figures.',
        'Added a real-time team performance engine that keeps the underlying numbers up to date.',
        'Split data ingestion into Dockerized microservices so new stats are taken in quickly.',
        'Wrapped it in a chat interface where fans ask questions the way they would ask a friend.',
      ],
      outcome:
        'Fans and analysts get football figures pulled from live data, in a chat. The same approach carries over to most business AI work: connect the model to your own data and make it look things up instead of guessing.',
      facts: [
        { label: 'Build time', value: '3 months' },
        { label: 'Approach', value: 'RAG over live stats' },
        { label: 'Stack', value: 'Node.js, Django, PostgreSQL, Redis, Docker' },
        { label: 'Live at', value: 'app.moneyball-ai.com' },
      ],
      href: '/our-work/featured-projects#moneyball',
      linkLabel: 'See Money Ball in our portfolio',
    },
    processTitle: 'From Strategy To Scale',
    processIntro:
      'We start with one task, prove it on real examples and widen it only once the answers hold up.',
    process: [
      {
        phase: 'Discover',
        title: 'Choose The Task',
        description:
          'We pick a task where the input is messy and mistakes can be caught, and agree how success is measured.',
      },
      {
        phase: 'Build',
        title: 'Ground It In Your Data',
        description:
          'We connect the model to your documents or databases and test it on real examples before anyone relies on it.',
      },
      {
        phase: 'Scale',
        title: 'Monitor The Answers',
        description:
          'In production we track accuracy and failures and keep a person in the loop where mistakes are costly.',
      },
    ],
    techTitle: 'Technology Behind Our AI Solutions',
    techIntro: 'The models, frameworks and data tools we build AI features with.',
    tech: [
      'openai',
      'anthropic',
      'huggingface',
      'tensorflow',
      'pytorch',
      'python',
      'nodedotjs',
      'react',
      'nextdotjs',
      'postgresql',
      'mongodb',
      'amazonaws',
      'microsoftazure',
      'google',
      'graphql',
    ],
    benefitsTitle: 'Where AI Earns Its Place',
    benefitsIntro:
      'AI is worth building when it saves real time on work you already do and its output can be checked. These are the places we see it pay off, and two where it does not.',
    benefits: [
      {
        title: 'Reading documents at volume',
        description:
          'Invoices, forms, handwritten notes and contracts. Natif extracts fields from low-quality scans and handwriting so staff stop keying them in.',
      },
      {
        title: 'Answering from your own data',
        description:
          'Chat and search over your products, policies or records, grounded with retrieval so answers come from your sources. Money Ball works this way.',
      },
      {
        title: 'Drafting work people already do',
        description:
          'Email replies, meeting notes and first drafts that a person approves before they go out.',
      },
      {
        title: 'Scoring against clear criteria',
        description:
          'Assessing candidates, leads or content against agreed rules, with a person making the final call. Evalufy uses AI to assess video interview answers.',
      },
      {
        title: 'Not where mistakes go unchecked',
        description:
          'If a wrong answer can cost money or harm someone and nobody reviews it, keep a person in the loop or wait before automating it.',
      },
      {
        title: 'Not before the data exists',
        description:
          'AI needs records, documents or history to work from. If they are scattered or missing, organizing them is the first project.',
      },
    ],
    projectsTitle: 'AI Solutions In Action',
    projectsIntro: 'AI products from our portfolio.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('moneyball'), projectRef('natif'), projectRef('siterank')],
    faqsTitle: 'AI Solutions FAQs',
    faqsIntro: 'What teams ask before putting AI in front of customers.',
    faqs: [
      {
        id: 'ai-types',
        question: 'What types of custom AI solutions can Stack360 develop?',
        answer:
          'Document processing (Natif), chat over live data (Money Ball), assessment tools (Evalufy), plus AI agents and recommendation features inside existing products.',
      },
      {
        id: 'ai-accuracy',
        question: 'How do you stop AI from making things up?',
        answer:
          'By grounding it in your data. We use retrieval so the model looks answers up in your databases or documents before replying, as in Money Ball. Where a mistake would be costly, we add checks and human review.',
      },
      {
        id: 'ai-models',
        question: 'Which AI models do you use?',
        answer:
          'OpenAI and Anthropic models, open models from Hugging Face, and custom models in PyTorch or TensorFlow. We choose per task, weighing accuracy, cost and where your data is allowed to go.',
      },
      {
        id: 'ai-data',
        question: 'How do you handle our business data?',
        answer:
          'We agree up front where your data may go, then design around it. That covers which model providers can see it, whether it stays in your own cloud account, and which parts of the system can access what.',
      },
      {
        id: 'ai-integrate',
        question: 'Can you integrate AI into existing software?',
        answer:
          'Yes. Most of our AI work adds a capability to a product that already exists, such as document extraction, search or drafting, connected through your current APIs and databases.',
      },
      {
        id: 'ai-agents',
        question: 'Can you develop AI agents for business automation?',
        answer:
          'Yes. We build agents that read context, call your tools and APIs and carry out defined workflows. Each one has limits on what it can change, and a person approves the steps that matter.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Have A Task AI Could Take On?',
      description:
        'Tell us what the input looks like and what a good answer is. We reply within one business day to set up a discovery call.',
      primary: { label: 'Build Your AI Solution', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  erp: {
    slug: 'erp',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    hero: {
      eyebrow: 'What We Build · ERP',
      title: 'Custom ERP Development',
      highlight: 'For Stock, Orders And Suppliers',
      description:
        'An ERP is the one system that holds your stock, orders, suppliers and finances. We build custom ERPs and connect them to your storefronts, marketplaces and accounting, as we did for BuffyHub, which runs Amazon, eBay and Walmart from one place.',
      cta: { label: 'Plan Your ERP', href: '/contact' },
    },
    capabilitiesTitle: 'What An ERP Covers',
    capabilitiesIntro:
      'An ERP earns its keep when stock, orders, suppliers and money stop living in separate tools that nobody fully trusts.',
    capabilities: [
      {
        title: 'Inventory and orders',
        description:
          'One record of stock and orders that every channel reads from. Westar pulls orders from several storefronts and batches them for picking and packing.',
      },
      {
        title: 'Finance and invoicing',
        description:
          'Billable hours, invoices and accounting sync. ATC sends billable hours to Zoho Books and generates invoices from them.',
      },
      {
        title: 'People and HR',
        description:
          'Staff records, roles and approvals in the same system as the work. ATC holds HR information for hundreds of employees.',
      },
      {
        title: 'Suppliers and vendors',
        description:
          'Vendor records and stock feeds that update themselves. Autobuffy pulls vendor inventory automatically instead of importing spreadsheets.',
      },
      {
        title: 'Service operations',
        description:
          'Bookings, parts stock and billing for service businesses. Mi Taller runs automotive workshops this way.',
      },
    ],
    story: {
      eyebrow: 'Project story · BuffyHub',
      title: 'One back office for inventory, orders, brands and vendors',
      intro:
        'BuffyHub gives online sellers one place to run inventory, orders, brands and vendors across Amazon, eBay and Walmart. As volumes grew, the platform had to hold far more data and traffic without slowing down or going offline.',
      problem:
        'Inventory, order, brand and vendor records were growing fast, and the existing setup was not built to store or serve that much data. Busy periods slowed pages down, no single integration connected all the selling channels, and the stored data needed stronger protection.',
      changes: [
        'Moved the data onto Amazon RDS and S3, sized for large volumes of inventory, order, brand and vendor records.',
        'Put the application behind an Elastic Load Balancer on EC2, so traffic spreads out and capacity grows without downtime.',
        'Connected payment gateways, shipping providers and inventory systems through APIs and webhooks, so data moves between them without manual exports.',
        'Added encryption, authentication and authorization around the stored data.',
        'Cut load times with caching, minification and lazy loading, and covered the platform with unit, integration and acceptance tests.',
      ],
      outcome:
        'Sellers run their whole catalog and order flow from one platform that handles more traffic and keeps their data protected. Most ERP work comes down to this: one reliable record of stock, orders and suppliers that every channel reads from.',
      facts: [
        { label: 'Team', value: '2 engineers' },
        { label: 'Effort', value: '3,344 hours' },
        { label: 'Channels', value: 'Amazon, eBay, Walmart' },
        { label: 'Stack', value: 'Ruby on Rails, PostgreSQL, AWS' },
      ],
      href: '/our-work/case-studies/buffyhub',
      linkLabel: 'Read the full BuffyHub case study',
    },
    processTitle: 'From Spreadsheets To One System',
    processIntro:
      'An ERP replaces tools people depend on every day, so it is built and moved across in stages.',
    process: [
      {
        phase: 'Discover',
        title: 'Map The Flows',
        description:
          'We trace how stock, orders and money move today, across every tool and spreadsheet involved.',
      },
      {
        phase: 'Build',
        title: 'Build The Core First',
        description:
          'The shared records come first, then each team’s screens, shown in weekly demos against agreed milestones.',
      },
      {
        phase: 'Migrate',
        title: 'Move In Stages',
        description:
          'Each area moves across with its data checked against the old system before the next one starts.',
      },
    ],
    techTitle: 'Technology For Enterprise Software',
    techIntro: 'The backend, database and integration stack behind our ERP and order systems.',
    tech: [
      'react',
      'nextdotjs',
      'nodedotjs',
      'python',
      'dotnet',
      'postgresql',
      'mongodb',
      'amazonaws',
      'microsoftazure',
      'graphql',
      'docker',
      'kubernetes',
    ],
    benefitsTitle: 'When To Build An ERP Instead Of Buying One',
    benefitsIntro:
      'Most companies should start with an off-the-shelf ERP. Building your own makes sense in a few specific cases, and these are the questions we ask first.',
    benefits: [
      {
        title: 'Your channels are unusual',
        description:
          'If you sell through marketplaces, wholesale and your own store, and no product syncs them the way you work, a custom core can. BuffyHub runs Amazon, eBay and Walmart from one place.',
      },
      {
        title: 'Your costing is your edge',
        description:
          'Manufacturers and service firms with their own way of costing jobs often lose that detail inside a standard ERP.',
      },
      {
        title: 'You pay for modules you never use',
        description:
          'Large suites charge for breadth. A focused system that covers your real workflows can cost less to run.',
      },
      {
        title: 'It has to talk to everything',
        description:
          'Accounting, shipping, payments and storefronts. Integration is usually the bulk of an ERP project, so we scope it first.',
      },
      {
        title: 'Buy when a standard ERP fits',
        description:
          'If an established product covers your processes, use it and build only the integrations or reports it lacks.',
      },
      {
        title: 'Migrate in stages',
        description:
          'Move one area at a time, such as inventory first and invoicing next, so the business never runs on a half-finished system.',
      },
    ],
    projectsTitle: 'ERP Work In Action',
    projectsIntro: 'Back-office and order systems from our portfolio.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('buffyhub'), projectRef('westar'), projectRef('atc')],
    showTestimonials: true,
    faqsTitle: 'ERP Development FAQs',
    faqsIntro: 'What operations and finance leads ask before replacing their back office.',
    faqs: [
      {
        id: 'erp-what',
        question: 'What does ERP development involve?',
        answer:
          'Building the system that holds your stock, orders, suppliers and finances in one place, then connecting it to the tools around it: storefronts, marketplaces, accounting, shipping and payments.',
      },
      {
        id: 'erp-build-buy',
        question: 'Should we build an ERP or buy one?',
        answer:
          'Buy if an established product covers your processes. Build, or extend one, when your channels, costing or workflows are what the standard products get wrong.',
      },
      {
        id: 'erp-integrate',
        question: 'Can you integrate an ERP with our existing systems?',
        answer:
          'Yes. On BuffyHub we connected payment gateways, shipping providers and inventory systems through APIs and webhooks, so data flows between them automatically.',
      },
      {
        id: 'erp-migrate',
        question: 'How do you move us off the old system without disruption?',
        answer:
          'One area at a time. We migrate and check the data for each part, run old and new side by side where needed, and switch over once the numbers match.',
      },
      {
        id: 'erp-scale',
        question: 'Will it keep up as order volumes grow?',
        answer:
          'It has to be designed for that from the start. BuffyHub runs on Amazon RDS, S3 and load-balanced EC2, so it takes on more data and traffic without downtime.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Ready To Plan Your ERP?',
      description:
        'Tell us which tools and spreadsheets run your operations today. We reply within one business day to set up a discovery call.',
      primary: { label: 'Plan Your ERP', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  crm: {
    slug: 'crm',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    reading: {
      href: '/blog/custom-crm-or-gohighlevel',
      label: 'Custom CRM or GoHighLevel? When to build and when to configure',
    },
    hero: {
      eyebrow: 'What We Build · CRM',
      title: 'Custom CRM Development',
      highlight: 'Around How You Work With Clients',
      description:
        'A CRM keeps every client, conversation and commitment where your whole team can see it. We build custom CRMs and client portals when standard tools don’t fit, like Klingit, where clients, designers and managers have run more than 5,000 projects.',
      cta: { label: 'Build Your CRM', href: '/contact' },
    },
    capabilitiesTitle: 'What We Build Into A CRM',
    capabilitiesIntro:
      'Most teams outgrow a spreadsheet of clients long before they need a full sales CRM. What they need is one place that shows where every client stands.',
    capabilities: [
      {
        title: 'One record per client',
        description:
          'Contacts, history, files and conversations in one place. Coach Catalyst keeps each client’s details, progress and messages on a single screen.',
      },
      {
        title: 'Every channel in one inbox',
        description:
          'Email, chat, SMS and voice brought together. Contakti gives support teams one hub for all four.',
      },
      {
        title: 'Pipelines that match your process',
        description:
          'Stages for projects, renewals or reviews as well as sales deals. NPTAAS tracks each client review from scheduling to the final report.',
      },
      {
        title: 'Client portals',
        description:
          'Self-serve logins where clients check progress, approve work and download files.',
      },
      {
        title: 'Automated follow-ups',
        description:
          'Onboarding steps, reminders and handovers that run on their own, so nothing depends on someone remembering.',
      },
    ],
    story: {
      eyebrow: 'Project story · Klingit',
      title: 'Keeping clients, designers and managers on the same page',
      intro:
        'Klingit connects brands with a global pool of creatives for design and motion work. More than 5,000 projects have run through it, with clients, designers, managers and admins all working in the same system.',
      problem:
        'Communication between clients, designers, managers and admins was scattered, which delayed projects and frustrated everyone. The old project tools were manual, so progress was hard to see and deadlines slipped. Onboarding a new client onto multi-person work was slow, and requests added mid-project pushed past budget and timeline.',
      changes: [
        'Built a central communication hub with real-time updates, one-to-one messaging and clear assignment tracking.',
        'Added project-state tracking, automated workflows and progress views, so everyone can see where each job stands.',
        'Automated client onboarding with instructions, plan templates and instant access to the right channels.',
        'Gave clients self-serve progress views, so they can check on their work without asking.',
        'Introduced a change-management step that documents new requests and renegotiates scope and budget when needed.',
        'Added encryption and access controls around client data and brand assets.',
      ],
      outcome:
        'Clients, designers and admins now work from one shared dashboard, with less chasing and clearer workloads, and the self-serve progress views raised client satisfaction and retention. A good CRM does exactly this: it puts every client conversation and commitment where the whole team can see it.',
      facts: [
        { label: 'Team', value: '2 engineers' },
        { label: 'Effort', value: '1,400 hours' },
        { label: 'Projects run', value: '5,000+' },
        { label: 'Stack', value: 'Ruby on Rails, Vue.js, Redis, Stripe' },
      ],
      href: '/our-work/case-studies/klingit',
      linkLabel: 'Read the full Klingit case study',
    },
    processTitle: 'From Strategy To Success',
    processIntro:
      'A CRM only works if the team uses it, so it is built around the roles that will live in it every day.',
    process: [
      {
        phase: 'Discover',
        title: 'Map The Relationship',
        description:
          'We follow a client from first contact to repeat work and list every place their information lives today.',
      },
      {
        phase: 'Develop',
        title: 'Build Around Real Roles',
        description:
          'Sales, delivery and support each get the views and permissions they need, shown in weekly demos.',
      },
      {
        phase: 'Migrate',
        title: 'Bring The History Across',
        description:
          'Contacts and history are cleaned, moved in a test batch for you to check, then migrated in full.',
      },
    ],
    techTitle: 'Technology Behind CRM',
    techIntro: 'The stack behind the client systems and portals we have built.',
    tech: [
      'react',
      'nextdotjs',
      'nodedotjs',
      'python',
      'dotnet',
      'postgresql',
      'mongodb',
      'amazonaws',
      'microsoftazure',
      'graphql',
      'docker',
      'kubernetes',
    ],
    benefitsTitle: 'Build A CRM Or Customize One?',
    benefitsIntro:
      'Most teams should start with an established CRM. A custom one earns its cost when your client relationships do not fit a standard sales pipeline.',
    benefits: [
      {
        title: 'Your clients work inside it',
        description:
          'When clients log in to see progress, upload files or approve work, as they do on Klingit, a portal built around your process beats a bolted-on one.',
      },
      {
        title: 'Your pipeline is not a funnel',
        description:
          'Projects, subscriptions, support cases and bookings rarely fit the deals-and-stages model that standard CRMs are built around.',
      },
      {
        title: 'Support is the relationship',
        description:
          'If most contact comes through support, routing and ticket history matter more than a sales pipeline. Contakti routes incoming messages to the right team with AI.',
      },
      {
        title: 'Data has to sync both ways',
        description:
          'Billing, scheduling and email need to read from and write back to the CRM, or the team stops trusting it.',
      },
      {
        title: 'Customize when a standard CRM fits',
        description:
          'If HubSpot or Salesforce covers your process, configure and integrate it instead of building from scratch.',
      },
      {
        title: 'Plan the data migration early',
        description:
          'Moving years of contacts and history is usually the riskiest part, so it gets mapped and tested before launch.',
      },
    ],
    projectsTitle: 'CRM Solutions In Action',
    projectsIntro: 'Client and support systems from our portfolio.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('atc'), projectRef('contakti'), projectRef('klingit')],
    faqsTitle: 'CRM Development FAQs',
    faqsIntro: 'What teams ask before replacing their CRM or building their own.',
    faqs: [
      {
        id: 'crm-integrate',
        question: 'Can you integrate custom CRM software with existing business systems?',
        answer:
          'Yes. A CRM is only useful when the tools around it feed it. Integrations with email, billing, calendars and support channels are part of the scope from the start.',
      },
      {
        id: 'crm-migrate',
        question: 'How do you migrate customer data from an existing CRM system?',
        answer:
          'We map every field in the old system, clean out duplicates and move a test batch for you to check. The rest follows once the numbers match.',
      },
      {
        id: 'crm-portal',
        question: 'Can our clients log in to see their own projects?',
        answer:
          'Yes. Klingit gives clients self-serve progress views, which raised client satisfaction and retention.',
      },
      {
        id: 'crm-automation',
        question: 'Can you build automated workflows for sales and customer management?',
        answer:
          'Yes. Klingit automates client onboarding with instructions, plan templates and access to the right channels, and Contakti routes support tickets to the right team automatically.',
      },
      {
        id: 'crm-roles',
        question: 'Can you develop role-based CRM applications for multiple departments?',
        answer:
          'Yes. Klingit is built for four roles, clients, designers, managers and admins, and each one sees the parts of the system they need.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Ready To See Every Client In One Place?',
      description:
        'Tell us where your client information lives today. We reply within one business day to set up a discovery call.',
      primary: { label: 'Start Your CRM Project', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  saas: {
    slug: 'saas',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    reading: {
      href: '/blog/vue-2-to-vue-3-migration',
      label: 'Moving a live SaaS from Vue 2 to Vue 3',
    },
    hero: {
      eyebrow: 'What We Build · SaaS',
      title: 'SaaS Development',
      highlight: 'From First MVP To Live Platform',
      description:
        'We build and grow subscription software, covering sign-up, billing, roles and the product itself, from the first MVP to a live platform. For Coach Catalyst we added a Stripe Connect marketplace and moved the front end to Vue 3 while customers kept using it.',
      cta: { label: 'Build Your SaaS Product', href: '/contact' },
    },
    capabilitiesTitle: 'What A SaaS Product Needs',
    capabilitiesIntro:
      'A SaaS product is two things at once: the feature customers pay for, and the accounts, billing and admin that keep a subscription business running.',
    capabilities: [
      {
        title: 'Accounts, roles and teams',
        description:
          'Sign-up, invitations and permissions for admins, team members and end customers.',
      },
      {
        title: 'Subscription billing',
        description:
          'Plans, trials and upgrades through Stripe. Klingit bills its customers on multi-tier subscriptions.',
      },
      {
        title: 'Real-time features',
        description:
          'Messaging, video and live updates. Whistle It runs secure video meetings on top of the open-source BigBlueButton engine.',
      },
      {
        title: 'Scheduled and bulk jobs',
        description:
          'Work that runs in the background at scale. One40Connect sends scheduled and recurring text campaigns for its customers.',
      },
      {
        title: 'Data-heavy products',
        description:
          'Products that crawl, track or process data all day. Clicks.so tracks thousands of keyword rankings without its server costs climbing.',
      },
    ],
    story: {
      eyebrow: 'Project story · Coach Catalyst',
      title: 'Turning a coaching tool into a marketplace that pays coaches directly',
      intro:
        'Coach Catalyst is a platform where fitness coaches run their client programs: scheduling, messaging and progress tracking. The product worked, but it was slow, hard to use and built on code that made new features risky.',
      problem:
        'Pages loaded slowly and people struggled to finish tasks. Coaches had no built-in way to get paid by their clients. The chat module was written in CoffeeScript and struggled under load. The codebase had never been planned for a community feature, and the front end was still on Vue 2.',
      changes: [
        'Redesigned the interface for clarity and cut load times by optimizing code, requests and media.',
        'Built a Stripe Connect marketplace with OAuth onboarding, so coaches get paid by their clients directly and payouts are handled securely.',
        'Rewrote the CoffeeScript chat in Vue.js with real-time updates that hold up under load.',
        'Added a community module in phases, isolating its components so the rest of the product kept working.',
        'Migrated the front end from Vue 2 to Vue 3 with the Composition API, which also reduced the bundle size.',
      ],
      outcome:
        'The platform is faster and easier to use, and the marketplace opened a new revenue stream for coaches and for the business. That is typical of SaaS work: most of the value comes from improving a live product without interrupting the customers who pay for it.',
      facts: [
        { label: 'Team', value: '2 engineers' },
        { label: 'Effort', value: '4,272 hours' },
        { label: 'Payments', value: 'Stripe Connect' },
        { label: 'Stack', value: 'Ruby on Rails, Vue 3, PostgreSQL, Redis' },
      ],
      href: '/our-work/case-studies/coach-catalyst',
      linkLabel: 'Read the full Coach Catalyst case study',
    },
    processTitle: 'From Idea To Scale',
    processIntro:
      'We ship the smallest version paying customers will use, then let usage decide what comes next.',
    process: [
      {
        phase: 'Discover',
        title: 'Shape The First Version',
        description:
          'We agree the one workflow customers will pay for, plus sign-up and billing, and leave the rest for later.',
      },
      {
        phase: 'Develop',
        title: 'Build For Many Customers',
        description:
          'Tenant separation, roles and billing go in from the first sprint, with weekly demos of the product.',
      },
      {
        phase: 'Scale',
        title: 'Grow With Usage',
        description:
          'Product analytics show which features people use, and the roadmap follows them.',
      },
    ],
    techTitle: 'Technology Behind SaaS Products',
    techIntro: 'The stack behind the subscription products in our portfolio.',
    tech: [
      'react',
      'nextdotjs',
      'nodedotjs',
      'python',
      'dotnet',
      'postgresql',
      'mongodb',
      'amazonaws',
      'microsoftazure',
      'google',
      'graphql',
      'docker',
      'kubernetes',
    ],
    benefitsTitle: 'What To Get Right Early In A SaaS Product',
    benefitsIntro:
      'Some SaaS decisions are cheap to change later and some are not. These are the ones we settle at the start.',
    benefits: [
      {
        title: 'How tenants are separated',
        description:
          'Whether customers share a database or each get their own affects security, cost and how hard enterprise deals become later.',
      },
      {
        title: 'Billing and payouts',
        description:
          'Subscriptions, trials, usage pricing or marketplace payouts like the Stripe Connect setup on Coach Catalyst all shape the data model.',
      },
      {
        title: 'Roles and permissions',
        description:
          'Admins, team members and end customers need different access. Retrofitting permissions into a live product is slow and risky.',
      },
      {
        title: 'An MVP that is a real product',
        description:
          'Ship the smallest version paying customers will use, with sign-up and billing working, and leave the rest for later.',
      },
      {
        title: 'Upgrades without downtime',
        description:
          'Frameworks age. Coach Catalyst moved from Vue 2 to Vue 3 while customers kept using it, which is far easier when the code is kept tidy.',
      },
      {
        title: 'Usage data from day one',
        description:
          'Product analytics show which features people pay for, so the roadmap follows evidence instead of guesses.',
      },
    ],
    projectsTitle: 'SaaS Products In Action',
    projectsIntro: 'SaaS products from our portfolio.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('whistle'), projectRef('one40connect'), projectRef('legal-atoms')],
    faqsTitle: 'SaaS Development FAQs',
    faqsIntro: 'What founders and product leads ask before building a SaaS product.',
    faqs: [
      {
        id: 'saas-what',
        question: 'What is SaaS application development?',
        answer:
          'Building software that customers subscribe to and use in a browser or an app. It also covers what a subscription business needs around it: accounts, billing, roles, onboarding and analytics.',
      },
      {
        id: 'saas-mvp',
        question: 'Can you build a SaaS MVP before developing the full product?',
        answer:
          'Yes. An MVP should include the core workflow, sign-up and billing, so you learn whether people will pay. Everything else waits for evidence.',
      },
      {
        id: 'saas-multitenant',
        question: 'How do you build scalable multi-tenant SaaS applications?',
        answer:
          'We decide early whether customers share tables scoped by tenant or get separate databases, based on your security needs and target customers. Then that rule is enforced in one place in the code.',
      },
      {
        id: 'saas-takeover',
        question: 'Can you take over an existing SaaS product?',
        answer:
          'Yes. On Coach Catalyst we rewrote the chat, migrated the front end to Vue 3 and added a Stripe Connect marketplace while the platform stayed live.',
      },
      {
        id: 'saas-hire',
        question: 'Can I hire SaaS developers for an existing product?',
        answer:
          'Yes. We can place full-time engineers in your team, or take on a defined part of the roadmap ourselves.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Ready To Build Your SaaS Product?',
      description:
        'Tell us who will pay for it and the one job it has to do. We reply within one business day to set up a discovery call.',
      primary: { label: 'Start Your SaaS Project', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  'custom-software': {
    slug: 'custom-software',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    reading: {
      href: '/blog/how-long-software-projects-take',
      label: 'How long software projects take: data from 28 of our projects',
    },
    hero: {
      eyebrow: 'What We Build · Custom Software',
      title: 'Custom Software Development',
      highlight: 'Built Around Your Business',
      description:
        'Custom software is built around how your business already works, not how an off-the-shelf product expects you to. We have built it for services firms, clinics and marketplaces, including ATC, a system hundreds of employees use every day.',
      cta: { label: 'Build Custom Software', href: '/contact' },
    },
    capabilitiesTitle: 'What Custom Software Fixes',
    capabilitiesIntro:
      'Off-the-shelf tools make you work their way. Custom software is worth it when your process is what sets you apart, or when no product handles it properly.',
    capabilities: [
      {
        title: 'A process no product fits',
        description:
          'Software built around a way of working nobody sells. Alertia schedules guard shifts and checks each guard’s licenses before they start.',
      },
      {
        title: 'Compliance and audit trails',
        description:
          'Rule checks, audit logs and reports you can show an auditor. Falcore flags outdated records and keeps a dated history of every check.',
      },
      {
        title: 'Sensitive records',
        description:
          'Systems that handle health, legal or student data safely. Fisar manages GDPR subject access requests for schools.',
      },
      {
        title: 'Replacing spreadsheets',
        description:
          'Processes that run on shared spreadsheets and email turned into proper tools with permissions and history.',
      },
      {
        title: 'Software you own',
        description:
          'You own the source code and the intellectual property, so you are never locked into one vendor.',
      },
    ],
    story: {
      eyebrow: 'Project story · ATC',
      title: 'Rebuilding the system a services firm runs on',
      intro:
        'ATC is the internal tool one of our clients runs its projects, staff hours, leave, invoicing and client email on. Hundreds of employees work in it, with updates synced live. When it came to us, it had outgrown the way it was first built.',
      problem:
        'Client modules were set up in a way that was hard to manage, and the database held the same information in several places. Analytics queries joined many tables, so dashboards loaded slowly. Keeping each person’s billing-rate history accurate for invoicing was a constant chore.',
      changes: [
        'Rebuilt the client modules as a simpler V2 structure and removed the duplicated tables underneath it.',
        'Moved rate changes into scheduled Hangfire jobs that update each person’s rate and log every change, so admins can see the history behind any invoice.',
        'Rewrote the slow LINQ analytics as tuned SQL with caching, which took load off the database and sped up the dashboards.',
        'Replaced the CoreUI interface with DevExtreme one component at a time, testing as we went, so nothing broke for the people using it every day.',
        'Connected Zoho Books for billable hours and invoices, Zoho Writer for documents and e-signatures, and Mailgun so client email arrives inside the dashboard.',
      ],
      outcome:
        'The firm now runs HR, resourcing, invoicing and client email from one system that is simpler to maintain and quicker to use. Most custom software work looks like this: a system the business depends on, improved piece by piece while people keep using it.',
      facts: [
        { label: 'Team', value: '3 engineers' },
        { label: 'Effort', value: '2,800 hours' },
        { label: 'Used by', value: 'Hundreds of employees' },
        { label: 'Stack', value: 'ASP.NET Core, Vue.js, PostgreSQL, Redis' },
      ],
      href: '/our-work/case-studies/atc',
      linkLabel: 'Read the full ATC case study',
    },
    processTitle: 'From Idea To Impact',
    processIntro:
      'Every project starts with a discovery call and a delivery plan, and you see working software every week after that.',
    process: [
      {
        phase: 'Discover',
        title: 'Understand The Process',
        description:
          'We map your workflow, users and the systems involved, then you get a delivery plan with milestones.',
      },
      {
        phase: 'Develop',
        title: 'Build And Demo Weekly',
        description:
          'Working software every week, checked against those milestones, so nothing surprises you at the end.',
      },
      {
        phase: 'Support',
        title: 'Run And Improve',
        description:
          'After launch we monitor it, fix what comes up and add features as the business changes.',
      },
    ],
    engagement: {
      title: 'What working with us looks like',
      items: [
        { label: 'Team', value: 'A small dedicated team. ATC was built by 3 engineers.' },
        {
          label: 'Progress',
          value:
            'Weekly demos of working software, checked against the milestones agreed at the start.',
        },
        {
          label: 'Contract',
          value:
            'A defined first scope and no long-term contract. You add more once the fit is proven.',
        },
        {
          label: 'Communication',
          value:
            'A shared Slack channel and project board. Full Blown Media, whose review is on Clutch, ran its project through Slack and Trello.',
        },
      ],
    },
    techTitle: 'Technology Behind Our Software',
    techIntro: 'The stacks we build custom software on, picked to suit the team that will run it.',
    tech: [
      'react',
      'nextdotjs',
      'nodedotjs',
      'python',
      'dotnet',
      'reactnative',
      'postgresql',
      'mongodb',
      'amazonaws',
      'microsoftazure',
      'graphql',
      'docker',
      'kubernetes',
    ],
    benefitsTitle: 'When Custom Software Is The Right Call',
    benefitsIntro:
      'Building your own software costs more up front than a subscription. It pays off in a few specific situations, and it is the wrong choice in others. We will tell you which one you are in.',
    benefits: [
      {
        title: 'Your process is the advantage',
        description:
          'If the way you quote, schedule or deliver is what sets you apart, squeezing it into a generic tool gives that edge away.',
      },
      {
        title: 'Your systems need to talk',
        description:
          'When staff copy data between two tools every day, a proper integration often pays for itself faster than another subscription.',
      },
      {
        title: 'You have outgrown the tool',
        description:
          'Workarounds, spreadsheets running beside the system and per-seat costs that climb with headcount are the usual signs.',
      },
      {
        title: 'Your rules are unusual',
        description:
          'Industry billing rules, compliance steps or approval chains that off-the-shelf products only half support. Nuvana’s HIPAA chronic-care billing is one example.',
      },
      {
        title: 'Skip it when a tool already fits',
        description:
          'If an existing product covers most of what you need, use it and build only the integration or the missing piece.',
      },
      {
        title: 'Wait until the process is clear',
        description:
          'If nobody can yet describe the workflow being automated, start with a short discovery phase before committing to a full build.',
      },
    ],
    projectsTitle: 'Custom Software In Action',
    projectsIntro: 'Custom systems from our portfolio.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('atc'), projectRef('nuvana'), projectRef('cadcam-masters')],
    faqsTitle: 'Custom Software FAQs',
    faqsIntro: 'What buyers ask before commissioning custom software.',
    faqs: [
      {
        id: 'custom-when',
        question: 'When should a business choose custom software development?',
        answer:
          'When your own way of working is part of what you sell, when staff re-key data between systems, or when you have outgrown a tool you rent. If an existing product already covers most of your needs, adding an integration is usually the cheaper route.',
      },
      {
        id: 'custom-start',
        question: 'How does a custom software project start?',
        answer:
          'With a discovery call to map your goals, constraints and the systems involved. You then get a team recommendation, a timeline and a delivery plan with milestones before the build begins.',
      },
      {
        id: 'custom-contract',
        question: 'Do we need to sign a long-term contract?',
        answer:
          'No. Work starts with a defined scope, and you add more only once the fit is proven.',
      },
      OWNERSHIP_FAQ,
      {
        id: 'custom-progress',
        question: 'How will we see progress?',
        answer:
          'Through weekly demos of working software, checked against the milestones agreed at the start.',
      },
      {
        id: 'custom-takeover',
        question: 'Can you improve a system another team built?',
        answer:
          'Yes, and it is a large part of our work. On ATC we restructured an existing system’s modules and database. We then moved its interface to a new UI library one component at a time, while staff kept using it.',
      },
      {
        id: 'custom-scalable',
        question: 'How do you keep custom software fast as it grows?',
        answer:
          'We measure first and fix the real bottleneck. On ATC the slow part was analytics queries joining many tables, so we rewrote them as tuned SQL and added caching instead of adding servers.',
      },
      {
        id: 'custom-integrate',
        question: 'Can you integrate custom software with existing systems?',
        answer:
          'Yes. We integrate custom applications with CRMs, ERPs, accounting and payment systems, email providers and internal tools. ATC, for example, syncs with Zoho Books and Zoho Writer and receives client email through Mailgun.',
      },
      {
        id: 'custom-tech',
        question: 'What technologies do you use for custom software development?',
        answer:
          'React, Next.js, Vue.js, Node.js, Ruby on Rails, Python, .NET, PostgreSQL, MongoDB, AWS and Azure, chosen to fit the project and the team that will maintain it afterwards.',
      },
      {
        id: 'custom-healthcare',
        question: 'Can you develop custom healthcare software?',
        answer:
          'Yes. Nuvana, a chronic-care billing platform, was built around HIPAA requirements, and MicroHealth runs a suite of healthcare apps including chat, mapping and CRM tools.',
      },
    ],
    cta: {
      title: 'Ready To Build Software Around Your Business?',
      description:
        'Tell us about the process you want to fix. We reply within one business day to set up a discovery call.',
      primary: { label: 'Build Custom Software', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  cloud: {
    slug: 'cloud',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    hero: {
      eyebrow: 'What We Build · Cloud',
      title: 'Cloud Migration And Services',
      highlight: 'On AWS, Azure And Google Cloud',
      description:
        'We move applications to AWS and Azure and shape the infrastructure around how they are really used, so they stay fast under load and cost less to run. Autobuffy’s 100,000-part store now scales automatically with its traffic.',
      cta: { label: 'Modernize Your Cloud', href: '/contact' },
    },
    capabilitiesTitle: 'What We Do In The Cloud',
    capabilitiesIntro:
      'Cloud bills grow and sites slow down when infrastructure is shaped around guesses instead of how the application is really used.',
    capabilities: [
      {
        title: 'Migration',
        description:
          'Moving applications and databases one service at a time, with traffic switched over once each part checks out.',
      },
      {
        title: 'Scaling for traffic',
        description:
          'Load balancers and auto-scaling so capacity follows demand. BuffyHub runs behind an Elastic Load Balancer on EC2.',
      },
      {
        title: 'Serverless and managed services',
        description:
          'Managed databases, storage and serverless setups that remove routine server work. Whistle It runs its meeting rooms serverless on Google Cloud.',
      },
      {
        title: 'Storage and heavy files',
        description:
          'Direct uploads to object storage and separate pipelines for large files, so uploads never slow the site down.',
      },
      {
        title: 'Security and access',
        description:
          'Least-privilege access, encryption and secrets kept out of the code, set up before anything moves.',
      },
    ],
    story: {
      eyebrow: 'Project story · Autobuffy',
      title: 'Keeping a 100,000-part store fast under heavy traffic',
      intro:
        'Autobuffy is a US auto parts store selling more than 100,000 parts on a dropshipping model. Customers search by make, model and year while vendors send constant inventory updates. Six of our engineers have put around 28,000 hours into it.',
      problem:
        'The server setup struggled with the volume of API calls and file activity, so the site slowed down under traffic. Admin uploads competed with shoppers for the same servers. Large files went to the server first and then on to S3, which was slow and expensive, and inventory still arrived by FTP, CSV and Excel.',
      changes: [
        'Put the store behind AWS load balancers with auto-scaling, so capacity follows traffic.',
        'Split the shop and the admin onto separate servers, so heavy admin uploads no longer slow customers down.',
        'Switched to direct uploads from the browser to S3, cutting server load and cost.',
        'Built an inventory microservice that pulls vendor stock automatically and keeps it in sync in real time through APIs.',
        'Added Elasticsearch and reworked the database indexes, so searching by make, model and year is fast again.',
      ],
      outcome:
        'The store stays reliable at peak load, and inventory is accurate without manual imports. Cloud work is mostly this: shaping the infrastructure around how the application is really used. Then it scales where it needs to and costs less where it does not.',
      facts: [
        { label: 'Team', value: '6 engineers' },
        { label: 'Effort', value: '28,000 hours' },
        { label: 'Catalog', value: '100,000+ parts' },
        { label: 'Stack', value: 'Ruby on Rails, Angular, Elasticsearch, AWS' },
      ],
      href: '/our-work/case-studies/autobuffy',
      linkLabel: 'Read the full Autobuffy case study',
    },
    processTitle: 'From Infrastructure To Cloud',
    processIntro: 'We measure how the application is used before deciding what it should run on.',
    process: [
      {
        phase: 'Assess',
        title: 'Map What You Run',
        description:
          'We list every service, database and dependency, and how much traffic and data each one handles.',
      },
      {
        phase: 'Migrate',
        title: 'Move One Piece At A Time',
        description:
          'Each service moves with monitoring in place, and traffic switches only once it checks out.',
      },
      {
        phase: 'Optimize',
        title: 'Right-Size And Secure',
        description:
          'We tune server sizes, storage and access rules to the real load and set usage alerts.',
      },
    ],
    techTitle: 'Technology Behind Cloud Services',
    techIntro: 'The cloud platforms and infrastructure tools behind our projects.',
    tech: [
      'amazonaws',
      'microsoftazure',
      'google',
      'docker',
      'kubernetes',
      'terraform',
      'ansible',
      'postgresql',
      'mongodb',
      'prometheus',
      'grafana',
      'github',
      'gitlab',
    ],
    benefitsTitle: 'Getting The Cloud Right',
    benefitsIntro:
      'Moving to the cloud does not make software faster or cheaper on its own. These are the decisions that do.',
    benefits: [
      {
        title: 'Scale the busy parts',
        description:
          'Separate the pieces that see spikes, like the Autobuffy storefront, from the ones that do not, and scale each on its own.',
      },
      {
        title: 'Managed services first',
        description:
          'Managed databases, storage and load balancers remove most routine operations work before you write any automation.',
      },
      {
        title: 'Send files straight to storage',
        description:
          'Uploading through your own servers costs money and slows them down. Direct uploads to object storage avoid both.',
      },
      {
        title: 'Keep secrets out of code',
        description:
          'Credentials belong in a secrets manager with access limited by role, never in the repository.',
      },
      {
        title: 'Separate staging from production',
        description:
          'Test every change on a copy of production first. It is the cheapest insurance a team can buy.',
      },
      {
        title: 'Watch the bill',
        description:
          'Set budgets and alerts from day one. Idle servers and oversized databases are the usual surprise.',
      },
    ],
    projectsTitle: 'Cloud Solutions In Action',
    projectsIntro: 'Products whose hosting we designed or moved.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('truck-4'), projectRef('autobuffy'), projectRef('whistle')],
    faqsTitle: 'Cloud Services FAQs',
    faqsIntro: 'What teams ask before moving to the cloud or changing providers.',
    faqs: [
      {
        id: 'cloud-migration',
        question: 'How do cloud migration services work?',
        answer:
          'We map what you run today and agree a target design. Then we move one service or environment at a time, test each step, and switch traffic over once everything checks out.',
      },
      {
        id: 'cloud-existing',
        question: 'Can you migrate existing applications to the cloud?',
        answer:
          'Yes, including apps that were never built for it. Often the first step is separating heavy jobs, uploads or admin work from what customers use, as we did on Autobuffy.',
      },
      {
        id: 'cloud-providers',
        question: 'Which cloud providers do you work with?',
        answer:
          'Mainly AWS and Azure. Autobuffy and BuffyHub run on AWS, and Truck-4 runs on Kubernetes with Azure DevOps pipelines.',
      },
      {
        id: 'cloud-security',
        question: 'How do you secure cloud infrastructure?',
        answer:
          'With least-privilege access, encryption for data at rest and in transit, secrets kept in a managed vault, private networking for databases and audit logging.',
      },
      {
        id: 'cloud-cost',
        question: 'Can you lower our cloud bill?',
        answer:
          'Often. Right-sizing servers, sending uploads straight to storage and scaling only the busy parts usually make the biggest difference.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Ready To Move Or Fix Your Cloud Setup?',
      description:
        'Tell us what you run today and where it hurts. We reply within one business day to set up a discovery call.',
      primary: { label: 'Modernize Your Cloud', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  automation: {
    slug: 'automation',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    reading: {
      href: '/blog/luxe-excursions-booking-planner',
      label: 'Our booking planner refused 75% of trips. The fix was the data.',
    },
    hero: {
      eyebrow: 'What We Build · Automation',
      title: 'Business Process Automation',
      highlight: 'For The Jobs People Forget',
      description:
        'Business process automation takes repetitive, rule-based jobs off your team, such as alerts, follow-ups, data syncs and checks. For Luxe Excursions, staff hear about every booking instantly and every guest gets one review request after their trip.',
      cta: { label: 'Automate Your Processes', href: '/contact' },
    },
    capabilitiesTitle: 'What We Automate',
    capabilitiesIntro:
      'Every business has jobs that depend on someone remembering. Those are the first ones worth automating.',
    capabilities: [
      {
        title: 'Alerts and notifications',
        description:
          'Emails and messages that go out when something happens, such as a booking being paid or a document about to expire.',
      },
      {
        title: 'Report generation',
        description:
          'Reports built automatically from the data. NPTAAS generates its audit reports with no manual calculation.',
      },
      {
        title: 'Document workflows',
        description:
          'Paperwork prepared and sent without anyone retyping it. LegalAtoms generates court documents in the background and emails case updates.',
      },
      {
        title: 'Data syncs between systems',
        description:
          'Orders, stock, hours and invoices kept in step between tools through APIs and scheduled jobs.',
      },
      {
        title: 'Test automation',
        description:
          'Automated tests, including Selenium browser tests, that check every release before it goes live.',
      },
    ],
    story: {
      eyebrow: 'Project story · Luxe Excursions',
      title: 'Automating the busywork behind a Tenerife tour company',
      intro:
        'Luxe Excursions sells luxury tours, packages and rentals in Tenerife. We built its booking platform and staff CMS, and we also run its SEO, Google Ads and Business Profile. Much of the value has come from automating small jobs that used to depend on someone remembering.',
      problem:
        'When a guest paid or sent a trip request, only the guest got an email, so the team could miss a sale or an enquiry. Asking guests for Google reviews was manual, and reviews drive how the business shows up in local search.',
      changes: [
        'Staff get an email the moment a booking is paid or a trip request comes in, with the guest set as reply-to so they can answer straight away.',
        'Each alert goes out once per booking, so payment retries and repairs never send duplicates.',
        'Every guest gets one automatic Google review request at 10:00 local time the day after their last activity. It only goes out within a week of the trip, and never twice to the same address.',
        'Test and agency bookings are left out of review requests, and a lock stops two workers from sending the same email.',
        'Payments run through Stripe, and staff edit tours, prices and images in the CMS without a developer.',
      ],
      outcome:
        'The team hears about every sale and enquiry as it happens, review requests go out on their own, and the website runs day to day without developer help. Good automation is usually this unglamorous: it takes the jobs people forget and does them the same way every time.',
      facts: [
        { label: 'Status', value: 'Live' },
        { label: 'Stack', value: 'Django, Next.js, PostgreSQL, Stripe' },
        { label: 'Hosting', value: 'AWS' },
        { label: 'We also run', value: 'SEO, Google Ads, Business Profile' },
      ],
      href: 'https://luxeexcursionstenerife.com',
      linkLabel: 'Visit Luxe Excursions',
    },
    processTitle: 'From Manual To Automated',
    processIntro: 'We automate one job at a time, so each one is proven before the next goes live.',
    process: [
      {
        phase: 'Discover',
        title: 'Find The Repeats',
        description:
          'We list the jobs people do by hand every day or week, and what each one costs in time and mistakes.',
      },
      {
        phase: 'Automate',
        title: 'One Job At A Time',
        description:
          'Each automation is built, tested on real cases and switched on separately, with a person able to override it.',
      },
      {
        phase: 'Monitor',
        title: 'Check It Keeps Working',
        description:
          'Every automation logs what it did, and failures alert someone instead of failing silently.',
      },
    ],
    techTitle: 'Technology Behind Automation',
    techIntro: 'The integration and workflow tools behind our automations.',
    tech: [
      'graphql',
      'nodedotjs',
      'python',
      'dotnet',
      'n8n',
      'zapier',
      'openai',
      'amazonaws',
      'microsoftazure',
      'google',
      'docker',
      'kubernetes',
    ],
    benefitsTitle: 'What To Automate First',
    benefitsIntro:
      'The best candidates are frequent, rule-based and annoying. These are the ones that usually pay back fastest.',
    benefits: [
      {
        title: 'Alerts people should not miss',
        description:
          'New sales, enquiries, failed payments and expiring documents. Luxe Excursions emails staff the moment a booking is paid.',
      },
      {
        title: 'Follow-ups that get forgotten',
        description:
          'Review requests, reminders and renewals sent on a schedule. Luxe asks every guest for a review the day after their trip.',
      },
      {
        title: 'Data re-keyed between systems',
        description:
          'Orders, stock and invoices copied from one tool to another by hand. Autobuffy now pulls vendor inventory automatically.',
      },
      {
        title: 'Checks against a rulebook',
        description:
          'Compliance and certification checks that flag problems early. Alertia cross-checks guard shifts against license expiry dates.',
      },
      {
        title: 'Routing incoming work',
        description:
          'Sending each ticket or request to the right person. Contakti routes support messages with AI.',
      },
      {
        title: 'Leave judgment calls to people',
        description:
          'Automate the steps around a decision, then let a person make it. Refunds, hiring and pricing exceptions are good examples.',
      },
    ],
    projectsTitle: 'Automation In Action',
    projectsIntro: 'Automations from our portfolio.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('cercle'), projectRef('falcore'), projectRef('alertia')],
    faqsTitle: 'Automation Services FAQs',
    faqsIntro: 'What teams ask before handing work to software.',
    faqs: [
      {
        id: 'automation-what',
        question: 'What are business process automation services?',
        answer:
          'Finding the repetitive, rule-based work in your business, then building the software that does it: alerts, follow-ups, data syncs, approvals and checks.',
      },
      {
        id: 'automation-which',
        question: 'Which business processes can you automate?',
        answer:
          'Booking and order alerts, review requests and reminders, inventory and order syncs, invoice generation, document checks and support routing. Each of these runs in a project we have built.',
      },
      {
        id: 'automation-systems',
        question: 'Can you automate workflows across different business systems?',
        answer:
          'Yes. Most automation is integration work: Cercle syncs its catalog and orders with Facebook, and ATC sends billable hours to Zoho Books.',
      },
      {
        id: 'automation-qa',
        question: 'Do you provide QA automation services?',
        answer:
          'Yes. We write automated test suites, including Selenium browser tests, and run them on every change.',
      },
      {
        id: 'automation-ai',
        question: 'Can AI be used for business process automation?',
        answer:
          'Yes, where the input is messy, such as reading documents or routing free-text messages. Natif extracts fields from scans and handwriting, and Contakti routes tickets with AI. Rule-based steps usually work better without it.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Ready To Hand Off The Repetitive Work?',
      description:
        'Tell us which jobs your team repeats every week. We reply within one business day to set up a discovery call.',
      primary: { label: 'Start Your Automation Project', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },
  'legacy-modernization': {
    slug: 'legacy-modernization',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    reading: {
      href: '/blog/xamarin-to-dotnet-maui-migration',
      label: 'Moving a Xamarin app to .NET MAUI, step by step',
    },
    hero: {
      eyebrow: 'What We Build · Legacy Modernization',
      title: 'Modernize Legacy Software',
      highlight: 'Without Stopping The Business',
      description:
        'Legacy modernization brings an old system up to date in stages while people keep using it. We upgraded Autobuffy from Angular 8 to 13 in 20 days and moved Coach Catalyst from Vue 2 to Vue 3.',
      cta: { label: 'Plan Your Modernization', href: '/contact' },
    },
    capabilitiesTitle: 'What Modernization Covers',
    capabilitiesIntro:
      'Old software rarely fails all at once. It gets slower to change, harder to hire for and riskier to deploy, until every new feature costs more than it should.',
    capabilities: [
      {
        title: 'Framework upgrades',
        description:
          'Moving off versions that no longer get security fixes, such as AngularJS, Angular 8 or Vue 2, one tested release at a time.',
      },
      {
        title: 'Rewriting the worst parts first',
        description:
          'Replacing the modules that cause the most bugs or slow everyone down, like Coach Catalyst’s CoffeeScript chat, while the rest keeps running.',
      },
      {
        title: 'Replacing manual data feeds',
        description:
          'Swapping FTP uploads, CSV imports and spreadsheets for APIs and background jobs, as Autobuffy’s inventory microservice did.',
      },
      {
        title: 'Making old apps readable to search engines',
        description:
          'Adding server-side rendering to single-page apps that search engines struggle to read. Autobuffy gained search visibility after we added it.',
      },
      {
        title: 'Moving to modern hosting',
        description:
          'Taking apps off aging servers onto managed cloud infrastructure, with automated deploys and monitoring in place first.',
      },
    ],
    story: {
      eyebrow: 'Project story · Autobuffy',
      title: 'Upgrading a live store from Angular 8 to 13 in 20 days',
      intro:
        'Autobuffy is a US online store selling more than 100,000 auto parts. Its storefront ran on Angular 8, and the pages were built in the browser, which made them hard for search engines to read.',
      problem:
        'The outdated front end held back technical SEO, so the store was harder to find than it should have been. Inventory still arrived by FTP, CSV and Excel, which left stock levels depending on manual imports.',
      changes: [
        'Upgraded the storefront from Angular 8 to Angular 13 in 20 days.',
        'Added server-side rendering, so search engines receive complete pages.',
        'Replaced the FTP, CSV and Excel inventory imports with a microservice that syncs vendor stock through APIs in real time.',
        'Gave the SEO team a way to update SEO attributes themselves, without a developer.',
      ],
      outcome:
        'The upgrade raised search visibility, clicks and sales, and inventory is now accurate without manual work. Most modernization looks like this: a series of contained upgrades, each one shipped and checked before the next.',
      facts: [
        { label: 'Upgrade', value: 'Angular 8 to 13' },
        { label: 'Time', value: '20 days' },
        { label: 'Team', value: '6 engineers' },
        { label: 'Stack', value: 'Angular, Ruby on Rails, Elasticsearch, AWS' },
      ],
      href: '/our-work/case-studies/autobuffy',
      linkLabel: 'Read the full Autobuffy case study',
    },
    processTitle: 'How A Modernization Runs',
    processIntro: 'We change one part at a time and keep the system working at every step.',
    process: [
      {
        phase: 'Assess',
        title: 'Map The System',
        description:
          'We read the code, the hosting and the data, and list what is outdated, what breaks most often and what blocks new features.',
      },
      {
        phase: 'Plan',
        title: 'Order The Upgrades',
        description:
          'Each change gets a scope and a test plan. The riskiest or most expensive problems usually go first.',
      },
      {
        phase: 'Upgrade',
        title: 'Change It In Stages',
        description:
          'We upgrade one module, framework or data feed at a time, behind tests, and release it before starting the next.',
      },
      {
        phase: 'Verify',
        title: 'Check And Hand Over',
        description:
          'Each release is checked against the old behavior, monitored in production and documented for your team.',
      },
    ],
    techTitle: 'Technology We Modernize',
    techIntro: 'The frameworks and platforms we upgrade most often, and the ones we move them to.',
    tech: [
      'angular',
      'vuedotjs',
      'react',
      'nextdotjs',
      'rubyonrails',
      'dotnet',
      'docker',
      'postgresql',
    ],
    benefitsTitle: 'Rewrite Or Modernize?',
    benefitsIntro:
      'A full rewrite is tempting and usually the riskier option. These are the questions we ask before recommending either.',
    benefits: [
      {
        title: 'Does the core logic still work?',
        description:
          'If the business rules are right and only the technology is old, upgrade the technology and keep the logic.',
      },
      {
        title: 'Is it the framework or the design?',
        description:
          'An old framework can be upgraded in steps. A data model that no longer fits the business may need rebuilding, starting with that part.',
      },
      {
        title: 'Can you pause new features?',
        description:
          'A rewrite means months of building in parallel. If the business cannot wait that long for new features, modernize in stages.',
      },
      {
        title: 'Who still knows the system?',
        description:
          'If the people who built it have gone, start by reading and testing it before changing anything.',
      },
      {
        title: 'Rewrite when the platform is a dead end',
        description:
          'If hiring, hosting or security fixes are no longer possible for the platform, rewrite one module at a time.',
      },
      {
        title: 'Keep it running throughout',
        description:
          'Old and new can run side by side while traffic moves across, so customers never notice the switch.',
      },
    ],
    projectsTitle: 'Modernization In Action',
    projectsIntro: 'Live products we upgraded without taking them offline.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('autobuffy'), projectRef('coach-catalyst'), projectRef('atc')],
    faqsTitle: 'Legacy Modernization FAQs',
    faqsIntro: 'What teams ask before they upgrade a system people depend on.',
    faqs: [
      {
        id: 'modern-what',
        question: 'What is legacy software modernization?',
        answer:
          'Bringing an older system up to date, whether that is its framework, hosting, data feeds or design, while the business keeps using it. It is usually done in stages rather than as one big rewrite.',
      },
      {
        id: 'modern-downtime',
        question: 'Will our system go offline during the upgrade?',
        answer:
          'It should not. We release each stage separately and test it against the old behavior first. Coach Catalyst moved from Vue 2 to Vue 3 while coaches kept using it.',
      },
      {
        id: 'modern-angular',
        question: 'Can you move us off AngularJS or an old Angular version?',
        answer:
          'Yes. We upgraded Autobuffy from Angular 8 to 13 in 20 days, and our Angular developers handle AngularJS migrations as well.',
      },
      {
        id: 'modern-takeover',
        question: 'Can you work on a system another team built?',
        answer:
          'Yes. We start by reading the code and adding tests around the parts we will change, so we know what the system does before touching it.',
      },
      {
        id: 'modern-cloud',
        question: 'Can you move the system to the cloud at the same time?',
        answer:
          'Yes, hosting is often part of the work. We set up automated deploys and monitoring before moving traffic, then move one service at a time.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Ready To Modernize Your System?',
      description:
        'Tell us what you are running today and what keeps breaking, and we will suggest the first upgrade to make.',
      primary: { label: 'Talk to us', href: '/contact' },
      secondary: { label: 'View case studies', href: '/our-work/case-studies' },
    },
  },
  'software-maintenance': {
    slug: 'software-maintenance',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    reading: {
      href: '/blog/angular-8-to-13-upgrade',
      label: 'Upgrading a live store from Angular 8 to 13 in 20 days',
    },
    hero: {
      eyebrow: 'What We Build · Maintenance & Support',
      title: 'Software Maintenance',
      highlight: 'And Support After Launch',
      description:
        'Software maintenance keeps a live product secure, fast and working after launch, through updates, fixes, monitoring and small improvements. Our engineers have worked on Autobuffy for around 28,000 hours and on Coach Catalyst across a 30-month roadmap.',
      cta: { label: 'Get Ongoing Support', href: '/contact' },
    },
    capabilitiesTitle: 'What Maintenance Covers',
    capabilitiesIntro:
      'Software that nobody looks after slows down, breaks with each operating system or package update, and turns into a security risk.',
    capabilities: [
      {
        title: 'Security and version updates',
        description:
          'Framework, package and server updates applied and tested on a regular schedule, before old versions stop getting security fixes.',
      },
      {
        title: 'Bug fixes',
        description:
          'Problems reported by users or caught by monitoring, fixed in order of impact, with each fix tested before release.',
      },
      {
        title: 'Monitoring and alerts',
        description:
          'Error tracking, uptime checks and alerts for failed jobs, routed to an engineer who can act on them.',
      },
      {
        title: 'Performance upkeep',
        description:
          'Slow pages and queries found and fixed as data grows, through indexing, caching and background jobs.',
      },
      {
        title: 'Small improvements',
        description:
          'The changes that keep a product useful between big releases, such as a new report, an integration or a better form.',
      },
    ],
    processTitle: 'How Ongoing Support Works',
    processIntro: 'Support starts with learning the system, then settles into a steady routine.',
    process: [
      {
        phase: 'Onboard',
        title: 'Learn The System',
        description:
          'We get access, read the code and hosting, and set up monitoring if it is missing.',
      },
      {
        phase: 'Agree',
        title: 'Set The Routine',
        description:
          'We agree what gets checked, how often updates happen and how quickly each kind of issue gets a response.',
      },
      {
        phase: 'Run',
        title: 'Maintain And Improve',
        description:
          'Updates, fixes and small features ship on a regular cycle, each one tested on staging first.',
      },
      {
        phase: 'Report',
        title: 'Show The Work',
        description:
          'You see what changed, what was fixed and what is coming next, so the system never becomes a black box.',
      },
    ],
    techTitle: 'Tools We Support With',
    techIntro: 'Monitoring, deployment and data tools we use to keep products healthy.',
    tech: ['sentry', 'docker', 'github', 'postgresql', 'redis', 'elasticsearch'],
    benefitsTitle: 'Signs Your Software Needs Ongoing Support',
    benefitsIntro:
      'Most products need some upkeep after launch. These are the signs it has fallen behind.',
    benefits: [
      {
        title: 'Updates keep getting postponed',
        description:
          'Each skipped framework or package update makes the next one bigger. Nextflag’s slowdown came from falling behind on them.',
      },
      {
        title: 'Nobody knows the code any more',
        description:
          'When the original developers leave, small changes start taking weeks. A team that knows the system fixes that.',
      },
      {
        title: 'Customers find the errors first',
        description:
          'If you hear about problems from users, monitoring is missing or nobody is watching it.',
      },
      {
        title: 'It slows down as data grows',
        description:
          'Queries that were fine at launch get slow at scale. Autobuffy’s part search needed Elasticsearch and new indexes to stay fast.',
      },
      {
        title: 'Security notices pile up',
        description:
          'Outdated packages are a common way in for attackers. Regular updates close those gaps.',
      },
      {
        title: 'Small requests wait for months',
        description:
          'If a new report or field needs a full project, an ongoing team can deliver it in the normal cycle instead.',
      },
    ],
    projectsTitle: 'Products We Look After',
    projectsIntro: 'Long-running products our engineers have worked on for years.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('autobuffy'), projectRef('coach-catalyst'), projectRef('atc')],
    faqsTitle: 'Maintenance And Support FAQs',
    faqsIntro: 'What teams ask before handing over a live product.',
    faqs: [
      {
        id: 'maint-what',
        question: 'What does software maintenance include?',
        answer:
          'Security and version updates, bug fixes, monitoring, performance work and small improvements to a live product, on an agreed routine rather than as one-off projects.',
      },
      {
        id: 'maint-other-team',
        question: 'Can you support software another company built?',
        answer:
          'Yes. We start by reading the code, getting it running and adding monitoring, then take over updates and fixes once we know how it behaves.',
      },
      {
        id: 'maint-response',
        question: 'How quickly do you respond to problems?',
        answer:
          'We agree response times with you at the start, and urgent production issues come first. The routine depends on how critical the system is to your business.',
      },
      {
        id: 'maint-mobile',
        question: 'Do you maintain mobile apps as well?',
        answer:
          'Yes. Mobile apps need regular updates for new iOS and Android versions and store rules, so we keep them building and releasing on current versions.',
      },
      {
        id: 'maint-features',
        question: 'Can maintenance include new features?',
        answer:
          'Yes. Most support work mixes upkeep with small improvements. Larger features are scoped separately so they do not crowd out the essential work.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Need Someone To Look After Your Software?',
      description:
        'Tell us what you are running and what worries you about it, and we will suggest a support routine.',
      primary: { label: 'Talk to us', href: '/contact' },
      secondary: { label: 'View case studies', href: '/our-work/case-studies' },
    },
  },
  'marketplace-development': {
    slug: 'marketplace-development',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-13',
    reading: {
      href: '/blog/marketplace-payments-stripe',
      label: 'Marketplace payments with Stripe: deposits, payouts and refunds',
    },
    hero: {
      eyebrow: 'What We Build · Marketplaces',
      title: 'Build A Marketplace',
      highlight: 'Buyers And Sellers Trust',
      description:
        'A marketplace connects two sides, such as renters and lenders or clinics and designers, and handles listings, bookings, payments and payouts between them. We have built Cad Cam Masters, Cinekit, Cercle and Truck-4.',
      cta: { label: 'Plan Your Marketplace', href: '/contact' },
    },
    capabilitiesTitle: 'What A Marketplace Needs',
    capabilitiesIntro:
      'Most marketplaces struggle with trust and payments, not features. Both sides need to feel safe before the first transaction.',
    capabilities: [
      {
        title: 'Listings and search',
        description:
          'Listing tools for sellers and filtered search for buyers. Cinekit lets creators search camera gear by location and category.',
      },
      {
        title: 'Bookings and availability',
        description:
          'Calendars and date ranges that stay correct when many people book at once, as on Cinekit’s gear rentals.',
      },
      {
        title: 'Payments, deposits and payouts',
        description:
          'Stripe for checkout, security deposits and payouts to sellers. Cinekit holds deposits on expensive gear, and Cad Cam Masters pays designers through the platform.',
      },
      {
        title: 'Trust and verification',
        description:
          'Profiles, reviews and checks that make strangers comfortable trading. CashKart only lets verified agents buy devices from sellers.',
      },
      {
        title: 'Returns, refunds and credit',
        description:
          'Clear flows for when things go wrong. Cercle refunds into store credit, so the money stays on the platform.',
      },
    ],
    story: {
      eyebrow: 'Project story · Cad Cam Masters',
      title: 'Matching dental labs with remote CAD designers',
      intro:
        'Cad Cam Masters connects dental practices, clinics and labs with freelance dental CAD designers. Labs post jobs, designers bid, and the work and payments run through the platform. We built it over 18 months.',
      problem:
        'Dental CAD files are large, and uploading them during checkout stalled the servers for everyone else. Labs also needed a way to follow each design through its milestones.',
      changes: [
        'Built job posting and contract bidding, so labs can hire designers directly.',
        'Moved heavy CAD file uploads into an asynchronous AWS pipeline, separate from the main web transactions.',
        'Added milestone viewers so labs can review detailed renders as the work progresses.',
        'Automated marketplace payments through Stripe.',
      ],
      outcome:
        'Labs now work directly with remote CAD designers, which reduced clinic overhead and sped up prosthesis fabrication. That is the job of any marketplace: make the deal between both sides easier than any other way of doing it.',
      facts: [
        { label: 'Duration', value: '18 months' },
        { label: 'Two sides', value: 'Dental labs and CAD designers' },
        { label: 'Payments', value: 'Stripe' },
        { label: 'Stack', value: 'React, Ruby on Rails, MySQL, AWS' },
      ],
      href: '/our-work/featured-projects#cadcam-masters',
      linkLabel: 'See Cad Cam Masters in our projects',
    },
    processTitle: 'From Idea To First Transactions',
    processIntro: 'A marketplace launches in one niche first and grows from there.',
    process: [
      {
        phase: 'Discover',
        title: 'Pick The First Market',
        description:
          'We agree which buyers and sellers to start with, what they trade and how money moves between them.',
      },
      {
        phase: 'Design',
        title: 'Design Both Sides',
        description:
          'Seller onboarding, listings, search, booking and checkout, designed so the first transaction is easy for both sides.',
      },
      {
        phase: 'Build',
        title: 'Build And Integrate',
        description:
          'Payments, payouts, notifications and admin tools, tested against real cases like cancellations and disputes.',
      },
      {
        phase: 'Launch',
        title: 'Launch And Learn',
        description:
          'We launch to a small group, watch where people drop off and improve those steps first.',
      },
    ],
    techTitle: 'Technology Behind Our Marketplaces',
    techIntro: 'The stack behind the marketplaces we have shipped.',
    tech: ['rubyonrails', 'react', 'nextdotjs', 'stripe', 'postgresql', 'mysql', 'elasticsearch'],
    benefitsTitle: 'What To Decide Before You Build A Marketplace',
    benefitsIntro:
      'These choices shape the data model and the payments set-up, so they are easier to make early.',
    benefits: [
      {
        title: 'Who pays whom, and when',
        description:
          'Commission, subscription, listing fees or deposits. Stripe Connect handles most of these, but the model has to be chosen first.',
      },
      {
        title: 'What happens when it goes wrong',
        description:
          'Cancellations, damage, refunds and disputes need rules before launch. Cercle refunds into store credit.',
      },
      {
        title: 'Which side to grow first',
        description:
          'Most marketplaces recruit sellers first, so buyers find something to buy on day one.',
      },
      {
        title: 'How trust is earned',
        description:
          'Verification, reviews and deposits. CashKart verifies every buying agent before they can trade.',
      },
      {
        title: 'Heavy files and media',
        description:
          'Photos, video or CAD files need their own upload pipeline, as on Cad Cam Masters, or they slow the site for everyone.',
      },
      {
        title: 'Web, app or both',
        description:
          'Many marketplaces start on the web and add apps once the model works. Truck-4 and Cinekit run as web platforms.',
      },
    ],
    projectsTitle: 'Marketplaces In Action',
    projectsIntro: 'Marketplaces from our portfolio.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('cinekit'), projectRef('cercle'), projectRef('cadcam-masters')],
    faqsTitle: 'Marketplace Development FAQs',
    faqsIntro: 'What founders ask before they build a two-sided platform.',
    faqs: [
      {
        id: 'mkt-what',
        question: 'What does marketplace development include?',
        answer:
          'Listings and search, bookings or orders, payments and payouts, trust features like verification and reviews, and the admin tools you need to run it.',
      },
      {
        id: 'mkt-stack',
        question: 'Which tech stack do you build marketplaces with?',
        answer:
          'Most of ours run on Ruby on Rails. Cad Cam Masters pairs Rails with React, and Cercle uses React and Next.js on Rails. Cinekit is built in Rails, CashKart pairs Rails with Vue, and Truck-4 uses React with Node.js services.',
      },
      {
        id: 'mkt-payments',
        question: 'How do marketplace payments and payouts work?',
        answer:
          'We usually use Stripe Connect, which takes the buyer’s payment, holds deposits where needed and pays sellers their share. It also runs the identity checks sellers need before they can be paid.',
      },
      {
        id: 'mkt-rental',
        question: 'Can you build a rental marketplace?',
        answer:
          'Yes. Cinekit rents camera gear with security deposits, and Cercle rents designer fashion with returns, cleaning and store credit.',
      },
      {
        id: 'mkt-b2b',
        question: 'Do you build B2B marketplaces?',
        answer:
          'Yes. Cad Cam Masters matches dental labs with CAD designers, and Truck-4 lets businesses find, lease or buy trucks and trailers.',
      },
      {
        id: 'mkt-scale',
        question: 'Will it cope as it grows?',
        answer:
          'It has to be built for that from the start. Cinekit grew to more than 100,000 users, and Truck-4 runs on microservices with more than 2 million shipper records.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Ready To Build Your Marketplace?',
      description:
        'Tell us who is buying, who is selling and how money should move, and we will map out the first version.',
      primary: { label: 'Talk to us', href: '/contact' },
      secondary: { label: 'View case studies', href: '/our-work/case-studies' },
    },
  },
  'qa-testing': {
    slug: 'qa-testing',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    hero: {
      eyebrow: 'What We Build · QA & Testing',
      title: 'QA And Test Automation',
      highlight: 'Built Into Every Release',
      description:
        'QA and test automation catch problems before your customers do, with automated tests on every change and manual testing where judgment matters. We used unit, integration and acceptance tests on BuffyHub and SonarQube checks on Truck-4.',
      cta: { label: 'Improve Your Testing', href: '/contact' },
    },
    capabilitiesTitle: 'What Our QA Covers',
    capabilitiesIntro:
      'Bugs are cheapest to fix the hour they are written and most expensive once a customer finds them.',
    capabilities: [
      {
        title: 'Automated test suites',
        description:
          'Unit, integration and acceptance tests that run on every change. BuffyHub was covered at all three levels.',
      },
      {
        title: 'Browser testing',
        description:
          'End-to-end tests in Selenium that click through sign-up, checkout and other key flows the way a real user would.',
      },
      {
        title: 'Code quality checks',
        description:
          'Static analysis with SonarQube in the CI pipeline, as on Truck-4, so risky code is flagged before review.',
      },
      {
        title: 'Manual and exploratory testing',
        description:
          'A person working through new features on real devices, looking for what scripts miss.',
      },
      {
        title: 'Checks on uploads and inputs',
        description:
          'Scanning uploaded files and validating inputs. Truck-4 scans every upload with ClamAV before accepting it.',
      },
    ],
    processTitle: 'How We Add QA To Your Releases',
    processIntro: 'Testing starts where a failure would hurt most, then widens.',
    process: [
      {
        phase: 'Review',
        title: 'Map The Risk',
        description:
          'We list the journeys that earn money, the parts that break most often and how releases happen today.',
      },
      {
        phase: 'Plan',
        title: 'Write The Test Plan',
        description:
          'We decide what to automate, what to test by hand and what each release has to pass.',
      },
      {
        phase: 'Automate',
        title: 'Automate The Repeats',
        description:
          'Unit, integration and browser tests for the riskiest flows go into the CI pipeline first.',
      },
      {
        phase: 'Run',
        title: 'Test Every Release',
        description:
          'Every change runs the suite, new features get manual testing, and failures block the release.',
      },
    ],
    techTitle: 'Tools We Test With',
    techIntro: 'The testing and pipeline tools used across our projects.',
    tech: ['selenium', 'docker', 'github'],
    benefitsTitle: 'When To Invest In Test Automation',
    benefitsIntro: 'Not every product needs a large test suite. These are the signs yours does.',
    benefits: [
      {
        title: 'The same bugs keep coming back',
        description:
          'Regressions mean nothing checks old behavior after a change. Automated tests do that on every release.',
      },
      {
        title: 'Releases feel risky',
        description:
          'If the team holds its breath at every deploy, tests and a staging check give that confidence back.',
      },
      {
        title: 'Checkout or sign-up must not break',
        description: 'Cover the journeys that earn money with browser tests first.',
      },
      {
        title: 'Several teams touch the code',
        description: 'Code checks like SonarQube keep standards the same whoever wrote the change.',
      },
      {
        title: 'Keep people on new features',
        description: 'Scripts check what you already know. People find what nobody thought of.',
      },
      {
        title: 'Skip coverage targets',
        description:
          'Test the risky and valuable parts well. Coverage for its own sake slows teams down without making releases safer.',
      },
    ],
    projectsTitle: 'Testing In Our Projects',
    projectsIntro: 'Products where testing was part of the build.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('buffyhub'), projectRef('truck-4'), projectRef('atc')],
    faqsTitle: 'QA And Testing FAQs',
    faqsIntro: 'What teams ask before they add QA to their releases.',
    faqs: [
      {
        id: 'qa-what',
        question: 'What do your QA services include?',
        answer:
          'Automated unit, integration and browser tests, code quality checks in your pipeline, and manual testing of new features before they go live.',
      },
      {
        id: 'qa-existing',
        question: 'Can you add tests to an app that has none?',
        answer:
          'Yes. We start with the flows that earn money or break most often, add tests around them, and widen coverage as other parts change.',
      },
      {
        id: 'qa-tools',
        question: 'Which testing tools do you use?',
        answer:
          'Selenium for browser tests, xUnit on .NET projects and each language’s standard test framework, with SonarQube for code quality, all run in CI.',
      },
      {
        id: 'qa-ci',
        question: 'Do the tests run automatically?',
        answer:
          'Yes. We wire them into your CI pipeline so every change runs the suite, as on Truck-4 with Azure DevOps.',
      },
      {
        id: 'qa-team',
        question: 'Can you test software another team builds?',
        answer:
          'Yes. We can work as a separate QA team beside your developers, writing tests and checking each release before it goes live.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Ready To Release With Confidence?',
      description:
        'Tell us how you test today and what keeps breaking, and we will suggest where automation pays off first.',
      primary: { label: 'Talk to us', href: '/contact' },
      secondary: { label: 'View case studies', href: '/our-work/case-studies' },
    },
  },
  'digital-marketing': {
    slug: 'digital-marketing',
    reviewer: FOUNDER_REVIEWER,
    updated: '2026-10-12',
    reading: {
      href: '/blog/luxe-excursions-booking-planner',
      label: 'Our booking planner refused 75% of trips. The fix was the data.',
    },
    hero: {
      eyebrow: 'What We Build · SEO & Google Ads',
      title: 'SEO And Google Ads',
      highlight: 'Wired Into Your Website',
      description:
        'We run SEO and Google Ads for service businesses from inside the website: analytics, schema, Search Console, the Business Profile and conversion tracking. For Luxe Excursions in Tenerife we built the site and now run all of it.',
      cta: { label: 'Get More From Google', href: '/contact' },
    },
    capabilitiesTitle: 'What We Do',
    capabilitiesIntro:
      'Most marketing problems start on the website: pages Google cannot read, tracking that counts the wrong things, and a Business Profile nobody updates.',
    capabilities: [
      {
        title: 'Technical SEO',
        description:
          'Crawlable pages, schema, sitemaps, redirects and page speed, fixed in the code rather than with plugins.',
      },
      {
        title: 'Analytics and conversion tracking',
        description:
          'GA4 with a consent banner, internal traffic filtered out, and the actions that matter tracked as key events. For Luxe, that means bookings and WhatsApp clicks.',
      },
      {
        title: 'Google Ads',
        description:
          'Search campaigns aimed at the buyers you want, with negative keywords, sitelinks and conversions imported from GA4.',
      },
      {
        title: 'Google Business Profile',
        description:
          'Services, tracked booking links, the right location and a steady flow of reviews from real customers.',
      },
      {
        title: 'Content that answers buyers',
        description:
          'Pages that answer what customers ask before they buy, written from your real work rather than generic copy.',
      },
    ],
    story: {
      eyebrow: 'Project story · Luxe Excursions',
      title: 'Wiring Google into a Tenerife tour company',
      intro:
        'Luxe Excursions sells luxury tours, packages and rentals in Tenerife. We built its website and booking platform, and we also run its SEO, Google Ads and Business Profile.',
      problem:
        'The new site had to show which searches, ads and profile visits turn into paying guests, without counting the team’s own visits. The Business Profile also needed its services, booking link and location put right.',
      changes: [
        'Set up GA4 with a consent banner, and filtered out staff and test traffic.',
        'Tracked bookings and WhatsApp clicks as key events, and imported them into Google Ads as conversions.',
        'Linked Search Console to both GA4 and Google Ads.',
        'Launched a search campaign for UK travelers planning a trip, with negative keywords, sitelinks and callouts.',
        'Added the services and a tracked booking link to the Business Profile, and corrected the shop location on Google.',
      ],
      outcome:
        'The team can see which searches, ads and profile visits lead to bookings, and every guest is asked for a review after their trip. Marketing works best when it is wired into the website, not added afterwards.',
      facts: [
        { label: 'Client', value: 'Luxe Excursions, Tenerife' },
        { label: 'Channels', value: 'SEO, Google Ads, Business Profile' },
        { label: 'Tracking', value: 'GA4, Search Console' },
        { label: 'Site', value: 'Django, Next.js' },
      ],
      href: 'https://luxeexcursionstenerife.com',
      linkLabel: 'Visit Luxe Excursions',
    },
    processTitle: 'How We Start',
    processIntro: 'We fix the foundations before spending anything on traffic.',
    process: [
      {
        phase: 'Audit',
        title: 'Check The Foundations',
        description:
          'We look at indexing, tracking, the Business Profile and what you already rank for.',
      },
      {
        phase: 'Fix',
        title: 'Fix The Site',
        description:
          'Crawl problems, schema, redirects, speed and tracking get fixed in the code first.',
      },
      {
        phase: 'Launch',
        title: 'Start Campaigns',
        description: 'Ads, profile updates and new pages go live once the results can be measured.',
      },
      {
        phase: 'Measure',
        title: 'Review And Adjust',
        description:
          'Each month we look at which searches and pages turn into enquiries and change course where they do not.',
      },
    ],
    techTitle: 'Tools We Work With',
    techIntro: 'The Google tools and site stacks behind our SEO work.',
    tech: ['google', 'googlemaps', 'nextdotjs', 'django'],
    benefitsTitle: 'Where To Start With SEO And Ads',
    benefitsIntro:
      'The order matters. Spending on traffic before the basics work wastes most of it.',
    benefits: [
      {
        title: 'Tracking before traffic',
        description:
          'Set up analytics and conversion tracking before paying for ads, or nobody can tell what worked.',
      },
      {
        title: 'Fix the site before the content',
        description:
          'Pages Google cannot crawl or index will not rank, however good the writing is.',
      },
      {
        title: 'Local businesses start with the profile',
        description:
          'For anyone serving a place, the Business Profile can bring more calls and bookings than the website does.',
      },
      {
        title: 'Ads work on existing demand',
        description:
          'Search ads pay off when people already search for what you sell. They rarely create demand on their own.',
      },
      {
        title: 'Reviews build on each other',
        description:
          'A steady, honest flow of reviews helps the profile and the click-through rate. Asking every customer at the right moment keeps it steady.',
      },
      {
        title: 'Write from real work',
        description:
          'Pages built on your own projects, numbers and customers earn trust that generic copy cannot.',
      },
    ],
    projectsTitle: 'SEO Work In Our Portfolio',
    projectsIntro: 'SEO tools we have built, and a store whose search visibility we improved.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('siterank'), projectRef('clicks'), projectRef('autobuffy')],
    faqsTitle: 'SEO And Google Ads FAQs',
    faqsIntro: 'What business owners ask before handing over their marketing.',
    faqs: [
      {
        id: 'seo-what',
        question: 'What do your SEO and Google Ads services include?',
        answer:
          'Technical SEO, analytics and conversion tracking, Google Ads search campaigns, Business Profile management and content that answers what buyers ask.',
      },
      {
        id: 'seo-new-site',
        question: 'Do we need a new website first?',
        answer:
          'Not always. We start with your current site, fix what blocks crawling and tracking, and only suggest a rebuild if the platform cannot be fixed.',
      },
      {
        id: 'seo-ads',
        question: 'Do you manage Google Ads accounts?',
        answer:
          'Yes. We set up campaigns, negative keywords and ad assets, import conversions from GA4 and review the search terms regularly. The ad account and its billing stay in your name.',
      },
      {
        id: 'seo-gbp',
        question: 'Can you manage our Google Business Profile?',
        answer:
          'Yes. We keep services, hours and booking links up to date, fix location problems and set up review requests so new reviews keep arriving.',
      },
      {
        id: 'seo-ai',
        question: 'Does this help with AI search as well?',
        answer:
          'Yes. Clear answers, accurate schema and the same facts across your profiles help Google’s AI Overviews and assistants like ChatGPT describe you correctly.',
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: 'Want More Customers From Google?',
      description:
        'Tell us what you sell and who buys it, and we will check what is holding your site back first.',
      primary: { label: 'Talk to us', href: '/contact' },
      secondary: { label: 'View case studies', href: '/our-work/case-studies' },
    },
  },
};

export function getCapabilityPage(slug: CapabilitySlug): CapabilityPageData {
  return CAPABILITY_PAGES[slug];
}

/** How each service is named in links, schema and related-service lists. */
export const CAPABILITY_SERVICE_NAMES: Record<CapabilitySlug, string> = {
  erp: 'ERP development',
  crm: 'CRM development',
  'ai-solutions': 'AI development',
  saas: 'SaaS development',
  'custom-software': 'Custom software development',
  'mobile-apps': 'Mobile app development',
  'web-apps': 'Web app development',
  cloud: 'Cloud migration and cloud services',
  devops: 'DevOps consulting',
  automation: 'Business process automation',
  'legacy-modernization': 'Legacy software modernization',
  'software-maintenance': 'Software maintenance and support',
  'marketplace-development': 'Marketplace development',
  'qa-testing': 'QA and test automation',
  'digital-marketing': 'SEO and Google Ads',
};

/** BrandIcon service slugs (short keys in SERVICE_ICONS). */
export const CAPABILITY_ICONS: Record<CapabilitySlug, string> = {
  erp: 'erp',
  crm: 'crm',
  'ai-solutions': 'ai',
  saas: 'saas',
  'custom-software': 'custom',
  'mobile-apps': 'mobile',
  'web-apps': 'web',
  cloud: 'cloud',
  devops: 'devops',
  automation: 'automation',
  'legacy-modernization': 'integration',
  'software-maintenance': 'staff',
  'marketplace-development': 'web',
  'qa-testing': 'automation',
  'digital-marketing': 'integration',
};

/** The services each service page links to: the ones its projects usually involve as well. */
export const RELATED_CAPABILITIES: Record<CapabilitySlug, readonly CapabilitySlug[]> = {
  'custom-software': ['legacy-modernization', 'software-maintenance', 'web-apps', 'erp'],
  'web-apps': ['marketplace-development', 'saas', 'custom-software', 'cloud'],
  'mobile-apps': ['web-apps', 'software-maintenance', 'saas', 'ai-solutions'],
  'ai-solutions': ['automation', 'saas', 'custom-software'],
  erp: ['crm', 'automation', 'legacy-modernization'],
  crm: ['erp', 'automation', 'saas'],
  saas: ['marketplace-development', 'web-apps', 'cloud', 'software-maintenance'],
  cloud: ['devops', 'legacy-modernization', 'saas'],
  devops: ['cloud', 'qa-testing', 'software-maintenance', 'saas'],
  automation: ['ai-solutions', 'digital-marketing', 'crm', 'erp'],
  'legacy-modernization': ['software-maintenance', 'cloud', 'custom-software'],
  'software-maintenance': ['legacy-modernization', 'qa-testing', 'devops', 'cloud'],
  'marketplace-development': ['web-apps', 'saas', 'mobile-apps'],
  'qa-testing': ['devops', 'software-maintenance', 'automation'],
  'digital-marketing': ['web-apps', 'automation', 'ai-solutions'],
};

/** The service page whose project story is this case study, if any. */
export function getCapabilityForStory(caseStudyPath: string): CapabilitySlug | undefined {
  return (Object.keys(CAPABILITY_PAGES) as CapabilitySlug[]).find(
    (slug) => CAPABILITY_PAGES[slug].story?.href === caseStudyPath
  );
}
