import type { SectionHubProps } from '@/components/shared/SectionHub';

export const WHAT_WE_BUILD_HUB: SectionHubProps = {
  crumb: 'What We Build',
  title: 'Systems we architect',
  highlight: 'end to end.',
  description:
    'ERP, CRM, AI, SaaS, and the platform layer underneath — one studio accountable for the full stack. Built for software partners and client teams who need durable systems, not slideware.',
  exploreBlurb: 'Pick a capability — each page covers delivery shape, related projects, and FAQs.',
  chapters: [
    {
      title: 'ERP',
      blurb: 'Centralized enterprise resource engines for finance, inventory, HR, and ops.',
      href: '/what-we-build/erp',
      cta: 'Explore ERP',
    },
    {
      title: 'CRM',
      blurb: 'Customer relationship systems optimized for pipeline velocity.',
      href: '/what-we-build/crm',
      cta: 'Explore CRM',
    },
    {
      title: 'AI Solutions',
      blurb: 'Custom models, NLP, and data pipelines that turn ops data into decisions.',
      href: '/what-we-build/ai-solutions',
      cta: 'Explore AI',
    },
    {
      title: 'SaaS',
      blurb: 'Multi-tenant cloud products engineered for subscription scale.',
      href: '/what-we-build/saas',
      cta: 'Explore SaaS',
    },
    {
      title: 'Custom Software',
      blurb: 'Bespoke systems that remove foundational bottlenecks.',
      href: '/what-we-build/custom-software',
      cta: 'Explore custom',
    },
    {
      title: 'Mobile Apps',
      blurb: 'Native and cross-platform apps for iOS and Android — store-ready.',
      href: '/what-we-build/mobile-apps',
      cta: 'Explore mobile',
    },
    {
      title: 'Web Apps',
      blurb: 'High-speed modular web applications with durable architecture.',
      href: '/what-we-build/web-apps',
      cta: 'Explore web',
    },
    {
      title: 'Marketplaces',
      blurb: 'Two-sided platforms with listings, bookings, deposits and payouts.',
      href: '/what-we-build/marketplace-development',
      cta: 'Explore marketplaces',
    },
    {
      title: 'Legacy Modernization',
      blurb: 'Old frameworks, data feeds and hosting brought up to date in stages.',
      href: '/what-we-build/legacy-modernization',
      cta: 'Explore modernization',
    },
    {
      title: 'Maintenance & Support',
      blurb: 'Updates, fixes and monitoring that keep live software healthy.',
      href: '/what-we-build/software-maintenance',
      cta: 'Explore support',
    },
    {
      title: 'QA & Testing',
      blurb: 'Automated and manual testing that keeps every release safe.',
      href: '/what-we-build/qa-testing',
      cta: 'Explore QA',
    },
    {
      title: 'SEO & Google Ads',
      blurb: 'Technical SEO, tracking, ads and Business Profile, run from the site itself.',
      href: '/what-we-build/digital-marketing',
      cta: 'Explore SEO',
    },
    {
      title: 'Cloud',
      blurb: 'Resilient cloud architecture, migration, and cost-aware operations.',
      href: '/what-we-build/cloud',
      cta: 'Explore cloud',
    },
    {
      title: 'DevOps',
      blurb: 'CI/CD pipelines that keep delivery stable and repeatable.',
      href: '/what-we-build/devops',
      cta: 'Explore DevOps',
    },
    {
      title: 'Automation',
      blurb: 'Remove manual work from day-to-day operations.',
      href: '/what-we-build/automation',
      cta: 'Explore automation',
    },
  ],
  cta: {
    title: 'Need a system scoped — or engineers embedded?',
    description:
      'Tell us what you are building. We map capability to a concrete next step, or staff dedicated talent.',
    primary: { label: 'Contact us', href: '/contact' },
    secondary: { label: 'Hire talent', href: '/work-with-us/hire' },
  },
};

export const WHO_WE_HELP_HUB: SectionHubProps = {
  crumb: 'Who We Help',
  title: 'Partners by stage',
  highlight: 'and domain.',
  description:
    'From pre-seed MVPs to enterprise migrations — we match delivery shape to the risk profile of the organization.',
  exploreBlurb: 'Choose the segment that matches your organization.',
  chapters: [
    {
      title: 'Industries',
      blurb: 'Healthcare, FinTech, and Logistics with domain-aligned execution.',
      href: '/who-we-help/industries',
      cta: 'Explore industries',
    },
    {
      title: 'Startups',
      blurb: 'Agile MVP structures and fast product-path discovery.',
      href: '/who-we-help/startups',
      cta: 'For startups',
    },
    {
      title: 'SMEs',
      blurb: 'Operational scale through custom system modernization.',
      href: '/who-we-help/smes',
      cta: 'For SMEs',
    },
    {
      title: 'Enterprises',
      blurb: 'Legacy transitions engineered without unnecessary downtime.',
      href: '/who-we-help/enterprises',
      cta: 'For enterprises',
    },
  ],
  cta: {
    title: 'Find the right engagement model.',
    description: 'Share your stage and constraints — we will recommend a delivery shape.',
    primary: { label: 'Start a conversation', href: '/contact' },
    secondary: { label: 'Software partner', href: '/work-with-us/software-partner' },
  },
};

export const WHO_WE_ARE_HUB: SectionHubProps = {
  crumb: 'Who We Are',
  title: 'The studio behind',
  highlight: 'the systems.',
  description:
    'Stack360 is a software development agency founded in 2019 by Azmat Rana. Here is our history, our culture and how we ship.',
  exploreBlurb: 'Learn how Stack360 is built — history, culture, and delivery rituals.',
  facts: {
    title: 'Stack360 at a glance',
    summary:
      'Stack360 is a software development agency founded in 2019 by Azmat Rana. A team of 10 to 49 people builds web, mobile and AI products, and places full-time engineers with client teams in the US, the UK and beyond.',
    items: [
      { label: 'Founded', value: '2019' },
      { label: 'Founder & CEO', value: 'Azmat Rana' },
      { label: 'Team size', value: '10–49' },
      { label: 'Projects delivered', value: '200+' },
      { label: 'Clients served', value: '200+' },
      { label: 'Success rate', value: '100%' },
    ],
  },
  chapters: [
    {
      title: 'History',
      blurb: 'From a technical garage to a complex engineering firm.',
      href: '/who-we-are/history',
      cta: 'Our history',
    },
    {
      title: 'Culture',
      blurb: 'A zero-fluff workspace that prioritizes clean execution.',
      href: '/who-we-are/culture',
      cta: 'Our culture',
    },
    {
      title: 'How We Work',
      blurb: 'Daily iterations, architectural planning, and staging lines.',
      href: '/who-we-are/how-we-work',
      cta: 'How we work',
    },
  ],
  cta: {
    title: 'Want to build with us?',
    description: 'Partner with the studio or join the team.',
    primary: { label: 'Work with us', href: '/work-with-us' },
    secondary: { label: 'Careers', href: '/work-with-us/careers' },
  },
};

export const WORK_WITH_US_HUB: SectionHubProps = {
  crumb: 'Work With Us',
  title: 'Partner or',
  highlight: 'join the bench.',
  description:
    'Engage Stack360 as your software partner, hire dedicated engineers for your team, or explore open roles if you want to build here.',
  exploreBlurb: 'Partner, hire talent, or apply — pick the path that fits.',
  chapters: [
    {
      title: 'Software partner',
      blurb: 'Review outcomes and initiate a development engagement.',
      href: '/work-with-us/software-partner',
      cta: 'Become a partner',
    },
    {
      title: 'Hire Talent',
      blurb: 'Vetted full-time engineers — select skills and engagement length.',
      href: '/work-with-us/hire',
      cta: 'Hire developers',
    },
    {
      title: 'Careers',
      blurb: 'Open positions, internships, and our hiring process.',
      href: '/work-with-us/careers',
      cta: 'View careers',
    },
  ],
  cta: {
    title: 'Ready when you are.',
    description: 'Tell us what you need — a build partner, embedded talent, or a role on the team.',
    primary: { label: 'Contact us', href: '/contact' },
    secondary: { label: 'Our work', href: '/our-work' },
  },
};
