/**
 * In-depth case studies — content sourced from stack360.co/case-studies.
 * The list page shows project names; each links to a detail route
 * at /our-work/case-studies/[slug].
 */

import type { ChallengeSolution } from '@/constants/component/our-work-portfolio-data';

export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface TechItem {
  label: string;
  /** Simple Icons / BrandIcon slug; omit when no reliable glyph exists. */
  slug?: string;
}

export interface TechGroup {
  category: string;
  items: TechItem[];
}

export interface CaseStudyDetail {
  slug: string;
  name: string;
  tagline: string;
  industry: string;
  platform: string;
  durationHours: string;
  members: string;
  domain: string;
  domainHref: string;
  metric: string;
  metricLabel: string;
  clientRequirement: string;
  /** Primary mockup under /public/images/case-studies. */
  image: string;
  challenges: ChallengeSolution[];
  features: CaseStudyFeature[];
  results: string[];
  tech: TechGroup[];
}

export const CASE_STUDIES_DETAILS_HERO = {
  eyebrow: 'Our Work · Case Studies',
  title: 'Real platforms,',
  highlight: 'real results.',
  description:
    'Deep dives into systems we modernized — the constraints we inherited, the challenges we hit, and the solutions we shipped. Pick a project to read the full engineering story.',
} as const;

export const CASE_STUDIES_DETAILS: CaseStudyDetail[] = [
  {
    slug: 'autobuffy',
    name: 'AutoBuffy',
    tagline:
      'A user-friendly platform that simplifies finding and purchasing auto parts online, with a diverse selection so customers find exactly what they need.',
    industry: 'eCommerce · Auto Parts',
    platform: 'Web',
    durationHours: '28,000 hrs',
    members: '6',
    domain: 'eCommerce · Web Development',
    domainHref: '/what-we-build/web-apps',
    metric: '+50%',
    metricLabel: 'Sales via Buy Now, Pay Later',
    clientRequirement:
      'AutoBuffy, a leading eCommerce store for auto parts, reached out to enhance website functionality and user experience — faster part search across a huge catalog, flexible payment options, stronger technical SEO, higher-availability infrastructure, and real-time inventory synchronization.',
    image: '/images/case-studies/autobuffy.webp',
    challenges: [
      {
        challenge:
          'Searching for a part by make, year, and model was slow because of excessively large database tables holding detailed part information.',
        solution:
          'Caching alone did not help, so we integrated Elasticsearch, refined the database structure, and added indexing to accelerate search dramatically.',
      },
      {
        challenge:
          'Unlike most US eCommerce platforms, the system had no “buy now, pay later” payment method.',
        solution:
          'We implemented Klarna Buy Now, Pay Later integrated with Stripe, thoroughly tested for reliability and a smooth checkout.',
      },
      {
        challenge:
          'Serious SEO gaps from missing technical SEO, compounded by an outdated Angular 8 frontend.',
        solution:
          'We added Server-Side Rendering and upgraded Angular from 8 to 13 in 20 days, boosting SEO performance and sales.',
      },
      {
        challenge:
          'An inadequate server structure struggled with heavy API call and IO volume, slowing the site under traffic.',
        solution:
          'We introduced AWS load balancers and auto-scaling, and split UI and admin onto separate servers so user experience stays unaffected during heavy admin uploads.',
      },
      {
        challenge:
          'Large files were uploaded to the server first and then to S3 — a slow, costly round trip.',
        solution:
          'We implemented direct-to-S3 uploads from the frontend, cutting server cost and utilization for file uploads.',
      },
      {
        challenge:
          'Inventory updates were manual via FTP, CSV, and Excel; real-time updates without manual work were critical.',
        solution:
          'We built a new microservice automating inventory for all parts and vendors with real-time updates and APIs for seamless synchronization.',
      },
    ],
    features: [
      {
        title: 'Geolocation-based part recommendations',
        description:
          'Detects the user’s location to instantly suggest the most popular parts and kits in their area, making search faster and more relevant.',
      },
      {
        title: 'Real-time inventory microservice',
        description:
          'Keeps inventory synced with vendor portals for always up-to-date availability, with dedicated APIs for authenticated users and admins.',
      },
      {
        title: 'Buy Now, Pay Later',
        description:
          'Offers PayPal, AfterPay, debit, and credit options — boosting sales by 50% while giving customers financial flexibility.',
      },
      {
        title: 'Streamlined returns process',
        description:
          'A well-defined return workflow resolves issues quickly, making shopping hassle-free and reinforcing trust.',
      },
      {
        title: 'AI-powered support chatbot',
        description:
          'Personalizes responses by location and demographics for a highly relevant, engaging support experience.',
      },
      {
        title: 'Advanced parts search algorithm',
        description:
          'Delivers real-time, relevant suggestions as users type, so they instantly find the right parts across a vast catalog.',
      },
      {
        title: 'Streamlined content management',
        description:
          'Lets the SEO team update SEO attributes in real time, making it easy to optimize content and improve visibility.',
      },
    ],
    results: [
      'Streamlined search drastically reduced search times and increased user satisfaction.',
      'Flexible payment solutions broadened the customer base and boosted sales.',
      'Advanced SEO strategies raised visibility, increasing clicks and engagement.',
      'System reliability held up even during peak loads.',
      'Inventory management reached real-time accuracy and operational efficiency.',
    ],
    tech: [
      {
        category: 'Frontend',
        items: [
          { label: 'HTML5', slug: 'html5' },
          { label: 'CSS3', slug: 'css3' },
          { label: 'REST' },
          { label: 'Bootstrap', slug: 'bootstrap' },
          { label: 'Angular', slug: 'angular' },
          { label: 'TypeScript', slug: 'typescript' },
        ],
      },
      {
        category: 'Backend',
        items: [
          { label: 'Rails', slug: 'rubyonrails' },
          { label: 'Node.js', slug: 'nodedotjs' },
          { label: '.NET', slug: 'dotnet' },
        ],
      },
      {
        category: 'Database',
        items: [
          { label: 'PostgreSQL', slug: 'postgresql' },
          { label: 'AWS RDS', slug: 'amazonaws' },
          { label: 'Elasticsearch', slug: 'elasticsearch' },
          { label: 'Redis', slug: 'redis' },
        ],
      },
      {
        category: 'Integrations',
        items: [
          { label: 'Twilio', slug: 'twilio' },
          { label: 'SendGrid' },
          { label: 'Stripe', slug: 'stripe' },
          { label: 'AfterShip' },
          { label: 'PayPal', slug: 'paypal' },
          { label: 'UPS' },
          { label: 'USPS' },
          { label: 'FedEx', slug: 'fedex' },
          { label: 'Slack', slug: 'slack' },
          { label: 'Sentry', slug: 'sentry' },
        ],
      },
      {
        category: 'Server',
        items: [
          { label: 'AWS', slug: 'amazonaws' },
          { label: 'S3', slug: 'amazonaws' },
          { label: 'OpenSearch' },
        ],
      },
    ],
  },
  {
    slug: 'coach-catalyst',
    name: 'Coach Catalyst',
    tagline:
      'An online platform that streamlines coaching — a centralized hub for scheduling, communication, and progress tracking with a clean, intuitive interface.',
    industry: 'Management · Coaching',
    platform: 'Web',
    durationHours: '4,272 hrs',
    members: '2',
    domain: 'Coaching · Web Development',
    domainHref: '/what-we-build/web-apps',
    metric: 'Vue 2 → 3',
    metricLabel: 'Migrated + new revenue stream',
    clientRequirement:
      'CoachCatalyst needed its coaching platform modernized — a faster, more intuitive UI, a Stripe Connect marketplace so coaches get paid directly, an integrated community module, a rewritten real-time chat, and a full migration to Vue 3.',
    image: '/images/case-studies/coach-catalyst.webp',
    challenges: [
      {
        challenge:
          'The site was not user-friendly and loaded slowly; users struggled to complete tasks, hurting engagement.',
        solution:
          'We redesigned for clarity and optimized performance — code optimization, fewer HTTP requests, and optimized media — to improve speed and responsiveness.',
      },
      {
        challenge:
          'A marketplace was needed that integrates Stripe Connect for direct coach-to-client payments, with a scalable, secure schema.',
        solution:
          'We designed an efficient relational schema and integrated Stripe Connect with OAuth onboarding and secure payout processing.',
      },
      {
        challenge:
          'Integrating a community module was complex because the project structure was never planned for it.',
        solution:
          'We used a phased, modular approach — isolating community components and integrating them step by step.',
      },
      {
        challenge:
          'The custom chat module was written in CoffeeScript, lacked usability, and needed performance work.',
        solution:
          'We migrated chat to Vue.js with real-time updates and efficient data fetching for smooth, responsive UX under load.',
      },
      {
        challenge:
          'Upgrading from Vue 2 to Vue 3 introduced new syntax, features, and optimizations to reconcile carefully.',
        solution:
          'We refactored components to the Composition API, updated directives and plugins for compatibility, and reduced bundle size for faster loads.',
      },
    ],
    features: [
      {
        title: 'Client management',
        description:
          'Keeps client info, progress, and communication in one place, so coaches can update details and message clients from a single view.',
      },
      {
        title: 'Program creation',
        description:
          'Lets coaches build custom plans matched to each client’s goals, ability, and fitness level.',
      },
      {
        title: 'Messaging & communication',
        description:
          'In-app messages, notifications, and updates keep coaches and clients connected and informed.',
      },
      {
        title: 'Communities',
        description:
          'Clients join interest-based groups, connect with peers, and share progress — driving ongoing engagement.',
      },
      {
        title: 'Progress tracking',
        description:
          'Data analytics, charts, and visualizations surface performance and achievements over time.',
      },
      {
        title: 'Calendar & scheduling',
        description:
          'An integrated calendar manages appointments, sessions, and events in one place.',
      },
    ],
    results: [
      'A more intuitive, enjoyable experience lifted engagement and satisfaction.',
      'Faster loads and smoother modules kept more users on the site.',
      'Improved usability attracted new users and expanded the user base.',
      'Positive changes strengthened reputation and brand perception.',
      'The Stripe Connect marketplace opened new revenue for coaches and the platform.',
      'Scalability and performance work positioned the platform for international expansion.',
    ],
    tech: [
      {
        category: 'Frontend',
        items: [
          { label: 'HTML5', slug: 'html5' },
          { label: 'CSS3', slug: 'css3' },
          { label: 'Tailwind UI', slug: 'tailwindcss' },
          { label: 'Vue 2 & 3', slug: 'vuedotjs' },
          { label: 'Vue Router', slug: 'vuedotjs' },
          { label: 'Vuex' },
        ],
      },
      { category: 'Backend', items: [{ label: 'Rails', slug: 'rubyonrails' }] },
      {
        category: 'Database',
        items: [
          { label: 'PostgreSQL', slug: 'postgresql' },
          { label: 'Redis', slug: 'redis' },
          { label: 'AWS RDS', slug: 'amazonaws' },
        ],
      },
      { category: 'Integrations', items: [{ label: 'Stripe', slug: 'stripe' }] },
      {
        category: 'Project management',
        items: [
          { label: 'Trello', slug: 'trello' },
          { label: 'Jira', slug: 'jira' },
        ],
      },
      { category: 'Hosting', items: [{ label: 'AWS', slug: 'amazonaws' }] },
    ],
  },
  {
    slug: 'atc',
    name: 'ATC — Air Traffic Controller',
    tagline:
      'An internal management tool for project handling and HR — a centralized hub for invoicing, email, messaging, and real-time updates via SignalR.',
    industry: 'Management & Services',
    platform: 'Web',
    durationHours: '2,800 hrs',
    members: '3',
    domain: 'Operations · CRM Systems',
    domainHref: '/what-we-build/crm',
    metric: 'Unified',
    metricLabel: 'HR, invoicing & real-time ops',
    clientRequirement:
      'The client needed their internal management tool restructured — simpler client modules over a cleaner database, automated service-rate and invoice handling, a modern DevExtreme UI, and SQL-optimized analytics for fast dashboards.',
    image: '/images/case-studies/atc.webp',
    challenges: [
      {
        challenge:
          'Intricate client-module configuration plus redundant database structures made the system hard to manage.',
        solution:
          'We introduced a V2 module structure, reduced database redundancy, and shipped a friendlier UI for simpler operations.',
      },
      {
        challenge:
          'Managing changes in service rates and keeping accurate rate history for predictive invoicing was difficult.',
        solution:
          'We used Hangfire jobs to auto-update per-user rates and added logging so admins can monitor rate changes over time.',
      },
      {
        challenge:
          'Transitioning from CoreUI to DevExtreme UI risked breaking functionality and aesthetics.',
        solution:
          'We analyzed DevExtreme, prioritized critical components, and migrated iteratively with testing — improving UX without losing functionality.',
      },
      {
        challenge:
          'LINQ-based analytics across many tables degraded performance and slowed page loads.',
        solution:
          'We restructured LINQ into optimized SQL and added caching to cut database load and speed up query execution.',
      },
    ],
    features: [
      {
        title: 'Email integration',
        description:
          'Connects Mailgun so users receive emails inside the dashboard, with detailed logs for opens, IPs, and click-through rates.',
      },
      {
        title: 'Client dashboard analytics',
        description:
          'Detailed invoice and feedback statistics help clients track finances and make informed decisions.',
      },
      {
        title: 'Document creation',
        description:
          'Zoho Writer integration for template design, PDF/Docx export, email merge, e-signing, and postal mail via SendGrid.',
      },
      {
        title: 'Resource management',
        description:
          'Assign and adjust hours by project and availability, track time per member, and reallocate to hit timelines.',
      },
      {
        title: 'Leaves management',
        description:
          'Handle leave requests from admins or employees, with analytics into leave trends and usage patterns.',
      },
      {
        title: 'Zoho Books integration',
        description:
          'Auto-syncs data with Zoho Books to track billable hours, oversee projects, and generate precise invoices.',
      },
    ],
    results: [
      'Streamlined module structure and optimized database improved system efficiency.',
      'Automated rate management and email integration smoothed overall workflow.',
      'A revamped UI and dashboard analytics gave a more intuitive, informative experience.',
      'Streamlined leave management reduced administrative burden for HR.',
      'Resource management improvements drove higher efficiency and productivity.',
      'Robust allocation, tracking, analytics, and financial insight lifted project performance.',
    ],
    tech: [
      {
        category: 'Frontend',
        items: [
          { label: 'HTML5', slug: 'html5' },
          { label: 'CSS3', slug: 'css3' },
          { label: 'Vue.js', slug: 'vuedotjs' },
          { label: 'CoreUI' },
          { label: 'DevExtreme UI' },
        ],
      },
      {
        category: 'Backend',
        items: [
          { label: 'ASP.NET Core', slug: 'dotnet' },
          { label: 'Docker', slug: 'docker' },
          { label: 'Hangfire' },
          { label: 'Entity Framework' },
        ],
      },
      {
        category: 'Database',
        items: [
          { label: 'PostgreSQL', slug: 'postgresql' },
          { label: 'Redis', slug: 'redis' },
        ],
      },
      { category: 'Version control', items: [{ label: 'Azure DevOps', slug: 'azuredevops' }] },
      {
        category: 'Integrations',
        items: [
          { label: 'Amazon S3', slug: 'amazonaws' },
          { label: 'Zoho', slug: 'zoho' },
        ],
      },
      {
        category: 'Project management',
        items: [{ label: 'Trello', slug: 'trello' }, { label: 'Microsoft Teams' }],
      },
    ],
  },
  {
    slug: 'buffyhub',
    name: 'BuffyHub',
    tagline:
      'A unified eCommerce platform that centralizes inventory, orders, brands, and vendors in one place to streamline operations for businesses and consumers.',
    industry: 'eCommerce',
    platform: 'Web App',
    durationHours: '3,344 hrs',
    members: '2',
    domain: 'eCommerce · Web Development',
    domainHref: '/what-we-build/web-apps',
    metric: 'Multi-channel',
    metricLabel: 'Amazon · eBay · Walmart synced',
    clientRequirement:
      'BuffyHub needed a unified eCommerce control plane — a scalable system for large volumes of inventory, orders, brands, and vendors, hardened security, seamless multi-marketplace integration, and performance optimization as traffic grew.',
    image: '/images/case-studies/buffyhub.webp',
    challenges: [
      {
        challenge:
          'The platform needed a powerful, scalable system to manage vast inventory, order, brand, and vendor data.',
        solution:
          'We used AWS services such as Amazon RDS and S3 to efficiently manage and store that data.',
      },
      {
        challenge:
          'Growing users and activity demanded infrastructure that could scale without downtime.',
        solution:
          'We used EC2 and Elastic Load Balancer to distribute traffic and scale compute, keeping the platform highly available.',
      },
      {
        challenge: 'Inadequate security risked the confidentiality and integrity of stored data.',
        solution:
          'We implemented encryption, authentication, and authorization so data stays confidential and inaccessible to unauthorized users.',
      },
      {
        challenge: 'No single solution could integrate all the different eCommerce applications.',
        solution:
          'We used APIs and webhooks to connect payment gateways, shipping providers, and inventory systems for seamless data exchange.',
      },
      {
        challenge: 'Slow loads and unresponsive features hurt the user experience.',
        solution:
          'We applied caching, minification, and lazy loading to significantly improve speed and satisfaction.',
      },
      {
        challenge:
          'Thorough testing was essential to guarantee functionality, usability, and security.',
        solution:
          'We used unit, integration, and acceptance testing to catch issues early and raise overall quality.',
      },
      {
        challenge: 'Evolving requirements demanded a platform that could adapt seamlessly.',
        solution:
          'We adopted agile methods (Scrum and Kanban) to keep the platform flexible as needs changed.',
      },
    ],
    features: [
      {
        title: 'Centralized management',
        description:
          'Manage all inventory, orders, brands, and vendors in one place to streamline eCommerce operations.',
      },
      {
        title: 'Security',
        description:
          'Encryption, authentication, and authorization safeguard the privacy of user data.',
      },
      {
        title: 'Scalability',
        description:
          'AWS EC2 and Elastic Load Balancer distribute traffic and keep the platform scalable as it grows.',
      },
      {
        title: 'Centralized inventory',
        description: 'A single system integrates inventory from various sources and locations.',
      },
      {
        title: 'Order management',
        description: 'A comprehensive system consolidates orders from all sales channels.',
      },
      {
        title: 'Third-party integrations',
        description:
          'Seamless integration with payment gateways, shipping carriers, and tax-compliance apps.',
      },
    ],
    results: [
      'Optimized backend processes delivered faster loads and better overall performance.',
      'Robust encryption, authentication, and authorization safeguarded user data.',
      'AWS services and load balancing let the platform handle more traffic and scale effectively.',
      'Seamless third-party integrations enhanced functionality and user experience.',
      'Usability, navigation, and visual design improvements made the platform more intuitive.',
      'APIs and webhooks enabled seamless data exchange across eCommerce applications.',
    ],
    tech: [
      {
        category: 'Frontend',
        items: [
          { label: 'HTML5', slug: 'html5' },
          { label: 'CSS3', slug: 'css3' },
          { label: 'Bootstrap', slug: 'bootstrap' },
          { label: 'Vanilla JS', slug: 'javascript' },
          { label: 'ERB Template' },
        ],
      },
      { category: 'Backend', items: [{ label: 'Ruby on Rails', slug: 'rubyonrails' }] },
      { category: 'Database', items: [{ label: 'PostgreSQL', slug: 'postgresql' }] },
      {
        category: 'DevOps',
        items: [{ label: 'GitHub', slug: 'github' }, { label: 'Capistrano' }],
      },
      { category: 'Server', items: [{ label: 'AWS', slug: 'amazonaws' }] },
      {
        category: 'Integrations',
        items: [
          { label: 'Amazon', slug: 'amazon' },
          { label: 'eBay', slug: 'ebay' },
          { label: 'Walmart', slug: 'walmart' },
          { label: 'Shippo' },
        ],
      },
    ],
  },
  {
    slug: 'cercle',
    name: 'Cercle',
    tagline:
      'A fashion rental platform that lets users rent clothing, shoes, and accessories from lenders — promoting borrow-over-buy sustainability at a fraction of retail cost.',
    industry: 'Fashion · eCommerce',
    platform: 'Web',
    durationHours: '2,112 hrs',
    members: '2',
    domain: 'eCommerce · Web Development',
    domainHref: '/what-we-build/web-apps',
    metric: '60%',
    metricLabel: 'Fewer manual workflows',
    clientRequirement:
      'Cercle.uk needed a high-end sustainable fashion rental marketplace — lenders listing luxury items for income, renters accessing those items at lower cost, with reliable payments, returns, clothing renewal, and multi-channel sales.',
    image: '/images/case-studies/cercle.webp',
    challenges: [
      {
        challenge:
          'Slow loads frustrated users, raised bounce rates, and cut engagement and sales.',
        solution:
          'We optimized product data handling and image caching, and moved heavy work to Sidekiq so the UI stays responsive.',
      },
      {
        challenge:
          'Without store credits in the payment module, customers were stuck with cash, cards, or transfers — less flexible checkout and weaker loyalty after refunds.',
        solution:
          'We built a wallet / store-credits flow for refunds and cancellations, with encryption, secure tokenization, and regular security reviews.',
      },
      {
        challenge:
          'Expanding reach meant users expected seamless shopping on social channels as well as the site.',
        solution:
          'We integrated Facebook e-commerce APIs so catalogues, inventory, and orders stay in sync between the site and Facebook.',
      },
      {
        challenge:
          'Renewing worn rental clothes for resale needed a reliable partner for cleaning, repair, and logistics.',
        solution:
          'We connected Advanced Clothing Solutions (ACS) so used items ship from the renter, get renewed, and return to inventory.',
      },
      {
        challenge:
          'Bugs left delivery and payment statuses wrong, causing mismanagement between business and users.',
        solution:
          'We fixed Solidus admin configuration and status code paths so delivery and payment states stay accurate.',
      },
      {
        challenge: 'Tight deadlines risked delayed launches and quality cuts.',
        solution:
          'We ran agile sprints with smaller iterations and regular checkpoints to protect quality and ship on time.',
      },
    ],
    features: [
      {
        title: 'Advanced search & filters',
        description:
          'Powerful search with filters, caching, and indexing so renters find the right item quickly.',
      },
      {
        title: 'Rental reminders',
        description:
          'Push notifications near rental end so customers return items and route them through ACS renewal.',
      },
      {
        title: 'Admin operations (Solidus)',
        description:
          'Admin tools for listings, users, cancel/refund policies, taxation, and shipping.',
      },
      {
        title: 'ACS integration',
        description:
          'Clothing renewal pipeline with Advanced Clothing Solutions after each rental cycle.',
      },
      {
        title: 'Order management',
        description: 'One system consolidating orders across sales channels.',
      },
      {
        title: 'Location-based delivery charges',
        description:
          'Checkout calculates delivery from address and basket size, with postal-code and city suggestions as the user types.',
      },
    ],
    results: [
      'Faster performance cut bounce rates and supported higher sales.',
      'Ordering and returning used products became a smoother, lower-friction flow.',
      'Better filtering helped users match preferences and decide faster.',
      'Admin tools for discount codes and promotions made campaign ops more efficient.',
      'Stripe plus store credits improved refund UX and kept spend on-platform.',
    ],
    tech: [
      {
        category: 'Frontend',
        items: [
          { label: 'HTML5', slug: 'html5' },
          { label: 'React', slug: 'react' },
          { label: 'Next.js', slug: 'nextdotjs' },
          { label: 'Emotion Styled Components' },
        ],
      },
      {
        category: 'Backend',
        items: [{ label: 'Ruby on Rails', slug: 'rubyonrails' }, { label: 'Sidekiq' }],
      },
      {
        category: 'Database',
        items: [
          { label: 'PostgreSQL', slug: 'postgresql' },
          { label: 'Redis', slug: 'redis' },
        ],
      },
      {
        category: 'Hosting',
        items: [{ label: 'Heroku', slug: 'heroku' }],
      },
      {
        category: 'Version control',
        items: [{ label: 'GitHub', slug: 'github' }],
      },
      {
        category: 'Integrations',
        items: [
          { label: 'Stripe', slug: 'stripe' },
          { label: 'SendGrid', slug: 'sendgrid' },
          { label: 'Trello', slug: 'trello' },
        ],
      },
    ],
  },
  {
    slug: 'klingit',
    name: 'Klingit',
    tagline:
      'A tech-powered creative services platform that helps brands scale marketing with a global pool of creatives — DesignOps, deliverables, and transparent collaboration in one place.',
    industry: 'Creative · DesignOps',
    platform: 'Web',
    durationHours: '1,400 hrs',
    members: '2',
    domain: 'CRM · Marketplace',
    domainHref: '/what-we-build/crm',
    metric: '40+',
    metricLabel: 'Global creatives synced',
    clientRequirement:
      'Klingit needed a DesignOps platform for clients, designers, managers, and admins — clear communication, project state tracking, automated onboarding, remote collaboration, and secure handling of brand assets across 40+ creatives.',
    image: '/images/case-studies/klingit.webp',
    challenges: [
      {
        challenge:
          'Communication gaps between clients, designers, managers, and admins delayed projects and created frustration.',
        solution:
          'We built a centralized communication hub with real-time updates, one-to-one messaging, and clear assignment tracking.',
      },
      {
        challenge:
          'Legacy project tools were clunky and manual, making progress hard to see and deadlines easy to miss.',
        solution:
          'We shipped project-state tracking, automated workflows, and progress visualization for clearer planning and allocation.',
      },
      {
        challenge:
          'Onboarding new clients on complex, multi-stakeholder work was slow and expectation-heavy.',
        solution:
          'We automated onboarding with instructions, plan templates, and immediate access to the right channels.',
      },
      {
        challenge:
          'Remote teams struggled with time zones, communication barriers, and fragmented workflows.',
        solution:
          'We standardized real-time collaboration tools and recurring virtual syncs so the team stays aligned.',
      },
      {
        challenge: 'Client data and assets needed stronger protection against growing cyber risk.',
        solution:
          'We added encryption, access controls, regular updates, and team training on data-protection practices.',
      },
      {
        challenge: 'Mid-project feature requests caused scope creep past budget and timeline.',
        solution:
          'We introduced a change-management process with documentation and scope/budget renegotiation when needed.',
      },
    ],
    features: [
      {
        title: 'Global talent pool',
        description: 'Access to 40+ creatives, developers, and managers matched to project needs.',
      },
      {
        title: 'Seamless collaboration',
        description:
          'Transparent DesignOps workflows for communication, feedback, and progress tracking.',
      },
      {
        title: 'Multifaceted services',
        description:
          'Social graphics, presentations, video, websites, and apps under one delivery model.',
      },
      {
        title: 'Clear proposals',
        description:
          'Proposals that set out scope, deliverables and milestones before work starts.',
      },
      {
        title: 'Scalable services',
        description: 'Engagements that grow with aspiring brands and expanding companies.',
      },
      {
        title: 'Brand alignment',
        description: 'Customization that keeps deliverables on-brand with client guidelines.',
      },
    ],
    results: [
      'Communication and collaboration improved across clients, designers, and admins.',
      'A shared dashboard cut misalignment and sped day-to-day teamwork.',
      'Uploads, payments, and brand management streamlined delivery workflows.',
      'Clear project states and assignment tracking improved workload visibility.',
      'Self-serve progress views raised client satisfaction and retention.',
    ],
    tech: [
      {
        category: 'Frontend',
        items: [{ label: 'Vue 2 & 3', slug: 'vuedotjs' }, { label: 'Vuetify' }],
      },
      { category: 'Backend', items: [{ label: 'Ruby on Rails', slug: 'rubyonrails' }] },
      {
        category: 'Database',
        items: [
          { label: 'PostgreSQL', slug: 'postgresql' },
          { label: 'Redis', slug: 'redis' },
        ],
      },
      {
        category: 'Hosting',
        items: [
          { label: 'AWS EC2', slug: 'amazonaws' },
          { label: 'Puma' },
          { label: 'Nginx', slug: 'nginx' },
        ],
      },
      {
        category: 'DevOps',
        items: [
          { label: 'GitHub', slug: 'github' },
          { label: 'Git', slug: 'git' },
        ],
      },
      {
        category: 'Integrations',
        items: [
          { label: 'Stripe', slug: 'stripe' },
          { label: 'Slack', slug: 'slack' },
          { label: 'Trello', slug: 'trello' },
        ],
      },
    ],
  },
  {
    slug: 'nextflag',
    name: 'Nextflag',
    tagline:
      'A social mobile app for creating and sharing personalized location flags — discover places, follow people, and plan trips from real recommendations.',
    industry: 'Social · Mobile',
    platform: 'Mobile App',
    durationHours: '1,602 hrs',
    members: '2',
    domain: 'Mobile Apps',
    domainHref: '/what-we-build/mobile-apps',
    metric: 'Map-first',
    metricLabel: 'Flags · follow · wishlist',
    clientRequirement:
      'Nextflag needed a polished React Native experience — stable onboarding, geolocated flags on a map, search by city, social follow, wishlist, and smoother post-upload flows without crashes.',
    image: '/images/case-studies/nextflag.webp',
    challenges: [
      {
        challenge:
          'Performance lagged; React Native and related packages needed upgrades alongside native pods.',
        solution:
          'We upgraded React Native, packages, and pods and tuned the app for smoother runtime performance.',
      },
      {
        challenge: 'Post-upload UI was outdated and buggy, often crashing the app.',
        solution:
          'We rewrote the post-upload flow, cleaned inefficient code, and reused idle assets in the new path.',
      },
      {
        challenge:
          'Users could not reliably find flagged locations — the core product promise broke.',
        solution:
          'We added a dedicated map screen with geolocation markers and filters by flag type.',
      },
      {
        challenge: 'A static splash screen slowed startup and wasted asset budget.',
        solution: 'We replaced it with an animated splash that cut load time and storage size.',
      },
      {
        challenge: 'Weak search made it hard to find flags or wishlist items in a region.',
        solution:
          'We shipped an advanced search screen using geolocation data to surface places by city.',
      },
      {
        challenge: 'Onboarding bugs dropped sessions and lost progress mid-flow.',
        solution: 'We hardened the backend, saved progress per step, and added session resume.',
      },
    ],
    features: [
      {
        title: 'Wishlist',
        description:
          'Save favorite locations with notes for trip planning using location services.',
      },
      {
        title: 'Follow users’ flags',
        description: 'Follow other users and see their flags and recommendations as they post.',
      },
      {
        title: 'Flags based on location',
        description: 'Map view of flag density by region to discover popular destinations.',
      },
      {
        title: 'User suggestions',
        description: 'Follow recommendations based on content relevancy and overlapping flags.',
      },
      {
        title: 'Social login',
        description: 'Sign in with Google or Apple for faster, personalized access.',
      },
    ],
    results: [
      'App performance and stability improved after the React Native upgrade path.',
      'Map and search made flagged places discoverable again.',
      'Onboarding completion rose with step saves and session resume.',
      'Social follow and wishlist deepened engagement around real recommendations.',
    ],
    tech: [
      {
        category: 'Frontend',
        items: [
          { label: 'HTML5', slug: 'html5' },
          { label: 'CSS3', slug: 'css3' },
          { label: 'React Native', slug: 'reactnative' },
          { label: 'UI Kitten' },
          { label: 'Redux' },
        ],
      },
      {
        category: 'Backend',
        items: [
          { label: 'Ruby on Rails', slug: 'rubyonrails' },
          { label: 'GraphQL', slug: 'graphql' },
        ],
      },
      { category: 'Database', items: [{ label: 'PostgreSQL', slug: 'postgresql' }] },
      {
        category: 'Hosting',
        items: [{ label: 'Heroku', slug: 'heroku' }],
      },
      {
        category: 'Version control',
        items: [{ label: 'GitHub', slug: 'github' }],
      },
      {
        category: 'Project management',
        items: [{ label: 'Trello', slug: 'trello' }],
      },
    ],
  },
  {
    slug: 'truck-4',
    name: 'Truck-4',
    tagline:
      'A commercial vehicle rental marketplace — find, lease, or purchase trucks, tractors, and trailers with secure auth, uploads, and microservices scale.',
    industry: 'Logistics · Fleet rentals',
    platform: 'Web',
    durationHours: '1,232 hrs',
    members: '3',
    domain: 'Transport & Logistics',
    domainHref: '/what-we-build/cloud',
    metric: 'K8s',
    metricLabel: 'Absorbs traffic spikes',
    clientRequirement:
      'Truck-4 needed a microservices marketplace for commercial rentals — OTP auth, truck management, secure file uploads, third-party maps/email, compliance tooling, and Kubernetes-ready scale.',
    image: '/images/case-studies/truck-4.webp',
    challenges: [
      {
        challenge:
          'Dependent microservices needed reliable communication without tanking response times.',
        solution: 'We used REST APIs plus async messaging with RabbitMQ between services.',
      },
      {
        challenge: 'Uploaded files risked malware that could crash servers or corrupt data.',
        solution: 'We scan uploads in real time with ClamAV before they are accepted.',
      },
      {
        challenge: 'The platform had to scale services and data as demand grew.',
        solution: 'We ran services on Kubernetes for independent deploy and demand-based scaling.',
      },
      {
        challenge: 'Auth had to stay fast and trustworthy when upstream pieces failed.',
        solution:
          'We added fallbacks and monitoring so verification stays available during disruptions.',
      },
      {
        challenge: 'Integration testing across many services needed early failure detection.',
        solution:
          'We used SonarQube and Azure DevOps CI pipelines to catch issues across the lifecycle.',
      },
      {
        challenge: 'Deploying many services onto Kubernetes clusters was operationally heavy.',
        solution: 'We automated deploys with Azure DevOps and Helm charts for repeatable releases.',
      },
      {
        challenge: 'Latency and uneven performance missed response-rate targets.',
        solution: 'We added caching, query optimization, and profiling to remove bottlenecks.',
      },
      {
        challenge: 'Keeping data consistent across services was complex under load.',
        solution:
          'We used eventual consistency patterns and distributed transactions where needed.',
      },
    ],
    features: [
      {
        title: 'Microservices architecture',
        description:
          'Independently deployable services for auth, trucks, uploads, and related domains.',
      },
      {
        title: 'Authentication with Twilio',
        description: 'OTP verification and access control via Twilio for trusted sign-in.',
      },
      {
        title: 'File scanning with ClamAV',
        description: 'Malware scanning on uploads before they hit storage or processing.',
      },
      {
        title: 'Third-party integrations',
        description: 'Google Maps for location/routes and SendGrid for transactional email.',
      },
      {
        title: 'Regulatory compliance management',
        description:
          'Tracking for driver qualifications and vehicle inspections with automated alerts.',
      },
    ],
    results: [
      'Code, security, and process work improved overall platform performance.',
      'Lower latency and higher reliability improved day-to-day user experience.',
      'Auth, service isolation, and ClamAV scanning strengthened the security posture.',
      'Automated deploy and Kubernetes scaling cut ops cost and raised throughput.',
      'Better UX and trust supported stronger retention in the rental marketplace.',
    ],
    tech: [
      {
        category: 'Frontend',
        items: [{ label: 'React', slug: 'react' }],
      },
      {
        category: 'Backend',
        items: [{ label: 'Node.js', slug: 'nodedotjs' }, { label: 'Express.js' }],
      },
      { category: 'Database', items: [{ label: 'MongoDB', slug: 'mongodb' }] },
      {
        category: 'Queue & orchestration',
        items: [
          { label: 'Docker', slug: 'docker' },
          { label: 'Kubernetes', slug: 'kubernetes' },
        ],
      },
      {
        category: 'Security',
        items: [{ label: 'ClamAV' }, { label: 'SonarQube' }],
      },
      {
        category: 'Authentication',
        items: [{ label: 'Twilio', slug: 'twilio' }],
      },
      {
        category: 'Integrations',
        items: [
          { label: 'Google Maps', slug: 'googlemaps' },
          { label: 'SendGrid', slug: 'sendgrid' },
          { label: 'Azure DevOps', slug: 'azuredevops' },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudyDetail | undefined {
  return CASE_STUDIES_DETAILS.find((study) => study.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return CASE_STUDIES_DETAILS.map((study) => study.slug);
}
