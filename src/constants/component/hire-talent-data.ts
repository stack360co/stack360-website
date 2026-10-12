import { SITE_EMAIL, SITE_EMAIL_HREF, SITE_PHONE, SITE_PHONE_HREF } from '@/constants/site';

export const HIRE_HERO = {
  eyebrow: 'Work With Us · Hire Talent',
  title: 'Hire reliable developers.',
  highlight: 'Close the talent gap.',
  description:
    'Full-time engineers who join your team, vetted with four checks and shortlisted within 2 days. Or a managed dedicated team, from our team in Lahore for companies in the US and UK.',
} as const;

export const HIRE_PROMISE = 'Get shortlists within 2 days. Hire in as fast as 1 week.';

export const HIRE_CONTACT = [
  {
    label: 'US registered address (Stack360 Ai Solutions LLC)',
    value: '12828 Willow Centre Dr, Houston, TX 77066, USA',
    icon: 'building' as const,
  },
  {
    label: 'UK mailing address',
    value: '58 St. Johns Road, Barking, Essex, IG11 7XL, United Kingdom',
    icon: 'building' as const,
  },
  {
    label: 'Phone',
    value: SITE_PHONE,
    href: SITE_PHONE_HREF,
    icon: 'phone' as const,
  },
  {
    label: 'Email',
    value: SITE_EMAIL,
    href: SITE_EMAIL_HREF,
    icon: 'mail' as const,
  },
] as const;

export const HIRE_SKILLS = [
  { id: 'react', label: 'React', iconSlug: 'react' },
  { id: 'react-native', label: 'React Native', iconSlug: 'reactnative' },
  { id: 'swift', label: 'Swift / iOS', iconSlug: 'swift' },
  { id: 'flutter', label: 'Flutter', iconSlug: 'flutter' },
  { id: 'angular', label: 'Angular', iconSlug: 'angular' },
  { id: 'vue', label: 'Vue.js', iconSlug: 'vuedotjs' },
  { id: 'nodejs', label: 'Node.js', iconSlug: 'nodedotjs' },
  { id: 'ruby-on-rails', label: 'Ruby on Rails', iconSlug: 'rubyonrails' },
  { id: 'dotnet', label: '.NET', iconSlug: 'dotnet' },
  { id: 'python', label: 'Python', iconSlug: 'python' },
  { id: 'gen-ai', label: 'Generative AI', iconSlug: 'huggingface' },
  { id: 'ai-ml', label: 'AI & ML', iconSlug: 'pytorch' },
  { id: 'ai-agents', label: 'AI Agents', iconSlug: 'langchain' },
  { id: 'llm-development', label: 'LLM Development', iconSlug: 'huggingface' },
  { id: 'others', label: 'Others', iconSlug: null },
] as const;

export type HireSkillId = (typeof HIRE_SKILLS)[number]['id'];

export const HIRE_NEED_OPTIONS = [
  {
    id: 'long-term',
    label: 'Long-term staffing / team member',
  },
  {
    id: 'medium-term',
    label: 'Medium-term (6 to 12 months)',
  },
  {
    id: 'short-term',
    label: 'Short-term (less than 6 months)',
  },
] as const;

export type HireNeedId = (typeof HIRE_NEED_OPTIONS)[number]['id'];

export const HIRE_CTA = {
  title: 'Start your project without hiring delays',
  description:
    'Access engineers who blend into your workflow — whether you are growing fast or clearing a backlog.',
  primary: { label: 'Contact us', href: '/contact' },
  secondary: { label: 'See our work', href: '/our-work/case-studies' },
} as const;

export type HireInfoItem = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

/** How hiring works, shown on the hire hub. */
export const HIRE_HUB_STEPS: readonly HireInfoItem[] = [
  {
    title: 'Tell us about the role',
    description:
      'Share the stack, the seniority, how long you need the engineer and how many hours should overlap with your team.',
  },
  {
    title: 'Meet your shortlist',
    description:
      'Within 2 days we send profiles of engineers who have passed our four checks. You interview them and choose who joins.',
  },
  {
    title: 'Start working together',
    description:
      'Your engineer joins your standups, repo and tools full time. Hiring can take as little as a week.',
  },
];

/** The four checks every engineer passes before a client sees them. */
export const HIRE_VETTING_CHECKS: readonly HireInfoItem[] = [
  {
    title: 'Technical interview',
    description: 'A senior engineer interviews them on the stack they will work in.',
  },
  { title: 'Coding test', description: 'A live coding test or a take-home task.' },
  {
    title: 'Review of past work',
    description:
      'We go through code and projects they built before, so we know which parts were theirs.',
  },
  {
    title: 'English check',
    description: 'Spoken and written English, including how clearly they explain their own work.',
  },
];

/** Single engineers or a managed team. */
export const HIRE_TEAM_OPTIONS: readonly HireInfoItem[] = [
  {
    title: 'Engineers in your team',
    description:
      'One or more engineers join your team full time. You lead the work, and they follow your process, tools and sprint.',
  },
  {
    title: 'A managed dedicated team',
    description:
      'Engineers plus, when you need them, a project manager, QA engineer, UI/UX designer and DevOps engineer. The project manager runs the sprints and the reporting.',
    href: '/work-with-us/hire/dedicated-team',
    linkLabel: 'Dedicated development teams',
  },
];

/** Hours, location and contract terms, worded the same on the hub and the team page. */
export const HIRE_TERMS: readonly HireInfoItem[] = [
  {
    title: 'Working hours',
    description:
      'Our engineers work from our team in Lahore, Pakistan, and overlap at least 4 hours with a US working day. Pakistan doesn’t change its clocks, so the gap moves by an hour when the US and UK do.',
  },
  {
    title: 'You own the work',
    description:
      'Everything our engineers write for you, including the source code and its intellectual property, belongs to you.',
  },
  {
    title: 'No long-term contract',
    description:
      'Engagements run from under six months to long-term roles. The notice period is agreed in each contract.',
  },
  {
    title: 'Replacement',
    description: 'If an engineer isn’t the right fit, we replace them and handle the handover.',
  },
];

/** Dedicated team page. */
export const DEDICATED_TEAM_HERO = {
  eyebrow: 'Work With Us · Dedicated Teams',
  title: 'Hire a dedicated',
  highlight: 'development team.',
  description:
    'Single engineers who join your team, or a managed team with a project manager, QA, UI/UX design and DevOps when you need them. Shortlists within 2 days.',
} as const;

export const DEDICATED_TEAM_ROLES: readonly HireInfoItem[] = [
  {
    title: 'Engineers',
    description:
      'Full-time developers in the stack you need, from Swift and React to Rails, Python and .NET.',
    href: '/work-with-us/hire',
    linkLabel: 'Developers we place',
  },
  {
    title: 'Project manager',
    description:
      'Runs the sprints and the reporting, so you set priorities instead of managing tasks.',
  },
  {
    title: 'QA engineer',
    description: 'Testing and release checks, so problems are caught before your users find them.',
  },
  {
    title: 'UI/UX designer',
    description: 'Design work inside the team, from user flows to finished screens.',
  },
  { title: 'DevOps engineer', description: 'Infrastructure, pipelines and deployments.' },
];

export const DEDICATED_TEAM_STEPS: readonly HireInfoItem[] = [
  {
    title: 'Tell us what you are building',
    description:
      'Share the product, the stacks and the roles you think you need. Not sure? We recommend a team on a discovery call.',
  },
  {
    title: 'Meet the team',
    description:
      'Within 2 days you get profiles of engineers who have passed our four checks, and you interview them before anyone starts.',
  },
  {
    title: 'Start and adjust',
    description:
      'The team starts in your tools, or the project manager sets up the sprints. Add or remove roles as the work changes.',
  },
];

/** Team sizes and hours from the published case studies. */
export const DEDICATED_TEAM_PROOF: readonly HireInfoItem[] = [
  {
    title: 'AutoBuffy',
    description: 'Team of 6 · 28,000 hours · US auto parts store',
    href: '/our-work/case-studies/autobuffy',
    linkLabel: 'Read the case study',
  },
  {
    title: 'Coach Catalyst',
    description: 'Team of 2 · 4,272 hours · coaching platform',
    href: '/our-work/case-studies/coach-catalyst',
    linkLabel: 'Read the case study',
  },
  {
    title: 'BuffyHub',
    description: 'Team of 2 · 3,344 hours · multi-channel ecommerce',
    href: '/our-work/case-studies/buffyhub',
    linkLabel: 'Read the case study',
  },
  {
    title: 'ATC',
    description: 'Team of 3 · 2,800 hours · internal operations system',
    href: '/our-work/case-studies/atc',
    linkLabel: 'Read the case study',
  },
  {
    title: 'Truck-4',
    description: 'Team of 3 · 1,232 hours · fleet rental marketplace',
    href: '/our-work/case-studies/truck-4',
    linkLabel: 'Read the case study',
  },
];
