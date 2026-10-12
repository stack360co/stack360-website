/** Capability pages under /what-we-build — sourced from stack360.co/services where available. */

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
  | 'automation';

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
  href: '/who-we-are/culture',
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
  processTitle: string;
  processIntro: string;
  process: { title: string; description: string; phase?: string }[];
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
const CASE_STUDY_SLUGS = new Set(['autobuffy', 'atc', 'coach-catalyst', 'buffyhub']);

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
    hero: {
      eyebrow: 'What We Build · Web Apps',
      title: 'Build Powerful Web Apps For',
      highlight: 'Growing Businesses',
      description:
        'We build custom web applications that streamline operations, connect business systems, improve user experiences, and support scalable digital growth.',
      cta: { label: 'Build Your Web App', href: '/contact' },
    },
    capabilitiesTitle: 'Challenges & Solutions',
    capabilitiesIntro:
      'Slow websites, poor experiences, limited functionality, and disconnected systems can prevent businesses from converting visitors and scaling online.',
    capabilities: [
      {
        title: 'Custom Websites Built',
        description:
          'Our custom website development creates flexible digital experiences tailored to your brand, users, workflows, and business objectives.',
      },
      {
        title: 'Business Websites',
        description:
          'We build professional websites that communicate your value clearly, support your goals, and create seamless experiences across devices.',
      },
      {
        title: 'Ecommerce Experiences',
        description:
          'Our ecommerce website development services create secure, scalable online stores with product management, payments, integrations, and customer-focused experiences.',
      },
      {
        title: 'Web Applications',
        description:
          'As a web app development company, we build interactive applications that simplify workflows, connect systems, and support complex business requirements.',
      },
      {
        title: 'Connected Platforms',
        description:
          'Integrate websites with CRMs, ERPs, APIs, payment systems, databases, analytics platforms, and third-party business applications.',
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
        'Integrated the Facebook commerce APIs, so the catalogue, inventory and orders stay in sync between the site and Facebook.',
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
      'Our website design and development process connects strategy, UX, engineering, testing, optimisation, and deployment to deliver reliable digital experiences.',
    process: [
      {
        phase: 'Discover',
        title: 'Define Requirements',
        description:
          'We understand your audience, business goals, functionality, integrations, content, and technical requirements before development begins.',
      },
      {
        phase: 'Develop',
        title: 'Build Experience',
        description:
          'Our developers create responsive websites and web applications with scalable architecture, clean code, secure integrations, and performance optimisation.',
      },
      {
        phase: 'Launch',
        title: 'Optimise Performance',
        description:
          'We test functionality, responsiveness, security, and performance before launch, then continue improving your website as requirements evolve.',
      },
    ],
    techTitle: 'Technology Behind Our Websites',
    techIntro:
      'We use modern frontend, backend, CMS, ecommerce, database, cloud, and API technologies to build scalable websites.',
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
          'Most of the hard work sits behind the screen: inventory feeds, shipping, social catalogues and accounting.',
      },
    ],
    projectsTitle: 'Web Projects In Action',
    projectsIntro:
      'Explore how Stack360 builds websites, web applications, and ecommerce platforms that solve business challenges and support measurable digital growth.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('autobuffy'), projectRef('buffyhub'), projectRef('cinekit')],
    faqsTitle: 'Website Development FAQs',
    faqsIntro:
      'Find answers to technical questions about custom websites, web applications, ecommerce platforms, integrations, performance, and scalability.',
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
          'Yes. Cercle syncs its catalogue and orders with Facebook and works with a clothing-renewal partner, and Autobuffy pulls vendor inventory through its own microservice.',
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
      title: 'Ready To Build A Better Website?',
      description:
        'Partner with Stack360 for website development that combines modern technology, scalable architecture, intuitive experiences, and business-focused functionality.',
      primary: { label: 'Build Your Web App', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  'mobile-apps': {
    slug: 'mobile-apps',
    reviewer: FOUNDER_REVIEWER,
    hero: {
      eyebrow: 'What We Build · Mobile Apps',
      title: 'Build Custom Mobile Apps That',
      highlight: 'Drive Growth',
      description:
        'We develop custom mobile applications that deliver intuitive experiences, connect business systems, and scale with your users, products, and business goals.',
      cta: { label: 'Build Your Mobile App', href: '/contact' },
    },
    capabilitiesTitle: 'Challenges & Solutions',
    capabilitiesIntro:
      'Businesses need mobile experiences that perform reliably, engage users, integrate systems, and adapt quickly as customer expectations continue to evolve.',
    capabilities: [
      {
        title: 'Custom Apps Built',
        description:
          'We develop custom mobile apps around your users, workflows, features, integrations, and specific business requirements.',
      },
      {
        title: 'Native App Experiences',
        description:
          'We build high-performance mobile applications with platform-specific experiences for Android and iOS users.',
      },
      {
        title: 'Cross-Platform Development',
        description:
          'Our cross-platform mobile app development services help businesses launch consistent experiences across multiple platforms from one efficient codebase.',
      },
      {
        title: 'Connected Mobile Experiences',
        description:
          'Integrate mobile applications with APIs, CRMs, ERPs, cloud services, databases, and existing business systems.',
      },
      {
        title: 'Scalable App Architecture',
        description:
          'We design flexible architectures that support growing users, transactions, features, integrations, and evolving product requirements.',
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
      'Our mobile app development process combines product strategy, user experience, engineering, testing, and deployment to create reliable applications.',
    process: [
      {
        phase: 'Discover',
        title: 'Define Requirements',
        description:
          'We analyse your users, goals, features, workflows, and technical requirements to establish a focused mobile development roadmap.',
      },
      {
        phase: 'Develop',
        title: 'Build Experiences',
        description:
          'Our mobile app developers build intuitive applications with scalable architecture, secure integrations, testing, and performance optimisation.',
      },
      {
        phase: 'Scale',
        title: 'Optimise Performance',
        description:
          'We monitor, improve, and expand your application as users, features, integrations, and business requirements continue growing.',
      },
    ],
    techTitle: 'Technology Behind Mobile Apps',
    techIntro:
      'We use modern mobile frameworks, cloud platforms, APIs, and development technologies to create secure, scalable applications.',
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
          'When a custom design has to look identical on every phone. Houzi’s real estate app, with 360° property views, is built in Flutter.',
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
    projectsIntro:
      'Explore how Stack360 builds intuitive mobile experiences that solve business challenges, connect systems, and support scalable digital products.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('slumber-sprout'), projectRef('nuvana'), projectRef('cashkart')],
    faqsTitle: 'Mobile App Development FAQs',
    faqsIntro:
      'Find answers to technical questions about mobile platforms, development approaches, architecture, integrations, security, and scalability.',
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
          'Yes, natively in Swift and Kotlin or with React Native and Flutter. Nextflag, Orchyd and Trusted Tastes are mobile apps we have built.',
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
      title: 'Ready To Build Your Mobile App?',
      description:
        'Partner with Stack360 to create a scalable mobile application that delivers better experiences, connects your systems, and supports business growth.',
      primary: { label: 'Build Your Mobile App', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  devops: {
    slug: 'devops',
    reviewer: FOUNDER_REVIEWER,
    hero: {
      eyebrow: 'What We Build · DevOps',
      title: 'Build Faster With Smarter',
      highlight: 'DevOps Engineering',
      description:
        'Our DevOps consulting services improve deployment speed, infrastructure reliability, automation, and collaboration across your software development lifecycle.',
      cta: { label: 'Improve Your DevOps', href: '/contact' },
    },
    capabilitiesTitle: 'Challenges & Solutions',
    capabilitiesIntro:
      'Manual deployments, inconsistent environments, infrastructure bottlenecks, and limited monitoring can slow releases and increase operational risks.',
    capabilities: [
      {
        title: 'Smarter Delivery Pipelines',
        description:
          'Our DevOps development services streamline development, testing, deployment, and infrastructure management through reliable automated workflows.',
      },
      {
        title: 'Automated Infrastructure',
        description:
          'Implement DevOps automation to provision, configure, monitor, and manage infrastructure with greater consistency and fewer manual processes.',
      },
      {
        title: 'Faster Deployments',
        description:
          'Build reliable CI/CD pipelines that help teams release software faster while maintaining quality, security, and deployment consistency.',
      },
      {
        title: 'Reliable Infrastructure',
        description:
          'Design resilient cloud and infrastructure environments that support application availability, performance, scalability, and operational continuity.',
      },
      {
        title: 'Continuous Monitoring',
        description:
          'Monitor infrastructure, applications, deployments, and system performance to identify issues early and improve operational visibility.',
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
      'Our DevOps consulting approach connects development, infrastructure, automation, security, and monitoring to create efficient software delivery pipelines.',
    process: [
      {
        phase: 'Assess',
        title: 'Analyse Infrastructure',
        description:
          'We review your architecture, workflows, deployment processes, infrastructure, and operational challenges to identify practical improvement opportunities.',
      },
      {
        phase: 'Automate',
        title: 'Build Pipelines',
        description:
          'We implement CI/CD, infrastructure automation, containerisation, testing, and deployment workflows that improve delivery efficiency.',
      },
      {
        phase: 'Optimise',
        title: 'Improve Reliability',
        description:
          'We monitor systems, identify bottlenecks, optimise infrastructure, and continuously improve performance, security, and deployment reliability.',
      },
    ],
    techTitle: 'Technology Behind Our DevOps',
    techIntro:
      'We use modern cloud, containerisation, infrastructure, automation, monitoring, and CI/CD technologies to improve software delivery.',
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
        description: 'Every deploy should be easy to undo. Practise it before you need it.',
      },
    ],
    projectsTitle: 'DevOps In Action',
    projectsIntro:
      'Explore how Stack360 improves infrastructure, automation, deployment workflows, and operational reliability for growing software products and businesses.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('truck-4'), projectRef('buffyhub'), projectRef('atc')],
    faqsTitle: 'DevOps Consulting FAQs',
    faqsIntro:
      'Find answers to technical questions about DevOps consulting, automation, CI/CD, cloud infrastructure, containers, monitoring, and deployment.',
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
      title: 'Ready To Modernize Your DevOps Environment?',
      description:
        'Partner with Stack360 for DevOps consulting that automates delivery, improves infrastructure reliability, and helps your engineering teams release faster.',
      primary: { label: 'Improve Your DevOps', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  'ai-solutions': {
    slug: 'ai-solutions',
    reviewer: FOUNDER_REVIEWER,
    hero: {
      eyebrow: 'What We Build · AI Solutions',
      title: 'Build Intelligent AI Solutions',
      highlight: 'For Business Growth',
      description:
        'We combine AI consulting, software engineering, and machine learning to build intelligent solutions that automate work and improve business outcomes.',
      cta: { label: 'Build Your AI Solution', href: '/contact' },
    },
    capabilitiesTitle: 'AI Challenges & Solutions',
    capabilitiesIntro:
      'Businesses struggle to identify valuable AI opportunities, integrate intelligent systems, and turn emerging technology into measurable business outcomes. We build practical AI solutions that improve operations, integrate securely, and deliver measurable value without unnecessary complexity.',
    capabilities: [
      {
        title: 'Custom AI Solutions',
        description:
          'We develop custom AI solutions around your workflows, data, customers, and specific business requirements.',
      },
      {
        title: 'Generative AI Development',
        description:
          'Our generative AI development services create intelligent applications for content, research, knowledge retrieval, and business productivity.',
      },
      {
        title: 'AI Agent Development',
        description:
          'Our AI agent development services create autonomous systems that understand context, use tools, and execute complex business workflows.',
      },
      {
        title: 'AI Chatbot Development',
        description:
          'Our AI chatbot development services deliver intelligent conversations that support customers, employees, and business operations across digital channels.',
      },
      {
        title: 'AI Application Development',
        description:
          'Our AI application development services integrate intelligent capabilities into scalable software, workflows, platforms, and existing business systems.',
      },
    ],
    story: {
      eyebrow: 'Project story · Money Ball',
      title: 'Stopping an AI chatbot from making up sports stats',
      intro:
        'Money Ball lets NFL fans and analysts ask for player and team numbers in plain English. The hard part of a product like this is trust: the answer has to be right, and football stats change every week.',
      problem:
        'General language models answer confidently even when they are wrong. They are wrong most often on specialised figures that change quickly, such as this season’s player and team stats. A chatbot that invents numbers is worse than no chatbot at all.',
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
      'Our AI consulting and development process connects business objectives, data, technology, models, and deployment to create practical AI solutions.',
    process: [
      {
        phase: 'Discover',
        title: 'Define Opportunities',
        description:
          'Our AI consulting services identify valuable use cases, assess your data, and establish a practical AI development roadmap.',
      },
      {
        phase: 'Develop',
        title: 'Build Intelligence',
        description:
          'Our AI software development services integrate models, applications, agents, automation, and secure workflows around your requirements.',
      },
      {
        phase: 'Scale',
        title: 'Optimise Performance',
        description:
          'We monitor AI systems, evaluate models, improve performance, and scale solutions as your business and technology requirements evolve.',
      },
    ],
    techTitle: 'Technology Behind Our AI Solutions',
    techIntro:
      'We use modern AI, machine learning, cloud, language models, APIs, and data technologies to build intelligent applications.',
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
          'Email replies, meeting notes and first drafts that a person approves before they go out. Fyxer drafts replies in the user’s own tone.',
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
          'AI needs records, documents or history to work from. If they are scattered or missing, organising them is the first project.',
      },
    ],
    projectsTitle: 'AI Solutions In Action',
    projectsIntro:
      'Explore how Stack360 applies AI, automation, software engineering, and intelligent systems to solve real business challenges.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('moneyball'), projectRef('natif'), projectRef('siterank')],
    faqsTitle: 'AI Solutions FAQs',
    faqsIntro:
      'Find answers to technical questions about AI development, generative AI, agents, chatbots, security, compliance, and deployment.',
    faqs: [
      {
        id: 'ai-types',
        question: 'What types of custom AI solutions can Stack360 develop?',
        answer:
          'Document processing (Natif), chat over live data (Money Ball), email and meeting assistants (Fyxer), assessment tools (Evalufy), plus AI agents and recommendation features inside existing products.',
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
      title: 'Ready To Put AI To Work?',
      description:
        'Turn practical AI opportunities into secure, scalable solutions that automate workflows, improve experiences, and create measurable business value.',
      primary: { label: 'Build Your AI Solution', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  erp: {
    slug: 'erp',
    reviewer: FOUNDER_REVIEWER,
    hero: {
      eyebrow: 'What We Build · ERP',
      title: 'Build Enterprise Software That',
      highlight: 'Drives Business Growth',
      description:
        'We develop scalable enterprise software that connects teams, streamlines operations, integrates systems, and supports complex business requirements.',
      cta: { label: 'Start Your Enterprise Project', href: '/contact' },
    },
    capabilitiesTitle: 'Challenges & Solutions',
    capabilitiesIntro:
      'Complex operations, disconnected systems, and outdated software can create inefficiencies, data silos, security risks, and costly delays.',
    capabilities: [
      {
        title: 'Centralised Data',
        description:
          'Bring business data together through a unified ERP platform that gives teams consistent, accessible information.',
      },
      {
        title: 'Automate Operations',
        description:
          'Automate repetitive workflows and business processes to reduce manual work, minimise errors, and improve operational efficiency.',
      },
      {
        title: 'Connect Departments',
        description:
          'Connect finance, sales, inventory, HR, procurement, and operations through integrated ERP workflows and shared business data.',
      },
      {
        title: 'Improve Visibility',
        description:
          'Give decision-makers real-time access to business information, performance insights, and operational data across departments.',
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
        'Added encryption, authentication and authorisation around the stored data.',
        'Cut load times with caching, minification and lazy loading, and covered the platform with unit, integration and acceptance tests.',
      ],
      outcome:
        'Sellers run their whole catalogue and order flow from one platform that handles more traffic and keeps their data protected. Most ERP work comes down to this: one reliable record of stock, orders and suppliers that every channel reads from.',
      facts: [
        { label: 'Team', value: '2 engineers' },
        { label: 'Effort', value: '3,344 hours' },
        { label: 'Channels', value: 'Amazon, eBay, Walmart' },
        { label: 'Stack', value: 'Ruby on Rails, PostgreSQL, AWS' },
      ],
      href: '/our-work/case-studies/buffyhub',
      linkLabel: 'Read the full BuffyHub case study',
    },
    processTitle: 'From Vision To Enterprise',
    processIntro:
      'Our enterprise software development process aligns business goals, technical architecture, user needs, and scalability from planning through deployment.',
    process: [
      {
        phase: 'Discover',
        title: 'Define Requirements',
        description:
          'We analyse your business processes, users, systems, and goals to establish clear requirements and a practical development roadmap.',
      },
      {
        phase: 'Develop',
        title: 'Build Software',
        description:
          'Our engineers develop secure enterprise applications using scalable architecture, modern technologies, integrations, automation, and continuous testing.',
      },
      {
        phase: 'Scale',
        title: 'Support Growth',
        description:
          'We deploy, monitor, optimise, and enhance your enterprise software as your business expands and requirements evolve.',
      },
    ],
    techTitle: 'Technology For Enterprise Software',
    techIntro:
      'We use modern frameworks, cloud platforms, APIs, databases, and secure architectures to build scalable enterprise applications.',
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
    projectsTitle: 'Related Case Studies',
    projectsIntro:
      'Explore how Stack360 builds scalable software, integrates complex systems, and solves challenging business requirements across industries.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('atc'), projectRef('fisar'), projectRef('falcore')],
    showTestimonials: true,
    faqsTitle: 'Frequently Asked Questions',
    faqsIntro:
      'Find answers to common questions about enterprise software development, architecture, integrations, security, scalability, and implementation.',
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
      title: 'Ready To Build Enterprise Software That Scales?',
      description:
        'Partner with Stack360 to develop secure, scalable enterprise software that connects your business and supports long-term growth.',
      primary: { label: 'Start Your Enterprise Project', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  crm: {
    slug: 'crm',
    reviewer: FOUNDER_REVIEWER,
    hero: {
      eyebrow: 'What We Build · CRM',
      title: 'Build CRM Software That',
      highlight: 'Accelerates Business Growth',
      description:
        'We develop scalable CRM software that connects customer data, streamlines workflows, automates sales, and helps teams build stronger, lasting customer relationships across every channel and at scale.',
      cta: { label: 'Build Your CRM', href: '/contact' },
    },
    capabilitiesTitle: 'Challenges & Solutions',
    capabilitiesIntro:
      'Disconnected data, manual workflows, and limited visibility can slow sales, reduce productivity, and weaken customer relationships.',
    capabilities: [
      {
        title: 'Centralise Customer Data',
        description:
          'Centralise customer data across sales, marketing, and support teams for complete visibility and consistent management.',
      },
      {
        title: 'Automate Sales Workflows',
        description:
          'Automate lead assignments, follow-ups, notifications, and repetitive tasks to improve team productivity.',
      },
      {
        title: 'Strengthen Customer Relationships',
        description:
          'Connect customer interactions, preferences, communications, and history to deliver personalised experiences across every touchpoint.',
      },
      {
        title: 'Improve Sales Visibility',
        description:
          'Give sales teams clearer pipelines, actionable insights, and reporting to identify opportunities and close deals.',
      },
      {
        title: 'Scale Business Operations',
        description:
          'Build flexible CRM software that adapts to growing teams, customer data, workflows, and evolving requirements.',
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
      'Our CRM development process aligns business goals, customer journeys, technical architecture, and scalability throughout every development stage.',
    process: [
      {
        phase: 'Discover',
        title: 'Define Requirements',
        description:
          'We analyse workflows, users, integrations, and goals to create a focused CRM development roadmap.',
      },
      {
        phase: 'Develop',
        title: 'Build CRM',
        description:
          'Our engineers develop secure CRM software with intuitive interfaces, automation, integrations, analytics, and scalable architecture.',
      },
      {
        phase: 'Scale',
        title: 'Optimise Performance',
        description:
          'We monitor, improve, and expand your CRM as teams, customer data, workflows, and requirements grow.',
      },
    ],
    techTitle: 'Technology Behind CRM',
    techIntro:
      'We use modern frameworks, APIs, databases, cloud infrastructure, and automation technologies to build powerful CRM platforms.',
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
    benefitsTitle: 'Build A CRM Or Customise One?',
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
        title: 'Customise when a standard CRM fits',
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
    projectsIntro:
      'Explore how our software development expertise helps businesses connect data, automate workflows, and create better customer experiences.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('atc'), projectRef('contakti'), projectRef('klingit')],
    faqsTitle: 'CRM Development FAQs',
    faqsIntro:
      'Find answers to technical questions about custom CRM development, integrations, architecture, security, scalability, and implementation.',
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
      title: 'Ready To Build A Smarter CRM For Growth?',
      description:
        'Partner with Stack360 to develop custom CRM software that connects teams, automates workflows, and strengthens customer relationships.',
      primary: { label: 'Start Your CRM Project', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  saas: {
    slug: 'saas',
    reviewer: FOUNDER_REVIEWER,
    hero: {
      eyebrow: 'What We Build · SaaS',
      title: 'Build Scalable SaaS Products That',
      highlight: 'Drive Growth',
      description:
        'Our SaaS development services help businesses launch scalable products, streamline operations, and create reliable software experiences built for recurring growth.',
      cta: { label: 'Build Your SaaS Product', href: '/contact' },
    },
    capabilitiesTitle: 'Challenges & Solutions',
    capabilitiesIntro:
      'Launching SaaS products requires scalable architecture, reliable infrastructure, intuitive experiences, and technology that supports growing customers and recurring revenue.',
    capabilities: [
      {
        title: 'Custom SaaS Development',
        description:
          'Our custom SaaS development services create flexible products around your business model, users, workflows, integrations, and growth strategy.',
      },
      {
        title: 'Scalable SaaS Architecture',
        description:
          'We build SaaS applications with flexible architecture that supports growing users, data, features, integrations, and subscription requirements.',
      },
      {
        title: 'Multi-Tenant Experiences',
        description:
          'Develop secure multi-tenant SaaS platforms that separate customer data while efficiently sharing infrastructure, features, and application resources.',
      },
      {
        title: 'SaaS Product Development',
        description:
          'Our SaaS product development services turn validated ideas into scalable products with clear roadmaps, intuitive experiences, and reliable technology.',
      },
      {
        title: 'AI-Powered SaaS Products',
        description:
          'As an AI SaaS development company, we integrate intelligent features, automation, recommendations, and AI-powered workflows into modern SaaS products.',
      },
    ],
    story: {
      eyebrow: 'Project story · Coach Catalyst',
      title: 'Turning a coaching tool into a marketplace that pays coaches directly',
      intro:
        'Coach Catalyst is a platform where fitness coaches run their client programmes: scheduling, messaging and progress tracking. The product worked, but it was slow, hard to use and built on code that made new features risky.',
      problem:
        'Pages loaded slowly and people struggled to finish tasks. Coaches had no built-in way to get paid by their clients. The chat module was written in CoffeeScript and struggled under load. The codebase had never been planned for a community feature, and the front end was still on Vue 2.',
      changes: [
        'Redesigned the interface for clarity and cut load times by optimising code, requests and media.',
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
      'Our SaaS development process combines product strategy, architecture, design, development, testing, deployment, and continuous optimisation.',
    process: [
      {
        phase: 'Discover',
        title: 'Define Product',
        description:
          'Our SaaS development agency analyses your market, users, business model, requirements, and goals to create a focused product roadmap.',
      },
      {
        phase: 'Develop',
        title: 'Build Platform',
        description:
          'Our SaaS software development services turn requirements into secure, scalable applications with integrations, automation, analytics, and subscription functionality.',
      },
      {
        phase: 'Scale',
        title: 'Optimise Growth',
        description:
          'We monitor performance, improve infrastructure, release new capabilities, and scale your SaaS platform as customers and requirements grow.',
      },
    ],
    techTitle: 'Technology Behind SaaS Products',
    techIntro:
      'We use modern cloud, backend, frontend, database, API, and infrastructure technologies to build reliable SaaS applications.',
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
    projectsIntro:
      'Explore how Stack360 builds SaaS applications, platforms, and products that solve complex business challenges and support scalable digital growth.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('whistle'), projectRef('one40connect'), projectRef('legal-atoms')],
    faqsTitle: 'SaaS Development FAQs',
    faqsIntro:
      'Find answers to technical questions about SaaS architecture, multi-tenancy, MVP development, scalability, integrations, and product deployment.',
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
        'Partner with a SaaS development company that builds scalable products, reliable platforms, and flexible software designed around your long-term growth.',
      primary: { label: 'Start Your SaaS Project', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  'custom-software': {
    slug: 'custom-software',
    reviewer: FOUNDER_REVIEWER,
    hero: {
      eyebrow: 'What We Build · Custom Software',
      title: 'Build Custom Software',
      highlight: 'Around Your Business',
      description:
        'We develop custom software that fits your workflows, connects your systems, solves complex challenges, and scales alongside your business as requirements evolve.',
      cta: { label: 'Build Custom Software', href: '/contact' },
    },
    capabilitiesTitle: 'Challenges & Solutions',
    capabilitiesIntro:
      'Off-the-shelf software can force teams into rigid workflows, disconnected systems, unnecessary features, and costly workarounds that limit growth. We build custom software around your processes, users, and goals, giving you technology that works the way your business works.',
    capabilities: [
      {
        title: 'Fit Your Workflows',
        description:
          'Design software around your actual processes instead of changing operations to accommodate limitations within off-the-shelf platforms.',
      },
      {
        title: 'Connect Your Systems',
        description:
          'Integrate applications, databases, APIs, third-party platforms, and internal tools to create connected digital operations.',
      },
      {
        title: 'Automate Complex Processes',
        description:
          'Replace repetitive manual tasks with intelligent workflows that improve productivity, reduce errors, and help teams work efficiently.',
      },
      {
        title: 'Scale With Confidence',
        description:
          'Build flexible software architecture that supports increasing users, data, transactions, integrations, and changing business requirements.',
      },
      {
        title: 'Own Your Technology',
        description:
          'Create software tailored to your business without depending on rigid features, unnecessary subscriptions, or limitations from generic platforms.',
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
      'Our custom software development process combines business discovery, technical planning, iterative development, and continuous improvement to deliver reliable products.',
    process: [
      {
        phase: 'Discover',
        title: 'Define Requirements',
        description:
          'We analyse your workflows, users, challenges, and goals to create clear requirements and a practical development roadmap.',
      },
      {
        phase: 'Develop',
        title: 'Build Software',
        description:
          'Our engineers develop secure, scalable applications with modern architecture, intuitive experiences, integrations, automation, and continuous testing.',
      },
      {
        phase: 'Scale',
        title: 'Improve Performance',
        description:
          'We launch, monitor, optimise, and enhance your software as your business grows and new requirements emerge.',
      },
    ],
    techTitle: 'Technology Behind Our Software',
    techIntro:
      'We use modern frameworks, cloud platforms, APIs, databases, and development tools to build secure, scalable software applications.',
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
    projectsIntro:
      'Explore how Stack360 builds tailored software that solves complex business challenges and creates scalable digital experiences across industries.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('atc'), projectRef('nuvana'), projectRef('cadcam-masters')],
    faqsTitle: 'Custom Software FAQs',
    faqsIntro:
      'Find answers to technical questions about custom software development, architecture, integrations, security, scalability, and implementation.',
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
        'Partner with Stack360 to develop secure, scalable custom software that fits your workflows, connects your systems, and supports long-term growth.',
      primary: { label: 'Build Custom Software', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  cloud: {
    slug: 'cloud',
    reviewer: FOUNDER_REVIEWER,
    hero: {
      eyebrow: 'What We Build · Cloud',
      title: 'Move To Cloud With',
      highlight: 'Confidence And Scale',
      description:
        'Our cloud migration services modernize infrastructure, improve scalability, strengthen security, and create flexible environments built around your business requirements.',
      cta: { label: 'Modernize Your Cloud', href: '/contact' },
    },
    capabilitiesTitle: 'Challenges & Solutions',
    capabilitiesIntro:
      'Legacy infrastructure, rising costs, security concerns, and complex environments can limit performance, scalability, and business growth.',
    capabilities: [
      {
        title: 'Modern Cloud Infrastructure',
        description:
          'We design flexible cloud environments that improve performance, scalability, security, and operational efficiency across your technology ecosystem.',
      },
      {
        title: 'Seamless Cloud Migration',
        description:
          'Our cloud migration services move applications, data, and infrastructure securely while minimising disruption to ongoing business operations.',
      },
      {
        title: 'Managed Cloud Operations',
        description:
          'Our managed cloud services help monitor, optimise, and maintain cloud environments for better reliability, performance, and cost control.',
      },
      {
        title: 'Secure Cloud Environments',
        description:
          'Our cloud security services protect applications, infrastructure, identities, and business data through security-focused architecture and continuous monitoring.',
      },
      {
        title: 'Scalable Cloud Applications',
        description:
          'Our cloud application development services create modern applications designed for flexible infrastructure, high availability, performance, and future growth.',
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
        { label: 'Catalogue', value: '100,000+ parts' },
        { label: 'Stack', value: 'Ruby on Rails, Angular, Elasticsearch, AWS' },
      ],
      href: '/our-work/case-studies/autobuffy',
      linkLabel: 'Read the full Autobuffy case study',
    },
    processTitle: 'From Infrastructure To Cloud',
    processIntro:
      'Our cloud migration consulting services align business requirements, infrastructure, applications, data, security, and deployment strategies before migration begins.',
    process: [
      {
        phase: 'Assess',
        title: 'Analyse Environment',
        description:
          'We evaluate your infrastructure, applications, dependencies, workloads, data, and business requirements to create a practical migration roadmap.',
      },
      {
        phase: 'Migrate',
        title: 'Move Systems',
        description:
          'We migrate applications, workloads, databases, and infrastructure using controlled processes designed to minimise downtime and operational disruption.',
      },
      {
        phase: 'Optimise',
        title: 'Improve Performance',
        description:
          'We optimise cloud resources, security, workloads, and infrastructure to improve reliability, efficiency, scalability, and ongoing cloud performance.',
      },
    ],
    techTitle: 'Technology Behind Cloud Services',
    techIntro:
      'We use modern cloud platforms, containers, infrastructure automation, databases, monitoring, and security technologies for scalable environments.',
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
    projectsIntro:
      'Explore how Stack360 modernises infrastructure, migrates workloads, and builds scalable cloud environments that support growing digital products.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('truck-4'), projectRef('autobuffy'), projectRef('whistle')],
    faqsTitle: 'Cloud Services FAQs',
    faqsIntro:
      'Find answers to technical questions about cloud migration, infrastructure, security, application development, managed services, and optimisation.',
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
      title: 'Ready To Modernize Your Cloud Infrastructure?',
      description:
        'Partner with Stack360 for cloud migration and managed services that improve scalability, security, reliability, and long-term technology performance.',
      primary: { label: 'Modernize Your Cloud', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
    },
  },

  automation: {
    slug: 'automation',
    reviewer: FOUNDER_REVIEWER,
    hero: {
      eyebrow: 'What We Build · Automation',
      title: 'Automate Business Processes And',
      highlight: 'Work Smarter',
      description:
        'Our business process automation services eliminate repetitive work, connect systems, streamline workflows, and help teams improve productivity and operational efficiency.',
      cta: { label: 'Automate Your Processes', href: '/contact' },
    },
    capabilitiesTitle: 'Challenges & Solutions',
    capabilitiesIntro:
      'Manual processes, repetitive tasks, disconnected systems, and inconsistent workflows can consume valuable time and limit operational efficiency.',
    capabilities: [
      {
        title: 'Smarter Business Workflows',
        description:
          'We automate repetitive business processes around your existing systems, workflows, teams, and operational requirements.',
      },
      {
        title: 'Automate Repetitive Tasks',
        description:
          'Replace manual data entry, notifications, approvals, reporting, and administrative work with reliable automated workflows.',
      },
      {
        title: 'Connect Business Systems',
        description:
          'Integrate CRMs, ERPs, APIs, databases, SaaS platforms, and internal applications to create connected business processes.',
      },
      {
        title: 'Improve Process Efficiency',
        description:
          'Identify operational bottlenecks and automate inefficient workflows to reduce delays, errors, and unnecessary manual intervention.',
      },
      {
        title: 'Scale Automated Operations',
        description:
          'Build automation workflows that support growing transaction volumes, teams, customers, and increasingly complex business processes.',
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
    processIntro:
      'Our automation process identifies repetitive work, maps workflows, integrates systems, and implements reliable automation around your business operations.',
    process: [
      {
        phase: 'Discover',
        title: 'Map Processes',
        description:
          'We analyse workflows, repetitive tasks, systems, and bottlenecks to identify the best opportunities for business process automation.',
      },
      {
        phase: 'Automate',
        title: 'Build Workflows',
        description:
          'We develop automated workflows, system integrations, triggers, notifications, approvals, and intelligent processes around your requirements.',
      },
      {
        phase: 'Optimise',
        title: 'Improve Efficiency',
        description:
          'We monitor automated processes, identify bottlenecks, refine workflows, and expand automation as your operational needs evolve.',
      },
    ],
    techTitle: 'Technology Behind Automation',
    techIntro:
      'We combine APIs, workflow engines, cloud platforms, AI, databases, and integration tools to build reliable automated processes.',
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
          'Compliance and certification checks that flag problems early. Alertia cross-checks guard shifts against licence expiry dates.',
      },
      {
        title: 'Routing incoming work',
        description:
          'Sending each ticket or request to the right person. Contakti routes support messages with AI.',
      },
      {
        title: 'Leave judgement calls to people',
        description:
          'Automate the steps around a decision, then let a person make it. Refunds, hiring and pricing exceptions are good examples.',
      },
    ],
    projectsTitle: 'Automation In Action',
    projectsIntro:
      'Explore how Stack360 connects systems, automates workflows, and builds intelligent solutions that improve efficiency across business operations.',
    projectsCtaLabel: 'View All Case Studies',
    projects: [projectRef('cercle'), projectRef('falcore'), projectRef('alertia')],
    faqsTitle: 'Automation Services FAQs',
    faqsIntro:
      'Find answers to technical questions about business process automation, integrations, workflows, AI automation, and automated software testing.',
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
          'Yes. Most automation is integration work: Cercle syncs its catalogue and orders with Facebook, and ATC sends billable hours to Zoho Books.',
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
      title: 'Ready To Automate Your Business Processes?',
      description:
        'Partner with Stack360 to automate repetitive workflows, connect business systems, reduce operational friction, and create more efficient digital operations.',
      primary: { label: 'Start Your Automation Project', href: '/contact' },
      secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
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
};

/** The services each service page links to: the ones its projects usually involve as well. */
export const RELATED_CAPABILITIES: Record<CapabilitySlug, readonly CapabilitySlug[]> = {
  'custom-software': ['web-apps', 'erp', 'automation'],
  'web-apps': ['saas', 'custom-software', 'cloud'],
  'mobile-apps': ['web-apps', 'saas', 'ai-solutions'],
  'ai-solutions': ['automation', 'saas', 'custom-software'],
  erp: ['crm', 'automation', 'custom-software'],
  crm: ['erp', 'automation', 'saas'],
  saas: ['web-apps', 'mobile-apps', 'cloud'],
  cloud: ['devops', 'saas', 'web-apps'],
  devops: ['cloud', 'saas', 'custom-software'],
  automation: ['ai-solutions', 'crm', 'erp'],
};

/** The service page whose project story is this case study, if any. */
export function getCapabilityForStory(caseStudyPath: string): CapabilitySlug | undefined {
  return (Object.keys(CAPABILITY_PAGES) as CapabilitySlug[]).find(
    (slug) => CAPABILITY_PAGES[slug].story?.href === caseStudyPath
  );
}
