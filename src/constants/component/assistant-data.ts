import {
  LAHORE_OFFICE_ADDRESS,
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_PHONE,
  SITE_PHONE_E164,
  SITE_PHONE_HREF,
} from '@/constants/site';

export type AssistantQuickActionId =
  | 'what-we-build'
  | 'our-work'
  | 'who-we-are'
  | 'work-with-us'
  | 'contact';

export interface AssistantQuickAction {
  id: AssistantQuickActionId;
  label: string;
  span?: 'full' | 'half';
}

export interface AssistantContactField {
  label: string;
  value: string;
  href?: string;
  copyValue?: string;
}

export interface AssistantCategory {
  id: string;
  label: string;
}

export interface AssistantProjectResult {
  name: string;
  metric: string;
  summary: string;
  href: string;
}

export interface AssistantServiceResult {
  title: string;
  summary: string;
  stack: string;
  href: string;
}

export const ASSISTANT_META = {
  name: 'Stack360 Guide',
  tagline: 'Quick answers · always on',
  greeting:
    "Hi — I'm here to get you the right answer fast. Ask about what we build, who we are, our work, or how to start a project. Where should we begin?",
  footer: 'Stack360 Guide · instant answers',
  typingLabel: 'Finding your answer…',
} as const;

export const ASSISTANT_QUICK_ACTIONS: AssistantQuickAction[] = [
  { id: 'what-we-build', label: 'What We Build', span: 'full' },
  { id: 'work-with-us', label: 'Work With Us — start a project', span: 'full' },
  { id: 'our-work', label: 'Our Work', span: 'half' },
  { id: 'contact', label: 'Contact', span: 'half' },
];

export const ASSISTANT_CONTACT: AssistantContactField[] = [
  {
    label: 'Sales',
    value: SITE_EMAIL,
    href: SITE_EMAIL_HREF,
    copyValue: SITE_EMAIL,
  },
  {
    label: 'Phone',
    value: SITE_PHONE,
    href: SITE_PHONE_HREF,
    copyValue: SITE_PHONE_E164,
  },
  {
    label: 'Pakistan · Lahore office',
    value: LAHORE_OFFICE_ADDRESS,
    copyValue: LAHORE_OFFICE_ADDRESS,
  },
  {
    label: 'United Kingdom · Mailing address',
    value: '58 St. Johns Road, Barking, Essex, IG11 7XL, United Kingdom',
    copyValue: '58 St. Johns Road, Barking, Essex, IG11 7XL, United Kingdom',
  },
];

export const ASSISTANT_PROJECT_CATEGORIES: AssistantCategory[] = [
  { id: 'operations', label: 'Operations' },
  { id: 'ecommerce', label: 'eCommerce' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'healthtech', label: 'HealthTech' },
];

export const ASSISTANT_PROJECTS: Record<string, AssistantProjectResult[]> = {
  operations: [
    {
      name: 'ATC — Air Traffic Controller',
      metric: '40% faster project & HR coordination',
      summary:
        'Centralized HR, project management, invoicing, and real-time updates — built for internal ops at scale.',
      href: '/our-work/case-studies',
    },
  ],
  ecommerce: [
    {
      name: 'Autobuffy',
      metric: '2× website speed & traffic',
      summary:
        'USA auto-parts commerce with modern search, checkout, and inventory engineered for conversion under load.',
      href: '/our-work/case-studies',
    },
  ],
  marketplace: [
    {
      name: 'BuffyHub',
      metric: '12+ channels · one dashboard',
      summary:
        'Unified control plane for inventory, orders, brands, and vendors across marketplaces.',
      href: '/our-work/case-studies',
    },
  ],
  healthtech: [
    {
      name: 'Coach Catalyst',
      metric: '3× daily active users',
      summary:
        'Fitness coaching with automated client management, progress tracking, and nutrition-app integrations.',
      href: '/our-work/case-studies',
    },
  ],
};

export const ASSISTANT_SERVICE_CATEGORIES: AssistantCategory[] = [
  { id: 'core', label: 'Core Ecosystems' },
  { id: 'platform', label: 'Platform & Infrastructure' },
  { id: 'ai', label: 'AI Solutions' },
];

export const ASSISTANT_SERVICES: Record<string, AssistantServiceResult[]> = {
  core: [
    {
      title: 'ERP',
      summary: 'Centralized enterprise resource engines designed for scalability.',
      stack: 'Multi-module · Cloud-ready',
      href: '/what-we-build/erp',
    },
    {
      title: 'CRM',
      summary: 'Customer relationship systems optimized for pipeline velocity.',
      stack: 'Pipeline · Automation',
      href: '/what-we-build/crm',
    },
    {
      title: 'SaaS',
      summary: 'Multi-tenant cloud products engineered for subscription scale.',
      stack: 'Tenancy · Billing',
      href: '/what-we-build/saas',
    },
    {
      title: 'Custom Software',
      summary: 'Bespoke systems that remove foundational bottlenecks.',
      stack: 'Architecture-first',
      href: '/what-we-build/custom-software',
    },
  ],
  platform: [
    {
      title: 'Web Apps',
      summary: 'High-speed modular web applications with dynamic architecture.',
      stack: 'Next.js · Rails · Node',
      href: '/what-we-build/web-apps',
    },
    {
      title: 'Mobile Apps',
      summary: 'Native-grade iOS and Android applications for portable product surfaces.',
      stack: 'Flutter · React Native · Swift',
      href: '/what-we-build/mobile-apps',
    },
    {
      title: 'Cloud & DevOps',
      summary: 'Resilient infrastructure and CI/CD so releases stay fast and stable.',
      stack: 'AWS · Docker · Kubernetes',
      href: '/what-we-build/cloud',
    },
  ],
  ai: [
    {
      title: 'AI Solutions',
      summary: 'Custom neural integrations, RAG systems, and intelligent automated workflows.',
      stack: 'Agents · RAG · Python',
      href: '/what-we-build/ai-solutions',
    },
    {
      title: 'Automation',
      summary: 'Remove manual tasks from day-to-day operations with reliable automation.',
      stack: 'Workflows · Integrations',
      href: '/what-we-build/automation',
    },
  ],
};

export const ASSISTANT_WHO_WE_ARE = {
  intro:
    'Stack360 is a software development company with its team in Lahore. Since 2019 we have built software and placed dedicated developers for companies in the US and UK.',
  links: [
    { label: 'Our History', href: '/who-we-are/history' },
    { label: 'Culture', href: '/who-we-are/culture' },
    { label: 'How We Work', href: '/who-we-are/how-we-work' },
    { label: 'Lahore Office', href: '/who-we-are/lahore' },
  ],
} as const;

export const ASSISTANT_REPLIES = {
  whatWeBuildIntro:
    'Here is What We Build — pick a lane and I will show the capabilities that match.',
  ourWorkIntro:
    'Here is Our Work — production systems with measurable outcomes. Choose a category.',
  contactIntro:
    'Here is how to reach the studio. Tap any row to copy — handy when you are mid-conversation.',
  workWithUsIntro:
    'Work With Us starts with a clear brief. Most qualified inquiries get a scoped next step within 48 hours — not a generic sales deck.',
  workWithUsCta: `Open the software partner path, or copy ${SITE_EMAIL} and send context, constraints, and timeline.`,
  whoWeAreIntro: ASSISTANT_WHO_WE_ARE.intro,
  followUp: 'Want something else? Choose another path below — I will keep answering.',
  moreProjects: 'Want another category from Our Work? Pick below — or open the main menu.',
  moreServices: 'Want another lane from What We Build? Pick below — or open the main menu.',
  allProjectsSeen:
    'You have browsed every Our Work category here. Open the main menu for something else.',
  allServicesSeen:
    'You have browsed every What We Build lane here. Open the main menu for something else.',
  loadingProject: 'Pulling matching case studies from Our Work…',
  loadingService: 'Loading What We Build for this lane…',
} as const;
