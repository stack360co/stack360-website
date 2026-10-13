import type { HireSkillId } from '@/constants/component/hire-talent-data';
import {
  CAPABILITY_SERVICE_NAMES,
  type CapabilitySlug,
} from '@/constants/component/what-we-build-data';

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
  /** A blog post that goes deeper on this stack, shown under the FAQs. */
  reading?: { href: string; label: string };
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
        'Full-time remote iOS engineers who write Swift and SwiftUI and ship through TestFlight and App Store review. They work inside your team’s repo and sprint, with overlap on US hours.',
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
    reading: {
      href: '/blog/react-native-or-flutter',
      label: 'React Native or Flutter? How we choose for client apps',
    },
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
          'Yes. Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day.',
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
      title: 'Hire React and Next.js Developers',
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
        'Our React and Next.js engineers have built an AI email assistant, a gear-rental marketplace with around 100,000 users and a trucking platform. Each passes a technical interview, a coding test, a work review and an English check, and you get a shortlist within 2 days. They join your team full time and overlap with US hours.',
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
        name: 'Cercle',
        summary:
          'UK fashion rental marketplace on React and Next.js, with store credit for refunds and catalog sync with Facebook.',
        stack: ['React', 'Next.js', 'Ruby on Rails', 'Stripe'],
        caseStudy: '/our-work/case-studies/cercle',
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
    reading: {
      href: '/blog/slow-react-app',
      label: 'Your React app is slow. It’s probably not React.',
    },
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
          'Most of our React projects pair it with a Rails, Django, Node or Laravel backend. We can place an engineer comfortable on both sides, or a small team that covers each.',
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
        id: 'slow-app',
        question: 'Our React app is slow. Is React the problem?',
        answer:
          'Usually not. On Cercle, a React and Next.js store, most of the speed fixes were behind the front end: better product data handling, image caching and background jobs. Our engineers check the API and database before rewriting components.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day.',
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
    reading: {
      href: '/blog/react-native-or-flutter',
      label: 'React Native or Flutter? How we choose for client apps',
    },
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
        id: 'xamarin',
        question: 'Can you move our Xamarin app to React Native?',
        answer:
          'Yes. With Xamarin out of support since May 2024, React Native is a common next step, especially if your team already builds for the web in React. We move the app in stages and reuse the backend it already talks to.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day.',
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
    reading: {
      href: '/blog/how-to-vet-remote-developers',
      label: 'How to vet a remote developer before they join your team',
    },
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
          'Yes. Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day.',
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
    reading: {
      href: '/blog/react-native-or-flutter',
      label: 'React Native or Flutter? How we choose for client apps',
    },
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
        id: 'xamarin',
        question: 'Can you move our Xamarin app to Flutter?',
        answer:
          'Yes. Microsoft ended support for Xamarin in May 2024, so most teams now move to .NET MAUI, Flutter or React Native. In Flutter we rebuild the app screen by screen and keep the existing backend and APIs where they still work.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day.',
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
      title: 'Hire Ruby on Rails (RoR) Developers',
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
    reading: {
      href: '/blog/marketplace-payments-stripe',
      label: 'Marketplace payments with Stripe: deposits, payouts and refunds',
    },
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
          'Yes. We go one version at a time and run the test suite at every step. Where there are no tests, we write them first, so production keeps working through the upgrade.',
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
          'Yes. Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day.',
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
        'Engineers who have built Angular front ends on Rails and .NET backends. Their work includes an auto parts store with over 100,000 SKUs, legal filing software and a customer messaging platform. Full time on your team, with overlap on US hours.',
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
          'Auto parts store with more than 100,000 SKUs, faceted search and dropship fulfillment.',
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
    reading: {
      href: '/blog/angular-8-to-13-upgrade',
      label: 'Upgrading a live store from Angular 8 to 13 in 20 days',
    },
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
          'Yes. Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day.',
      },
    ],
  },
  {
    slug: 'python-developers',
    skillId: 'python',
    name: 'Python and Django',
    linkLabel: 'Python and Django developers',
    iconSlug: 'django',
    meta: {
      title: 'Hire Python and Django Developers',
      description:
        'Hire full-time remote Python and Django developers for SaaS backends, AI features and compliance tools, proven on Money Ball and Natif.ai. Shortlist in 2 days.',
      keywords: [
        'hire python developers',
        'hire django developers',
        'django developers for hire',
        'hire python django developer',
      ],
    },
    hero: {
      eyebrow: 'Work With Us · Hire Python Developers',
      title: 'Hire Python and Django developers',
      highlight: 'for backends that do the heavy lifting.',
      description:
        'Python engineers who build Django APIs, Celery background workers and the data and AI pipelines behind them. They join your team full time, with overlap on US hours.',
    },
    workTitle: 'What our Python developers work on',
    workIntro:
      'Most of our Django work sits behind products that process something: documents, records, sports stats or compliance checks. Python fits when the backend does more than serve pages.',
    work: [
      {
        title: 'AI and data features',
        description:
          'Retrieval pipelines that make a model look up real data before it answers. Money Ball checks a live NFL database before it replies to a fan.',
      },
      {
        title: 'Document processing',
        description:
          'OCR and handwriting recognition queues that pull fields out of scans. Natif.ai runs incoming files through isolated Django workers.',
      },
      {
        title: 'Background jobs and alerts',
        description:
          'Celery workers for scheduled checks, renewals and notifications. Alertia warns security firms before a guard’s license expires.',
      },
      {
        title: 'Compliance and audit trails',
        description:
          'Role-based access, masked fields and audit logs for sensitive records. Fisar handles GDPR subject access requests for school data protection officers.',
      },
    ],
    projectsTitle: 'Python and Django projects we have delivered',
    projectsIntro: 'Products from our portfolio with a Django backend.',
    projects: [
      {
        name: 'Money Ball',
        summary:
          'AI chatbot that answers NFL stats questions from a live database instead of guessing.',
        stack: ['Django', 'Node.js', 'PostgreSQL', 'Redis'],
        url: 'https://app.moneyball-ai.com',
      },
      {
        name: 'Natif.ai',
        summary:
          'Document-processing backend with OCR and handwriting recognition, documented with Swagger.',
        stack: ['Django', 'Vue.js', 'PostgreSQL', 'AWS'],
      },
      {
        name: 'Alertia',
        summary:
          'Shift scheduling and live patrol tracking for security firms, with license-expiry alerts.',
        stack: ['Django', 'Next.js', 'Celery', 'AWS'],
      },
      {
        name: 'Fisar',
        summary: 'GDPR subject access request tool for school data protection officers.',
        stack: ['Django', 'PostgreSQL', 'Redis', 'AWS'],
      },
      {
        name: 'Mi Taller',
        summary:
          'Garage management with bookings, parts stock and live repair updates for car owners.',
        stack: ['Django', 'React', 'Celery', 'PostgreSQL'],
      },
      {
        name: 'SiteRanker',
        summary: 'Crawler that tracks how websites show up in AI search engines.',
        stack: ['Django', 'Next.js', 'Elasticsearch', 'Celery'],
      },
    ],
    tech: ['python', 'django', 'celery', 'postgresql', 'redis', 'elasticsearch', 'docker'],
    reading: {
      href: '/blog/stop-ai-chatbot-hallucinations',
      label: 'How to stop an AI chatbot from making things up',
    },
    faqs: [
      {
        id: 'django-or-fastapi',
        question: 'Django or FastAPI: which do you use?',
        answer:
          'Django for most products, because its admin, authentication and ORM save weeks of work. FastAPI suits a small, fast API service on its own. The projects we have delivered so far run on Django.',
      },
      {
        id: 'ai',
        question: 'Can your Python developers build AI features?',
        answer:
          'Yes. Money Ball uses retrieval so the model answers from a live database, and Natif.ai reads scans and handwriting. Both run on Django backends our engineers built.',
      },
      {
        id: 'front-end',
        question: 'Can they work on the front end too?',
        answer:
          'Our Django backends have shipped with React, Next.js and Vue.js front ends, so we can place full-stack engineers or pair a Python developer with a front-end one.',
      },
      {
        id: 'existing-app',
        question: 'Can you take over an existing Django app?',
        answer:
          'Yes. We start by getting it running on a supported Python and Django version, then fix what the error logs and slow queries show.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day.',
      },
    ],
  },
  {
    slug: 'vue-developers',
    skillId: 'vue',
    name: 'Vue.js',
    linkLabel: 'Vue.js developers',
    iconSlug: 'vuedotjs',
    meta: {
      title: 'Hire Vue.js Developers for Web Apps and SaaS',
      description:
        'Hire full-time remote Vue.js developers for SaaS products, dashboards and Vue 2 to 3 upgrades, proven on Coach Catalyst, ATC and Klingit. Shortlist in 2 days.',
      keywords: [
        'hire vue developers',
        'hire vue.js developers',
        'vue js developers for hire',
        'vue 3 migration',
      ],
    },
    hero: {
      eyebrow: 'Work With Us · Hire Vue.js Developers',
      title: 'Hire Vue.js developers',
      highlight: 'who have shipped Vue 3 in production.',
      description:
        'Vue.js engineers who build dashboards, portals and SaaS front ends, and move older Vue 2 apps to Vue 3. Full time on your project, with overlap on US hours.',
    },
    workTitle: 'What our Vue.js developers work on',
    workIntro:
      'Vue sits on top of Rails, .NET and Django backends across our portfolio, from healthcare portals to coaching platforms.',
    work: [
      {
        title: 'Vue 2 to Vue 3 upgrades',
        description:
          'Moving to the Composition API without stopping the product. Coach Catalyst switched while coaches kept using it, and its bundle got smaller.',
      },
      {
        title: 'Dashboards and admin tools',
        description:
          'Data-heavy screens with filters, charts and live updates. ATC gives hundreds of employees one live view of HR, billing and messaging.',
      },
      {
        title: 'Real-time features',
        description:
          'Chat, notifications and live status over WebSockets. Coach Catalyst’s chat was rewritten from CoffeeScript to Vue to hold up under load.',
      },
      {
        title: 'Client portals',
        description:
          'Self-serve views where customers follow their own work. Klingit shows clients the state of every creative project.',
      },
    ],
    projectsTitle: 'Vue.js projects we have delivered',
    projectsIntro: 'Products from our portfolio with a Vue.js front end.',
    projects: [
      {
        name: 'Coach Catalyst',
        summary:
          'Coaching platform with scheduling, messaging and a Stripe Connect marketplace, moved from Vue 2 to Vue 3.',
        stack: ['Vue 3', 'Ruby on Rails', 'PostgreSQL', 'Stripe'],
        url: 'https://coachcatalyst.com',
        caseStudy: '/our-work/case-studies/coach-catalyst',
      },
      {
        name: 'ATC',
        summary:
          'Vue.js front end for an internal HR, billing and messaging system that hundreds of employees use daily.',
        stack: ['Vue.js', 'ASP.NET Core', 'PostgreSQL', 'Redis'],
        caseStudy: '/our-work/case-studies/atc',
      },
      {
        name: 'Klingit',
        summary:
          'DesignOps platform where brands, designers and managers run creative projects together.',
        stack: ['Vue.js', 'Ruby on Rails', 'PostgreSQL', 'Stripe'],
        url: 'https://klingit.com',
        caseStudy: '/our-work/case-studies/klingit',
      },
      {
        name: 'Nuvana',
        summary:
          'Vue.js portal where clinic staff track chronic-care patients and their interactions.',
        stack: ['Vue.js', '.NET', 'PostgreSQL', 'Docker'],
      },
      {
        name: 'Microhealth',
        summary: 'Healthcare price-transparency app that turns pricing data into clear tables.',
        stack: ['Vue.js', 'Ruby on Rails', 'MySQL', 'AWS'],
      },
    ],
    tech: ['vuedotjs', 'typescript', 'tailwindcss', 'graphql', 'rubyonrails', 'dotnet', 'django'],
    reading: {
      href: '/blog/vue-2-to-vue-3-migration',
      label: 'Moving a live SaaS from Vue 2 to Vue 3',
    },
    faqs: [
      {
        id: 'vue-or-react',
        question: 'Vue or React: which should we use?',
        answer:
          'If your app already runs on one, stay with it. For a new product both are sound, and React has the larger hiring pool. We build in both and will recommend one for your team.',
      },
      {
        id: 'vue-3',
        question: 'Can you move our app from Vue 2 to Vue 3?',
        answer:
          'Yes. We did it for Coach Catalyst while the platform stayed live, moving components to the Composition API in stages and reducing the bundle size along the way.',
      },
      {
        id: 'backend',
        question: 'Which backends do your Vue developers work with?',
        answer:
          'Ruby on Rails, ASP.NET Core and Django in the projects we have delivered, over REST or GraphQL APIs.',
      },
      {
        id: 'existing-app',
        question: 'Can you take over an existing Vue app?',
        answer:
          'Yes. We start by getting it building on current packages, then fix what the error reports and slow screens show before adding features.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day.',
      },
    ],
  },
  {
    slug: 'dotnet-developers',
    skillId: 'dotnet',
    name: '.NET',
    linkLabel: '.NET developers',
    iconSlug: 'dotnet',
    meta: {
      title: 'Hire .NET Developers for ASP.NET Core Apps',
      description:
        'Hire full-time remote .NET developers for ASP.NET Core systems, real-time SignalR features and scheduled jobs, proven on ATC and Nuvana. Shortlist in 2 days.',
      keywords: [
        'hire .net developers',
        'hire asp.net core developers',
        'dotnet developers for hire',
        'hire c# developers',
      ],
    },
    hero: {
      eyebrow: 'Work With Us · Hire .NET Developers',
      title: 'Hire .NET developers',
      highlight: 'for the systems a business runs on.',
      description:
        'C# and ASP.NET Core engineers who build internal systems, healthcare portals and messaging platforms, with real-time updates and scheduled jobs. Full time on your project, with overlap on US hours.',
    },
    workTitle: 'What our .NET developers work on',
    workIntro:
      'Our .NET work is in systems companies depend on every day: HR and billing, patient care and business texting.',
    work: [
      {
        title: 'Internal business systems',
        description:
          'HR, invoicing and messaging in one place. ATC runs on ASP.NET Core with a Vue.js front end and is used by hundreds of employees.',
      },
      {
        title: 'Real-time updates',
        description:
          'SignalR for live chat, notifications and dashboards that update without a refresh. ATC and One40Connect both use it.',
      },
      {
        title: 'Scheduled and bulk jobs',
        description:
          'Hangfire queues for delayed, recurring and bulk work. One40Connect sends instant, delayed and recurring text campaigns from Azure.',
      },
      {
        title: 'Healthcare and secure data',
        description:
          'JWT authentication and encrypted storage for patient records. Nuvana tracks chronic-care patients and generates Medicare billing.',
      },
    ],
    projectsTitle: '.NET projects we have delivered',
    projectsIntro: 'Products from our portfolio with a .NET backend.',
    projects: [
      {
        name: 'ATC',
        summary:
          'ASP.NET Core backend with SignalR live updates for an internal HR, billing and messaging system.',
        stack: ['ASP.NET Core', 'Vue.js', 'PostgreSQL', 'Redis'],
        caseStudy: '/our-work/case-studies/atc',
      },
      {
        name: 'Nuvana',
        summary:
          '.NET backend that generates Medicare billing from tracked patient care, with JWT authentication and encrypted storage.',
        stack: ['.NET', 'Vue.js', 'PostgreSQL', 'Docker'],
      },
      {
        name: 'One40Connect',
        summary:
          'Business texting platform for scheduled and bulk SMS campaigns, with live conversations over SignalR.',
        stack: ['.NET Core', 'Angular', 'MySQL', 'Azure'],
      },
    ],
    tech: ['dotnet', 'postgresql', 'redis', 'docker', 'vuedotjs', 'angular'],
    reading: {
      href: '/blog/xamarin-to-dotnet-maui-migration',
      label: 'Moving a Xamarin app to .NET MAUI, step by step',
    },
    faqs: [
      {
        id: 'framework',
        question: 'Can you work on older .NET Framework apps?',
        answer:
          'Yes. Our recent projects run on ASP.NET Core, and we can maintain an older .NET Framework app or plan its move to current .NET in stages.',
      },
      {
        id: 'front-end',
        question: 'Which front ends do your .NET developers pair with?',
        answer: 'Vue.js on ATC and Nuvana, and Angular on One40Connect.',
      },
      {
        id: 'hosting',
        question: 'Do they deploy to Azure or AWS?',
        answer: 'Both. One40Connect runs on Azure, while ATC and Nuvana run in Docker on AWS.',
      },
      {
        id: 'testing',
        question: 'How do you test .NET code?',
        answer:
          'With xUnit, run in Docker so tests behave the same on every machine. That is how ATC is covered.',
      },
      {
        id: 'maui',
        question: 'Can you move our Xamarin app to .NET MAUI?',
        answer:
          'Yes. Xamarin support ended on May 1, 2024, and Xamarin apps can no longer ship store updates. A Xamarin.Forms app keeps most of its C# and XAML in .NET MAUI, so we upgrade the projects instead of rebuilding the app. Our own Xamarin.Forms to .NET MAUI migration took under three months.',
      },
      {
        id: 'time-zone',
        question: 'Do they overlap with US working hours?',
        answer:
          'Yes. Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day.',
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
  'django-developer': 'python-developers',
  'python-developer': 'python-developers',
  'vue-developer': 'vue-developers',
  'dotnet-developer': 'dotnet-developers',
};

/** Hire pages offered from each What We Build page, by the stacks used for that work. */
export const HIRE_TECH_FOR_CAPABILITY: Readonly<
  Partial<Record<CapabilitySlug, readonly string[]>>
> = {
  'mobile-apps': ['swift-developers', 'react-native-developers', 'flutter-developers'],
  'web-apps': [
    'react-developers',
    'vue-developers',
    'angular-developers',
    'nodejs-developers',
    'ruby-on-rails-developers',
  ],
  saas: ['ruby-on-rails-developers', 'react-developers', 'vue-developers', 'python-developers'],
  'custom-software': [
    'ruby-on-rails-developers',
    'react-developers',
    'vue-developers',
    'dotnet-developers',
    'nodejs-developers',
  ],
  erp: ['ruby-on-rails-developers', 'dotnet-developers', 'react-developers', 'angular-developers'],
  crm: ['ruby-on-rails-developers', 'vue-developers', 'react-developers', 'nodejs-developers'],
  'ai-solutions': ['python-developers', 'nodejs-developers', 'react-developers'],
  automation: ['python-developers', 'nodejs-developers', 'ruby-on-rails-developers'],
  'legacy-modernization': [
    'angular-developers',
    'vue-developers',
    'dotnet-developers',
    'ruby-on-rails-developers',
  ],
  'software-maintenance': [
    'ruby-on-rails-developers',
    'react-developers',
    'react-native-developers',
    'nodejs-developers',
  ],
  'marketplace-development': [
    'ruby-on-rails-developers',
    'react-developers',
    'react-native-developers',
  ],
};

/** What We Build pages that list this hire page, for links back the other way. */
export function getRelatedCapabilities(techSlug: string) {
  return (Object.entries(HIRE_TECH_FOR_CAPABILITY) as [CapabilitySlug, readonly string[]][])
    .filter(([, slugs]) => slugs.includes(techSlug))
    .map(([slug]) => ({
      href: `/what-we-build/${slug}`,
      label: CAPABILITY_SERVICE_NAMES[slug],
    }));
}

/** How engineers are vetted, shown on every hire page. */
export const HIRE_VETTING_FAQ: HireTechFaq = {
  id: 'vetting',
  question: 'How do you vet your engineers?',
  answer:
    'Every engineer passes four checks before they reach your shortlist. A senior engineer interviews them on their stack, they take a coding test, and we review code and projects they built before. We also check their spoken and written English. Then you interview them yourself.',
};

/** What happens when a placement doesn't work out, shown on every hire page. */
export const HIRE_REPLACEMENT_FAQ: HireTechFaq = {
  id: 'replacement',
  question: 'What if the engineer isn’t the right fit?',
  answer: 'We replace them and handle the handover, so the work keeps moving.',
};

/** Questions on the hire hub. */
export const HIRE_HUB_FAQS: readonly HireTechFaq[] = [
  {
    id: 'speed',
    question: 'How fast can we hire a developer?',
    answer: 'We send a shortlist within 2 days, and hiring can take as little as a week.',
  },
  {
    id: 'location',
    question: 'Where do your engineers work?',
    answer:
      'From our team in Lahore, Pakistan, for clients in the US and UK. They overlap at least 4 hours with a US working day.',
  },
  {
    id: 'team',
    question: 'Can we hire a whole team?',
    answer:
      'Yes. A dedicated team can include engineers, a project manager, a QA engineer, a UI/UX designer and a DevOps engineer.',
  },
];

/** Questions on the dedicated team page. */
export const DEDICATED_TEAM_FAQS: readonly HireTechFaq[] = [
  {
    id: 'vs-staff-aug',
    question: 'What is the difference between a dedicated team and staff augmentation?',
    answer:
      'With staff augmentation, engineers join your team and you manage them. A managed dedicated team adds a project manager who runs the sprints and reporting, with QA, design and DevOps as needed.',
  },
  {
    id: 'grow',
    question: 'Can we start with one engineer and grow?',
    answer: 'Yes. Some clients start with one or two engineers and add roles as the work grows.',
  },
  {
    id: 'location',
    question: 'Where does the team work?',
    answer:
      'From our team in Lahore, Pakistan. The team overlaps at least 4 hours with a US working day.',
  },
  {
    id: 'contract',
    question: 'Is there a long-term contract?',
    answer: 'No. Engagements start without one, and the notice period is agreed in each contract.',
  },
];

/** Ownership answer shown on every hire page, worded the same everywhere. */
export const HIRE_OWNERSHIP_FAQ: HireTechFaq = {
  id: 'ownership',
  question: 'Who owns the code our developer writes?',
  answer:
    'You do. Everything our engineers write for you, including the source code and the intellectual property in it, belongs to you.',
};
