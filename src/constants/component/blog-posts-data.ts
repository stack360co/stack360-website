/** In-site blog posts — edit this file to add or update articles. */

export type BlogSection = {
  heading: string;
  body: string;
};

export type BlogAuthor = {
  name: string;
  role: string;
  /** Profile page or LinkedIn, when there is one. */
  url?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Shorter title for search results when the headline runs past ~50 characters. */
  seoTitle?: string;
  /** The person who wrote it: the developer who worked on the project. */
  author?: BlogAuthor;
  /** Who checked it before it went live. */
  reviewedBy?: string;
  /** Pages to read next, shown after the conclusion. */
  related?: readonly { label: string; href: string }[];
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  intro: string;
  sections: readonly BlogSection[];
  conclusion: {
    heading: string;
    paragraphs: readonly string[];
  };
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: 'xamarin-to-dotnet-maui-migration',
    title: 'Moving a Xamarin App to .NET MAUI: How We Do It, Step by Step',
    seoTitle: 'Xamarin to .NET MAUI: How We Migrate an App',
    author: { name: 'Tayyab Zia', role: 'Head Software Engineer' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Xamarin apps can no longer ship store updates. How we move a Xamarin.Forms app to .NET MAUI, and what changes beyond renaming the namespaces.',
    date: '2026-10-12',
    category: 'Mobile',
    readTime: '7 min',
    intro:
      'If your app is built on Xamarin.Forms and your team writes C#, move it to .NET MAUI. Microsoft built MAUI as the next version of Xamarin.Forms, so most of your code carries over. We moved a client’s Xamarin.Forms app to .NET MAUI in under three months. Here is the order we work in, and the changes that go beyond renaming namespaces.',
    sections: [
      {
        heading: 'Why a Xamarin app can’t stay where it is',
        body: 'Microsoft ended support for all Xamarin SDKs on May 1, 2024. The last versions target Xcode 15 and Android API 34, and no newer ones are coming.\n\nThe app stores have moved past both. Since April 24, 2025, Apple has required Xcode 16 or later for every upload to App Store Connect. Since August 31, 2025, Google Play has required new apps and updates to target Android 15, which is API 35. A Xamarin app still runs on phones, but it can no longer ship an update to either store.',
      },
      {
        heading: 'MAUI, Flutter or React Native?',
        body: 'Microsoft’s guidance is that Xamarin.Forms projects should move to .NET MAUI. The projects don’t need to be rewritten, and a multi-project solution doesn’t need to become a single project. Your C# models, view models, services and most of your XAML carry over.\n\nFlutter or React Native means rebuilding every screen in another language. That can still be the right call if a redesign was planned anyway, or if your web team already works in React. We build in all three, so we read the code before recommending one.',
      },
      {
        heading: 'Step 1: Get the Xamarin app ready first',
        body: 'We don’t start in MAUI. We start by updating the app to Xamarin.Forms 5 and every package to its latest version, then check it still runs. Microsoft recommends this too, because it narrows the gap between the two APIs.\n\nThen we list every NuGet package and check its Frameworks tab on nuget.org. A package is ready if it lists a .NET target for Android and iOS, such as net10.0-android and net10.0-ios. Each one that doesn’t has three options: recompile it if you own the code, find a newer release, or replace it. This list affects the timeline more than anything else.',
      },
      {
        heading: 'Step 2: Move the projects and rename the namespaces',
        body: 'Every project has to become an SDK-style project, the format all of .NET now uses. The simplest route is a new .NET MAUI class library with the same name as the Xamarin.Forms library. The old code, configuration and resources are then copied in.\n\nThe namespaces come next. Xamarin.Forms becomes Microsoft.Maui and Microsoft.Maui.Controls, and the XAML namespace changes to http://schemas.microsoft.com/dotnet/2021/maui. Xamarin.Essentials is now part of .NET MAUI, so its using statements can go.\n\nFinally, each platform project gets a new entry point. The Android MainApplication and the iOS AppDelegate both call one shared MauiProgram class, which builds the app and registers its services.',
      },
      {
        heading: 'Step 3: Fix what behaves differently',
        body: 'Code that compiles can still look or act differently. These are the changes Microsoft documents, and we check for them on every screen.\n\n1. A BoxView with no size set was 40 by 40 in Xamarin.Forms. In .NET MAUI it is 0 by 0, so it disappears.\n\n2. Default padding, margins and spacing in layouts have changed. Pages can look cramped until the old values are set again.\n\n3. OnAppearing no longer runs when the app comes back from the background. Code that relied on it moves to the Window lifecycle events.\n\n4. Children are added with layout.Add, not layout.Children.Add. RelativeLayout survives only as a compatibility control, so we move those screens to Grid.\n\n5. The Device class is replaced by smaller APIs, such as DeviceInfo.Platform and MainThread. Colors now use float values, and Color.FromArgb replaces Color.FromHex.\n\n6. Custom renderers and effects need updating. We port renderers to .NET MAUI handlers, because .NET 11 drops the compatibility package that ran the old ones.',
      },
      {
        heading: 'Step 4: Keep your users’ data and logins',
        body: 'This step is the easiest to miss, and users notice it first. Xamarin.Forms stored settings in Application.Properties, which .NET MAUI replaces with Preferences. Xamarin.Essentials secure storage and version tracking data also need migrating.\n\nMicrosoft publishes migration code for all three. Without it, the new app can’t read what the old one saved, so people lose their settings or get signed out. We migrate this data on first launch, and test it by installing the new build over the old one.',
      },
      {
        heading: 'Step 5: Test and release it as an update',
        body: 'Before building, we delete the bin and obj folders and the Android Resource.designer.cs file, as Microsoft advises. Then we test on real iPhones and Android phones, not only simulators.\n\nThe new app keeps the old bundle ID, package name and signing keys. That way it reaches users as a normal update, with the same store listing and reviews. It goes to TestFlight and a Google Play testing track first, then out to everyone.',
      },
      {
        heading: 'How long it takes',
        body: 'A migration like this is a one to three month job for us, shorter than the three to six months most of our builds take. It is shorter because the business logic doesn’t change and the backend stays as it is.\n\nThree things push it toward the long end: packages with no .NET version, custom renderers, and platform-specific code in the Android and iOS projects. Count those before you plan.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'Do we have to rewrite the app? No. Microsoft says Xamarin projects don’t need to be rewritten. Most C# and XAML carries over once the projects and namespaces are updated.',
        'Do we have to merge everything into one project? No. A multi-project solution can stay that way, and you can move to a single project later if you want to.',
        'Will users lose their settings or be signed out? Not if Preferences, secure storage and version tracking data are migrated on first launch.',
        'Will it be the same app in the stores? Yes, if it keeps the same bundle ID, package name and signing keys. Users get it as an ordinary update.',
        'Can we keep running the Xamarin app for now? It still runs, but it gets no fixes and can’t ship store updates. Plan the move before you need an urgent fix.',
      ],
    },
    related: [
      { label: 'Legacy modernization', href: '/what-we-build/legacy-modernization' },
      { label: 'Hire .NET developers', href: '/work-with-us/hire/dotnet-developers' },
      { label: 'Hire Flutter developers', href: '/work-with-us/hire/flutter-developers' },
      { label: 'Hire React Native developers', href: '/work-with-us/hire/react-native-developers' },
    ],
  },
  {
    slug: 'how-long-software-projects-take',
    title: 'How Long Software Projects Take: Data From 28 of Our Projects',
    seoTitle: 'How Long Software Projects Take: 28 Projects',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Most software projects we build take three to six months. Durations, team sizes and hours from 28 real projects, and what made each one short or long.',
    date: '2026-10-12',
    category: 'Data',
    readTime: '5 min',
    intro:
      'Most software projects we take on need three to six months to build. Simple ones, such as a GoHighLevel sales setup or a Xamarin to .NET MAUI migration, take one to three. We checked that against the 28 projects in our portfolio. The portfolio records how long we worked on each one, including work after launch.',
    sections: [
      {
        heading: 'The numbers',
        body: 'Across the 28 projects, the median is 8 months. The shortest took one month, and the two longest ran for 30.\n\n1. One to three months: 3 projects.\n\n2. Four to six months: 9 projects.\n\n3. Seven to twelve months: 10 projects.\n\n4. More than a year: 6 projects.\n\nThe median sits above three to six months because these durations include work after launch. Several of these products kept us on for new features long after their first release.',
      },
      {
        heading: 'Durations by type of project',
        body: 'AI and SEO tools took 3 to 5 months: Money Ball, SiteRanker and Aiode.\n\nSaaS products took 4 to 8 months: Legal Atoms, Clicks.so, Whistle It, Natif.ai and Contakti.\n\nCompliance tools took 4 to 12 months: Alertia, Falcore, NPTAAS and Fisar.\n\nHealthcare platforms took 8 to 12 months: Nuvana and Microhealth. Slumber & Sprout, the one mobile app in the list, took 4.\n\nMarketplaces varied the most, from 1 month for Cinekit to 30 for Coach Catalyst. Mi Taller, Truck-4, Klingit and Cad Cam Masters sit in between.\n\nEcommerce took 6 to 20 months: Westar, CashKart, Cercle, BuffyHub and AutoBuffy. Two long-running platforms, One40Connect and ATC, ran for 24 and 30 months.',
      },
      {
        heading: 'What made the short ones short',
        body: 'Cinekit took one month. It is a camera and production gear rental marketplace for creators in the UK, Europe and the US. The scope was one clear flow: list the gear, book it, hold a security deposit through Stripe and return it. We built it on Ruby on Rails, which suits fast backend delivery.\n\nMoney Ball and SiteRanker took three months each, and each does a single job. Money Ball answers NFL questions from a live stats database. SiteRanker tracks how websites show up in AI search.',
      },
      {
        heading: 'What made the long ones long',
        body: 'The longest projects were products we kept building, not single builds. AutoBuffy’s 20 months covered an Angular upgrade, Elasticsearch search, a real-time inventory service and buy now, pay later at checkout. BuffyHub’s 19 months included syncing with Amazon, eBay and Walmart.\n\nThe pattern is integrations. Every outside system, from a marketplace to a shipping carrier, brings its own rules, test accounts and failure cases. Compliance adds time in the same way: Fisar, a GDPR compliance tool, took 12 months.',
      },
      {
        heading: 'Team size and hours',
        body: 'Our eight case studies record the team and the hours. Five ran with two engineers, ATC and Truck-4 had three, and AutoBuffy had six.\n\nHours ranged from 1,232 on Truck-4 to 28,000 on AutoBuffy. Klingit took 1,400, Nextflag 1,602, Cercle 2,112, ATC 2,800, BuffyHub 3,344 and Coach Catalyst 4,272.',
      },
      {
        heading: 'How to plan yours',
        body: '1. Count the systems it connects to, not the screens. Payments, marketplaces, shipping and compliance rules add more time than pages do.\n\n2. Ship the smallest version people will use, then plan the rest as a series of releases. Cinekit’s one-month build shows what a tight first scope looks like.\n\n3. Plan for work after launch. Frameworks, app stores and payment rules keep changing, so live software needs regular attention.\n\n4. Keep the same team if you can. The engineers who built version one already know where everything is.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'How long does it take to build custom software? Most of our projects take three to six months. Simple ones take one to three, and products that keep growing can run for years.',
        'What is the fastest project we have delivered? Cinekit, a camera gear rental marketplace, in one month.',
        'How many engineers does a project need? Most of our case studies ran with two. The largest, AutoBuffy, had six.',
        'Why do projects run over? Mid-project feature requests are the usual cause. On Klingit, we added a change process that records each request and agrees its effect on scope before work starts.',
      ],
    },
    related: [
      { label: 'Custom software development', href: '/what-we-build/custom-software' },
      { label: 'SaaS development', href: '/what-we-build/saas' },
      { label: 'Marketplace development', href: '/what-we-build/marketplace-development' },
      { label: 'Maintenance and support', href: '/what-we-build/software-maintenance' },
    ],
  },
  {
    slug: 'how-to-vet-remote-developers',
    title: 'How to Vet a Remote Developer Before They Join Your Team',
    seoTitle: 'How to Vet Remote Developers: A Checklist',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'A checklist for vetting a remote developer before they start: interview them, check what they built, test them on real work and settle access and ownership.',
    date: '2026-10-12',
    category: 'Hiring',
    readTime: '4 min',
    intro:
      'Vet a remote developer the way you would vet an employee. Interview them yourself, check which parts of their past projects they built, and watch them work on your own code. Settle access and ownership before day one. Here is the checklist we suggest to clients, and how each step works when the developer comes from us.',
    sections: [
      {
        heading: 'Interview the person, not the agency',
        body: 'Ask to interview the developer who will actually do the work. Talk through something they built: what they chose, what went wrong and what they would change. Someone who did the work can answer follow-up questions without notes.\n\nWith us, you get a shortlist within 2 days, and you interview the engineers yourself before anyone starts.',
      },
      {
        heading: 'Check which part they built',
        body: 'A team page can list a dozen apps, but one developer usually owned one piece of each. Ask which part was theirs: the API, the mobile app, the payments or the deployment.\n\nOn our hire pages, the stack listed beside each project shows the part we built. Where a product is public, such as Orchyd or Houzi, open it and try it. Our case studies also record the team size and hours behind each build.',
      },
      {
        heading: 'Watch them work in your setup',
        body: 'A coding test shows how someone solves a puzzle. A small, real ticket in your own repository shows how they read unfamiliar code, ask questions and open a pull request. Give them one in the first week.\n\nOur engineers work inside your repo, sprint and tools from the start. Full Blown Media, whose review is on Clutch, ran its project with us through Slack and Trello.',
      },
      {
        heading: 'Agree the working hours',
        body: 'Write down which hours overlap with your team, and who answers if something breaks outside them. A few shared hours a day cover standups, reviews and quick questions.\n\nOur engineers work full time on your project and overlap with US hours when your schedule needs it.',
      },
      {
        heading: 'Settle access and ownership before day one',
        body: 'Give the developer their own accounts in your GitHub, cloud and project tools, not shared logins. Removing access later then takes minutes, not a password reset across every system.\n\nPut ownership in the contract. With us, you own everything our engineers write for you, including the source code and the intellectual property in it.',
      },
      {
        heading: 'Decide how long you need them',
        body: 'Be clear whether you need someone for a few months or for years, because it changes who fits. We place engineers for short engagements under six months, for six to twelve months, and in long-term roles. There is no long-term contract to start.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'How fast can a developer start? We send a shortlist within 2 days, and you can hire in as fast as a week.',
        'Do we interview them ourselves? Yes. You meet the engineers on the shortlist before you decide.',
        'Do they work only on our project? Yes. Our engineers work full time on your project.',
        'Who owns the code? You do, including the intellectual property in it.',
      ],
    },
    related: [
      { label: 'Hire developers', href: '/work-with-us/hire' },
      {
        label: 'Staff augmentation vs. outsourcing',
        href: '/blog/staff-augmentation-vs-outsourcing',
      },
      { label: 'Work with us as a software partner', href: '/work-with-us/software-partner' },
    ],
  },
  {
    slug: 'hiring-developers-in-pakistan',
    title: 'Hiring Developers in Pakistan: Time Zones, Holidays and What to Expect',
    seoTitle: 'Hire Developers in Pakistan: What to Expect',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'What US and UK teams should know before hiring developers in Pakistan: the time difference through the year, overlap hours, holidays and how the work runs.',
    date: '2026-10-12',
    category: 'Hiring',
    readTime: '4 min',
    intro:
      'Pakistan is 9 or 10 hours ahead of New York and 4 or 5 hours ahead of London, depending on the time of year. English is an official language, alongside Urdu. Our team works from Lahore for clients in the US and UK. Here is what to plan for when you hire developers in Pakistan.',
    sections: [
      {
        heading: 'The time difference through the year',
        body: 'Pakistan Standard Time is UTC+5 all year, because Pakistan doesn’t change its clocks. The US and UK do, so the gap moves twice a year.\n\n1. New York is 9 hours behind Pakistan in summer and 10 in winter.\n\n2. Los Angeles is 12 hours behind in summer and 13 in winter.\n\n3. London is 4 hours behind in summer and 5 in winter.\n\nThe US changes its clocks on the second Sunday of March and the first Sunday of November. The UK changes on the last Sundays of March and October. Recurring meetings shift by an hour on those dates, so check them.',
      },
      {
        heading: 'How the hours overlap',
        body: 'A 9 to 6 working day in Lahore runs from 5 a.m. to 2 p.m. in London in summer. That covers the whole UK morning, so standups and reviews fit without anyone moving their day.\n\nFor US teams, a normal Lahore day ends at 9 a.m. in New York in summer, so the two working days don’t overlap. Engineers working with US clients move their hours later instead. Ours overlap with US hours when your schedule needs it.',
      },
      {
        heading: 'Holidays move every year',
        body: 'Pakistan’s two Eid holidays follow the Islamic lunar calendar. They come about 11 days earlier each year, and the exact dates depend on the moon sighting. So they are confirmed only close to the day.\n\nFixed public holidays include Pakistan Day on March 23, Independence Day on August 14 and Quaid-e-Azam Day on December 25. Ask for the holiday calendar at the start of the year, and plan releases around both Eids.',
      },
      {
        heading: 'How the work runs',
        body: 'With staff augmentation, the engineer joins your team: your repo, your sprint and your tools. Full Blown Media ran its project with us through Slack and Trello. On a project we deliver, you get a plan with milestones and a weekly demo of working software.\n\nWritten updates matter more across time zones. A short end-of-day note means your team starts the morning knowing what changed overnight.',
      },
      {
        heading: 'Contracts and ownership',
        body: 'You contract with us, so you don’t need a company in Pakistan to hire our engineers. You own everything they write for you, including the source code and its intellectual property.\n\nThere is no long-term contract to start. Engagements run from under six months to long-term roles.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'What time zone is Pakistan in? Pakistan Standard Time, UTC+5, with no daylight saving time.',
        'Can developers in Pakistan work US hours? Yes, by moving their day later. Ours overlap with US hours when a client’s schedule needs it.',
        'How fast can we start? We send a shortlist within 2 days, and you can hire in as fast as a week.',
        'Who owns the code? You do, including the intellectual property in it.',
      ],
    },
    related: [
      { label: 'Hire developers', href: '/work-with-us/hire' },
      { label: 'How to vet a remote developer', href: '/blog/how-to-vet-remote-developers' },
      { label: 'Work with us as a software partner', href: '/work-with-us/software-partner' },
    ],
  },
  {
    slug: 'react-native-or-flutter',
    title: 'React Native or Flutter? How We Choose for Client Apps',
    seoTitle: 'React Native or Flutter? How We Choose',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'How we pick React Native, Flutter or native code for a client app, with the reasons behind Nextflag, Orchyd, Houzi, StoreBevy and Slumber & Sprout.',
    date: '2026-10-12',
    category: 'Mobile',
    readTime: '4 min',
    intro:
      'Choose React Native if your team already builds for the web in React. Choose Flutter if the app has a custom design that must look the same on every phone. Choose native Swift or Kotlin if the app depends on device features. We build all three, and here is what decided each of our apps.',
    sections: [
      {
        heading: 'When we pick React Native',
        body: 'React Native apps are written in JavaScript or TypeScript and render real native components. Developers who know React can work on them, and some code can be shared with a React website.\n\nNextflag is a social travel app in React Native, with a map of location flags, following and wishlists. Orchyd, a private cycle and fertility tracker with an AI assistant, is React Native too. Trusted Tastes, a restaurant app built on recommendations from people you follow, uses React on the web and React Native on mobile.',
      },
      {
        heading: 'When we pick Flutter',
        body: 'Flutter draws every pixel itself with its own rendering engine. A custom design looks identical on iOS and Android, with no native view in between. Apps are written in Dart.\n\nHouzi is a real estate app built in Flutter, with 360° views of each property. StoreBevy is a white-label app in Flutter: one codebase, configured for each small retailer that wants its own branded store app.',
      },
      {
        heading: 'When we go native',
        body: 'Some apps lean hard on the phone: health data, widgets, background location or heavy animation. Those are better built in Swift for iOS and Kotlin for Android, even though that means two codebases.\n\nSlumber & Sprout is a native iOS app that tracks children’s sleep and builds routines. We built the Rails backend it talks to, which recalculates sleep schedules with Sidekiq when a routine changes.',
      },
      {
        heading: 'Cross-platform apps need upkeep',
        body: 'When we started on Nextflag, the app lagged because React Native, its packages and the iOS pods were all out of date. We upgraded them together and tuned the app.\n\nWe also rewrote the post-upload screen, which often crashed the app, and saved onboarding progress at each step so people could resume. An animated splash screen replaced a static one, cutting load time and storage size. Whichever framework you choose, plan for regular upgrades.',
      },
      {
        heading: 'The questions we ask first',
        body: '1. Who will maintain the app after launch, and what do they already know?\n\n2. Is there a web app, and is it built in React?\n\n3. How custom is the design, and must it match exactly on both platforms?\n\n4. Which device features does it need, such as the camera, location, health data or widgets?\n\n5. Does one codebase have to serve many customers, like a white-label app?',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'Is React Native or Flutter faster? Both are fast enough for most business apps. The design, the data and the backend usually matter more.',
        'Can we switch frameworks later? Only by rebuilding the screens. The backend and APIs can stay, so choose with the long term in mind.',
        'Can one team build for iOS and Android? Yes. With React Native or Flutter, one codebase ships to both stores.',
        'Do you take over apps another team built? Yes. Nextflag’s work started with upgrades to its existing React Native code.',
      ],
    },
    related: [
      { label: 'Mobile app development', href: '/what-we-build/mobile-apps' },
      { label: 'Hire React Native developers', href: '/work-with-us/hire/react-native-developers' },
      { label: 'Hire Flutter developers', href: '/work-with-us/hire/flutter-developers' },
      {
        label: 'Moving a Xamarin app to .NET MAUI',
        href: '/blog/xamarin-to-dotnet-maui-migration',
      },
    ],
  },
  {
    slug: 'angular-8-to-13-upgrade',
    title: 'Upgrading a Live Store From Angular 8 to 13 in 20 Days',
    seoTitle: 'Upgrading Angular 8 to 13 in 20 Days',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'How we moved AutoBuffy, a US auto parts store, from Angular 8 to 13 in 20 days, one version at a time, and added server-side rendering for search.',
    date: '2026-10-12',
    category: 'Engineering',
    readTime: '3 min',
    intro:
      'We upgraded AutoBuffy’s storefront from Angular 8 to Angular 13 in 20 days, and added server-side rendering on top. AutoBuffy is a US online store for auto parts. Its outdated Angular 8 frontend was holding back its technical SEO. Here is how an upgrade like this runs.',
    sections: [
      {
        heading: 'Why the upgrade mattered',
        body: 'Without server-side rendering, an Angular app builds each page in the browser. Search engines first get a nearly empty page and must run JavaScript to see the content. Google can do that, but it takes longer, and most AI crawlers don’t run JavaScript at all.\n\nServer-side rendering fixes this by sending finished HTML. We did the upgrade first, then added rendering on the new version.',
      },
      {
        heading: 'One major version at a time',
        body: 'Angular’s update guide recommends moving one major version at a time. Going from 8 to 13 means five upgrades: 9, 10, 11, 12 and 13. After each one, the app has to build and run before the next begins.\n\nThe Angular CLI’s ng update command does most of the mechanical work. It updates the packages and runs migrations that rewrite code for the new version.',
      },
      {
        heading: 'The big change: Ivy',
        body: 'Angular 9 made Ivy the default compiler and renderer. Angular 13 removed the old View Engine for apps, so Ivy is the only option.\n\nThird-party libraries set the pace. At each step, every Angular dependency needs a release that supports the new version. The ones that don’t have to be upgraded, replaced or removed before you continue.',
      },
      {
        heading: 'Adding server-side rendering',
        body: 'Once on 13, the server sends each page as finished HTML, and Angular takes over in the browser. Search engines and link previews see the parts and descriptions straight away.\n\nCode that touches window, document or localStorage has to be guarded, because those don’t exist on the server. That is where most rendering bugs hide.',
      },
      {
        heading: 'What else changed on AutoBuffy',
        body: 'The upgrade was one part of a longer project. We moved part search to Elasticsearch, because large database tables made it slow and caching alone didn’t help. We added Klarna buy now, pay later through Stripe, which lifted sales by 50%.\n\nWe also split the storefront and admin onto separate servers, so heavy admin uploads don’t slow shoppers down. A new microservice syncs inventory from vendors in real time, replacing FTP, CSV and Excel uploads.',
      },
    ],
    conclusion: {
      heading: 'What we’d tell a team on an old Angular version',
      paragraphs: [
        '1. Upgrade one major version at a time, and keep the app running after each step.',
        '2. Check your third-party libraries before you start. They decide how long it takes.',
        '3. Add server-side rendering if search matters to the business, and guard any code that expects a browser.',
        '4. Don’t stop there. Angular ships a major version about every six months, so plan the next upgrade.',
      ],
    },
    related: [
      { label: 'Legacy modernization', href: '/what-we-build/legacy-modernization' },
      { label: 'Hire Angular developers', href: '/work-with-us/hire/angular-developers' },
      { label: 'The AutoBuffy case study', href: '/our-work/case-studies/autobuffy' },
    ],
  },
  {
    slug: 'vue-2-to-vue-3-migration',
    title: 'Moving a Live SaaS From Vue 2 to Vue 3',
    seoTitle: 'Vue 2 to Vue 3 Migration on a Live SaaS',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'How we moved Coach Catalyst, a live coaching platform, from Vue 2 to Vue 3, rebuilt its CoffeeScript chat in Vue and added Stripe Connect payouts.',
    date: '2026-10-12',
    category: 'Engineering',
    readTime: '3 min',
    intro:
      'Vue 2 reached end of life on December 31, 2023, so it no longer gets official fixes, including security fixes. We moved Coach Catalyst, a live coaching platform, from Vue 2 to Vue 3. The same project rebuilt its chat, added a community module and set up Stripe Connect payouts for coaches. Here is what the migration involved.',
    sections: [
      {
        heading: 'What changes between Vue 2 and Vue 3',
        body: 'Most Vue 2 code still works in Vue 3, but not all of it. These changes touch most apps.\n\n1. Apps start with createApp instead of new Vue, and plugins install with app.use.\n\n2. Filters are gone. They become methods or computed properties.\n\n3. The event bus pattern, using $on and $off, is gone. Components talk through props, events or a store.\n\n4. Many plugins needed new versions for Vue 3, and some never got one.',
      },
      {
        heading: 'Components, directives and plugins',
        body: 'Vue 3 still supports the Options API, so moving to the Composition API is a choice, not a requirement. On Coach Catalyst, we refactored the components to the Composition API.\n\nWe updated the directives and plugins for Vue 3 as we went, and reduced the bundle size so pages load faster.',
      },
      {
        heading: 'Rebuilding the chat',
        body: 'Coach Catalyst’s chat module was written in CoffeeScript. It was hard to use and needed performance work. We rebuilt it in Vue, with real-time updates and more efficient data fetching, so it stays responsive under load.',
      },
      {
        heading: 'Adding what the old structure never planned for',
        body: 'A community module was hard to add, because the project was never structured for one. We isolated the community components and brought them in step by step.\n\nCoaches now get paid directly through a Stripe Connect marketplace, with OAuth onboarding and secure payouts. It opened a new revenue stream for coaches and for the platform.',
      },
      {
        heading: 'How to plan a Vue 3 move',
        body: '1. List every plugin and check it has a Vue 3 version. Replace the ones that don’t before you start.\n\n2. Use the migration build, @vue/compat, which runs Vue 2 code on Vue 3 and warns about each change. You can then fix the warnings one at a time.\n\n3. Vuex works with Vue 3, but Pinia is now Vue’s recommended store for new code.\n\n4. Keep the app releasable throughout, and move one section at a time.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'Is Vue 2 still safe to run? It still works, but it has had no official updates since December 31, 2023, including security fixes.',
        'Do we have to rewrite everything in the Composition API? No. Vue 3 supports the Options API. Coach Catalyst moved to the Composition API, but it is optional.',
        'Can the app stay live during the move? Yes, if you migrate one section at a time and release as you go.',
        'How big was the team? Two engineers, across 4,272 hours on the platform.',
      ],
    },
    related: [
      { label: 'Legacy modernization', href: '/what-we-build/legacy-modernization' },
      { label: 'Hire Vue.js developers', href: '/work-with-us/hire/vue-developers' },
      { label: 'The Coach Catalyst case study', href: '/our-work/case-studies/coach-catalyst' },
    ],
  },
  {
    slug: 'stop-ai-chatbot-hallucinations',
    title: 'How to Stop an AI Chatbot From Making Things Up',
    seoTitle: 'How to Stop AI Chatbot Hallucinations',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Why chatbots invent facts, and how retrieval-augmented generation fixed it on Money Ball, our NFL stats chatbot that checks live data before it answers.',
    date: '2026-10-12',
    category: 'AI',
    readTime: '3 min',
    intro:
      'A chatbot makes things up when it answers from memory. The fix is to make it look the facts up first, then answer only from what it found. This is called retrieval-augmented generation, or RAG. We built Money Ball, an NFL stats chatbot, this way in three months.',
    sections: [
      {
        heading: 'Why general models get facts wrong',
        body: 'A large language model learns from text up to a cutoff date. It doesn’t know last week’s results, and it doesn’t store exact numbers reliably. Ask it for a player’s yards this season, and it may produce a figure that only sounds right.\n\nSports stats are a hard case: specialized, precise and changing every week. A wrong number looks exactly like a right one.',
      },
      {
        heading: 'How Money Ball answers a question',
        body: 'Money Ball lets fans and analysts ask about NFL players and teams in a chat. Before the model writes anything, the system queries a live sports database. The model then turns those results into an answer.\n\nSo the numbers come from the database, not from the model’s memory. The model’s job is to understand the question and explain the result.',
      },
      {
        heading: 'What it runs on',
        body: 'Money Ball runs as Docker microservices, so new stats are ingested and analyzed quickly. The backend uses Django and Node.js, with PostgreSQL and Redis. It is live at app.moneyball-ai.com.',
      },
      {
        heading: 'Rules that keep answers honest',
        body: '1. Retrieve first, every time. If the system skips the lookup, the model falls back on memory.\n\n2. Give the model only what it needs. A short, relevant set of results works better than a long dump of data.\n\n3. Tell the model to say when the data doesn’t cover the question. “I don’t have that” beats a confident guess.\n\n4. Keep the maths out of the model. Totals and averages should come from the database query.\n\n5. Test with real questions, including awkward ones, and check every number against the source.',
      },
      {
        heading: 'Where else this works',
        body: 'The same pattern fits any business with its own facts: product catalogs, policies, contracts or support history. The model handles the language, and your data supplies the facts.\n\nIt doesn’t remove the need for checks. If the source data is wrong, the answer will be wrong too, so someone has to own the data.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'What is RAG? Retrieval-augmented generation. The system looks up facts in your own data and gives them to the model, which answers from them.',
        'Does RAG stop every hallucination? No, but it removes the most common cause, which is answering from memory. Clear instructions and testing handle most of the rest.',
        'How long does a chatbot like this take to build? Money Ball took three months.',
        'Which model does it need? RAG works with most large language models, because the facts come from your data rather than the model.',
      ],
    },
    related: [
      { label: 'AI solutions', href: '/what-we-build/ai-solutions' },
      { label: 'Hire Python and Django developers', href: '/work-with-us/hire/python-developers' },
      { label: 'Business process automation', href: '/what-we-build/automation' },
    ],
  },
  {
    slug: 'marketplace-payments-stripe',
    title: 'Marketplace Payments With Stripe: Deposits, Payouts and Refunds',
    seoTitle: 'Stripe Marketplace Payments: What We Built',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Security deposits, payouts to sellers, store credit for refunds and subscriptions: how we built marketplace payments with Stripe on six real platforms.',
    date: '2026-10-12',
    category: 'Marketplaces',
    readTime: '4 min',
    intro:
      'Marketplace payments are harder than a normal checkout, because money moves between three parties: the buyer, the seller and you. Stripe handles most of the hard parts, but each marketplace needs its own setup. Here is what we built on six platforms, from security deposits to payouts.',
    sections: [
      {
        heading: 'Paying sellers with Stripe Connect',
        body: 'Coach Catalyst lets clients pay coaches directly. We integrated Stripe Connect, with OAuth onboarding so each coach connects a Stripe account, and secure payout processing.\n\nWe designed the database schema for the marketplace before wiring up the payments, so it could scale securely. The marketplace opened a new revenue stream for coaches and for the platform.',
      },
      {
        heading: 'Security deposits for rentals',
        body: 'Cinekit rents camera and production gear between creators in the UK, Europe and the US. Expensive kit needs a security deposit, and booking dates change often. We used Stripe to manage the deposits and payments across regions, and built Cinekit in one month. It has since grown past 100,000 users.\n\nIf you take deposits as card holds, know the limit. Stripe says an authorization for an online card payment is usually valid for 7 days. Longer rentals need an extended hold or a different approach.',
      },
      {
        heading: 'Refunds as store credit',
        body: 'Cercle is a UK fashion rental marketplace. Its checkout only took cash, cards or transfers, so every refund sent money off the platform.\n\nWe built a wallet that turns refunds and cancellations into store credit, protected with encryption and secure tokenization. With Stripe alongside it, refunds became smoother and spending stayed on the platform.',
      },
      {
        heading: 'Subscriptions and automated payments',
        body: 'Klingit, a creative services platform, bills brands through multi-tier Stripe subscriptions. Cad Cam Masters, where dental labs hire freelance CAD designers, runs its marketplace payments through Stripe automatically.\n\nOn Cad Cam Masters, the hard part wasn’t Stripe. Large 3D design files were stalling the servers during checkout. We moved uploads to a separate AWS pipeline that runs in the background.',
      },
      {
        heading: 'Buy now, pay later',
        body: 'AutoBuffy, a US auto parts store, had no buy now, pay later option, unlike most US stores. We added Klarna through Stripe, with PayPal, AfterPay, debit and credit options alongside it. Buy now, pay later lifted sales by 50%.',
      },
      {
        heading: 'What to decide before you build',
        body: '1. Who holds the money, and when does the seller get paid?\n\n2. What happens on a refund: money back to the card, or store credit?\n\n3. Do you need deposits, and how long do bookings last?\n\n4. Are sellers individuals or businesses, and in which countries? Stripe Connect onboarding depends on both.\n\n5. Will you earn through a commission, a subscription or both?',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'What is Stripe Connect? Stripe’s product for platforms that pay other people, such as coaches, sellers or hosts. Each one connects an account and receives payouts.',
        'Can a marketplace hold a deposit without charging it? Yes. A card authorization reserves the money, usually for up to 7 days on online payments.',
        'Can refunds go to store credit instead of the card? Yes. Cercle’s wallet turns refunds and cancellations into credit.',
        'Which marketplaces have you built? Cinekit, Cercle, Coach Catalyst, Klingit, Cad Cam Masters, Truck-4 and Mi Taller, among others.',
      ],
    },
    related: [
      { label: 'Marketplace development', href: '/what-we-build/marketplace-development' },
      { label: 'The Cercle case study', href: '/our-work/case-studies/cercle' },
      { label: 'The Coach Catalyst case study', href: '/our-work/case-studies/coach-catalyst' },
    ],
  },
  {
    slug: 'software-discovery-call',
    title: 'What Happens on a Discovery Call, and What You Get After',
    seoTitle: 'What Happens on a Software Discovery Call',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'What a software discovery call with us covers, what to have ready, and what you get afterwards: a team recommendation, a timeline and a plan with milestones.',
    date: '2026-10-12',
    category: 'Delivery',
    readTime: '3 min',
    intro:
      'A discovery call is a 20-minute conversation about what you want built, before anyone writes a plan. We use it to map your goals, your constraints and the systems the software must connect to. Afterwards, you get a recommended team, a timeline and a delivery plan with clear milestones.',
    sections: [
      {
        heading: 'How to book one',
        body: 'You can book a 20-minute call from our contact page, or send us a message. We reply within one business day.\n\nA few lines beforehand help: what the software should do, who will use it and any deadline. You don’t need a written specification.',
      },
      {
        heading: 'What to have ready',
        body: '1. The problem the software solves, and for whom.\n\n2. What you use today: spreadsheets, an old app or a tool you’ve outgrown.\n\n3. The systems it must connect to, such as payments, a CRM or accounting software.\n\n4. Who will use it, and on which devices.\n\n5. What a good result looks like six months after launch.\n\n6. Any deadline, and what is driving it.',
      },
      {
        heading: 'Why integrations come up so often',
        body: 'In our portfolio, the longest builds connected to the most outside systems. BuffyHub syncs with Amazon, eBay and Walmart. AutoBuffy connects payments, shipping carriers and vendor inventory.\n\nSo expect questions about what the software must talk to. The answers tell us more about the timeline than the number of screens does.',
      },
      {
        heading: 'What you get after the call',
        body: 'You get three things: a recommended team, a timeline and a delivery plan with clear milestones. If you want engineers to join your own team instead, you get a shortlist within 2 days and interview them yourself.\n\nMost of our projects take three to six months to build, and simpler ones take one to three. The plan says where yours sits, and why.',
      },
      {
        heading: 'Once work starts',
        body: 'Our engineers join your workflow, and you see working software in a weekly demo, checked against the milestones in the plan. You own everything they write for you, including the source code and the intellectual property in it.',
      },
      {
        heading: 'If you don’t need custom software',
        body: 'The call doesn’t commit you to anything, and there is no long-term contract to start. If an existing tool fits better, we will say so. For a US bookkeeping firm, we set up GoHighLevel instead of building a custom CRM.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'How long is a discovery call? 20 minutes. You can book one from our contact page.',
        'Do we need a written specification first? No. A few lines on what it should do and who will use it are enough.',
        'What happens if we decide not to go ahead? Nothing. The call doesn’t commit you to anything.',
        'How soon can engineers start? For staff augmentation, we send a shortlist within 2 days, and you can hire in as fast as a week.',
      ],
    },
    related: [
      { label: 'Contact us', href: '/contact' },
      { label: 'How long software projects take', href: '/blog/how-long-software-projects-take' },
      {
        label: 'How to choose a software development partner',
        href: '/blog/how-to-choose-a-software-development-partner',
      },
    ],
  },
  {
    slug: 'slow-react-app',
    title: 'Your React App Is Slow. It’s Probably Not React.',
    seoTitle: 'Slow React App? Check the Backend First',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Why a slow React app is usually slow behind the front end, how we sped up Cercle’s pages without rewriting components, and what to check first.',
    date: '2026-10-12',
    category: 'Engineering',
    readTime: '4 min',
    intro:
      'When a React app is slow, the cause is usually behind it: slow API calls, heavy data, large images or work that should run in the background. Cercle, a UK fashion rental marketplace on React and Next.js, had slow pages that hurt engagement and sales. Every fix we made was behind the front end.',
    sections: [
      {
        heading: 'What we fixed on Cercle',
        body: 'Cercle lets people rent clothes, shoes and accessories from lenders. Slow loads frustrated users, raised bounce rates and cut engagement and sales.\n\n1. Product data. We optimized how product data was handled, so pages got what they needed faster.\n\n2. Image caching. Photos are the heaviest part of a fashion site, so we improved how they were cached.\n\n3. Background jobs. We moved heavy work to Sidekiq, a background job system for Ruby, so the interface stays responsive while it runs.\n\nFaster pages cut bounce rates and supported higher sales.',
      },
      {
        heading: 'Why rewriting components rarely helps',
        body: 'A component rewrite changes how a page draws. If the page is waiting on a slow API, it will wait just as long after the rewrite. That is why our engineers check the API and the database before touching React code.\n\nThe same applies to any framework. On AutoBuffy, an Angular store, part search was slow because of very large database tables. Caching alone didn’t help, so we added Elasticsearch, refined the database structure and added indexes.',
      },
      {
        heading: 'What to check first',
        body: '1. Open the browser’s network panel and reload. Note the slowest requests, and how long the page waits for its first data.\n\n2. Check the size of API responses. Sending whole records when the page shows three fields slows every request.\n\n3. Look at the database queries behind the slowest endpoint. Missing indexes and one query per item in a list are common causes.\n\n4. Check image sizes and caching headers. Serve images at the size they display, in a modern format.\n\n5. Move slow work, such as emails, exports and syncs, to background jobs.\n\n6. Then profile React itself with React DevTools, looking for components that re-render without need.',
      },
      {
        heading: 'When React is the problem',
        body: 'Sometimes it is. Huge lists rendered at once, state that redraws the whole page on every keystroke, and very large JavaScript bundles all slow the front end. The usual fixes are list virtualization, keeping state close to where it’s used and splitting code by route.\n\nMeasure first anyway. Finding the slow layer takes far less time than rewriting the wrong one.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'Is React slow? Not for most apps. A slow React app is usually waiting on data, images or work that should run in the background.',
        'Should we switch frameworks to make the app faster? Measure first. On Cercle, every fix was behind the front end.',
        'Does Next.js make an app faster? It can, through server rendering and caching, but it won’t fix a slow API.',
      ],
    },
    related: [
      { label: 'Hire React and Next.js developers', href: '/work-with-us/hire/react-developers' },
      { label: 'Web app development', href: '/what-we-build/web-apps' },
      { label: 'The Cercle case study', href: '/our-work/case-studies/cercle' },
    ],
  },
  {
    slug: 'custom-crm-or-gohighlevel',
    title: 'Custom CRM or GoHighLevel? When to Build and When to Configure',
    seoTitle: 'Custom CRM or GoHighLevel? When to Build One',
    author: { name: 'Waris Mustafa', role: 'SEO and Web Developer' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'When to configure GoHighLevel and when to build a custom CRM, from the sales automation we set up for a US bookkeeping firm.',
    date: '2026-10-12',
    category: 'CRM',
    readTime: '5 min',
    intro:
      'If your sales run on ads, forms, calls and fast follow-ups, configure GoHighLevel instead of building a CRM. We have built sales automation in GoHighLevel that takes leads from Meta, LinkedIn and Google and answers them straight away. It also tells the ad platforms which leads turned into customers. We have also built custom CRMs, for businesses whose clients work inside the system. Here is how we decide between the two.',
    sections: [
      {
        heading: 'What GoHighLevel does well',
        body: 'Leads arrive straight from the ad platforms. Facebook and Instagram lead forms and LinkedIn Lead Gen forms land in GoHighLevel as contacts, and each submission can start a workflow the moment it arrives.\n\nWorkflows handle the follow-up. A workflow can assign the lead to a rep, open an opportunity in the pipeline and send a text or email straight away. It can stop the nurture sequence as soon as the lead replies.\n\nResults go back to the ads. The Meta Conversions API action sends events from the server, so browser restrictions and ad blockers don’t hide them. It can report pipeline stage changes, and a purchase stage can carry its value. The Add to Google Ads action sends offline conversions, matched to the original ad click. When the platforms see which leads became clients, they find more people like them.',
      },
      {
        heading: 'What we set up for a US bookkeeping firm',
        body: 'Our client is a US bookkeeping firm. HubSpot was the first option on the table, but at the tiers the firm needed, it cost too much for a business its size. GoHighLevel’s starter plan already had native connections to Meta, LinkedIn and Google, so we built on that.\n\nLeads come in from five places: Facebook and Instagram lead forms, LinkedIn Lead Gen forms, Google Ads, the website’s forms and phone calls. Every new lead starts the same workflow.\n\n1. A text and an email go out straight away, so nobody waits for a rep to notice.\n\n2. The lead is assigned to a member of the team and opens an opportunity in the pipeline.\n\n3. The nurture sequence stops as soon as the lead replies.\n\n4. The lead moves from new to qualified to booked to client. Each stage goes back to Meta through the Conversions API, and to Google Ads as an offline conversion.',
      },
      {
        heading: 'Where GoHighLevel stops fitting',
        body: 'Your clients work inside the system. On Klingit, clients, designers, managers and admins share one platform, and clients check their own project status. That needed a custom build.\n\nSupport is the product. Contakti brings email, chat, SMS and voice into one hub and routes each ticket to the right department with AI, using its own rules.\n\nYour process isn’t a sales funnel. NPTAAS schedules auditors, logs compliance points and generates final reports. Pipeline stages can’t model that.',
      },
      {
        heading: 'The middle path',
        body: 'Many businesses keep GoHighLevel for marketing and sales and build only the part it can’t do. GoHighLevel can send any contact’s data to another system with a webhook, and receive it back the same way. That keeps a custom portal or support hub in sync.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'Can a custom CRM sync with GoHighLevel? Yes. GoHighLevel can send a contact’s data to another system with a webhook and receive data back the same way.',
        'Who owns the data and the code? With a custom build, the client owns both.',
        'How do you move contacts and history across? We map every field, clean out duplicates and move a test batch for you to check, then move the rest.',
        'Can different roles see different things? In a custom build, yes. Klingit gives clients, designers, managers and admins their own views.',
      ],
    },
    related: [
      { label: 'CRM development', href: '/what-we-build/crm' },
      { label: 'Business process automation', href: '/what-we-build/automation' },
      { label: 'SEO and Google Ads', href: '/what-we-build/digital-marketing' },
    ],
  },
  {
    slug: 'luxe-excursions-booking-planner',
    title: 'Our Booking Planner Refused 75% of Trips. The Fix Was the Data.',
    seoTitle: 'Tour Booking System Case Study: Luxe Excursions',
    author: { name: 'Waris Mustafa', role: 'SEO and Web Developer' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'How we stopped a Tenerife tour company’s booking planner refusing 75% of trips, then automated its sale alerts, review requests and Google setup.',
    date: '2026-10-12',
    category: 'Case Study',
    readTime: '6 min',
    intro:
      'Luxe Excursions sells luxury tours, packages and rentals from a shop in Costa Adeje, Tenerife. We built its website, booking platform and staff CMS, and we run its SEO, Google Ads and Business Profile. The biggest gain didn’t come from new code. It came from checking the data the old booking planner trusted.',
    sections: [
      {
        heading: 'The planner that said no',
        body: 'The first version tried to schedule every activity at booking time, using the timetables in the CMS and the size of the van fleet. The client called it too complex, so we measured it. Across every 3-activity combination on a 3-day stay, the planner refused 75% of itineraries.\n\nAll 164 refusals came from weekday data in the CMS. None came from van capacity. When we checked the partner venues against their own websites, 3 of 4 timetables were wrong. One show was blocked on two of its three real nights.',
      },
      {
        heading: 'Pay first, schedule after',
        body: 'We changed how bookings work. Guests now choose their activities and pay, and staff assign every date and time afterwards. Only one thing can refuse a booking: an activity that never runs during the guest’s stay. Capacity clashes become notes for staff, never an error for the guest. Tickets hide times until a member of staff has approved the schedule. After the data was corrected, the refusal rate went to 0%.',
      },
      {
        heading: 'Staff hear about every sale',
        body: 'At launch, only the guest got an email when they booked. Now the team gets one for every paid booking and every trip request, with the guest set as reply-to so staff can answer straight away. Each alert goes out once per booking, so a payment retry never sends a duplicate.',
      },
      {
        heading: 'Reviews without cherry-picking',
        body: 'Reviews decide how a local business shows up on the map, so we automated the ask. Every guest gets one email at 10:00 local time the day after their last activity, within a week of the trip. Nobody gets it twice, and test or agency bookings are left out.\n\nWe ask every guest, whatever we think of how the trip went, because Google forbids asking only happy customers. Guests who book in the shop or by WhatsApp get the same message by hand, and a QR card on the counter.',
      },
      {
        heading: 'Fully booked without disappearing',
        body: 'Sometimes an item has to stop selling for a while, like the e-bike rental while its paperwork was pending. Deleting the page would throw away its search ranking. Instead, staff tick “Fully booked” in the admin. The page stays live, it can’t be bought, and Google is told it’s sold out.',
      },
      {
        heading: 'A giveaway that is fair, and works on a phone',
        body: 'The “Win a Tenerife getaway” page takes one entry per email, through the website or Instagram. The draw picks a winner and two reserves from a recorded random seed, so the draw can be re-run later and checked. We left out “share to enter”, because Meta’s rules don’t allow it.\n\nIn its first six days, 269 people entered on the website. Then the data showed that half of all attempts were failing, mostly because the Instagram username was left blank and phones gave no clear sign why. The form now jumps to the field that needs fixing. In the first two hours after the change, 14 entries went through and none failed. Instagram followers grew from 25 to 190 that week.',
      },
      {
        heading: 'Getting Google right',
        body: 'A guest followed the map to the wrong street: the Business Profile pin was about 460 m from the shop. We corrected the address and pin on Google, the website and Facebook.\n\nGoogle Analytics now tracks bookings, trip requests and WhatsApp clicks, and Google Ads learns from bookings and WhatsApp clicks. Every activity has a Book Now button on its first screen, and the payment form loads only when someone pays, so pages are faster on phones. Google’s own SEO check scores the site 100, and the main image shows in 1.3 seconds on a phone.',
      },
      {
        heading: 'What it runs on',
        body: 'The backend runs on Django and Django REST Framework, and the website on Next.js. Data lives in PostgreSQL, hosting is on AWS (ECS Fargate and Amplify), Stripe takes payments and Brevo sends email.',
      },
    ],
    conclusion: {
      heading: 'What we’d tell another tour operator',
      paragraphs: [
        '1. Check your timetable data before blaming the software. Ours was wrong at 3 of 4 venues.',
        '2. Let staff own the schedule. Take the payment first, and plan the day after.',
        '3. Automate the follow-ups people forget: sale alerts and review requests.',
        '4. Measure the forms. A field nobody notices can lose half your sign-ups.',
      ],
    },
    related: [
      { label: 'Business process automation', href: '/what-we-build/automation' },
      { label: 'SEO and Google Ads', href: '/what-we-build/digital-marketing' },
      { label: 'Visit Luxe Excursions', href: 'https://luxeexcursionstenerife.com' },
    ],
  },
  {
    slug: 'staff-augmentation-vs-outsourcing',
    title: 'Staff Augmentation vs. Outsourcing',
    excerpt:
      'Staff augmentation adds engineers to your team; outsourcing hands a partner the outcome. Here is how to tell which model fits your project, budget, and risk.',
    date: '2026-10-06',
    category: 'Delivery',
    readTime: '7 min',
    intro:
      'When a roadmap outgrows the team, most companies in the US and UK reach for one of two models: augment the team with external engineers, or outsource the project to a partner who owns delivery. Both work. Both fail when they are chosen for the wrong reasons. The difference comes down to who owns the outcome, who manages the work day to day, and how much of your product knowledge needs to stay inside the building.',
    sections: [
      {
        heading: 'What staff augmentation actually means',
        body: 'With staff augmentation, external engineers join your team and work inside your process: your backlog, your standups, your code review, your definition of done. You keep product and technical leadership, and you decide what gets built and how. The partner is responsible for finding, vetting, and supporting the right people; you are responsible for directing them. It is the closest thing to hiring without the hiring cycle, and it works best when you already have strong engineering leadership and simply need more capacity or a specific skill.',
      },
      {
        heading: 'What outsourcing actually means',
        body: 'With project outsourcing, you agree a scope, a timeline, and an outcome, and the partner owns delivery. They bring their own project management, architecture decisions, and QA, and you review progress against milestones. The partner carries more of the delivery risk, which is why scope and acceptance criteria matter so much more. Outsourcing suits well-defined builds, such as a new product, a platform migration, or an internal tool, where you want a finished result more than extra hands.',
      },
      {
        heading: 'When staff augmentation is the better fit',
        body: 'Choose augmentation when the work is ongoing rather than a single project, when it touches systems only your team understands, or when you need to move fast on a skill you do not have in-house, such as cloud infrastructure, mobile, or AI integration. It also suits teams that want knowledge to stay with them: augmented engineers work in your repositories and your documentation, so nothing is locked inside a vendor. The trade-off is management time. Someone on your side needs to plan sprints, review work, and make technical calls.',
      },
      {
        heading: 'When outsourcing is the better fit',
        body: 'Choose outsourcing when you can describe the result clearly, when you do not have the leadership bandwidth to direct more engineers, or when the work is separate enough from your core systems to be built and handed over. It is also a good option when you need a full cross-functional team at once, with design, frontend, backend, QA, and DevOps, and do not want to assemble it piece by piece. The trade-off is control: changes to scope cost more, and you need clear handover and documentation at the end.',
      },
      {
        heading: 'Cost: compare total cost, not day rates',
        body: 'Day rates are the easiest number to compare and the least useful. With augmentation, the real cost includes the management time your team spends directing the work and the speed at which new engineers become productive. With outsourcing, it includes the partner’s project management overhead, the cost of scope changes, and the handover at the end. A fair comparison asks what it costs to ship the outcome you need, including your own team’s time, rather than what an engineer costs per day.',
      },
      {
        heading: 'Risk, IP, and security',
        body: 'Whichever model you choose, settle the basics before work starts. Your contract should assign intellectual property in the code to you, define confidentiality, and set out how access to systems and data is granted and removed. For augmentation, make sure engineers work in your accounts and repositories rather than the partner’s. For outsourcing, agree how code, credentials, and documentation are handed over, and do not wait until the end of the project to receive them. UK and EU teams should also confirm how personal data is handled under GDPR.',
      },
      {
        heading: 'Hybrid models are common',
        body: 'Many teams end up in between: an outsourced pod builds a new product while augmented engineers strengthen the core team, or a dedicated team works inside your process but owns a defined area of the product. A dedicated pod, a small team that stays together and works as an extension of your organization, is often the most practical middle ground. You keep product direction, and the partner keeps the team stable and productive.',
      },
    ],
    conclusion: {
      heading: 'How to decide',
      paragraphs: [
        'Ask three questions. Who will own the outcome? Who has the time to manage the work every day? How much of this knowledge must stay in your team? If you have the leadership and need capacity, augment. If you need a result and do not have the bandwidth to direct it, outsource. If the honest answer is somewhere in between, a dedicated pod is usually the right starting point.',
        'Stack360 works in all three ways: augmenting teams with vetted engineers, delivering projects end to end, and running dedicated pods for longer-term work, with no long-term contract required to start.',
      ],
    },
  },
  {
    slug: 'how-to-choose-a-software-development-partner',
    title: 'How to Choose a Software Development Partner',
    excerpt:
      'Ten questions that separate a dependable software development partner from an expensive mistake, from who writes your code to what happens at handover.',
    date: '2026-10-06',
    category: 'Delivery',
    readTime: '8 min',
    intro:
      'Choosing a software development partner is one of the highest-stakes decisions a startup founder, operations leader, or CTO makes. Portfolios look similar, every proposal promises quality, and the real differences only appear months into the project. These ten questions are designed to surface those differences before you sign, whether you are hiring a partner in your own country or working with a distributed team across time zones.',
    sections: [
      {
        heading: '1. Who will actually work on our project?',
        body: 'Ask to meet the engineers and the lead who will be assigned, not only the sales team. Ask how long they have been with the company and whether the same people will stay on the project throughout. A strong partner can tell you who will do the work and what happens if someone leaves. A vague answer here is the most common early warning sign.',
      },
      {
        heading: '2. Have you built something like this before?',
        body: 'Look for relevant experience rather than a long client list: the same kind of system, scale, or industry. Ask for a case study you can discuss in detail, including what went wrong and how it was handled. Partners who can talk honestly about difficult moments are usually the ones who handle them well.',
      },
      {
        heading: '3. How do you turn our idea into a plan?',
        body: 'A good partner starts with discovery: understanding your goals, users, constraints, and existing systems before quoting. Be cautious of fixed quotes produced after a single call for anything complex. You should come away with a clear scope, a delivery plan with milestones, and a list of assumptions and risks.',
      },
      {
        heading: '4. How will we see progress?',
        body: 'Ask how often you will see working software, not status reports. Weekly or fortnightly demos of real, deployed features are the clearest signal that a project is on track. Agree up front where the code lives, who has access, and how decisions are recorded.',
      },
      {
        heading: '5. How do you handle changes in scope?',
        body: 'Every real project changes. Ask how changes are estimated, approved, and reflected in timelines and cost. A healthy process makes the trade-offs visible, such as adding this feature moving that one, rather than absorbing changes silently until the budget runs out.',
      },
      {
        heading: '6. How do you make sure the software works?',
        body: 'Ask about testing, code review, and release practices. Who writes automated tests? Is every change reviewed by another engineer? How are releases deployed and rolled back? Quality should be part of the process from the first sprint, not a phase at the end.',
      },
      {
        heading: '7. Who owns the code and the intellectual property?',
        body: 'Your contract should assign ownership of the code and other work product to you. Make sure the code is stored in repositories you control, and that you can take over or move to another team without asking permission. This protects you whatever happens to the relationship.',
      },
      {
        heading: '8. How do you handle security and data?',
        body: 'Ask how access to your systems is managed, how secrets are stored, and how personal data is protected. If you handle health, financial, or EU and UK personal data, ask specifically about the relevant regulations, such as HIPAA or GDPR, and what the partner has done before in that area.',
      },
      {
        heading: '9. How does communication work across time zones?',
        body: 'Distributed teams can be a strength, with work continuing while you sleep, but only with a clear rhythm. Ask about overlap hours, response times, who your main point of contact is, and how urgent issues are escalated. Agree the tools you will use from day one.',
      },
      {
        heading: '10. What happens at the end?',
        body: 'Ask about handover before you start: documentation, knowledge transfer, and support after launch. A partner confident in their work will make it easy for you to continue without them, whether that means your own team taking over or an ongoing support arrangement.',
      },
    ],
    conclusion: {
      heading: 'Choose for the hard months, not the first meeting',
      paragraphs: [
        'Most partners look good in a pitch. The right one is still communicating clearly, shipping working software, and telling you the truth in month six. Use these questions to judge how a partner will behave when the project gets difficult, because at some point it will.',
        'If you are evaluating Stack360, we are happy to answer every one of these questions on a discovery call.',
      ],
    },
  },
  {
    slug: 'mvp-development-guide',
    title: 'MVP Development: Scope, Build, and Launch',
    excerpt:
      'A practical MVP development guide for founders: scope the smallest useful product, choose what to build first, and launch in a way that teaches you something.',
    date: '2026-10-06',
    category: 'Engineering',
    readTime: '7 min',
    intro:
      'A minimum viable product is the smallest version of your product that real users can use and learn from. Its job is not to impress investors or match competitors feature for feature. Its job is to test your riskiest assumption with real people as quickly and cheaply as possible. Most MVPs that fail do so because they were too big, not too small.',
    sections: [
      {
        heading: 'Start with the riskiest assumption',
        body: 'Before writing any code, write down what must be true for your business to work: that a specific group of people has a specific problem, that they will use your solution, and that someone will pay. Pick the assumption you are least sure about. Your MVP should be designed to test that one, and everything that does not help test it can wait.',
      },
      {
        heading: 'Define one core journey',
        body: 'Describe the single journey that delivers your product’s value, from the moment a user arrives to the moment they get what they came for. A marketplace might be listing an item and completing a purchase; a SaaS tool might be connecting data and seeing a first useful report. Build that journey end to end before adding anything around it.',
      },
      {
        heading: 'Cut scope deliberately',
        body: 'Go through your feature list and ask of each item whether the core journey works without it. Admin panels, advanced settings, multiple user roles, integrations, and edge-case handling can often be manual or postponed. A feature that is done by hand behind the scenes for your first users is often the fastest way to learn whether it is worth building properly.',
      },
      {
        heading: 'Choose boring, proven technology',
        body: 'An MVP is not the place to experiment with a new framework. Choose a well-supported stack your team knows, use managed cloud services, and lean on existing tools for payments, authentication, and email. The goal is to spend engineering time on what makes your product different, and to keep the code clean enough that it can grow when the MVP succeeds.',
      },
      {
        heading: 'Build quality where it matters',
        body: 'Minimum does not mean careless. The core journey should be reliable, secure, and pleasant to use, because users judge your product on it. Put automated tests around the critical paths, protect user data properly from day one, and keep the architecture simple enough to change. Polish the parts users see; keep everything else minimal.',
      },
      {
        heading: 'Measure from the first user',
        body: 'Decide before launch what success looks like: activation, repeat use, conversion, or willingness to pay. Add analytics to the core journey and talk to your first users directly. Numbers show you what people do; conversations tell you why. Both are needed to decide what to build next.',
      },
      {
        heading: 'Plan for what comes after',
        body: 'A successful MVP creates a new problem: more users, more requests, and pressure to scale. Plan a short stabilization phase after launch to fix what users hit first, and keep a running list of the shortcuts you took so they can be revisited deliberately rather than discovered in production.',
      },
    ],
    conclusion: {
      heading: 'Small, real, and measurable',
      paragraphs: [
        'The best MVPs are small enough to build quickly, real enough that people genuinely use them, and measurable enough that you learn something either way. Start from the riskiest assumption, build one journey well, and let real usage decide what comes next.',
        'Stack360 helps founders scope and build MVPs, starting with a discovery call to agree the core journey, a delivery plan with clear milestones, and weekly demos of working software.',
      ],
    },
  },
  {
    slug: 'mastering-python-important-features',
    title: 'Mastering Python: Important Features and How to Use Them',
    excerpt:
      'Python’s feature set and simple syntax make it one of the most widely used languages — here are the crucial capabilities and how to use them well.',
    date: '2026-07-13',
    category: 'Engineering',
    readTime: '8 min',
    intro:
      'Python is one of the most widely used programming languages in the world because of its extensive feature set and simple syntax. Its many features help both novice and expert programmers alike, adding to the smooth experience it offers. I will be discussing some of Python’s most crucial features and discussing how to utilize them efficiently.',
    sections: [
      {
        heading: 'Simple Syntax',
        body: 'Python’s simple syntax is arguably its most appealing feature. Its readability enables beginners to pick up the language swiftly, facilitating comprehension. In Python, the use of English keywords instead of punctuations makes it feel natural and less like a traditional programming language.',
      },
      {
        heading: 'Dynamic Typing',
        body: 'Python uses dynamic typing which means you don’t need to state the data type of a variable when declaring it. The interpreter infers the data type, providing flexibility when coding. However, keep an eye out for unexpected behaviours if data types change unexpectedly.',
      },
      {
        heading: 'Indentation for Code Blocks',
        body: 'Instead of using brackets or specific keywords to define a block of code, Python uses indentation. Consistent use of indentation improves code readability, reducing confusion.',
      },
      {
        heading: 'Python Libraries and Frameworks',
        body: 'Python is popular for its robust libraries and frameworks which enable speedy application development. Whether you’re working on machine learning projects, web development, or data analysis, Python has a library or framework to simplify the task. Remember to explore Python’s diverse selection of libraries to expedite your project.',
      },
      {
        heading: 'Interactive Shell',
        body: 'Python provides an interactive shell for experimenting and debugging, proving advantageous for beginners to understand code behaviours. You can access Python’s interactive shell directly from your terminal by typing ‘python’.',
      },
      {
        heading: 'Cross-Platform Compatibility',
        body: 'Python is compatible with a variety of operating systems like Windows, Linux, macOS, and Unix. That’s why there is no need to modify the programming syntax when transferring between operating systems. It improves portability and makes cross-platform debugging easier.',
      },
      {
        heading: 'File Handling',
        body: 'Python comes with simple file handling methods. You can create, read, write, or append a file using in-built functions like open(), read(), write(), and close() respectively. Remember to close files after performing the operations to prevent memory leaks.',
      },
      {
        heading: 'Object-Oriented Programming',
        body: 'Python supports object-oriented programming (OOP) principles. It provides another layer of simplicity and effectiveness in programming structure. Class and Object, the two pillars of OOP in Python, streamline coding through reusability.',
      },
    ],
    conclusion: {
      heading: 'Conclusion',
      paragraphs: [
        'Using these Python features, programming tasks become relatively more comfortable. They enable a beginner-friendly approach to programming while still providing powerful tools for more advanced tasks.',
        'Experiment with these features as you become more proficient with Python and use its capabilities to deliver impressive, efficient coding projects.',
      ],
    },
  },
  {
    slug: 'designing-systems-that-survive-growth',
    title: 'Designing Systems That Survive Growth',
    excerpt:
      'Early architecture choices either absorb traffic and team growth — or force a rewrite. Here is how we decide what to harden now versus what to leave flexible.',
    date: '2026-06-28',
    category: 'Architecture',
    readTime: '6 min',
    intro:
      'Most systems do not fail because the first version was wrong. They fail because the first version assumed growth would never change the shape of the problem. At Stack360 we treat early architecture as a set of deliberate bets: what must stay stable, what can flex, and what we refuse to invent until the product proves it needs it.',
    sections: [
      {
        heading: 'Start from the load that matters',
        body: 'Before drawing boxes, name the load that would actually hurt: concurrent writes, report queries at month-end, file uploads, webhook bursts. Design for that load first. Everything else can be simpler until evidence says otherwise.',
      },
      {
        heading: 'Separate durable contracts from replaceable insides',
        body: 'APIs, event schemas, and data ownership boundaries should be boring and versioned. Internal modules, queues, and caches should stay replaceable. When those two layers blur, every refactor becomes a migration.',
      },
      {
        heading: 'Make failure visible early',
        body: 'Retries, timeouts, and dead-letter paths are not polish — they are how you learn where the system breaks. Ship observability with the first production path so growth shows up as a signal, not a surprise outage.',
      },
      {
        heading: 'Leave escape hatches, not speculative platforms',
        body: 'A thin adapter, a feature flag, or a clear seam for a future service is cheaper than a premature microservices mesh. Prefer seams you can cut later over platforms you must staff forever.',
      },
    ],
    conclusion: {
      heading: 'Conclusion',
      paragraphs: [
        'Systems that survive growth are rarely the most elaborate on day one. They are the ones with clear contracts, honest load assumptions, and room to evolve without rewriting the business.',
        'If you are planning a rebuild or a first architecture pass, start with the load and the contracts — the rest follows.',
      ],
    },
  },
  {
    slug: 'quality-as-a-release-gate',
    title: 'Quality as a Release Gate, Not a Phase',
    excerpt:
      'QA that starts after “dev is done” always loses. Treat checks as gates in the delivery path — and ship with fewer late surprises.',
    date: '2026-05-20',
    category: 'Delivery',
    readTime: '5 min',
    intro:
      'Teams still talk about “QA phase” as if quality is a station the build visits once. In practice, defects that reach that station are already expensive. We treat quality as a sequence of gates: each one must pass before the work can move closer to production.',
    sections: [
      {
        heading: 'Define done before work starts',
        body: 'Acceptance criteria, edge cases, and non-functional expectations belong in the ticket — not in a Slack thread after merge. When “done” is fuzzy, every gate becomes a negotiation.',
      },
      {
        heading: 'Automate the boring checks',
        body: 'Lint, typecheck, unit coverage on critical paths, and smoke tests on the happy path should run on every pull request. Humans should spend attention on judgment calls, not on catching typos the pipeline already knows how to find.',
      },
      {
        heading: 'Keep a human gate for risk',
        body: 'Exploratory testing, permission matrices, and migration rehearsals still need people. Gate them by risk: money movement, auth, data deletion, and irreversible ops get explicit review before release.',
      },
      {
        heading: 'Close the loop after ship',
        body: 'A release gate without post-deploy checks is incomplete. Smoke the critical flows in production, watch error budgets, and feed what broke back into the next ticket’s definition of done.',
      },
    ],
    conclusion: {
      heading: 'Conclusion',
      paragraphs: [
        'Quality as a gate means the build cannot advance until the right checks pass — automated where possible, human where the risk demands it.',
        'That discipline is what lets delivery stay fast without treating production as the first real test environment.',
      ],
    },
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
