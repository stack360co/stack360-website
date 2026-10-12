/**
 * Featured projects portfolio — sourced from content-documents/Portfolio.md.
 * Projects are grouped by domain category; each group maps to a
 * /what-we-build capability so the two archives cross-link.
 */

export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface PortfolioProject {
  slug: string;
  name: string;
  industry: string;
  duration: string;
  requirement: string;
  challenges: ChallengeSolution[];
  features: string[];
  result: string;
  stack: string[];
  metric: string;
  metricLabel: string;
}

export interface PortfolioGroup {
  id: string;
  category: string;
  /** Capability-domain label, e.g. "Web Development", "AI / ML". */
  domain: string;
  blurb: string;
  capability: { label: string; href: string };
  projects: PortfolioProject[];
}

export const FEATURED_PROJECTS_HERO = {
  eyebrow: 'Our Work · Featured Projects',
  title: 'Systems we shipped,',
  highlight: 'grouped by domain.',
  description:
    'Every engagement below is a production system with real constraints, real trade-offs, and real outcomes — organized by the domain we architected it for, from eCommerce and marketplaces to AI, compliance, and logistics.',
} as const;

export const PORTFOLIO_GROUPS: PortfolioGroup[] = [
  {
    id: 'ai',
    category: 'AI',
    domain: 'AI / ML',
    blurb:
      'Retrieval-grounded assistants and analytics engines that turn specialized, fast-moving data into trustworthy answers.',
    capability: { label: 'AI Solutions', href: '/what-we-build/ai-solutions' },
    projects: [
      {
        slug: 'moneyball',
        name: 'Money Ball',
        industry: 'AI Analytics Chatbot',
        duration: '3 months',
        requirement:
          'An AI-driven NFL statistical query engine letting fans and analysts fetch real-time player and team metrics conversationally.',
        challenges: [
          {
            challenge:
              'General LLMs frequently hallucinate on specialized, rapidly updating sports stats.',
            solution:
              'Engineered a custom Retrieval-Augmented Generation (RAG) framework forcing the LLM to query live sports databases before responding.',
          },
        ],
        features: [
          'Interactive RAG conversational chatbot interface.',
          'Real-time NFL team performance analysis engine.',
          'Dockerized microservices for fast analytics ingestion.',
        ],
        result:
          'Created an immersive sports-data tool providing immediate, verified football analytics in a friendly chat frame.',
        stack: ['nodedotjs', 'django', 'postgresql', 'redis', 'docker'],
        metric: 'RAG',
        metricLabel: 'Answers from live data',
      },
    ],
  },
  {
    id: 'compliance',
    category: 'Compliance & GDPR',
    domain: 'Automation',
    blurb:
      'Audit-ready systems that automate rule checks, certification tracking, and reporting so organizations stay continuously compliant.',
    capability: { label: 'Automation', href: '/what-we-build/automation' },
    projects: [
      {
        slug: 'fisar',
        name: 'Fisar',
        industry: 'GDPR Compliance Management',
        duration: '12 months',
        requirement:
          'A specialized tool for school Data Protection Officers to track and execute sensitive Subject Access Requests (SARs).',
        challenges: [
          {
            challenge:
              'Pulling disparate, sensitive student info securely from school MSI networks without exposing unauthorized files.',
            solution:
              'Developed strict, heavily audited query pipelines hooked into MSI APIs with precise field masking.',
          },
        ],
        features: [
          'Automated regulatory SAR reporting engine.',
          'Role-based compliance accountability dashboard.',
          'Secure student-records extraction portal.',
        ],
        result:
          'Clear accountability for sensitive data handling, keeping educational clients aligned with European GDPR rules.',
        stack: ['nodedotjs', 'django', 'postgresql', 'redis', 'docker', 'amazonaws'],
        metric: 'SAR',
        metricLabel: 'Audited data pipelines',
      },
      {
        slug: 'falcore',
        name: 'Falcore',
        industry: 'Compliance Management',
        duration: '6 months',
        requirement:
          'A unified corporate compliance environment centralizing documentation, automating safety checks, and tracking standings.',
        challenges: [
          {
            challenge:
              'Keeping large organizations prepared for unexpected manual financial or safety audit collections.',
            solution:
              'Created a background validation engine that flags outdated records, logs audit histories, and alerts teams immediately.',
          },
        ],
        features: [
          'Automated corporate rule-check scheduling.',
          'Immutable, chronologically tracked audit log.',
          'Global regulatory alerts powered by Celery.',
        ],
        result:
          'Eliminated manual compliance gaps, keeping corporate entities structurally organized and constantly audit-ready.',
        stack: ['nodedotjs', 'django', 'postgresql', 'redis', 'docker'],
        metric: 'Audit-ready',
        metricLabel: 'Automated rule checks',
      },
      {
        slug: 'alertia',
        name: 'Alertia',
        industry: 'Workforce Compliance & Security',
        duration: '4 months',
        requirement:
          'An operational tool to maintain safety-certification files, schedule shifts, and track active guard patrols live.',
        challenges: [
          {
            challenge:
              'Guards working shifts with expired physical licenses expose firms to major regulatory fines.',
            solution:
              'Deployed a continuous scanning algorithm cross-checking work assignments against document expiration lists.',
          },
        ],
        features: [
          'Real-time guard shift scheduling layout.',
          'Document validation with automated renewal alerts.',
          'Live operational visibility map dashboard.',
        ],
        result:
          'Secured operational visibility, cutting credential-check oversight issues for defense and security companies.',
        stack: ['nextdotjs', 'django', 'postgresql', 'celery', 'amazonaws'],
        metric: 'Live',
        metricLabel: 'Guard patrol tracking',
      },
      {
        slug: 'nptass',
        name: 'NPTASS',
        industry: 'Automated Auditing & Compliance',
        duration: '6 months',
        requirement:
          'Automate the entire client-review lifecycle — auditor scheduling, compliance-point logging, and final report generation.',
        challenges: [
          {
            challenge:
              'Human calculation errors during complex manual audit scoring often skew reports.',
            solution:
              'Structured a standardized Node.js evaluation engine that auto-generates reports with zero calculation deviation.',
          },
        ],
        features: [
          'Comprehensive corporate audit-scoring panel.',
          'Secure, role-based user access controls.',
          'Dual-database architecture — PostgreSQL & MongoDB via Prisma.',
        ],
        result:
          'Shortened multi-week review lifecycles to days while maintaining airtight data precision across divisions.',
        stack: ['nextdotjs', 'nodedotjs', 'postgresql', 'mongodb', 'prisma', 'redis'],
        metric: 'Days',
        metricLabel: 'Down from weeks',
      },
    ],
  },
  {
    id: 'healthcare',
    category: 'Healthcare',
    domain: 'Custom Software',
    blurb:
      'HIPAA-aware clinical, pediatric, and consumer-health products where privacy and reliability are non-negotiable.',
    capability: { label: 'Custom Software', href: '/what-we-build/custom-software' },
    projects: [
      {
        slug: 'nuvana',
        name: 'Nuvana',
        industry: 'Chronic Care Healthcare Management',
        duration: '8 months',
        requirement:
          'A medical-provider portal to organize chronic-care tracking, automate monthly Medicare billing, and manage patient interactions.',
        challenges: [
          {
            challenge:
              'Adhering to hyper-strict HIPAA patient-privacy rules during data transactions.',
            solution:
              'Applied end-to-end token validation with JWT combined with encrypted storage parameters within AWS instances.',
          },
        ],
        features: [
          'Continuous patient interaction tracking grid.',
          'Automated medical billing generation framework.',
          'Real-time clinical metrics reporting dashboards.',
        ],
        result:
          'Boosted processing speed for clinic staff while lowering billing errors and preserving vital patient-care metrics.',
        stack: ['vuedotjs', 'dotnet', 'postgresql', 'redis', 'docker'],
        metric: 'HIPAA',
        metricLabel: 'Chronic-care billing',
      },
      {
        slug: 'slumber-sprout',
        name: 'Slumber & Sprout',
        industry: 'Pediatric Healthcare App',
        duration: '4 months',
        requirement:
          'A native iOS app giving parents custom child sleep-tracking logs, tailored routines, and sleep-training tools.',
        challenges: [
          {
            challenge:
              'Coordinating immediate mobile sleep-notification prompts when schedules change.',
            solution:
              'Built optimized background workers using Sidekiq and Redis on a Rails backend to push calculations smoothly.',
          },
        ],
        features: [
          'Personalized infant sleep-routine generation.',
          'Native iOS trackers in Swift and Objective-C.',
          'Dynamic parental-guidance reference library.',
        ],
        result:
          'Helped parents establish healthy infant sleep milestones through an accessible, highly reactive mobile environment.',
        stack: ['rubyonrails', 'swift', 'postgresql', 'redis'],
        metric: 'iOS',
        metricLabel: 'Native sleep tracking',
      },
      {
        slug: 'microhealth',
        name: 'Microhealth',
        industry: 'Consumer Healthcare Transparency',
        duration: '12 months',
        requirement:
          'A transparent web app supplying patients with understandable healthcare price quotes and wellness tools.',
        challenges: [
          {
            challenge:
              'Making complex, confusing medical insurance deductible data understandable for the average person.',
            solution:
              'Modeled an intuitive Vue frontend distilling complex pricing metrics into clear, step-by-step graphical tables.',
          },
        ],
        features: [
          'Interactive cost-transparency calculation matrix.',
          'Patient health and wellness tracking repository.',
          'High-availability hosting on AWS EC2.',
        ],
        result:
          'Demystified medical costs, giving consumers accurate tools to actively lower treatment expenses.',
        stack: ['vuedotjs', 'rubyonrails', 'mysql', 'amazonaws'],
        metric: 'Clear',
        metricLabel: 'Medical price transparency',
      },
    ],
  },
  {
    id: 'saas',
    category: 'SaaS',
    domain: 'SaaS Platforms',
    blurb:
      'Multi-tenant products with durable billing, scheduling, and streaming architecture built to grow without a yearly rewrite.',
    capability: { label: 'SaaS', href: '/what-we-build/saas' },
    projects: [
      {
        slug: 'whistle',
        name: 'Whistle It',
        industry: 'SaaS Virtual Meetings',
        duration: '8 months',
        requirement:
          'An ultra-secure team collaboration and video conferencing platform as an alternative to Zoom and Google Meet.',
        challenges: [
          {
            challenge:
              'Minimizing server cost while supporting high-bandwidth audio/video streams for concurrent meetings.',
            solution:
              'Deployed a distributed serverless paradigm on top of the open-source BigBlueButton conferencing engine.',
          },
        ],
        features: [
          'HD real-time video/audio room routing.',
          'GraphQL data streaming for low-overhead UI.',
          'Persistent secure corporate text-chat.',
        ],
        result:
          'Delivered an enterprise collaboration app that lets remote teams meet securely with lower infrastructure overhead.',
        stack: ['vuedotjs', 'graphql', 'firebase', 'googlecloud'],
        metric: 'HD',
        metricLabel: 'Serverless meeting rooms',
      },
      {
        slug: 'one40connect',
        name: 'One40Connect',
        industry: 'SaaS Business Communication',
        duration: '24 months',
        requirement:
          'An enterprise business-texting SaaS for direct, scheduled, delayed, and mass promotional text alerts.',
        challenges: [
          {
            challenge:
              'Large queue bottlenecks when executing promotional SMS campaigns of millions of rows concurrently.',
            solution:
              'Implemented the Hangfire scheduling engine inside .NET Core to parse time-delayed broadcast batches over Azure.',
          },
        ],
        features: [
          'Flexible message scheduling grid — Instant, Delayed, Recurring.',
          'Live SMS conversation tracking via SignalR.',
          'Deep carrier integration with the Skyetel API.',
        ],
        result:
          'Elevated commercial communication, boasting ultra-high text-delivery rates for marketing networks.',
        stack: ['angular', 'dotnet', 'mysql', 'microsoftazure'],
        metric: 'Millions',
        metricLabel: 'SMS rows per campaign',
      },
      {
        slug: 'natif',
        name: 'Natif.ai',
        industry: 'SaaS Document Automation',
        duration: '8 months',
        requirement:
          'An intelligent document-processing backend automating parsing via OCR, HTR, preprocessing, and field extraction.',
        challenges: [
          {
            challenge:
              'Parsing low-quality photos or handwritten notes accurately without systematic processing timeouts.',
            solution:
              'Optimized Django workers to queue incoming files into isolation zones for text refinement and extraction.',
          },
        ],
        features: [
          'Advanced ICR/HTR and OCR pipelines.',
          'Document structure classification engine.',
          'Interactive API playground documented with Swagger.',
        ],
        result:
          'Minimized manual documentation workflows, saving users hundreds of data-entry hours.',
        stack: ['vuedotjs', 'django', 'postgresql', 'amazonaws'],
        metric: 'OCR+HTR',
        metricLabel: 'Automated extraction',
      },
      {
        slug: 'legal-atoms',
        name: 'Legal Atoms',
        industry: 'SaaS Legal-Tech',
        duration: '4 months',
        requirement:
          'A simplified citizen application to prepare and electronically file structured court cases — restraining orders, civil and family disputes.',
        challenges: [
          {
            challenge:
              'Guiding non-legal users through intimidating, strict government paperwork formats accurately.',
            solution:
              'Built a conditional step-by-step interview UI that formats plain-text answers into exact court-ready schemas.',
          },
        ],
        features: [
          'Guided court-document e-filing questionnaires.',
          'Asynchronous document generation via Sidekiq.',
          'Automated court updates delivered via SendGrid.',
        ],
        result:
          'Democratized access to standard legal representation, letting users confidently complete complex case setup securely.',
        stack: ['angular', 'rubyonrails', 'redis', 'stripe', 'amazonaws'],
        metric: 'Court-ready',
        metricLabel: 'Guided e-filing',
      },
      {
        slug: 'aiode',
        name: 'Aiode',
        industry: 'SaaS AI Music',
        duration: '5 months',
        requirement:
          'A web platform letting producers and artists compose music using AI-generated virtual musicians.',
        challenges: [
          {
            challenge:
              'Synchronizing interactive audio-player tracks with AI-engine generation prompts fluidly over the web.',
            solution:
              'Selected Next.js for client-side speed alongside Firebase to feed real-time structural audio asset paths.',
          },
        ],
        features: [
          'Virtual AI-musician composer control board.',
          'Dynamic, interactive multi-track playback.',
          'Seamless cloud audio exporting.',
        ],
        result:
          'Opened a collaborative audio environment for creators to write original compositions with machine-learning assistance.',
        stack: ['nextdotjs', 'firebase', 'amazonaws'],
        metric: 'AI',
        metricLabel: 'Virtual musicians',
      },
    ],
  },
  {
    id: 'logistics',
    category: 'Transport & Logistics',
    domain: 'Cloud & DevOps',
    blurb:
      'Marketplace and fleet platforms engineered on microservices to absorb enterprise traffic spikes without slowdowns.',
    capability: { label: 'Cloud', href: '/what-we-build/cloud' },
    projects: [
      {
        slug: 'truck-4',
        name: 'Truck-4',
        industry: 'Commercial Fleet Rentals & Logistics',
        duration: '7 months',
        requirement:
          'A secure commercial rental marketplace to find, lease, or purchase freight trucks, tractors, and trailers locally.',
        challenges: [
          {
            challenge:
              'Handling massive enterprise traffic spikes and multi-step vehicle paperwork validation without slowdowns.',
            solution:
              'Designed a microservices network using Kubernetes and RabbitMQ to balance high workloads across processing lines.',
          },
        ],
        features: [
          'Geographic truck search by City, State, or Zip.',
          'Instant phone verification via Twilio OTP.',
          'Anti-malware document uploads protected via ClamAV.',
        ],
        result:
          'Scaled a robust commercial marketplace matching rental fleets with shipping logistics networks efficiently.',
        stack: ['react', 'nodedotjs', 'mongodb', 'rabbitmq', 'kubernetes', 'microsoftazure'],
        metric: 'K8s',
        metricLabel: 'Absorbs traffic spikes',
      },
    ],
  },
  {
    id: 'ecommerce',
    category: 'eCommerce',
    domain: 'Web Development',
    blurb:
      'Storefronts and commerce control planes engineered for search speed, inventory accuracy, and checkout reliability at scale.',
    capability: { label: 'Web Development', href: '/what-we-build/web-apps' },
    projects: [
      {
        slug: 'cashkart',
        name: 'CashKart',
        industry: 'eCommerce',
        duration: '12 months',
        requirement:
          'An innovative platform to streamline selling mobile devices online, connecting everyday sellers directly with a trusted network of verified agents.',
        challenges: [
          {
            challenge:
              'Establishing trust and transaction safety between unknown sellers and agents.',
            solution:
              'Implemented a strict agent verification framework and a secure system for transparent, quick transactions.',
          },
        ],
        features: [
          'Instant mobile model search bar.',
          'Direct pipeline to a network of verified buying agents.',
          'Fully responsive UI built for mobile web browsing.',
        ],
        result:
          'Launched a secure, streamlined marketplace that removes traditional friction from selling secondhand electronics, ensuring instant cash-outs for sellers.',
        stack: ['vuedotjs', 'tailwindcss', 'rubyonrails', 'postgresql', 'amazonaws'],
        metric: 'Instant',
        metricLabel: 'Verified-agent cash-outs',
      },
      {
        slug: 'cinekit',
        name: 'Cinekit',
        industry: 'eCommerce',
        duration: '1 month',
        requirement:
          'A peer-to-peer camera and production equipment rental platform for creators across the UK, Europe, and the US.',
        challenges: [
          {
            challenge:
              'Highly dynamic booking dates and secure handling of expensive gear within a tight one-month timeline.',
            solution:
              'Used Ruby on Rails for swift backend delivery and Stripe to reliably manage security deposits and multi-regional transactions.',
          },
        ],
        features: [
          'Categorized asset listing engine — “Book. Shoot. Return.”',
          'Lender portal for listing kits and tracking rental income.',
          'Geographic and category search parameters.',
        ],
        result:
          'Scaled to over 100,000 active global users, unlocking an efficient rental marketplace for creative gear.',
        stack: ['rubyonrails', 'mysql', 'stripe', 'googlecloud'],
        metric: '100K+',
        metricLabel: 'Active global renters',
      },
      {
        slug: 'autobuffy',
        name: 'AutoBuffy',
        industry: 'eCommerce',
        duration: '20 months',
        requirement:
          'A user-friendly platform that simplifies locating and buying auto parts online across a massive catalog.',
        challenges: [
          {
            challenge:
              'Parsing massive databases of auto-part SKUs matching exact car years, makes, and models swiftly.',
            solution:
              'Integrated Elasticsearch for high-speed, accurate part searches paired with Redis caching to dramatically lower latency.',
          },
        ],
        features: [
          'Advanced auto-part filtering database.',
          'Real-time shipping and tracking via FedEx.',
          'Automated internal team loops using Slack.',
        ],
        result:
          'Delivered an enterprise-grade automotive eCommerce system with high conversion rates from simplified catalog browsing.',
        stack: ['rubyonrails', 'angular', 'elasticsearch', 'redis', 'amazonaws'],
        metric: '2×',
        metricLabel: 'Search speed & traffic',
      },
      {
        slug: 'cercle',
        name: 'Cercle',
        industry: 'eCommerce',
        duration: '12 months',
        requirement:
          'A high-end sustainable fashion rental marketplace letting users lend and rent luxury clothing, shoes, and accessories.',
        challenges: [
          {
            challenge:
              'Heavy background jobs for availability tracking, rental returns, and automated overdue reminders.',
            solution:
              'Deployed Sidekiq and Redis on a Ruby on Rails backend to handle critical asynchronous scheduling effectively.',
          },
        ],
        features: [
          'Lender monetization dashboard for tracking payouts.',
          '“New In” trending algorithms and curated collections.',
          'Stripe-powered fractional-cost checkouts.',
        ],
        result:
          'Gave users access to top-tier luxury items at a fraction of retail cost while providing consistent income for lenders.',
        stack: ['react', 'nextdotjs', 'rubyonrails', 'redis', 'stripe'],
        metric: '60%',
        metricLabel: 'Fewer manual workflows',
      },
      {
        slug: 'westar',
        name: 'Westar',
        industry: 'eCommerce',
        duration: '6 months',
        requirement:
          'A centralized order management and fulfillment pipeline capable of pulling sales from various eCommerce storefronts.',
        challenges: [
          {
            challenge:
              'Warehouse bottlenecks during fulfillment when dealing with scattered individual orders.',
            solution:
              'Engineered a custom automated batch-processing module so teams organize and ship products in optimized groups.',
          },
        ],
        features: [
          'Multi-platform order ingestion sync.',
          'Intelligent batch sorting matrix for picking and packing.',
          'End-to-end shipping status visibility tracker.',
        ],
        result:
          'Drastically increased daily warehouse output and cut order-to-shipment timeframes through structured group fulfillment.',
        stack: ['rubyonrails', 'postgresql', 'stripe', 'amazonaws'],
        metric: 'Batch',
        metricLabel: 'Optimized fulfillment',
      },
      {
        slug: 'buffyhub',
        name: 'BuffyHub',
        industry: 'eCommerce',
        duration: '19 months',
        requirement:
          'A central dashboard unifying inventory, order processing, brands, and external vendors for cross-channel retail.',
        challenges: [
          {
            challenge:
              'Preventing inventory desynchronization across competing third-party platforms.',
            solution:
              'Built direct API bindings into Amazon and eBay to update stock levels simultaneously when sales occur.',
          },
        ],
        features: [
          'Centralized multi-vendor inventory engine.',
          'Cross-platform sales aggregator.',
          'Capistrano-automated deployment on AWS.',
        ],
        result:
          'Smoothed omni-channel operations, giving administrators a single control panel for multiple digital storefronts.',
        stack: ['rubyonrails', 'postgresql', 'amazonaws', 'github'],
        metric: '12+',
        metricLabel: 'Channels in one panel',
      },
    ],
  },
  {
    id: 'crm',
    category: 'CRM',
    domain: 'CRM Systems',
    blurb:
      'Internal operations and customer-service platforms that keep hundreds of people and thousands of tickets moving in real time.',
    capability: { label: 'CRM', href: '/what-we-build/crm' },
    projects: [
      {
        slug: 'atc',
        name: 'ATC — Air Traffic Controller',
        industry: 'Internal Project & HR Management',
        duration: '30 months',
        requirement:
          'A comprehensive internal operations tool centralizing global HR information, billing pipelines, and company messaging.',
        challenges: [
          {
            challenge:
              'Keeping real-time staff scheduling and communication consistent across hundreds of employees without refreshes.',
            solution:
              'Used .NET with SignalR to maintain lightning-fast, bi-directional socket connections for live push updates.',
          },
        ],
        features: [
          'Automated invoicing and integrated SMTP email client.',
          'Real-time chat and instant updates via SignalR.',
          'Robust testing with xUnit on Dockerized environments.',
        ],
        result:
          'Unified corporate operations into a single high-security dashboard, maximizing HR processing accuracy across a long production cycle.',
        stack: ['vuedotjs', 'dotnet', 'postgresql', 'redis', 'docker', 'amazonaws'],
        metric: '100s',
        metricLabel: 'Employees, live-synced',
      },
      {
        slug: 'contakti',
        name: 'Contakti',
        industry: 'Customer Service CRM',
        duration: '8 months',
        requirement:
          'An all-in-one support portal integrating a multitude of modern support channels into a single service hub.',
        challenges: [
          {
            challenge:
              'Distributing hundreds of incoming support messages to the correct specialized department quickly.',
            solution:
              'Architected an AI-driven task-routing matrix that assesses text and assigns tickets dynamically.',
          },
        ],
        features: [
          'Omni-channel sync — Email, Chat, SMS, Voice.',
          'Google Text-to-Speech for call automation.',
          'Real-time analytics dashboard for call-center management.',
        ],
        result:
          'Vastly lowered call-center wait times and optimized agent resource usage via smart automated ticket routing.',
        stack: ['react', 'rubyonrails', 'postgresql', 'redis', 'google'],
        metric: '4-in-1',
        metricLabel: 'Email · Chat · SMS · Voice',
      },
    ],
  },
  {
    id: 'marketplace',
    category: 'Marketplace',
    domain: 'Web Development',
    blurb:
      'Two-sided platforms that match supply with demand — creatives, coaches, dental labs, and repair shops — with transparent workflows.',
    capability: { label: 'Web Development', href: '/what-we-build/web-apps' },
    projects: [
      {
        slug: 'klingit',
        name: 'Klingit',
        industry: 'Creative Services Marketplace',
        duration: '8 months',
        requirement:
          'A tech-powered creative service platform to manage visual assets, ad campaigns, and website deliverables across a global network of artists.',
        challenges: [
          {
            challenge:
              'Creative project-management transparency between 40+ global creatives and corporate clients.',
            solution:
              'Built a bespoke DesignOps system visualizing asset revision milestones and logging feedback loops directly.',
          },
        ],
        features: [
          'Transparent DesignOps progress tracking dashboard.',
          'High-throughput asset serving via Nginx and Puma.',
          'Stripe multi-tier subscription billing.',
        ],
        result:
          'Helped brands scale marketing campaigns quickly with smoother collaboration and fewer back-and-forth emails.',
        stack: ['vuedotjs', 'rubyonrails', 'postgresql', 'redis', 'nginx', 'stripe'],
        metric: '40+',
        metricLabel: 'Global creatives synced',
      },
      {
        slug: 'coach-catalyst',
        name: 'CoachCatalyst',
        industry: 'Marketplace / Coaching',
        duration: '30 months',
        requirement:
          'A centralized system for coaches to organize client schedules, monitor metrics, and maintain active communication.',
        challenges: [
          {
            challenge:
              'UI lag when manipulating dense, highly variable global client calendars and historical logs.',
            solution:
              'Leveraged Vuex for precise client-side state management, keeping scheduling components agile.',
          },
        ],
        features: [
          'Interactive schedule builder and calendar suite.',
          'Direct instant messaging between clients and coaches.',
          'Historical client metrics and biometric growth charts.',
        ],
        result:
          'Created a scalable platform that maximized independent coach productivity, fueling retention across a 30-month roadmap.',
        stack: ['tailwindcss', 'vuedotjs', 'rubyonrails', 'postgresql', 'redis', 'stripe'],
        metric: '3×',
        metricLabel: 'Coach productivity',
      },
      {
        slug: 'cadcam-masters',
        name: 'Cad Cam Masters',
        industry: 'Dental B2B Marketplace',
        duration: '18 months',
        requirement:
          'A secure marketplace enabling dental practices, clinics, and labs to hire freelance Dental CAD designers.',
        challenges: [
          {
            challenge:
              'Massive stereolithography/rendering file uploads stalling server instances during checkouts.',
            solution:
              'Designed an asynchronous AWS storage upload pipeline isolating heavy medical CAD files from primary web transactions.',
          },
        ],
        features: [
          'Job posting and contract bidding dashboard for labs.',
          'High-fidelity rendering project milestone viewers.',
          'Automated marketplace transactions via Stripe.',
        ],
        result:
          'Reduced clinic overhead and sped up dental prosthesis fabrication by matching labs directly with remote CAD masters.',
        stack: ['react', 'rubyonrails', 'mysql', 'stripe', 'amazonaws'],
        metric: 'Async',
        metricLabel: 'Heavy CAD uploads isolated',
      },
      {
        slug: 'mi-taller',
        name: 'Mi Taller',
        industry: 'Garage Management Marketplace',
        duration: '4 months',
        requirement:
          'An operational platform for automotive workshops to handle intake appointments, spare-parts inventory, and dynamic billing.',
        challenges: [
          {
            challenge:
              'Frequent owner status check-ins pulling mechanics away from physical repair jobs.',
            solution:
              'Established asynchronous WebSockets with Celery queues to feed live diagnostic updates directly to car owners.',
          },
        ],
        features: [
          'Live automated service-progress dashboard.',
          'Integrated mechanic booking and schedule planner.',
          'Real-time stock alerts and JWT authorization.',
        ],
        result:
          'Boosted garage transparency and trust, lifting customer satisfaction through automated client alerts.',
        stack: ['react', 'django', 'postgresql', 'celery', 'docker'],
        metric: 'Live',
        metricLabel: 'Repair status to owners',
      },
    ],
  },
  {
    id: 'seo',
    category: 'SEO',
    domain: 'AI / ML',
    blurb:
      'Crawlers and analytics suites that track visibility across traditional and AI/LLM search surfaces at scale.',
    capability: { label: 'AI Solutions', href: '/what-we-build/ai-solutions' },
    projects: [
      {
        slug: 'siterank',
        name: 'SiteRanker',
        industry: 'Automated SEO for LLM Frontends',
        duration: '3 months',
        requirement:
          'An advanced optimization crawler to track and audit visibility rankings for websites surfaced within AI/LLM search engines.',
        challenges: [
          {
            challenge:
              'Collecting thousands of search-index metrics concurrently without overwhelming query threads.',
            solution:
              'Combined Celery queues with Elasticsearch to track indexing patterns across massive site lists like Amazon and Forbes.',
          },
        ],
        features: [
          'Automated deep keyword-tracking analytics panel.',
          'AI visibility optimization engine.',
          'Actionable technical-SEO recommendation generator.',
        ],
        result:
          'Let digital brands adapt content strategies for modern AI search engines, capturing new organic channels.',
        stack: ['nextdotjs', 'django', 'postgresql', 'elasticsearch', 'amazonaws'],
        metric: 'LLM',
        metricLabel: 'AI-search visibility',
      },
      {
        slug: 'clicks',
        name: 'Clicks.so',
        industry: 'SaaS All-in-One SEO Suite',
        duration: '6 months',
        requirement:
          'A budget-friendly ($25/mo) alternative to bloated SEO tools covering keyword tracking, backlinks, and auditing.',
        challenges: [
          {
            challenge:
              'Tracking thousands of live keyword rankings continuously without driving up infrastructure bills.',
            solution:
              'Formulated an efficient Sidekiq batch-processing script spreading scraping tasks evenly over Heroku dynos.',
          },
        ],
        features: [
          'Comprehensive rank-tracking panel.',
          'Backlink analysis and domain-health scoring.',
          'Automated programmatic crawl audits.',
        ],
        result:
          'Brought heavy-duty web analytics to small businesses at an accessible price while maintaining strong uptimes.',
        stack: ['react', 'rubyonrails', 'postgresql', 'redis', 'heroku'],
        metric: '$25/mo',
        metricLabel: 'Enterprise SEO, SMB price',
      },
    ],
  },
];

/** Flat map of slug → project, for cross-referencing from other pages. */
export const PORTFOLIO_PROJECTS_BY_SLUG: Record<string, PortfolioProject> = Object.fromEntries(
  PORTFOLIO_GROUPS.flatMap((group) => group.projects.map((project) => [project.slug, project]))
);
