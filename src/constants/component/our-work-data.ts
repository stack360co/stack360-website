export const OUR_WORK_HERO = {
  title: 'Proof over',
  highlight: 'promises.',
  description:
    'Case studies, featured systems, client outcomes, and studio insights — the evidence behind Stack360 as an engineering partner.',
} as const;

export const OUR_WORK_CHAPTERS = [
  {
    title: 'Case Studies',
    blurb: 'Deep dives into problems, architecture, and measurable results.',
    href: '/our-work/case-studies',
    cta: 'Browse cases',
    tone: 'dark' as const,
  },
  {
    title: 'Featured Projects',
    blurb: 'Highest-tier systems selected for engineering depth and impact.',
    href: '/our-work/featured-projects',
    cta: 'View featured',
    tone: 'light' as const,
  },
  {
    title: 'Project Timelines',
    blurb: 'How long projects like yours took, from 28 of our builds.',
    href: '/our-work/project-timelines',
    cta: 'Estimate yours',
    tone: 'light' as const,
  },
  {
    title: 'Client Success',
    blurb: 'Partners describing the outcomes they saw after launch.',
    href: '/our-work/client-success-stories',
    cta: 'Read stories',
    tone: 'light' as const,
  },
  {
    title: 'Blog',
    blurb: 'Studio notes on growth, craft, and building for the long term.',
    href: '/blog',
    cta: 'Read blog',
    tone: 'light' as const,
  },
  {
    title: 'FAQs',
    blurb: 'Clear answers on services, quality, and how engagements work.',
    href: '/our-work/faqs',
    cta: 'Open FAQs',
    tone: 'light' as const,
  },
] as const;

export const OUR_WORK_CTA = {
  title: 'Ready to build the next success story?',
  description:
    'Partner with a studio that ships production systems — and stays accountable after launch.',
  primary: { label: 'Talk to us', href: '/contact' },
  secondary: { label: 'Case studies', href: '/our-work/case-studies' },
} as const;

export const OUR_WORK_CTA_CS = {
  title: 'Ready to build the next success story?',
  description:
    'Partner with a studio that ships production systems — and stays accountable after launch.',
  primary: { label: 'Talk to us', href: '/contact' },
  secondary: { label: 'View Feature Project', href: '/our-work/featured-projects' },
} as const;
