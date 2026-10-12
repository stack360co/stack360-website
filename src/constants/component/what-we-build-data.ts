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

/** Cost and ownership answers shared by every reviewed capability page. */
const PRICING_FAQ = (subject: string): CapabilityFaq => ({
  id: 'cost',
  question: `How much does ${subject} cost?`,
  answer:
    'It depends on the scope. After the discovery call you get a timeline and a delivery plan with clear milestones, before any build work starts.',
});

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
    benefitsTitle: 'Websites Built For Growth',
    benefitsIntro:
      'Our website development services combine performance, usability, scalability, security, and flexibility to support long-term digital growth.',
    benefits: [
      {
        title: 'Better User Experience',
        description:
          'Create intuitive, responsive experiences that help visitors navigate your website easily and find the information they need.',
      },
      {
        title: 'Faster Performance',
        description:
          'Optimised architecture, code, assets, and infrastructure help websites load faster and deliver smoother experiences across devices.',
      },
      {
        title: 'Flexible Functionality',
        description:
          'Custom development allows your website to support unique workflows, features, integrations, and business requirements.',
      },
      {
        title: 'Scalable Architecture',
        description:
          'Build websites and web applications that can support growing traffic, content, customers, transactions, and functionality.',
      },
      {
        title: 'Seamless Integrations',
        description:
          'Connect your website with business systems, APIs, payment platforms, CRMs, ERPs, analytics tools, and third-party services.',
      },
      {
        title: 'Conversion-Focused Experiences',
        description:
          'Combine clear user journeys, intuitive interfaces, strong functionality, and performance to help turn more visitors into customers.',
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
        question: 'What does website development include?',
        answer:
          'Website development can include frontend and backend development, CMS implementation, integrations, ecommerce functionality, databases, APIs, testing, deployment, and ongoing optimisation.',
      },
      {
        id: 'web-custom-vs-template',
        question: 'What is the difference between custom and template-based website development?',
        answer:
          'Custom website development creates functionality and experiences around your specific requirements, while templates provide predefined structures with more limited flexibility.',
      },
      {
        id: 'web-ecommerce',
        question: 'Can you develop ecommerce websites?',
        answer:
          'Yes. Our ecommerce website development services support product catalogues, payments, customer accounts, integrations, inventory workflows, and scalable online shopping experiences.',
      },
      {
        id: 'web-integrate',
        question: 'Can you integrate a website with existing business systems?',
        answer:
          'Yes. We integrate websites with CRMs, ERPs, APIs, payment gateways, databases, analytics platforms, SaaS applications, and other business systems.',
      },
      {
        id: 'web-apps',
        question: 'Can you develop web applications instead of traditional websites?',
        answer:
          'Yes. As a web app development company, we build interactive web applications, customer portals, SaaS platforms, dashboards, internal tools, and complex business applications.',
      },
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
        title: 'Budget for after launch',
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
      PRICING_FAQ('mobile app development'),
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
    benefitsTitle: 'DevOps Built For Performance',
    benefitsIntro:
      'Our DevOps consulting services help teams release faster, automate operations, improve reliability, and create scalable technology environments.',
    benefits: [
      {
        title: 'Faster Delivery',
        description:
          'Automated development and deployment workflows reduce manual bottlenecks and help teams release reliable software more frequently.',
      },
      {
        title: 'Greater Automation',
        description:
          'DevOps automation reduces repetitive infrastructure and deployment tasks while improving consistency across development and production environments.',
      },
      {
        title: 'Improved Reliability',
        description:
          'Continuous monitoring, automated testing, and resilient infrastructure help identify problems earlier and maintain stable application performance.',
      },
      {
        title: 'Better Scalability',
        description:
          'Cloud-native infrastructure and automated provisioning make it easier to scale applications and resources as demand changes.',
      },
      {
        title: 'Stronger Collaboration',
        description:
          'Connected development and operations workflows improve communication, ownership, visibility, and accountability throughout the software lifecycle.',
      },
      {
        title: 'Reduced Operational Risk',
        description:
          'Standardised environments, automated processes, monitoring, and controlled deployments reduce configuration errors and unexpected production issues.',
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
        id: 'devops-scope',
        question: 'What does DevOps consulting include?',
        answer:
          'DevOps consulting can include infrastructure assessment, CI/CD implementation, cloud optimisation, deployment automation, containerisation, monitoring, security, and operational improvements.',
      },
      {
        id: 'devops-automation',
        question: 'How can DevOps automation improve software delivery?',
        answer:
          'DevOps automation reduces manual deployment and infrastructure tasks, improves consistency, accelerates releases, and helps teams detect and resolve issues faster.',
      },
      {
        id: 'devops-cicd',
        question: 'Can you build CI/CD pipelines for existing applications?',
        answer:
          'Yes. We can design and implement CI/CD pipelines for existing applications, including automated testing, builds, deployments, environment management, and release workflows.',
      },
      {
        id: 'devops-cloud',
        question: 'Can you help migrate applications to cloud infrastructure?',
        answer:
          'Yes. Our DevOps development services can support cloud migration, infrastructure configuration, containerisation, deployment automation, monitoring, and post-migration optimisation.',
      },
      {
        id: 'devops-reliability',
        question: 'How do you improve DevOps infrastructure reliability?',
        answer:
          'We combine infrastructure automation, monitoring, testing, deployment controls, scalable architecture, and proactive optimisation to improve reliability and reduce operational risks.',
      },
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
      PRICING_FAQ('AI development'),
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
    benefitsTitle: 'Built For Business Impact',
    benefitsIntro:
      'Enterprise software should do more than digitise processes. It should improve operations, customer experiences, decision-making, and long-term business growth.',
    benefits: [
      {
        title: 'Greater Efficiency',
        description:
          'Automate repetitive workflows and reduce manual processes to help teams accomplish more with fewer operational bottlenecks.',
      },
      {
        title: 'Connected Operations',
        description:
          'Unify departments, applications, and data so your teams can collaborate through connected digital workflows.',
      },
      {
        title: 'Better Visibility',
        description:
          'Centralise critical business information and give decision-makers clearer insights through real-time dashboards and reporting.',
      },
      {
        title: 'Scalable Growth',
        description:
          'Build flexible enterprise applications that adapt to growing users, expanding operations, and evolving business requirements.',
      },
      {
        title: 'Stronger Security',
        description:
          'Protect sensitive business information with secure architecture, access controls, integrations, and development practices.',
      },
      {
        title: 'Lower Technology Costs',
        description:
          'Replace fragmented systems and manual processes with integrated software that improves efficiency and reduces unnecessary operational overhead.',
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
        id: 'erp-what-is',
        question: 'What is enterprise software development?',
        answer:
          'Enterprise software development involves building applications and platforms that support complex business processes, large user bases, integrations, data requirements, and organisational workflows.',
      },
      {
        id: 'erp-custom-vs-enterprise',
        question: 'What is the difference between custom and enterprise software development?',
        answer:
          'Custom software addresses specific business requirements, while enterprise software typically supports complex workflows, multiple departments, integrations, security requirements, and large-scale operations.',
      },
      {
        id: 'erp-integrate',
        question: 'Can you integrate enterprise software with existing systems?',
        answer:
          'Yes. We integrate enterprise applications with CRMs, ERPs, databases, APIs, cloud platforms, payment systems, and other business software.',
      },
      {
        id: 'erp-scalable',
        question: 'How do you make enterprise applications scalable?',
        answer:
          'We use modular architecture, scalable databases, cloud infrastructure, API-driven design, performance optimisation, monitoring, and security practices to support long-term growth.',
      },
      {
        id: 'erp-mobile',
        question: 'Can you develop enterprise mobile applications?',
        answer:
          'Yes. We develop enterprise mobile applications that connect with existing systems and provide secure access to business workflows, data, and services.',
      },
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
    benefitsTitle: 'Drive Growth With Smarter CRM',
    benefitsIntro:
      'Custom CRM software connects teams, automates operations, and gives your business better tools for customer growth and retention.',
    benefits: [
      {
        title: 'Greater Efficiency',
        description:
          'Automate repetitive workflows so teams spend less time managing processes and more time building valuable customer relationships.',
      },
      {
        title: 'Connected Teams',
        description:
          'Give sales, marketing, support, and management teams shared access to accurate customer information and connected workflows.',
      },
      {
        title: 'Better Insights',
        description:
          'Use customer data and analytics to help teams understand performance, identify opportunities, and make informed decisions.',
      },
      {
        title: 'Personalised Experiences',
        description:
          'Use customer history, preferences, and interactions to create relevant experiences that strengthen engagement, retention, and loyalty.',
      },
      {
        title: 'Flexible Workflows',
        description:
          'Configure CRM workflows around your processes instead of forcing teams to adapt operations to rigid software.',
      },
      {
        title: 'Scalable Growth',
        description:
          'Extend your CRM with features, integrations, users, and automation as your customer base and requirements grow.',
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
          'Yes. We can integrate CRM platforms with ERP systems, accounting software, marketing platforms, payment gateways, APIs, databases, and third-party applications.',
      },
      {
        id: 'crm-migrate',
        question: 'How do you migrate customer data from an existing CRM system?',
        answer:
          'We plan structured data migration, map existing records, validate data integrity, and securely transfer customer information into the new CRM.',
      },
      {
        id: 'crm-architecture',
        question: 'How do you design scalable architecture for custom CRM software?',
        answer:
          'We use modular architecture, scalable databases, cloud infrastructure, API-driven design, caching, monitoring, and performance optimisation for long-term growth.',
      },
      {
        id: 'crm-workflows',
        question: 'Can you build automated workflows for sales and customer management?',
        answer:
          'Yes. We can automate lead assignment, follow-ups, notifications, approvals, customer communications, task management, reporting, and other CRM workflows.',
      },
      {
        id: 'crm-roles',
        question: 'Can you develop role-based CRM applications for multiple departments?',
        answer:
          'Yes. We develop role-based CRM applications that give sales, marketing, support, management, and other teams access to relevant workflows and information.',
      },
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
    benefitsTitle: 'SaaS Built For Growth',
    benefitsIntro:
      'Our SaaS development services create products designed for scalability, recurring revenue, operational efficiency, customer retention, and continuous product improvement.',
    benefits: [
      {
        title: 'Faster Market Entry',
        description:
          'SaaS MVP development helps validate product ideas quickly while creating a foundation that supports future features and customers.',
      },
      {
        title: 'Flexible Scaling',
        description:
          'SaaS platform development supports increasing users, transactions, data volumes, integrations, and functionality without unnecessary architectural limitations.',
      },
      {
        title: 'Recurring Revenue',
        description:
          'Build subscription-based products with flexible plans, billing workflows, customer management, usage tracking, and revenue-focused product experiences.',
      },
      {
        title: 'Better Customer Experiences',
        description:
          'Create intuitive SaaS applications that simplify complex workflows, improve productivity, and give customers reliable access across devices.',
      },
      {
        title: 'Lower Infrastructure Costs',
        description:
          'Cloud-based SaaS architecture helps businesses optimise shared infrastructure while efficiently supporting multiple customers and growing workloads.',
      },
      {
        title: 'Continuous Innovation',
        description:
          'SaaS products can evolve continuously through regular releases, feature improvements, integrations, automation, analytics, and customer-driven development.',
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
        id: 'saas-what-is',
        question: 'What is SaaS application development?',
        answer:
          'SaaS application development involves building cloud-based software that customers access online, typically through subscriptions, usage-based pricing, or recurring plans.',
      },
      {
        id: 'saas-custom-vs-traditional',
        question: 'How does custom SaaS development differ from traditional software development?',
        answer:
          'Custom SaaS development focuses on cloud delivery, multi-tenancy, recurring subscriptions, scalable infrastructure, continuous releases, and supporting multiple customers through one platform.',
      },
      {
        id: 'saas-mvp',
        question: 'Can you build a SaaS MVP before developing the full product?',
        answer:
          'Yes. Our SaaS MVP development approach focuses on essential functionality, allowing businesses to validate product assumptions before investing in broader development.',
      },
      {
        id: 'saas-multi-tenant',
        question: 'How do you build scalable multi-tenant SaaS applications?',
        answer:
          'We use tenant-aware architecture, secure data isolation, scalable databases, cloud infrastructure, access controls, monitoring, and performance optimisation.',
      },
      {
        id: 'saas-hire',
        question: 'Can I hire SaaS developers for an existing product?',
        answer:
          'Yes. You can hire SaaS developers from Stack360 to extend an existing application, improve architecture, develop features, resolve technical challenges, or support ongoing product development.',
      },
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
      PRICING_FAQ('custom software'),
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
    benefitsTitle: 'Cloud Built For Growth',
    benefitsIntro:
      'Our cloud services help businesses modernise infrastructure, improve scalability, strengthen security, and optimise technology costs.',
    benefits: [
      {
        title: 'Flexible Scaling',
        description:
          'Cloud infrastructure allows businesses to scale computing, storage, and application resources based on changing workloads and demand.',
      },
      {
        title: 'Improved Reliability',
        description:
          'Resilient cloud architecture, monitoring, backups, and automated processes help maintain application availability and reduce operational disruptions.',
      },
      {
        title: 'Better Cost Control',
        description:
          'Optimise cloud resources and infrastructure usage to reduce unnecessary spending while maintaining the performance your applications require.',
      },
      {
        title: 'Stronger Security',
        description:
          'Managed cloud security services help protect infrastructure, applications, identities, workloads, and sensitive business information.',
      },
      {
        title: 'Faster Innovation',
        description:
          'Modern cloud environments give development teams flexible infrastructure for launching applications, testing features, and deploying updates faster.',
      },
      {
        title: 'Simplified Management',
        description:
          'Cloud automation and managed services reduce infrastructure complexity, allowing teams to focus more on products and business priorities.',
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
        id: 'cloud-migration-how',
        question: 'How do cloud migration services work?',
        answer:
          'We assess your infrastructure, applications, workloads, dependencies, and requirements before creating a migration strategy, executing the move, and optimising the resulting cloud environment.',
      },
      {
        id: 'cloud-migrate-apps',
        question: 'Can you migrate existing applications to the cloud?',
        answer:
          'Yes. We can migrate existing applications, databases, workloads, and infrastructure while selecting appropriate cloud architectures based on performance, security, and scalability requirements.',
      },
      {
        id: 'cloud-managed',
        question: 'What are managed cloud services?',
        answer:
          'Managed cloud services provide ongoing monitoring, maintenance, optimisation, security, infrastructure management, and technical support for cloud environments.',
      },
      {
        id: 'cloud-security',
        question: 'How do you secure cloud infrastructure?',
        answer:
          'We use secure architecture, identity and access controls, encryption, network security, monitoring, vulnerability management, and appropriate security practices based on your environment.',
      },
      {
        id: 'cloud-app-dev',
        question: 'Can you develop applications specifically for cloud environments?',
        answer:
          'Yes. Our cloud application development services create scalable applications designed around cloud infrastructure, APIs, containers, automation, monitoring, and high availability.',
      },
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
    benefitsTitle: 'Automation Built For Efficiency',
    benefitsIntro:
      'Business process automation helps teams reduce manual work, improve accuracy, accelerate operations, and focus resources on higher-value activities.',
    benefits: [
      {
        title: 'Less Manual Work',
        description:
          'Automate repetitive administrative tasks so employees can spend more time on strategic, customer-facing, and revenue-generating activities.',
      },
      {
        title: 'Faster Processes',
        description:
          'Automated workflows reduce unnecessary delays between tasks, approvals, departments, systems, and business operations.',
      },
      {
        title: 'Fewer Errors',
        description:
          'Standardised automated processes reduce human error and improve consistency across repetitive and data-intensive workflows.',
      },
      {
        title: 'Connected Operations',
        description:
          'Connect your business applications and systems so information moves automatically between workflows without unnecessary manual intervention.',
      },
      {
        title: 'Better Visibility',
        description:
          'Track automated workflows, process performance, bottlenecks, and outcomes to identify opportunities for continuous operational improvement.',
      },
      {
        title: 'Scalable Automation',
        description:
          'Expand automation across teams, processes, and systems as transaction volumes and operational requirements continue to grow.',
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
        id: 'auto-what-is',
        question: 'What are business process automation services?',
        answer:
          'Business process automation services use software, integrations, workflows, and intelligent systems to automate repetitive business processes and reduce manual intervention.',
      },
      {
        id: 'auto-which-processes',
        question: 'Which business processes can you automate?',
        answer:
          'We can automate approvals, notifications, data entry, reporting, lead management, customer workflows, document processing, system synchronisation, and other repetitive processes.',
      },
      {
        id: 'auto-cross-system',
        question: 'Can you automate workflows across different business systems?',
        answer:
          'Yes. We integrate CRMs, ERPs, databases, SaaS platforms, APIs, and internal applications to automate processes across multiple systems.',
      },
      {
        id: 'auto-qa',
        question: 'Do you provide QA automation services?',
        answer:
          'Yes. Where required, we can automate software testing workflows to improve test coverage, consistency, regression testing, and release confidence.',
      },
      {
        id: 'auto-ai',
        question: 'Can AI be used for business process automation?',
        answer:
          'Yes. We can combine AI with traditional automation to handle tasks involving document processing, classification, data extraction, recommendations, content generation, and intelligent decision support.',
      },
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
