export interface NavSubItem {
  title: string;
  desc: string;
  href: string;
}

export interface NavSection {
  label: string;
  type: 'link' | 'dropdown';
  href?: string;
  columns?: { title?: string; items: NavSubItem[] }[];
  imagePreview?: { src: string; alt: string; caption: string };
}

export const NAVIGATION_DATA: NavSection[] = [
  {
    label: 'What We Build',
    type: 'dropdown',
    href: '/what-we-build',
    imagePreview: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      alt: 'System Custom Architecture',
      caption: 'Building complex high-performance systems from the ground up.',
    },
    columns: [
      {
        title: 'Products',
        items: [
          {
            title: 'Custom Software',
            desc: 'Systems built around how your business already works.',
            href: '/what-we-build/custom-software',
          },
          {
            title: 'Web Apps',
            desc: 'Portals, dashboards and stores people log in to.',
            href: '/what-we-build/web-apps',
          },
          {
            title: 'Mobile Apps',
            desc: 'iOS and Android apps in Swift, React Native and Flutter.',
            href: '/what-we-build/mobile-apps',
          },
          {
            title: 'SaaS',
            desc: 'Subscription products from first MVP to live platform.',
            href: '/what-we-build/saas',
          },
          {
            title: 'Marketplaces',
            desc: 'Two-sided platforms with bookings, deposits and payouts.',
            href: '/what-we-build/marketplace-development',
          },
        ],
      },
      {
        title: 'Business Systems',
        items: [
          {
            title: 'AI Solutions',
            desc: 'AI features that answer from your own data.',
            href: '/what-we-build/ai-solutions',
          },
          {
            title: 'ERP',
            desc: 'One system for stock, orders, suppliers and finance.',
            href: '/what-we-build/erp',
          },
          {
            title: 'CRM',
            desc: 'Every client, conversation and commitment in one place.',
            href: '/what-we-build/crm',
          },
          {
            title: 'Automation',
            desc: 'Alerts, reports and data syncs that run on their own.',
            href: '/what-we-build/automation',
          },
          {
            title: 'Legacy Modernization',
            desc: 'Old frameworks and hosting upgraded in stages.',
            href: '/what-we-build/legacy-modernization',
          },
        ],
      },
      {
        title: 'Platform & Growth',
        items: [
          {
            title: 'Cloud',
            desc: 'Migration and hosting on AWS, Azure and Google Cloud.',
            href: '/what-we-build/cloud',
          },
          {
            title: 'DevOps',
            desc: 'Pipelines, containers and monitoring for routine releases.',
            href: '/what-we-build/devops',
          },
          {
            title: 'QA & Testing',
            desc: 'Automated and manual testing on every release.',
            href: '/what-we-build/qa-testing',
          },
          {
            title: 'Maintenance & Support',
            desc: 'Updates, fixes and monitoring after launch.',
            href: '/what-we-build/software-maintenance',
          },
          {
            title: 'SEO & Google Ads',
            desc: 'Technical SEO, tracking, ads and Business Profile.',
            href: '/what-we-build/digital-marketing',
          },
        ],
      },
    ],
  },
  {
    label: 'Who We Help',
    type: 'dropdown',
    href: '/who-we-help',
    imagePreview: {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
      alt: 'Collaborative Workspace',
      caption: 'Partnering across stages—from pre-seed to enterprise ecosystems.',
    },
    columns: [
      {
        title: 'Target Segments',
        items: [
          {
            title: 'Industries',
            desc: 'Domain-focused execution covering Healthcare, FinTech, and Logistics.',
            href: '/who-we-help/industries',
          },
          {
            title: 'Startups',
            desc: 'Agile MVP structures and lightning-fast product path discoveries.',
            href: '/who-we-help/startups',
          },
          {
            title: 'SMEs',
            desc: 'Expanding operational scale through custom system modernization.',
            href: '/who-we-help/smes',
          },
          {
            title: 'Enterprises',
            desc: 'Massive legacy transitions engineered cleanly without downtime.',
            href: '/who-we-help/enterprises',
          },
        ],
      },
    ],
  },
  {
    label: 'Our Work',
    type: 'dropdown',
    href: '/our-work',
    imagePreview: {
      src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
      alt: 'Case Showcase',
      caption: 'Explore real-world case studies detailing deep system metrics.',
    },
    columns: [
      {
        title: 'Portfolios',
        items: [
          {
            title: 'Case Studies',
            desc: 'In-depth write-ups of the problems we solved and how we solved them.',
            href: '/our-work/case-studies',
          },
          {
            title: 'Featured Projects',
            desc: 'A selection of the products we have built for clients.',
            href: '/our-work/featured-projects',
          },
          {
            title: 'Client Success Stories',
            desc: 'What changed for our clients after we built with them.',
            href: '/our-work/client-success-stories',
          },
        ],
      },
      {
        title: 'Insights',
        items: [
          {
            title: 'Blog',
            desc: 'Practical guides from our engineers on building software, hiring developers and AI.',
            href: '/blog',
          },
          {
            title: 'FAQs',
            desc: 'Straightforward answers regarding contracts, handoffs, and sprint setups.',
            href: '/our-work/faqs',
          },
        ],
      },
    ],
  },
  {
    label: 'Who We Are',
    type: 'dropdown',
    href: '/who-we-are',
    imagePreview: {
      src: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600&auto=format&fit=crop',
      alt: 'Engineering Lab',
      caption: 'A disciplined team centered around technical integrity.',
    },
    columns: [
      {
        title: 'Company Overview',
        items: [
          {
            title: 'History',
            desc: 'How Stack360 has grown since 2019.',
            href: '/who-we-are/history',
          },
          {
            title: 'Culture',
            desc: 'A zero-fluff workspace prioritizing neat git histories and clean execution.',
            href: '/who-we-are/culture',
          },
          {
            title: 'How We Work',
            desc: 'How we plan, build, test and hand over your project.',
            href: '/who-we-are/how-we-work',
          },
          {
            title: 'Lahore Office',
            desc: 'Where the whole team works: 82-G, DHA Phase 1. Address, hours and directions.',
            href: '/who-we-are/lahore',
          },
        ],
      },
    ],
  },
  {
    label: 'Work With Us',
    type: 'dropdown',
    href: '/work-with-us',
    imagePreview: {
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      alt: 'Hiring Process Flowchart',
      caption: 'Let us build together, or help build the future of our firm.',
    },
    columns: [
      {
        title: 'For Partners',
        items: [
          {
            title: 'Looking for a software partner',
            desc: 'Get software built: a plan with milestones in two business days, then working software every week.',
            href: '/work-with-us/software-partner',
          },
          {
            title: 'Hire Talent',
            desc: 'Select skills and engagement length, and get shortlists of vetted full-time engineers.',
            href: '/work-with-us/hire',
          },
          {
            title: 'Dedicated Teams',
            desc: 'Engineers plus a project manager, QA, design and DevOps when you need them.',
            href: '/work-with-us/hire/dedicated-team',
          },
        ],
      },
      {
        title: 'For Builders',
        items: [
          {
            title: 'Looking for a Career',
            desc: 'Browse Open Positions, check out modern Internship options, and learn our strict Hiring Process.',
            href: '/work-with-us/careers',
          },
        ],
      },
    ],
  },
];
