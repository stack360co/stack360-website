/** In-site blog posts — edit this file to add or update articles. */

export type BlogSection = {
  heading: string;
  /** Paragraphs split by a blank line. Links use [text](/path), or [text](https://…) to cite a source. */
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
  /** Set when the post was substantially rewritten; shown on the page and used as dateModified. */
  updated?: string;
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
        body: 'Microsoft’s guidance is that Xamarin.Forms projects should move to .NET MAUI. The projects don’t need to be rewritten, and a multi-project solution doesn’t need to become a single project. Your C# models, view models, services and most of your XAML carry over.\n\nFlutter or React Native means rebuilding every screen in another language. That can still be the right call if a redesign was planned anyway, or if your web team already works in React. We build in all three, and can add [.NET developers](/work-with-us/hire/dotnet-developers) to your team for the move.',
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
    author: { name: 'Ali Haider', role: 'Co-Founder & CTO' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Most software projects we build take three to six months. Durations, team sizes and hours from 28 real projects, and what made each one short or long.',
    date: '2026-10-12',
    category: 'Data',
    readTime: '6 min',
    intro:
      'Most [custom software](/what-we-build/custom-software) projects we take on need three to six months to build. Simple ones, such as a GoHighLevel sales setup or a Xamarin to .NET MAUI migration, take one to three. We checked that against the 28 projects in our portfolio, and you can [estimate yours](/our-work/project-timelines) from the same data. The portfolio records how long we worked on each one, including work after launch.',
    sections: [
      {
        heading: 'The numbers',
        body: 'Across the 28 projects, the median is 8 months. The shortest took one month, and the two longest ran for 30.\n\n1. One to three months: 3 projects.\n\n2. Four to six months: 9 projects.\n\n3. Seven to twelve months: 10 projects.\n\n4. More than a year: 6 projects.\n\nThe median sits above three to six months because these durations include work after launch, as the longest projects show.',
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
        body: 'The longest projects were products we kept building, not single builds. AutoBuffy, ATC and Coach Catalyst each had a first version live within three to six months. So at least 70% of the time on each of them came after launch.\n\nAutoBuffy’s 20 months covered an Angular upgrade, Elasticsearch search, a real-time inventory service and buy now, pay later at checkout. BuffyHub’s 19 months included syncing with Amazon, eBay and Walmart.\n\nThe pattern is integrations. Every outside system, from a marketplace to a shipping carrier, brings its own rules, test accounts and failure cases. Compliance adds time in the same way: Fisar, a GDPR compliance tool, took 12 months.',
      },
      {
        heading: 'Why projects run late',
        body: 'When one of our projects runs longer than planned, it is usually for one of four reasons.\n\n1. Scope changes. New features get requested halfway through, and each one moves the end date.\n\n2. Integrations. A third-party API, marketplace or payment provider behaves differently than expected.\n\n3. Waiting on the client. Feedback, content, designs or access arrive later than planned, and the work waits with them.\n\n4. Unclear requirements. The real requirements only become clear once people start using the first screens.\n\nThe first and last are linked. A short discovery phase and a written change process catch most of both.\n\nWe are not unusual. In the surveys reviewed by researchers at Simula Research Laboratory, 65 to 80% of software projects overran their delivery date ([Moløkken-Østvold and Jørgensen, 2005](https://cms.simula.no/sites/default/files/publications/Molokken-ostvold.2005.5.pdf)).',
      },
      {
        heading: 'Team size and hours',
        body: 'Our eight case studies record the team and the hours. Five ran with two engineers, ATC and Truck-4 had three, and AutoBuffy had six.\n\nHours ranged from 1,232 on Truck-4 to 28,000 on AutoBuffy. Klingit took 1,400, Nextflag 1,602, Cercle 2,112, ATC 2,800, BuffyHub 3,344 and Coach Catalyst 4,272.',
      },
      {
        heading: 'How to plan yours',
        body: '1. Count the systems it connects to, not the screens. Payments, marketplaces, shipping and compliance rules add more time than pages do.\n\n2. Ship the smallest version people will use, then plan the rest as a series of releases. Cinekit’s one-month build shows what a tight first scope looks like.\n\n3. Plan for work after launch. Frameworks, app stores and payment rules keep changing, so live software needs regular attention.\n\n4. Agree who signs off each milestone, and how quickly. Late feedback moves the end date as much as late code.\n\n5. Keep the same team if you can. The engineers who built version one already know where everything is.',
      },
      {
        heading: 'How we measured',
        body: 'Durations come from our portfolio records of 28 projects delivered since 2019. Each one is how long we worked on the project, including improvements after launch. Team sizes and hours come from our eight published case studies.\n\nThis is our own delivery data, not a survey of the industry. You are welcome to use these numbers with a link to this page as the source.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'How long does it take to build custom software? Most of our projects take three to six months. Simple ones take one to three, and products that keep growing can run for years.',
        'What is the fastest project we have delivered? Cinekit, a camera gear rental marketplace, in one month.',
        'How many engineers does a project need? Most of our case studies ran with two. The largest, AutoBuffy, had six.',
        'Why do projects run over? Scope changes, integrations, late feedback or access, and requirements that only become clear once building starts. On Klingit, we added a change process that records each request and agrees its effect on scope before work starts.',
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
      'A checklist for vetting a remote developer before they start, and the four checks every engineer passes before they reach a client’s shortlist with us.',
    date: '2026-10-12',
    category: 'Hiring',
    readTime: '5 min',
    intro:
      'Vet a remote developer the way you would vet an employee. Interview them yourself, check which parts of their past projects they built, and watch them work on your own code. Settle access and ownership before day one. Here is the checklist we suggest to clients, and how each step works when the developer comes from us.',
    sections: [
      {
        heading: 'What we check before you meet anyone',
        body: 'Every engineer passes four checks before they reach a client’s shortlist.\n\n1. A technical interview with one of our senior engineers, on the stack they will work in.\n\n2. A coding test, either live or as a take-home task.\n\n3. A review of code and projects they built before, so we know which parts were theirs.\n\n4. A communication check in spoken and written English, including how clearly they explain their own work.\n\nYour interview comes after all four, so your time goes on fit, not on basics.',
      },
      {
        heading: 'Interview the person, not the agency',
        body: 'Ask to interview the developer who will actually do the work. Talk through something they built: what they chose, what went wrong and what they would change. Someone who did the work can answer follow-up questions without notes.\n\nWhen you [hire developers](/work-with-us/hire) through us, you get a shortlist within 2 days, and you interview the engineers yourself before anyone starts.',
      },
      {
        heading: 'Check which part they built',
        body: 'A team page can list a dozen apps, but one developer usually owned one piece of each. Ask which part was theirs: the API, the mobile app, the payments or the deployment.\n\nOn our hire pages, the stack listed beside each project shows the part we built. Where a product is public, such as Cinekit or Trusted Tastes, open it and try it. Our case studies also record the team size and hours behind each build.',
      },
      {
        heading: 'Watch them work in your setup',
        body: 'A coding test shows how someone solves a puzzle. A small, real ticket in your own repository shows how they read unfamiliar code, ask questions and open a pull request. Give them one in the first week.\n\nOur engineers work inside your repo, sprint and tools from the start. Full Blown Media, whose review is on Clutch, ran its project with us through Slack and Trello.',
      },
      {
        heading: 'Agree the working hours',
        body: 'Write down which hours overlap with your team, and who answers if something breaks outside them. A few shared hours a day cover standups, reviews and quick questions.\n\nOur engineers work full time on your project, from our team in Lahore, and overlap at least 4 hours with a US working day.',
      },
      {
        heading: 'Settle access and ownership before day one',
        body: 'Give the developer their own accounts in your GitHub, cloud and project tools, not shared logins. Removing access later then takes minutes, not a password reset across every system.\n\nPut ownership in the contract. With us, you own everything our engineers write for you, including the source code and the intellectual property in it.',
      },
      {
        heading: 'Decide how long you need them',
        body: 'Be clear whether you need someone for a few months or for years, because it changes who fits. We place single engineers or a [dedicated development team](/work-with-us/hire/dedicated-team), for under six months, six to twelve months or long-term roles. There is no long-term contract to start. If someone turns out not to be the right fit, we replace them and handle the handover.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'How fast can a developer start? We send a shortlist within 2 days, and you can hire in as fast as a week.',
        'Do we interview them ourselves? Yes. You meet the engineers on the shortlist before you decide, after they have passed our four checks.',
        'Do they work only on our project? Yes. Our engineers work full time on your project.',
        'What if the developer isn’t the right fit? We find a replacement and handle the handover.',
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
    slug: 'react-native-or-flutter',
    title: 'React Native or Flutter? How We Choose for Client Apps',
    seoTitle: 'React Native or Flutter? How We Choose',
    author: { name: 'M. Awais Aslam', role: 'Co-Founder' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'How we pick React Native, Flutter or native code for a client app, with the reasons behind Nextflag, Trusted Tastes, StoreBevy and Slumber & Sprout.',
    date: '2026-10-12',
    category: 'Mobile',
    readTime: '5 min',
    intro:
      'Choose React Native if your team already builds for the web in React. Choose Flutter if the app has a custom design that must look the same on every phone. Choose native Swift or Kotlin if the app depends on device features. We build all three, and here is what decided each of our apps.',
    sections: [
      {
        heading: 'When we pick React Native',
        body: 'React Native apps are written in JavaScript or TypeScript and render real native components. Developers who know React can work on them, and some code can be shared with a React website.\n\nWe recommended [React Native](/work-with-us/hire/react-native-developers) for Nextflag, a social travel app with a map of location flags, following and wishlists. Trusted Tastes, a restaurant app built on recommendations from people you follow, uses React on the web and React Native on mobile.',
      },
      {
        heading: 'When we pick Flutter',
        body: 'Flutter draws every pixel itself with its own rendering engine. A custom design looks identical on iOS and Android, with no native view in between. Apps are written in Dart.\n\nOur [Flutter developers](/work-with-us/hire/flutter-developers) built StoreBevy, a white-label app in Flutter: one codebase, configured for each small retailer that wants its own branded store app.',
      },
      {
        heading: 'When we go native',
        body: 'Some apps lean hard on the phone: health data, widgets, background location or heavy animation. Those are better built in Swift for iOS and Kotlin for Android, even though that means two codebases.\n\nSlumber & Sprout is a native iOS app that tracks children’s sleep and builds routines. We built the Rails backend it talks to, which recalculates sleep schedules with Sidekiq when a routine changes.',
      },
      {
        heading: 'Where the time goes',
        body: 'Four things have cost us the most time on cross-platform apps, whichever framework the app uses.\n\n1. Package upgrades. The framework, its packages and the iOS pods have to move together. Nextflag lagged until we upgraded all three and tuned the app.\n\n2. Store review. Apple and Google can reject or hold a release, so leave room for review in every release plan.\n\n3. Older Android phones. An app that runs smoothly on a new iPhone can stutter on a low-end Android phone, so test on both.\n\n4. Push notifications. iOS uses Apple Push Notification service and Android uses Firebase Cloud Messaging, so each needs its own setup and testing.\n\nOn Nextflag we also rewrote the post-upload screen, which often crashed the app, and saved onboarding progress at each step so people could resume.',
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
        'Do you take over apps another team built? Yes. The first step is getting the project building on current tools and reading its crash reports, before changing anything.',
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
    author: {
      name: 'Azmat Rana',
      role: 'CEO & Founder',
      url: '/who-we-are/culture#azmat-rana',
    },
    excerpt:
      'How we moved AutoBuffy, a US auto parts store, from Angular 8 to 13 in 20 days, one version at a time, and added server-side rendering for search.',
    date: '2026-10-12',
    category: 'Engineering',
    readTime: '4 min',
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
        body: 'Once on 13, the server sends each page as finished HTML, and Angular takes over in the browser. Search engines and link previews see the parts and descriptions straight away.\n\nCode that touches window, document or localStorage has to be guarded, because those don’t exist on the server. That is where most rendering bugs hide.\n\nAfter server-side rendering went live, AutoBuffy’s search visibility and clicks improved.',
      },
      {
        heading: 'What took the most effort',
        body: '1. Third-party libraries. Some had no release for the newer Angular versions, so they had to be upgraded, replaced or removed.\n\n2. RxJS and TypeScript. Each Angular version needs newer releases of both, and the version bumps broke existing code.\n\n3. Server-side rendering. Browser-only code across the store had to be found and guarded.\n\n4. Keeping the store live. We did the work alongside the live store, then switched over in a short maintenance window.',
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
        '4. Don’t stop there. Angular ships a major version about every six months, so plan the next upgrade. Our [Angular developers](/work-with-us/hire/angular-developers) can take it on.',
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
    author: { name: 'Ali Haider', role: 'Co-Founder & CTO' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'How we moved Coach Catalyst, a live coaching platform, from Vue 2 to Vue 3, rebuilt its CoffeeScript chat in Vue and added Stripe Connect payouts.',
    date: '2026-10-12',
    category: 'Engineering',
    readTime: '4 min',
    intro:
      'Vue 2 reached end of life on December 31, 2023, so it no longer gets official fixes, including security fixes. We moved Coach Catalyst, a live coaching platform, from Vue 2 to Vue 3. The same project rebuilt its chat, added a community module and set up Stripe Connect payouts for coaches. Here is what the migration involved.',
    sections: [
      {
        heading: 'What changes between Vue 2 and Vue 3',
        body: 'Most Vue 2 code still works in Vue 3, but not all of it. These changes touch most apps.\n\n1. Apps start with createApp instead of new Vue, and plugins install with app.use.\n\n2. Filters are gone. They become methods or computed properties.\n\n3. The event bus pattern, using $on and $off, is gone. Components talk through props, events or a store.\n\n4. Many plugins needed new versions for Vue 3, and some never got one.',
      },
      {
        heading: 'How we ran the move',
        body: 'We migrated Coach Catalyst section by section, while coaches and clients kept using it. Vue’s migration build, @vue/compat, runs Vue 2 code on Vue 3 and warns about each change. We fixed those warnings one area at a time.\n\nWe kept Vuex for state management, updated for Vue 3. Pinia is now Vue’s recommended store for new code, but Vuex still works with Vue 3, so it didn’t need to change.',
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
        body: '1. List every plugin and check it has a Vue 3 version. Replace the ones that don’t before you start.\n\n2. Use the migration build, @vue/compat, and fix its warnings one area at a time.\n\n3. Don’t change your store unless you need to. Vuex works with Vue 3, and you can move to Pinia later.\n\n4. Keep the app releasable throughout, and move one section at a time. Our [Vue.js developers](/work-with-us/hire/vue-developers) have made this move before.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'Is Vue 2 still safe to run? It still works, but it has had no official updates since December 31, 2023, including security fixes.',
        'Do we have to rewrite everything in the Composition API? No. Vue 3 supports the Options API. Coach Catalyst moved to the Composition API, but it is optional.',
        'Can the app stay live during the move? Yes. Coach Catalyst stayed live while we migrated it section by section.',
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
    author: { name: 'Tayyab Zia', role: 'Head Software Engineer' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Why chatbots invent facts, and how retrieval-augmented generation fixed it on Money Ball, our NFL stats chatbot that checks live data before it answers.',
    date: '2026-10-12',
    category: 'AI',
    readTime: '4 min',
    intro:
      'A chatbot makes things up when it answers from memory. The fix is to make it look the facts up first, then answer only from what it found. This is called retrieval-augmented generation, or RAG. We built Money Ball, an NFL stats chatbot, this way in three months.',
    sections: [
      {
        heading: 'Why general models get facts wrong',
        body: 'A large language model learns from text up to a cutoff date. It doesn’t know last week’s results, and it doesn’t store exact numbers reliably. Ask it for a player’s yards this season, and it may produce a figure that only sounds right.\n\nSports stats are a hard case: specialized, precise and changing every week. A wrong number looks exactly like a right one.',
      },
      {
        heading: 'How Money Ball answers a question',
        body: 'Money Ball lets fans and analysts ask about NFL players and teams in a chat. Before the model writes anything, the system queries a live sports database. The model then turns those results into an answer.\n\nSo the numbers come from the database, not from the model’s memory. The model’s job is to understand the question and explain the result.\n\nWhen the stats don’t cover a question, Money Ball asks a follow-up, such as which season or which player, instead of guessing.',
      },
      {
        heading: 'What it runs on',
        body: 'Money Ball uses an open-source language model. It doesn’t need the largest model available, because the facts come from the database. It runs as Docker microservices, so new stats are ingested and analyzed quickly. The backend uses Django and Node.js, with PostgreSQL and Redis. It is live at app.moneyball-ai.com.',
      },
      {
        heading: 'Rules that keep answers honest',
        body: '1. Retrieve first, every time. If the system skips the lookup, the model falls back on memory.\n\n2. Give the model only what it needs. A short, relevant set of results works better than a long dump of data.\n\n3. Decide what happens when the data doesn’t cover the question. A follow-up question or “I don’t have that” beats a confident guess.\n\n4. Keep the math out of the model. Totals and averages should come from the database query.\n\n5. Test with real questions, including awkward ones, and check every number against the source.',
      },
      {
        heading: 'How we tested it',
        body: 'Before launch, we checked Money Ball three ways. We compared its answers with the stats database, and ran a fixed set of real and awkward questions. The client also tested it and reported anything that came back wrong.',
      },
      {
        heading: 'Where else this works',
        body: 'The same pattern fits any [AI feature](/what-we-build/ai-solutions) built on a business’s own facts: product catalogs, policies, contracts or support history. The model handles the language, and your data supplies the facts.\n\nIt doesn’t remove the need for checks. If the source data is wrong, the answer will be wrong too, so someone has to own the data.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'What is RAG? Retrieval-augmented generation. The system looks up facts in your own data and gives them to the model, which answers from them.',
        'Does RAG stop every hallucination? No. Stanford researchers found that legal research tools built on retrieval still hallucinated between 17% and 33% of the time ([Magesh et al., 2024](https://arxiv.org/abs/2405.20362)). That is why the instructions and the testing matter as much as the retrieval.',
        'How long does a chatbot like this take to build? Money Ball took three months.',
        'Which model does it need? RAG works with most large language models, because the facts come from your data. Money Ball uses an open-source model.',
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
    author: { name: 'M. Awais Aslam', role: 'Co-Founder' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Security deposits, payouts to sellers, store credit for refunds and subscriptions: how we built marketplace payments with Stripe on six real platforms.',
    date: '2026-10-12',
    category: 'Marketplaces',
    readTime: '5 min',
    intro:
      'Marketplace payments are harder than a normal checkout, because money moves between three parties: the buyer, the seller and you. Stripe handles most of the hard parts, but every [marketplace](/what-we-build/marketplace-development) needs its own setup. Here is what we built on six platforms, from security deposits to payouts.',
    sections: [
      {
        heading: 'Paying sellers with Stripe Connect',
        body: 'Coach Catalyst lets clients pay coaches directly. We integrated Stripe Connect with Express accounts. Stripe hosts each coach’s onboarding and identity checks, and coaches get a light dashboard for their payouts.\n\nWe designed the database schema for the marketplace before wiring up the payments, so it could scale securely. The marketplace opened a new revenue stream for coaches and for the platform.',
      },
      {
        heading: 'Security deposits for rentals',
        body: 'Cinekit rents camera and production gear between creators in the UK, Europe and the US. Expensive kit needs a security deposit, and booking dates change often. We take each deposit as a card hold through Stripe. The amount is authorized on the renter’s card, then released when the gear comes back. We built Cinekit in one month, and it has since grown past 100,000 users.\n\nCard holds have a limit. Stripe says an authorization for an online card payment is usually valid for 7 days. Longer rentals need an extended hold or a different approach.',
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
        heading: 'What caused the most trouble',
        body: 'Across these builds, four things took the most work, and none of them was the checkout itself.\n\n1. Seller onboarding. Stripe verifies each seller’s identity before paying out, and an unfinished check holds their money. Show sellers their onboarding status clearly.\n\n2. Refunds and disputes. A refund or chargeback has to be split correctly between buyer, seller and platform, including partial refunds.\n\n3. Webhooks. Stripe reports payments, payouts and disputes as events. Your records must update from them, and cope with the same event arriving twice.\n\n4. Currencies and regions. Selling across countries, as Cinekit does in the UK, Europe and the US, brings several currencies and tax rules. Card fraud also rises across borders. The ECB and EBA found card fraud rates were ten times higher when the other party was outside the EEA ([joint report, 2024](https://www.ecb.europa.eu/press/pr/date/2024/html/ecb.pr240801~f21cc4a009.en.html)).',
      },
      {
        heading: 'What to decide before you build',
        body: '1. Who holds the money, and when does the seller get paid?\n\n2. What happens on a refund: money back to the card, or store credit?\n\n3. Do you need deposits, and how long do bookings last?\n\n4. Are sellers individuals or businesses, and in which countries? That shapes onboarding, and whether Standard, Express or Custom Connect accounts fit.\n\n5. Will you earn through a commission, a subscription or both?',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'What is Stripe Connect? Stripe’s product for platforms that pay other people, such as coaches, sellers or hosts. Each one connects an account and receives payouts.',
        'Can a marketplace hold a deposit without charging it? Yes. Cinekit takes deposits as card holds. A hold reserves the money on the card, usually for up to 7 days on online payments.',
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
    author: {
      name: 'Azmat Rana',
      role: 'CEO & Founder',
      url: '/who-we-are/culture#azmat-rana',
    },
    excerpt:
      'What a software discovery call with us covers, what to have ready, and what you get afterwards: a team recommendation, a timeline and a plan with milestones.',
    date: '2026-10-12',
    category: 'Delivery',
    readTime: '4 min',
    intro:
      'A discovery call is a 20-minute conversation about what you want built, before anyone writes a plan. We use it to map your goals, your constraints and the systems the software must connect to. Afterwards, you get a recommended team, a timeline and a delivery plan with clear milestones.',
    sections: [
      {
        heading: 'How to book one',
        body: 'You can book a 20-minute call from our [contact page](/contact), or send us a message. We reply within one business day.\n\nA few lines beforehand help: what the software should do, who will use it and any deadline. You don’t need a written specification.\n\nFrom our side, a founder and a senior engineer join the call, so business and technical questions get answered on the spot.',
      },
      {
        heading: 'What helps to have ready',
        body: '1. The problem the software solves, and for whom.\n\n2. What you use today: spreadsheets, an old app or a tool you’ve outgrown.\n\n3. The systems it must connect to, such as payments, a CRM or accounting software.\n\n4. Who will use it, and on which devices.\n\n5. What a good result looks like six months after launch.\n\n6. Any deadline, and what is driving it.',
      },
      {
        heading: 'What most people haven’t worked out yet',
        body: 'Most clients don’t have every answer when they book, and that is normal. These four come up most often.\n\n1. Integrations: which systems the software has to connect to.\n\n2. First release: what to build first, and what can wait.\n\n3. Maintenance: who looks after the software after launch.\n\n4. Timeline: how long it will really take.\n\nWorking these out is the point of the call. You don’t need the answers before you book.',
      },
      {
        heading: 'Why integrations come up so often',
        body: 'In our portfolio, the longest builds connected to the most outside systems. BuffyHub syncs with Amazon, eBay and Walmart. AutoBuffy connects payments, shipping carriers and vendor inventory.\n\nSo expect questions about what the software must talk to. The answers tell us more about the timeline than the number of screens does.',
      },
      {
        heading: 'What you get after the call',
        body: 'Within two business days, you get three things: a recommended team, a timeline and a delivery plan with clear milestones. If you want engineers to join your own team instead, you get a shortlist within 2 days and interview them yourself.\n\nMost of our [custom software](/what-we-build/custom-software) projects take three to six months to build, and simpler ones take one to three. The plan says where yours sits, and why.',
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
        'Who joins from your side? A founder and a senior engineer.',
        'When do we get the plan? Within two business days of the call.',
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
    author: { name: 'Ali Haider', role: 'Co-Founder & CTO' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Why a slow React app is usually slow behind the front end, how we sped up Cercle’s pages without rewriting components, and what to check first.',
    date: '2026-10-12',
    category: 'Engineering',
    readTime: '4 min',
    intro:
      'When a React app is slow, the cause is usually behind it: slow API calls, heavy data, large images or work that should run in the background. Cercle, a UK fashion rental marketplace on React and Next.js, had slow pages that hurt engagement and sales. Most of our fixes were behind the front end, alongside some React changes.',
    sections: [
      {
        heading: 'What we fixed on Cercle',
        body: 'Cercle lets people rent clothes, shoes and accessories from lenders. Slow loads frustrated users, raised bounce rates and cut engagement and sales.\n\n1. Product data. We optimized how product data was handled, so pages got what they needed faster.\n\n2. Image caching. Photos are the heaviest part of a fashion site, so we served them through a CDN that caches them close to each shopper.\n\n3. Background jobs. We moved heavy work to Sidekiq, a background job system for Ruby, so the interface stays responsive while it runs.\n\nFaster pages cut bounce rates and supported higher sales.',
      },
      {
        heading: 'Why rewriting components rarely helps',
        body: 'A component rewrite changes how a page draws. If the page is waiting on a slow API, it will wait just as long after the rewrite. That is why our [React developers](/work-with-us/hire/react-developers) check the API and the database before touching React code.\n\nThe same applies to any framework. On AutoBuffy, an Angular store, part search was slow because of very large database tables. Caching alone didn’t help, so we added Elasticsearch, refined the database structure and added indexes.',
      },
      {
        heading: 'What to check first',
        body: '1. Open the browser’s network panel and reload. Note the slowest requests, and how long the page waits for its first data.\n\n2. Check the size of API responses. Sending whole records when the page shows three fields slows every request.\n\n3. Look at the database queries behind the slowest endpoint. Missing indexes and one query per item in a list are common causes.\n\n4. Check image sizes and caching headers. Serve images at the size they display, in a modern format.\n\n5. Move slow work, such as emails, exports and syncs, to background jobs.\n\n6. Then profile React itself with React DevTools, looking for components that re-render without need.',
      },
      {
        heading: 'When React is the problem',
        body: 'Sometimes it is. Huge lists rendered at once, state that redraws the whole page on every keystroke, and very large JavaScript bundles all slow the front end. The usual fixes are list virtualization, keeping state close to where it’s used and splitting code by route.\n\nFront ends have grown heavier, though. In 2024 the median mobile page shipped 558 KB of JavaScript, and about 44% of the bytes downloaded went unused during page load ([HTTP Archive Web Almanac 2024](https://almanac.httparchive.org/en/2024/javascript)).\n\nMeasure first anyway. Finding the slow layer takes far less time than rewriting the wrong one.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'Is React slow? Not for most apps. A slow React app is usually waiting on data, images or work that should run in the background.',
        'Should we switch frameworks to make the app faster? Measure first. On Cercle, most of the fixes were behind the front end, and the app stayed on React and Next.js.',
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
      'If your sales run on ads, forms, calls and fast follow-ups, configure GoHighLevel instead of building a CRM. We have built sales automation in GoHighLevel that takes leads from Meta, LinkedIn and Google and answers them straight away. It also tells the ad platforms which leads turned into customers. We have also built [custom CRMs](/what-we-build/crm), for businesses whose clients work inside the system. Here is how we decide between the two.',
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
      'Luxe Excursions sells luxury tours, packages and rentals from a shop in Costa Adeje, Tenerife. We built its website, booking platform and staff CMS, and we run its [SEO, Google Ads](/what-we-build/digital-marketing) and Business Profile. The biggest gain didn’t come from new code. It came from checking the data the old booking planner trusted.',
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
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Staff augmentation adds engineers to your team; outsourcing hands a partner the outcome. How to choose, and how each works when you work with us.',
    date: '2026-10-06',
    updated: '2026-10-12',
    category: 'Delivery',
    readTime: '4 min',
    intro:
      'With staff augmentation, engineers join your team and you direct the work. With outsourcing, a partner owns delivery and you review results against milestones. The deciding question is who will manage the work every day. We offer both, plus a managed team in between, so here is how we help clients choose.',
    sections: [
      {
        heading: 'Staff augmentation: you lead, we supply the engineers',
        body: 'Our engineers join your standups, repo and tools full time. You keep product and technical leadership, and you decide what gets built and how.\n\nWe send a shortlist within 2 days. Every engineer has passed a technical interview, a coding test, a review of past work and an English check, and you interview them yourself. They overlap at least 4 hours with a US working day. If someone isn’t the right fit, we replace them and handle the handover. Our [hire developers](/work-with-us/hire) page shows how it works.',
      },
      {
        heading: 'Outsourcing: we own delivery',
        body: 'You describe the result, and we plan and build it. A founder and a senior engineer join the discovery call. Within two business days you get a recommended team, a timeline and a delivery plan with clear milestones.\n\nAfter that, you see working software in a weekly demo, checked against the plan. This suits a new product, a migration or an internal system that can be built and handed over. Our [custom software development](/what-we-build/custom-software) page shows the projects behind it.',
      },
      {
        heading: 'The middle option: a managed dedicated team',
        body: 'Some clients want a team that stays with their product, without managing each engineer. A [dedicated development team](/work-with-us/hire/dedicated-team) gives you engineers plus, when needed, a project manager, QA engineer, UI/UX designer and DevOps engineer. You set the priorities, and the project manager runs the sprints and the reporting.',
      },
      {
        heading: 'How to choose',
        body: '1. Augment if you have engineering leadership and need capacity, such as a CTO adding a React or Swift engineer.\n\n2. Outsource if you need a result and nobody has time to direct engineers, which is common for non-technical founders and operations leaders.\n\n3. Take a managed dedicated team if the work is ongoing but you can’t manage the team yourself.\n\n4. If you can’t tell yet, book a discovery call. Choosing the model is part of what it covers.',
      },
      {
        heading: 'What stays the same either way',
        body: 'You own all the code and the intellectual property in it. There is no long-term contract to start, and the notice period is agreed in each contract. With staff augmentation, engineers work in your accounts and repositories. On a project we deliver, ask for the repository to sit in your account from day one.\n\nWhichever model you choose, expect named engineers, working software every week and access you can remove in minutes. Our checklist for [vetting a remote developer](/blog/how-to-vet-remote-developers) covers the details.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'Is staff augmentation cheaper than outsourcing? It depends on how much management time you have. Compare what it costs to ship the result, including your own team’s time, not the rate per engineer.',
        'How fast can we start? We send a shortlist within 2 days, and you can hire in as fast as a week.',
        'Can we change models later? Yes. Engagements start without a long-term contract, so the setup can change as the work does.',
        'Who owns the code? You do, including the intellectual property in it.',
      ],
    },
    related: [
      { label: 'Hire developers', href: '/work-with-us/hire' },
      { label: 'Dedicated development team', href: '/work-with-us/hire/dedicated-team' },
      { label: 'Custom software development', href: '/what-we-build/custom-software' },
      { label: 'How to vet a remote developer', href: '/blog/how-to-vet-remote-developers' },
    ],
  },
  {
    slug: 'how-to-choose-a-software-development-partner',
    title: 'How to Choose a Software Development Partner',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Ten questions to ask a software development partner before you sign, what a good answer sounds like, and how we answer each one ourselves.',
    date: '2026-10-06',
    updated: '2026-10-12',
    category: 'Delivery',
    readTime: '4 min',
    intro:
      'The right partner is the one still shipping working software and telling you the truth in month six. These ten questions surface that before you sign. For each one, we say what a good answer sounds like and how we answer it ourselves, so you can hold us to it.',
    sections: [
      {
        heading: '1. Who will actually work on our project?',
        body: 'A good partner names the engineers and lets you meet them. A vague answer here is the most common early warning sign.\n\nOurs: you interview every engineer before they start. Each one has already passed a technical interview with a senior engineer, a coding test, a review of past work and an English check.',
      },
      {
        heading: '2. Have you built something like this before?',
        body: 'Look for the same kind of system or scale, and a case study you can question in detail.\n\nOurs: our [case studies](/our-work/case-studies) list the team size and hours behind each build, from 1,232 hours on Truck-4 to 28,000 on AutoBuffy.',
      },
      {
        heading: '3. How do you turn our idea into a plan?',
        body: 'Be wary of a fixed plan after one short call on anything complex. You should get a scope, milestones and the assumptions behind them.\n\nOurs: a founder and a senior engineer join the [discovery call](/blog/software-discovery-call). Within two business days you get a recommended team, a timeline and a delivery plan with clear milestones.',
      },
      {
        heading: '4. How will we see progress?',
        body: 'Working software beats status reports.\n\nOurs: a weekly demo of working software, checked against the milestones in the plan.',
      },
      {
        heading: '5. How do you handle changes in scope?',
        body: 'Every real project changes. A healthy process shows the trade-off before anyone builds the change.\n\nOurs: on Klingit, mid-project requests were pushing out the timeline. We added a change process that records each request and agrees its effect on scope before work starts.',
      },
      {
        heading: '6. How do you make sure the software works?',
        body: 'Ask who writes the tests, whether every change gets reviewed, and how a bad release is rolled back.\n\nOurs: BuffyHub had unit, integration and acceptance tests, and Truck-4 ran SonarQube in its Azure DevOps pipeline. Our [QA and testing](/what-we-build/qa-testing) page has the detail.',
      },
      {
        heading: '7. Who owns the code and the intellectual property?',
        body: 'Your contract should assign both to you, and the code should live somewhere you control.\n\nOurs: you own everything our engineers write for you, including the intellectual property in it.',
      },
      {
        heading: '8. How do you handle security and data?',
        body: 'Ask how access is granted and removed, how secrets are stored, and what they have built under rules like GDPR.\n\nOurs: Truck-4 scans every upload with ClamAV before accepting it. Fisar, a GDPR tool we built, handles subject access requests for school data protection officers.',
      },
      {
        heading: '9. How does communication work across time zones?',
        body: 'Ask for the overlap hours in writing, and who answers when something breaks.\n\nOurs: our team works from Lahore, and engineers overlap at least 4 hours with a US working day. Full Blown Media ran its project with us through Slack and Trello.',
      },
      {
        heading: '10. What happens at the end?',
        body: 'A confident partner makes it easy for you to continue without them.\n\nOurs: handover and ongoing support are part of how we work. If you want us to stay on, [maintenance and support](/what-we-build/software-maintenance) keeps the software current.',
      },
    ],
    conclusion: {
      heading: 'Choose for month six, not the first meeting',
      paragraphs: [
        'Most partners look good in a pitch. Use these questions to judge how one will behave when the project gets difficult, because at some point it will.',
        'If you are talking to us, ask every one of them on the discovery call.',
      ],
    },
    related: [
      { label: 'How a discovery call works', href: '/blog/software-discovery-call' },
      { label: 'Custom software development', href: '/what-we-build/custom-software' },
      { label: 'How we work', href: '/who-we-are/how-we-work' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  {
    slug: 'mvp-development-guide',
    title: 'MVP Development: Scope, Build, and Launch',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'How to scope and launch an MVP, with what we learned from Cinekit’s one-month build and from measuring real users after launch.',
    date: '2026-10-06',
    updated: '2026-10-12',
    category: 'Engineering',
    readTime: '3 min',
    intro:
      'A minimum viable product is the smallest version of your product that real people can use and learn from. Its job is to test your riskiest assumption quickly. Cinekit, a camera gear rental marketplace we built, shipped in one month and has since grown past 100,000 users. Here is what made that possible, and what we tell founders now.',
    sections: [
      {
        heading: 'Start with the riskiest assumption',
        body: 'Write down what must be true for the business to work: that a group of people has a problem, will use your product and will pay for it. Pick the assumption you are least sure about. The MVP exists to test that one.',
      },
      {
        heading: 'Build one flow end to end',
        body: 'Cinekit’s first version did one thing: list gear, book it, hold a security deposit through Stripe and return it. Money Ball, an NFL stats chatbot, took three months because it did one job, answering questions from a live database. Build the one flow that delivers value before anything around it.',
      },
      {
        heading: 'Cut scope on purpose',
        body: 'For each feature, ask whether the core flow works without it. Admin tools, extra user roles and integrations can often wait, or be done by hand for the first users. Every outside system you add brings its own rules and failure cases, which is one of the main reasons projects run long.\n\nBuilding in increments helps too. In an in-depth survey of software projects, those using incremental or evolutionary models had smaller effort overruns than sequential ones ([Moløkken-Østvold and Jørgensen, 2005](https://cms.simula.no/sites/default/files/publications/Molokken-ostvold.2005.5.pdf)).',
      },
      {
        heading: 'Choose proven technology',
        body: 'An MVP is not the place to try a new framework. We built Cinekit on Ruby on Rails, which suits fast backend delivery, and used Stripe instead of building payments. Spend the engineering time on what makes your product different.',
      },
      {
        heading: 'Measure from the first user',
        body: 'Decide before launch what success looks like, and track it from day one. On [a booking site we run](/blog/luxe-excursions-booking-planner), the data showed half of all giveaway entry attempts were failing, mostly because phones gave no clear sign of a missing field. After one fix to the form, the next 14 entries all went through.\n\nNumbers show you what people do. Conversations with your first users tell you why.',
      },
      {
        heading: 'Plan for what comes after launch',
        body: 'Launch is the start, not the finish. Our three longest projects each had a first version live within three to six months, and at least 70% of the time on each came after launch. Most of our builds take three to six months, and simpler ones take one to three. The full data is in [how long software projects take](/blog/how-long-software-projects-take).',
      },
    ],
    conclusion: {
      heading: 'Small, real and measurable',
      paragraphs: [
        'Build the smallest thing people will genuinely use, measure it, and let real usage decide what comes next.',
        'If you have an MVP in mind, a [discovery call](/blog/software-discovery-call) is the quickest way to scope the first release.',
      ],
    },
    related: [
      { label: 'Custom software development', href: '/what-we-build/custom-software' },
      { label: 'SaaS development', href: '/what-we-build/saas' },
      { label: 'How long software projects take', href: '/blog/how-long-software-projects-take' },
    ],
  },
  {
    slug: 'mastering-python-important-features',
    title: 'Mastering Python: The Features Our Django Team Relies On',
    seoTitle: 'Python Features Our Django Team Relies On',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'The Python and Django features behind our production work, from Celery workers to retrieval pipelines, with examples from Money Ball, Natif.ai and Mi Taller.',
    date: '2026-07-13',
    updated: '2026-10-12',
    category: 'Engineering',
    readTime: '3 min',
    intro:
      'Python’s simple syntax gets the attention, but in production its value is the ecosystem around it. Most of our Python work runs on Django, behind products that process something: documents, records, sports stats or compliance checks. These are the features we rely on, and where each one earned its place.',
    sections: [
      {
        heading: 'Django’s admin, authentication and ORM',
        body: 'Django ships with an admin panel, user authentication and an ORM, which saves weeks on every new product. That is why the Python projects we have delivered so far run on Django. FastAPI suits a small, fast API service on its own.\n\nThe Luxe Excursions booking platform runs on Django and Django REST Framework. Its staff pause sales on an item with one tick in the admin.',
      },
      {
        heading: 'Celery for work that shouldn’t keep people waiting',
        body: 'Celery runs background jobs and schedules. Mi Taller, a garage management platform, uses Celery queues with WebSockets to push live repair updates to car owners. SiteRanker uses Celery with Elasticsearch to collect thousands of search metrics at once. Alertia warns security firms before a guard’s license expires.',
      },
      {
        heading: 'Retrieval pipelines for AI features',
        body: 'Python’s AI libraries make it the natural home for retrieval pipelines. Money Ball looks up a live NFL database before its model writes an answer, so the numbers come from data, not memory. We wrote up [how that stops a chatbot making things up](/blog/stop-ai-chatbot-hallucinations).',
      },
      {
        heading: 'Isolated workers for document processing',
        body: 'Natif.ai runs incoming files through isolated Django workers for OCR and handwriting recognition, and documents its API with Swagger. Isolating jobs this way stops one bad file from holding up the whole queue.',
      },
      {
        heading: 'Readable code a new engineer can pick up',
        body: 'Python’s plain syntax and indentation rules make code easy to read, which matters when an engineer joins a codebase mid-project. Dynamic typing is flexible, but it lets type mistakes slip through. On larger codebases, type hints and tests do that checking.',
      },
      {
        heading: 'Access control and audit trails',
        body: 'For sensitive records, we use role-based access, masked fields and audit logs. Fisar, a GDPR tool for school data protection officers, handles subject access requests this way.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'Django or FastAPI? Django for most products, because its admin, authentication and ORM save weeks. FastAPI suits a small API service on its own.',
        'Can Python developers build AI features? Yes. Money Ball and Natif.ai both run AI features on Django backends our engineers built.',
        'Can we add a Python developer to our own team? Yes. See [hire Python and Django developers](/work-with-us/hire/python-developers).',
      ],
    },
    related: [
      { label: 'Hire Python and Django developers', href: '/work-with-us/hire/python-developers' },
      { label: 'AI solutions', href: '/what-we-build/ai-solutions' },
      {
        label: 'How to stop an AI chatbot from making things up',
        href: '/blog/stop-ai-chatbot-hallucinations',
      },
    ],
  },
  {
    slug: 'designing-systems-that-survive-growth',
    title: 'Designing Systems That Survive Growth',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Which architecture choices absorb growth and which force a rewrite, with examples from AutoBuffy, Truck-4, BuffyHub, ATC and Cad Cam Masters.',
    date: '2026-06-28',
    updated: '2026-10-12',
    category: 'Architecture',
    readTime: '3 min',
    intro:
      'Most systems don’t fail because the first version was wrong. They fail because growth changed the shape of the problem, and nothing in the design could bend. Here is what we harden early and what we leave flexible, with the projects that taught us.',
    sections: [
      {
        heading: 'Start from the load that would hurt',
        body: 'Name the load that would actually break things: search across a huge catalog, large uploads, month-end reports or webhook bursts. Design for that first.\n\nOn [AutoBuffy](/our-work/case-studies/autobuffy), search by make, year and model slowed down as the parts tables grew. Caching alone didn’t help, so we added Elasticsearch, refined the database structure and added indexes. On Cad Cam Masters, large 3D design files were stalling checkout, so uploads moved to a separate background pipeline on AWS.',
      },
      {
        heading: 'Keep heavy work away from the people using the app',
        body: 'AutoBuffy’s admin uploads used to slow the store down for shoppers. We split the storefront and admin onto separate servers, and added load balancers and auto-scaling. Files now go straight from the browser to S3 instead of passing through the server. Cercle moved heavy work to Sidekiq background jobs for the same reason.',
      },
      {
        heading: 'Separate stable contracts from replaceable insides',
        body: 'APIs, event formats and data ownership should be boring and versioned. Internal modules, queues and caches should stay easy to replace. BuffyHub connects payment gateways, shipping providers and inventory systems through APIs and webhooks, so each connection can change without rewriting the rest.',
      },
      {
        heading: 'Make failure visible early',
        body: 'Retries, timeouts and monitoring show you where a system breaks before customers do. On Truck-4, sign-in has fallbacks and monitoring, so it stays available when an upstream service fails. SonarQube and the CI pipeline catch problems across its services before release.',
      },
      {
        heading: 'Split into services only when you must',
        body: 'A clear seam you can cut later is cheaper than a microservices platform you have to staff forever. Truck-4 did need microservices, because its services depended on each other and had to scale separately. They talk through REST and RabbitMQ, run on Kubernetes and deploy with Helm. Most products don’t need that on day one.',
      },
      {
        heading: 'Fix the slow query before buying a bigger server',
        body: 'On ATC, analytics built with LINQ across many tables slowed every dashboard. We rewrote them as optimized SQL with caching, which cut the database load and sped up the pages.',
      },
    ],
    conclusion: {
      heading: 'What to take from this',
      paragraphs: [
        'Systems that survive growth have honest assumptions about load, clear contracts between their parts, and room to change without rewriting the business.',
        'If you are planning a rebuild, our [cloud](/what-we-build/cloud) and [DevOps](/what-we-build/devops) work starts with the same questions.',
      ],
    },
    related: [
      { label: 'Cloud services', href: '/what-we-build/cloud' },
      { label: 'DevOps consulting', href: '/what-we-build/devops' },
      { label: 'Custom software development', href: '/what-we-build/custom-software' },
      { label: 'The AutoBuffy case study', href: '/our-work/case-studies/autobuffy' },
    ],
  },
  {
    slug: 'quality-as-a-release-gate',
    title: 'Quality as a Release Gate, Not a Phase',
    reviewedBy: 'Azmat Rana',
    excerpt:
      'Why testing at the end of a project always loses, and how we gate releases instead, with examples from BuffyHub, Truck-4, ATC and Luxe Excursions.',
    date: '2026-05-20',
    updated: '2026-10-12',
    category: 'Delivery',
    readTime: '3 min',
    intro:
      'Teams still talk about a QA phase, as if quality were a stop the build makes once. By then, defects are already expensive. We treat quality as a series of gates, and each one must pass before the work moves closer to production.',
    sections: [
      {
        heading: 'Define done before work starts',
        body: 'Acceptance criteria, edge cases and performance expectations belong in the ticket, not in a chat thread after the merge. When “done” is fuzzy, every gate becomes a negotiation.',
      },
      {
        heading: 'Automate the checks a machine can do',
        body: 'Unit, integration and acceptance tests should run on every change. BuffyHub was covered at all three levels. On Truck-4, SonarQube runs in the Azure DevOps pipeline and flags risky code before review, and every uploaded file is scanned with ClamAV before it is accepted.\n\nATC’s .NET code is tested with xUnit, run in Docker so the tests behave the same on every machine.',
      },
      {
        heading: 'Keep people on the risky parts',
        body: 'Scripts check what you already know. People find what nobody thought of. Money movement, sign-in, permissions and anything that deletes data get a human check on real devices before release.',
      },
      {
        heading: 'Test the failure paths, not just the happy path',
        body: 'Payments retry, networks drop and users double-click. On the Luxe Excursions booking platform, each staff alert goes out once per booking, so a payment retry never sends a duplicate.',
      },
      {
        heading: 'Close the loop after release',
        body: 'A release isn’t finished when it deploys. Check the key flows in production and watch the numbers. On Luxe Excursions, the data showed half of all giveaway entry attempts were failing, mostly on phones. After the fix, the next 14 entries all went through.',
      },
    ],
    conclusion: {
      heading: 'What a release gate means',
      paragraphs: [
        'The build can’t move forward until the right checks pass: automated where possible, human where the risk demands it.',
        'Our [QA and testing](/what-we-build/qa-testing) work starts with the flows that earn money or break most often, then widens.',
      ],
    },
    related: [
      { label: 'QA and testing', href: '/what-we-build/qa-testing' },
      { label: 'DevOps consulting', href: '/what-we-build/devops' },
      { label: 'Maintenance and support', href: '/what-we-build/software-maintenance' },
    ],
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
