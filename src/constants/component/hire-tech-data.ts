import type { HireSkillId } from '@/constants/component/hire-talent-data';
import type { CapabilitySlug } from '@/constants/component/what-we-build-data';

/**
 * Technology-specific hire pages under /work-with-us/hire/<slug>.
 * Every project listed here is from the Stack360 portfolio. Do not add a project
 * we did not deliver, and keep the stack labels honest about which part we built.
 */

export interface HireTechProject {
  name: string;
  summary: string;
  stack: readonly string[];
  /** Public site of the product, when it is live. */
  url?: string;
  /** Our case study for it, when one exists. */
  caseStudy?: string;
}

export interface HireTechFaq {
  id: string;
  question: string;
  answer: string;
}

export interface HireTechPage {
  slug: string;
  /** Pre-selects this skill in the hire form. */
  skillId: HireSkillId;
  /** Short technology name, e.g. "React". */
  name: string;
  /** Used for cross-links, e.g. "React developers". */
  linkLabel: string;
  /** Simple Icons slug for the technology badge. */
  iconSlug: string;
  meta: { title: string; description: string; keywords: readonly string[] };
  hero: { eyebrow: string; title: string; highlight: string; description: string };
  workTitle: string;
  workIntro: string;
  work: readonly { title: string; description: string }[];
  projectsTitle: string;
  projectsIntro: string;
  projects: readonly HireTechProject[];
  tech: readonly string[];
  faqs: readonly HireTechFaq[];
}

export const HIRE_TECH_PAGES: readonly HireTechPage[] = [
  {
    slug: 'swift-developers',
    skillId: 'swift',
    name: 'Swift',
    linkLabel: 'Swift and iOS developers',
    iconSlug: 'swift',
    meta: {
      title: 'Hire Swift Developers for Native iOS Apps',
      description:
        'Hire full-time remote Swift and SwiftUI developers for native iOS apps, App Store releases and existing codebases. Vetted shortlist within 2 days.',
      keywords: [
        'hire swift developers',
        'hire ios developers',
        'swiftui developers',
        'swift developers for hire',
      ],
    },
    hero: {
      eyebrow: 'Work With Us · Hire Swift Developers',
      title: 'Hire Swift developers',
      highlight: 'for native iOS apps.',
      description:
        'Full-time remote iOS engineers who write Swift and SwiftUI, ship through TestFlight and App Store review, and work inside your team’s repo and sprint with overlap on US hours.',
    },
    workTitle: 'What our Swift developers work on',
    workIntro:
      'Native iOS earns its cost when the app leans on the device: the camera, health data, background tasks, widgets or Apple Pay. That is the work we put Swift engineers on.',
    work: [
      {
        title: 'New native apps',
        description:
          'SwiftUI screens for new products, with UIKit where SwiftUI still falls short, and an architecture the next engineer can follow.',
      },
      {
        title: 'Existing Swift codebases',
        description:
          'Picking up an app another team wrote, getting it building on the current Xcode, and fixing crashes from the reports before adding features.',
      },
      {
        title: 'Apple frameworks',
        description:
          'HealthKit, MapKit, StoreKit subscriptions, push notifications, widgets and background refresh, the parts cross-platform tools make harder.',
      },
      {
        title: 'Releases and review',
        description:
          'Certificates, TestFlight builds for your testers, App Store Connect listings, and answering review feedback so a release does not stall.',
      },
    ],
    projectsTitle: 'iOS apps we have shipped',
    projectsIntro:
      'Recent apps that went through the App Store with our team. The stack shows the part we built.',
    projects: [
      {
        name: 'Nextflag',
        summary:
          'Social travel app for saving and sharing places on a map. We added the map screen, fixed onboarding drop-offs and smoothed post uploads.',
        stack: ['React Native', 'Rails GraphQL API', 'PostgreSQL'],
        caseStudy: '/our-work/case-studies/nextflag',
      },
      {
        name: 'Orchyd',
        summary:
          'Private cycle and fertility tracking app with an AI assistant for menstrual health questions and access to OB-GYN advice.',
        stack: ['React Native', 'OpenAI API', 'Firebase'],
        url: 'https://www.orchyd.com',
      },
      {
        name: 'Slumber & Sprout',
        summary:
          'Sleep app for children on the App Store. We built the Rails backend the app talks to.',
        stack: ['Ruby on Rails API'],
        url: 'https://apps.apple.com/au/app/id1565785599',
      },
    ],
    tech: ['swift', 'apple', 'xcode', 'firebase', 'graphql', 'reactnative'],
    faqs: [
      {
        id: 'native-or-cross-platform',
        question: 'Should we build in native Swift or cross-platform?',
        answer:
          'Go native when the app is iOS only or depends on device features such as HealthKit, widgets, background location or heavy animation. If you need iOS and Android from one codebase and the app is mostly forms, feeds and API calls, React Native or Flutter usually costs less. We build all three, so we will tell you which fits your app.',
      },
      {
        id: 'swiftui-or-uikit',
        question: 'Do your developers use SwiftUI or UIKit?',
        answer:
          'Both. New screens are usually SwiftUI. Older apps and some complex screens are UIKit, and most real apps mix the two, so the engineers we place work comfortably in either.',
      },
      {
        id: 'existing-app',
        question: 'Can a Swift developer take over an app another team built?',
        answer:
          'Yes. The first week usually goes on getting the project building on the current Xcode, reading the crash reports and writing down what the code does before changing it.',
      },
      {
        id: 'app-store',
        question: 'Will they handle App Store releases?',
        answer:
          'Yes. They can manage signing, TestFlight builds and App Store Connect, or work inside the release process you already have.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work full time on your project and overlap with US time zones when your schedule needs it.',
      },
    ],
  },
  {
    slug: 'react-developers',
    skillId: 'react',
    name: 'React',
    linkLabel: 'React and Next.js developers',
    iconSlug: 'react',
    meta: {
      title: 'Hire React Developers | React and Next.js Engineers',
      description:
        'Hire full-time remote React and Next.js developers who have shipped products like Fyxer, Cinekit and Truck-4. Vetted shortlist within 2 days.',
      keywords: [
        'hire react developers',
        'hire next.js developers',
        'react developers for hire',
        'remote react developers',
      ],
    },
    hero: {
      eyebrow: 'Work With Us · Hire React Developers',
      title: 'Hire React developers',
      highlight: 'who have shipped real products.',
      description:
        'Our React and Next.js engineers have built an AI email assistant, a gear-rental marketplace with around 100,000 users and a trucking platform. They join your team full time and overlap with US hours.',
    },
    workTitle: 'What our React developers work on',
    workIntro:
      'Most of our React work sits on a real backend, whether Rails, Django, Node or Laravel. The engineers we place can read an API, find the query behind a slow page and agree a contract with the backend team.',
    work: [
      {
        title: 'Next.js products',
        description:
          'App Router builds with server rendering for pages that need to rank, and content the client’s own staff can edit. Luxe Excursions runs on Next.js 16 this way.',
      },
      {
        title: 'Dashboards and internal tools',
        description:
          'Tables, filters, charts and bulk actions over large data sets. Truck-4’s React front end works over more than 2 million shipper records.',
      },
      {
        title: 'AI features in the interface',
        description:
          'Streaming answers, drafts the user can edit before sending, and review steps for anything automated. We worked on Fyxer, an assistant that drafts email replies in the user’s own tone.',
      },
      {
        title: 'Inherited React codebases',
        description:
          'Upgrading old React versions, removing state libraries the app no longer needs, and adding tests before a refactor so behavior stays the same.',
      },
    ],
    projectsTitle: 'React projects we have delivered',
    projectsIntro: 'Products from our portfolio with a React or Next.js front end.',
    projects: [
      {
        name: 'Fyxer',
        summary:
          'AI executive assistant that sorts the inbox, drafts replies in your tone and writes up meeting notes, working with Gmail and Outlook.',
        stack: ['React', 'Python', 'Django'],
        url: 'https://www.fyxer.com',
      },
      {
        name: 'Cinekit',
        summary:
          'Peer-to-peer rental marketplace for filmmaking gear, with around 100,000 users across the UK, Europe and the US and a recommendation system built on trust.',
        stack: ['React', 'Ruby on Rails'],
        url: 'https://www.cinekit.co',
      },
      {
        name: 'Truck-4',
        summary:
          'Marketplace to find, lease or buy trucks, tractors and trailers, running on microservices with more than 2 million shipper records.',
        stack: ['React', 'Node.js', 'MongoDB', 'RabbitMQ'],
        caseStudy: '/our-work/case-studies/truck-4',
      },
      {
        name: 'Luxe Excursions',
        summary:
          'Booking platform for a Tenerife tour company with Stripe payments, a staff CMS and automated booking alerts. We also run its SEO, Google Ads and Business Profile.',
        stack: ['Next.js', 'Django', 'PostgreSQL', 'AWS'],
        url: 'https://luxeexcursionstenerife.com',
      },
    ],
    tech: [
      'react',
      'nextdotjs',
      'typescript',
      'tailwindcss',
      'redux',
      'graphql',
      'nodedotjs',
      'vercel',
    ],
    faqs: [
      {
        id: 'next-or-vite',
        question: 'Should we use Next.js or a plain React app?',
        answer:
          'Use Next.js when pages need to rank in Google or load fast for first-time visitors, as marketing sites, marketplaces and content pages do. For a logged-in dashboard where search does not matter, a Vite single-page app is simpler to host and reason about. Our developers work in both.',
      },
      {
        id: 'backend',
        question: 'Can your React developers work on the backend too?',
        answer:
          'Most of our React projects pair it with a Rails, Django, Node or Laravel backend, so we can place an engineer who is comfortable on both sides or put together a small team that covers each.',
      },
      {
        id: 'typescript',
        question: 'Do they write TypeScript?',
        answer:
          'Yes. New work is TypeScript by default. In older JavaScript codebases we add types file by file instead of stopping feature work for a rewrite.',
      },
      {
        id: 'existing-codebase',
        question: 'Can they join a codebase that is already in production?',
        answer:
          'Yes. Expect the first days to go on reading the code, running it locally and shipping small fixes, so they learn your conventions before taking on larger features.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work full time on your project and overlap with US time zones when your schedule needs it.',
      },
    ],
  },
  {
    slug: 'react-native-developers',
    skillId: 'react-native',
    name: 'React Native',
    linkLabel: 'React Native developers',
    iconSlug: 'react',
    meta: {
      title: 'Hire React Native Developers for iOS and Android',
      description:
        'Hire full-time remote React Native developers who have shipped apps like Nextflag and Orchyd to the App Store and Google Play. Shortlist within 2 days.',
      keywords: [
        'hire react native developers',
        'react native developers for hire',
        'react native app developers',
        'hire mobile app developers',
      ],
    },
    hero: {
      eyebrow: 'Work With Us · Hire React Native Developers',
      title: 'Hire React Native developers',
      highlight: 'for one app on iOS and Android.',
      description:
        'Engineers who have taken React Native apps through App Store and Google Play review, from a social travel app to an AI health tracker. Full time on your project, with overlap on US hours.',
    },
    workTitle: 'What our React Native developers work on',
    workIntro:
      'React Native suits apps that are mostly screens, feeds, forms and API calls and need to ship on both platforms from one team. Our developers also know where it needs native code.',
    work: [
      {
        title: 'New cross-platform apps',
        description:
          'Expo or bare React Native, navigation, offline caching and push notifications, built so one codebase ships to both stores.',
      },
      {
        title: 'Maps and location',
        description:
          'Geolocated markers, filters and search by city. On Nextflag we built the map screen people use to find and save places.',
      },
      {
        title: 'Stability fixes',
        description:
          'Tracing crashes and drop-offs to their cause. Nextflag’s onboarding now saves each step and resumes the session, so new users stop losing progress.',
      },
      {
        title: 'Native modules and releases',
        description:
          'Bridging to Swift or Kotlin when a library is missing, and managing builds, signing and store listings for both platforms.',
      },
    ],
    projectsTitle: 'React Native apps we have delivered',
    projectsIntro: 'Mobile apps from our portfolio, live on the App Store and Google Play.',
    projects: [
      {
        name: 'Nextflag',
        summary:
          'Social app for creating and sharing location flags, following people and planning trips from real recommendations.',
        stack: ['React Native', 'Rails GraphQL API', 'PostgreSQL'],
        caseStudy: '/our-work/case-studies/nextflag',
      },
      {
        name: 'Orchyd',
        summary:
          'Free, private cycle and fertility tracker with an AI assistant for menstrual health questions and round-the-clock OB-GYN access.',
        stack: ['React Native', 'OpenAI API', 'Firebase'],
        url: 'https://www.orchyd.com',
      },
      {
        name: 'Trusted Tastes',
        summary:
          'Restaurant discovery built on recommendations from people you follow, on web and mobile.',
        stack: ['React Native', 'React'],
        url: 'https://trustedtastes.app',
      },
    ],
    tech: ['react', 'expo', 'typescript', 'firebase', 'graphql', 'swift', 'kotlin', 'android'],
    faqs: [
      {
        id: 'rn-or-flutter',
        question: 'React Native or Flutter: which should we pick?',
        answer:
          'If your team already writes React or TypeScript, React Native lets them share knowledge and some code with the web app. Flutter draws every pixel itself, which helps when the design is highly custom. Both ship to iOS and Android from one codebase, and we build in both.',
      },
      {
        id: 'expo',
        question: 'Do you use Expo?',
        answer:
          'For most new apps, yes. It removes a lot of build setup. When an app needs a native library Expo does not support, we use a development build or bare React Native.',
      },
      {
        id: 'native-code',
        question: 'What happens when we need a native feature?',
        answer:
          'Our developers write native modules in Swift or Kotlin when a library is missing or too slow, then expose them to the JavaScript side.',
      },
      {
        id: 'existing-app',
        question: 'Can you take over a React Native app another team built?',
        answer:
          'Yes. Much of our Nextflag work was exactly that: fixing the crashes and onboarding drop-offs users hit before adding new features.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work full time on your project and overlap with US time zones when your schedule needs it.',
      },
    ],
  },
  {
    slug: 'nodejs-developers',
    skillId: 'nodejs',
    name: 'Node.js',
    linkLabel: 'Node.js and NestJS developers',
    iconSlug: 'nodedotjs',
    meta: {
      title: 'Hire Node.js and NestJS Developers',
      description:
        'Hire full-time remote Node.js and NestJS developers for APIs, microservices and integrations, proven on Truck-4 and DuroLabs. Shortlist in 2 days.',
      keywords: [
        'hire node.js developers',
        'hire nestjs developers',
        'node js developers for hire',
        'hire backend developers',
      ],
    },
    hero: {
      eyebrow: 'Work With Us · Hire Node.js Developers',
      title: 'Hire Node.js and NestJS developers',
      highlight: 'for APIs that hold up.',
      description:
        'Backend engineers who have built a trucking marketplace on microservices, a personal finance platform for loans and credit, and integrations for engineering parts catalogs. Full time on your team, with overlap on US hours.',
    },
    workTitle: 'What our Node.js developers work on',
    workIntro:
      'Node earns its place when the work is mostly I/O: APIs, queues, webhooks and talking to other systems. That is most of the Node work in our portfolio.',
    work: [
      {
        title: 'APIs and services',
        description:
          'REST and GraphQL APIs in NestJS or Express, with validation, auth, rate limits and tests that run on every pull request.',
      },
      {
        title: 'Queues and microservices',
        description:
          'Moving slow work out of the request path. Truck-4 uses RabbitMQ to pass work between its services.',
      },
      {
        title: 'Third-party integrations',
        description:
          'Payment providers, CRMs and supplier catalogs. On DuroLabs we connected the product to Octopart and McMaster-Carr parts data.',
      },
      {
        title: 'Performance and cost',
        description:
          'Finding the slow query or the N+1 call, adding caching where it pays off, and cutting server bills that grew with traffic.',
      },
    ],
    projectsTitle: 'Node.js projects we have delivered',
    projectsIntro: 'Products from our portfolio with a Node.js backend.',
    projects: [
      {
        name: 'Truck-4',
        summary:
          'Commercial vehicle rental and sales marketplace on microservices, with secure auth, uploads and more than 2 million shipper records.',
        stack: ['Node.js', 'MongoDB', 'RabbitMQ', 'React'],
        caseStudy: '/our-work/case-studies/truck-4',
      },
      {
        name: 'MyMoneyKarma (now MoneyKarma)',
        summary: 'Personal finance platform in India for managing loans and credit.',
        stack: ['Node.js', 'Express', 'Next.js', 'MySQL'],
        url: 'https://moneykarma.com',
      },
      {
        name: 'DuroLabs',
        summary:
          'Product lifecycle management for engineering firms, with integrations to Octopart and McMaster-Carr.',
        stack: ['Node.js', 'React', 'MongoDB', 'AWS'],
        url: 'https://durolabs.co',
      },
      {
        name: 'DealForma',
        summary:
          'Biopharma deals database with complex filtering and analyst insight for research teams.',
        stack: ['Node.js', 'Laravel', 'React', 'AWS'],
        url: 'https://dealforma.com',
      },
      {
        name: 'BlockCircle',
        summary:
          'Investment analytics for the digital-asset market, with tools for self-education and tracking wealth.',
        stack: ['Node.js', 'React', 'MongoDB'],
        url: 'https://blockcircle.com',
      },
    ],
    tech: [
      'nodedotjs',
      'nestjs',
      'express',
      'typescript',
      'postgresql',
      'mongodb',
      'redis',
      'rabbitmq',
    ],
    faqs: [
      {
        id: 'nest-or-express',
        question: 'NestJS or Express?',
        answer:
          'NestJS gives a larger team a shared structure out of the box: modules, dependency injection and decorators for validation. Express suits small services where that structure would be overhead. On an existing codebase we follow what is already there.',
      },
      {
        id: 'when-node',
        question: 'When is Node.js the wrong choice?',
        answer:
          'For CPU-heavy work such as large data processing or machine learning, Python or Go usually fits better. A common pattern is a Node API in front, with that work handed to a separate Python service.',
      },
      {
        id: 'databases',
        question: 'Which databases do your Node developers use?',
        answer:
          'PostgreSQL and MySQL for most products, MongoDB where the data is document-shaped, and Redis for caching and queues.',
      },
      {
        id: 'frontend',
        question: 'Can they work on the front end too?',
        answer:
          'Most of our Node projects ship with a React or Next.js front end, so we can place full-stack engineers who work on both.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work full time on your project and overlap with US time zones when your schedule needs it.',
      },
    ],
  },
  {
    slug: 'flutter-developers',
    skillId: 'flutter',
    name: 'Flutter',
    linkLabel: 'Flutter developers',
    iconSlug: 'flutter',
    meta: {
      title: 'Hire Flutter Developers for iOS and Android Apps',
      description:
        'Hire full-time remote Flutter developers for custom-designed iOS and Android apps from one Dart codebase. Proven on Houzi. Vetted shortlist within 2 days.',
      keywords: [
        'hire flutter developers',
        'flutter developers for hire',
        'flutter app developers',
        'hire dart developers',
      ],
    },
    hero: {
      eyebrow: 'Work With Us · Hire Flutter Developers',
      title: 'Hire Flutter developers',
      highlight: 'for apps that look exactly as designed.',
      description:
        'Dart and Flutter engineers who build custom interfaces for iOS and Android from one codebase, and connect them to Laravel, Node or Firebase backends. Full time on your project, with overlap on US hours.',
    },
    workTitle: 'What our Flutter developers work on',
    workIntro:
      'Flutter renders its own widgets, so a design looks the same on every phone. That makes it a strong fit for products where the interface is the selling point.',
    work: [
      {
        title: 'Custom interfaces',
        description:
          'Branded screens, animation and layouts that would take extra native work in other frameworks. Houzi’s property app includes 360° views of each listing.',
      },
      {
        title: 'White-label apps',
        description:
          'One codebase configured per customer. StoreBevy lets small retailers launch their own branded store app without a separate build each time.',
      },
      {
        title: 'Backend connections',
        description:
          'Auth, payments and data sync against Laravel, Node or Firebase backends, including offline states for poor connections.',
      },
      {
        title: 'Releases on both stores',
        description:
          'Build flavors, signing, TestFlight and Play Console tracks, and store listings for iOS and Android.',
      },
    ],
    projectsTitle: 'Flutter apps we have delivered',
    projectsIntro: 'Apps from our portfolio built in Flutter.',
    projects: [
      {
        name: 'Houzi',
        summary: 'Real estate search and transaction platform with 360° property views.',
        stack: ['Flutter', 'Laravel'],
        url: 'https://houzi.io',
      },
      {
        name: 'StoreBevy',
        summary:
          'White-label SaaS that lets small stores launch their own mobile app. Built for the client and not publicly launched.',
        stack: ['Flutter', 'Laravel', 'MySQL'],
      },
    ],
    tech: ['flutter', 'dart', 'firebase', 'laravel', 'nodedotjs', 'android', 'apple'],
    faqs: [
      {
        id: 'flutter-or-rn',
        question: 'Flutter or React Native: which should we pick?',
        answer:
          'Flutter draws every pixel itself, which keeps a custom design identical across devices and makes animation easier. React Native uses native components and lets a React web team share knowledge. For mostly standard screens either works. We build in both and will recommend one for your app.',
      },
      {
        id: 'web',
        question: 'Can the same Flutter code run on the web?',
        answer:
          'It can, and it works well for logged-in tools. For public pages that need to rank in Google, a separate web front end is usually the better choice.',
      },
      {
        id: 'backend',
        question: 'Which backends do your Flutter developers work with?',
        answer:
          'Laravel in our Flutter projects so far. The app side works the same against any REST or GraphQL API, including Node.js and Firebase.',
      },
      {
        id: 'existing-app',
        question: 'Can you take over an existing Flutter app?',
        answer:
          'Yes. We start by getting it building on the current Flutter version, updating packages that have gone stale and fixing what the crash reports show.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work full time on your project and overlap with US time zones when your schedule needs it.',
      },
    ],
  },
  {
    slug: 'ruby-on-rails-developers',
    skillId: 'ruby-on-rails',
    name: 'Ruby on Rails',
    linkLabel: 'Ruby on Rails developers',
    iconSlug: 'rubyonrails',
    meta: {
      title: 'Hire Ruby on Rails Developers | Rails Experts',
      description:
        'Hire full-time remote Ruby on Rails developers. Rails is our deepest stack, behind Autobuffy, LegalAtoms, Klingit and Coach Catalyst. Shortlist in 2 days.',
      keywords: [
        'hire ruby on rails developers',
        'hire rails developers',
        'ror developers',
        'ruby on rails developers for hire',
      ],
    },
    hero: {
      eyebrow: 'Work With Us · Hire Ruby on Rails Developers',
      title: 'Hire Ruby on Rails developers',
      highlight: 'from our deepest bench.',
      description:
        'Rails is the stack we have shipped the most products on, from an auto parts store with over 100,000 SKUs to legal filing software for US courts. Full-time engineers on your project, with overlap on US hours.',
    },
    workTitle: 'What our Rails developers work on',
    workIntro:
      'Our Rails work covers classic HAML monoliths through to Rails APIs behind Angular, Vue, React and React Native front ends. Much of it is long-running products that keep growing.',
    work: [
      {
        title: 'Large ecommerce catalogs',
        description:
          'Search, filtering and supplier feeds at scale. Autobuffy sells more than 100,000 auto parts SKUs on Rails with Elasticsearch.',
      },
      {
        title: 'Rails APIs for web and mobile',
        description:
          'JSON and GraphQL APIs behind JavaScript front ends and mobile apps, as on LegalAtoms, Nextflag and Pavlok.',
      },
      {
        title: 'Upgrades and long-lived codebases',
        description:
          'Moving older apps to current Rails and Ruby versions, replacing abandoned gems and adding tests around the parts nobody wants to touch.',
      },
      {
        title: 'Marketplaces and SaaS',
        description:
          'Payments, multi-vendor inventory, subscriptions and admin tools, from BuffyHub’s eBay and Amazon inventory sync to Coach Catalyst’s coaching platform.',
      },
    ],
    projectsTitle: 'Rails projects we have delivered',
    projectsIntro: 'A few of the Rails products in our portfolio. Most have their own case study.',
    projects: [
      {
        name: 'Autobuffy',
        summary:
          'Auto parts store on a dropshipping model, with more than 100,000 SKUs and faceted search.',
        stack: ['Ruby on Rails', 'Angular', 'Elasticsearch', 'AWS'],
        url: 'https://autobuffy.com',
        caseStudy: '/our-work/case-studies/autobuffy',
      },
      {
        name: 'LegalAtoms',
        summary:
          'Case filing automation for US courts, with guided document preparation and compliance steps.',
        stack: ['Ruby on Rails', 'Angular', 'DynamoDB'],
        url: 'https://legalatoms.com',
      },
      {
        name: 'Klingit',
        summary:
          'DesignOps platform for brands and a global pool of creatives, with more than 5,000 projects run through it.',
        stack: ['Ruby on Rails', 'Vue.js', 'MySQL', 'AWS'],
        url: 'https://klingit.com',
        caseStudy: '/our-work/case-studies/klingit',
      },
      {
        name: 'Coach Catalyst',
        summary:
          'Coaching platform for scheduling, messaging and tracking client progress in real time.',
        stack: ['Ruby on Rails', 'Vue.js', 'AWS'],
        url: 'https://coachcatalyst.com',
        caseStudy: '/our-work/case-studies/coach-catalyst',
      },
      {
        name: 'BuffyHub',
        summary:
          'Inventory, orders, brands and vendors in one place for sellers on eBay and Amazon.',
        stack: ['Ruby on Rails'],
        caseStudy: '/our-work/case-studies/buffyhub',
      },
      {
        name: 'Pavlok',
        summary:
          'Habit-change wearable. We built the Rails API that tracks device data and the React admin portal.',
        stack: ['Ruby on Rails API', 'React'],
        url: 'https://pavlok.com',
      },
    ],
    tech: [
      'rubyonrails',
      'ruby',
      'postgresql',
      'redis',
      'sidekiq',
      'elasticsearch',
      'graphql',
      'amazonaws',
    ],
    faqs: [
      {
        id: 'still-worth-it',
        question: 'Is Rails still a good choice for a new product?',
        answer:
          'For most web products, yes. Rails gets a team from idea to a working product quickly, and current versions cover real-time features and background jobs without extra frameworks. It is a weaker fit for CPU-heavy work, which we usually move into a separate service.',
      },
      {
        id: 'upgrades',
        question: 'Can you upgrade an old Rails app?',
        answer:
          'Yes. We go one version at a time, run the test suite at every step and write tests first where there are none, so production keeps working through the upgrade.',
      },
      {
        id: 'frontend',
        question: 'Which front ends do your Rails developers work with?',
        answer:
          'Server-rendered HAML and ERB views, and Rails APIs behind Angular, Vue, React and React Native front ends. Our portfolio includes all of them.',
      },
      {
        id: 'background-jobs',
        question: 'Do they handle background jobs and performance?',
        answer:
          'Yes. That covers Sidekiq jobs and queues, database indexing, caching, and finding the N+1 queries that slow a page down as data grows.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work full time on your project and overlap with US time zones when your schedule needs it.',
      },
    ],
  },
  {
    slug: 'angular-developers',
    skillId: 'angular',
    name: 'Angular',
    linkLabel: 'Angular developers',
    iconSlug: 'angular',
    meta: {
      title: 'Hire Angular Developers for Business Web Apps',
      description:
        'Hire full-time remote Angular developers for large web apps and AngularJS migrations. Proven on Autobuffy, LegalAtoms and One40 Connect. Shortlist in 2 days.',
      keywords: [
        'hire angular developers',
        'angular developers for hire',
        'angularjs migration',
        'hire angular js developers',
      ],
    },
    hero: {
      eyebrow: 'Work With Us · Hire Angular Developers',
      title: 'Hire Angular developers',
      highlight: 'for large business web apps.',
      description:
        'Engineers who have built Angular front ends for an auto parts store with over 100,000 SKUs, legal filing software and a customer messaging platform, on Rails and .NET backends. Full time on your team, with overlap on US hours.',
    },
    workTitle: 'What our Angular developers work on',
    workIntro:
      'Angular suits big applications with many screens, forms and developers, where its conventions keep everyone writing code the same way.',
    work: [
      {
        title: 'Complex forms and workflows',
        description:
          'Multi-step forms with validation and saved progress. LegalAtoms walks users through preparing court filings step by step.',
      },
      {
        title: 'Version upgrades',
        description: 'Keeping large apps current. Our work on Autobuffy spans Angular 13 to 16.',
      },
      {
        title: 'AngularJS migrations',
        description:
          'Moving AngularJS apps to modern Angular one screen at a time while the product stays live. We built One40 Connect and Relevant MD on AngularJS, so we know the old framework well.',
      },
      {
        title: 'Working with Rails and .NET backends',
        description:
          'Angular front ends on Ruby on Rails and ASP.NET Core APIs, as on Autobuffy, LegalAtoms and One40 Connect.',
      },
    ],
    projectsTitle: 'Angular projects we have delivered',
    projectsIntro: 'Products from our portfolio with an Angular or AngularJS front end.',
    projects: [
      {
        name: 'Autobuffy',
        summary:
          'Auto parts store with more than 100,000 SKUs, faceted search and dropship fulfilment.',
        stack: ['Angular 13 to 16', 'Ruby on Rails', 'Elasticsearch'],
        url: 'https://autobuffy.com',
        caseStudy: '/our-work/case-studies/autobuffy',
      },
      {
        name: 'LegalAtoms',
        summary: 'Legal case filing automation for US courts.',
        stack: ['Angular', 'Ruby on Rails', 'DynamoDB'],
        url: 'https://legalatoms.com',
      },
      {
        name: 'One40 Connect',
        summary: 'SMS customer communication platform with scheduling for businesses.',
        stack: ['AngularJS', 'ASP.NET Core'],
      },
      {
        name: 'Relevant MD',
        summary: 'Appointment and campaign management for medical offices.',
        stack: ['AngularJS', 'Ruby on Rails'],
        url: 'https://relevantlocal.com',
      },
    ],
    tech: ['angular', 'typescript', 'rubyonrails', 'dotnet', 'postgresql'],
    faqs: [
      {
        id: 'angularjs',
        question: 'Can you migrate our AngularJS app?',
        answer:
          'Yes. Rewriting everything at once rarely goes well, so we move one screen or module at a time and keep the product live throughout. We have built AngularJS apps ourselves, so we know where they tend to break.',
      },
      {
        id: 'angular-or-react',
        question: 'Angular or React for a new app?',
        answer:
          'Angular fits large teams building form-heavy business apps who want one agreed way of doing things. React gives more freedom and a larger hiring pool. We build in both and will give you a straight recommendation for your case.',
      },
      {
        id: 'backend',
        question: 'Which backends do your Angular developers work with?',
        answer: 'Ruby on Rails and ASP.NET Core in our Angular projects so far, and any REST API.',
      },
      {
        id: 'signals',
        question: 'Do they use current Angular features?',
        answer:
          'Yes, including standalone components and signals in new code, while following the patterns already in place in an existing app.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work full time on your project and overlap with US time zones when your schedule needs it.',
      },
    ],
  },
];

export function getHireTechPage(slug: string) {
  return HIRE_TECH_PAGES.find((page) => page.slug === slug);
}

export function getHireTechSlugs() {
  return HIRE_TECH_PAGES.map((page) => page.slug);
}

/** Old /hire-talent/<x>-developer URLs that map to one of these pages. */
export const LEGACY_HIRE_TALENT_REDIRECTS: Readonly<Record<string, string>> = {
  'swift-developer': 'swift-developers',
  'react-developer': 'react-developers',
  'next-developer': 'react-developers',
  'react-native-developer': 'react-native-developers',
  'node-developer': 'nodejs-developers',
  'nest-developer': 'nodejs-developers',
  'flutter-developer': 'flutter-developers',
  'ror-developer': 'ruby-on-rails-developers',
  'angular-developer': 'angular-developers',
};

/** Hire pages offered from each What We Build page, by the stacks used for that work. */
export const HIRE_TECH_FOR_CAPABILITY: Readonly<
  Partial<Record<CapabilitySlug, readonly string[]>>
> = {
  'mobile-apps': ['swift-developers', 'react-native-developers', 'flutter-developers'],
  'web-apps': [
    'react-developers',
    'angular-developers',
    'nodejs-developers',
    'ruby-on-rails-developers',
  ],
  saas: ['ruby-on-rails-developers', 'react-developers', 'nodejs-developers'],
  'custom-software': [
    'ruby-on-rails-developers',
    'react-developers',
    'nodejs-developers',
    'angular-developers',
  ],
  erp: ['ruby-on-rails-developers', 'react-developers', 'angular-developers'],
  crm: ['ruby-on-rails-developers', 'react-developers', 'nodejs-developers'],
};

const CAPABILITY_LINK_LABELS: Readonly<Partial<Record<CapabilitySlug, string>>> = {
  'mobile-apps': 'Mobile app development',
  'web-apps': 'Web app development',
  saas: 'SaaS development',
  'custom-software': 'Custom software development',
  erp: 'ERP development',
  crm: 'CRM development',
};

/** What We Build pages that list this hire page, for links back the other way. */
export function getRelatedCapabilities(techSlug: string) {
  return (Object.entries(HIRE_TECH_FOR_CAPABILITY) as [CapabilitySlug, readonly string[]][])
    .filter(([, slugs]) => slugs.includes(techSlug))
    .map(([slug]) => ({
      href: `/what-we-build/${slug}`,
      label: CAPABILITY_LINK_LABELS[slug] ?? slug,
    }));
}

/** Cost and ownership answers shown on every hire page, worded the same everywhere. */
export function hireSharedFaqs(name: string): HireTechFaq[] {
  return [
    {
      id: 'cost',
      question: `What does a ${name} developer cost?`,
      answer:
        'It depends on the engineer’s seniority and how long you need them. Tell us about the role, and we will talk through the options when we send your shortlist.',
    },
    {
      id: 'ownership',
      question: 'Who owns the code our developer writes?',
      answer:
        'You do. Everything our engineers write for you, including the source code and the intellectual property in it, belongs to you.',
    },
  ];
}
