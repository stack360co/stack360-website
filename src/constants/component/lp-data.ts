import { SITE_PROFILES } from '@/constants/site';

/**
 * Landing pages for Google Ads traffic, at /lp/<slug>. One template, one page per ad theme, so the
 * headline matches what the person searched for without swapping text in the browser.
 *
 * Every claim here is already on the site (the automation and AI pages, the portfolio, the
 * reviews). Keep it that way: add a figure only once it is published elsewhere on stack360.co.
 * The pages are noindex and left out of the sitemap, so they don't compete with the SEO pages.
 */

export type LpTheme = 'automation' | 'ai';

/**
 * Prices are Waris's call and aren't set yet. While a value is null the page shows an obvious
 * "£[TBC]" placeholder, so a preview can't be mistaken for a finished page.
 */
export const LP_PRICES: Record<LpTheme, { from: number | null; starter: number | null }> = {
  automation: { from: null, starter: null },
  ai: { from: null, starter: null },
};

/** Days of fixes included after the starter package goes live. Also Waris's call. */
export const LP_STARTER_FIX_DAYS: number | null = null;

export const formatPrice = (value: number | null) =>
  value === null ? '£[TBC]' : `£${value.toLocaleString('en-GB')}`;

export interface LpVariant {
  slug: string;
  theme: LpTheme;
  /** Browser tab title, before " | Stack360". */
  title: string;
  /** Meta description. The page is noindex, so this mostly shows when the link is shared. */
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
}

export const LP_VARIANTS: readonly LpVariant[] = [
  {
    slug: 'automation',
    theme: 'automation',
    title: 'Workflow Automation: Free 20-Minute Review',
    description:
      'Workflow automation for the jobs your team repeats: alerts, follow-ups, data syncs and checks. Book a free 20-minute review.',
    eyebrow: 'Workflow automation',
    headline: 'Workflow automation for the jobs your team repeats',
    intro:
      'Alerts, follow-ups, data syncs and checks, built to run on their own and tested on real cases before they go live.',
  },
  {
    slug: 'n8n',
    theme: 'automation',
    title: 'n8n Automation: Free 20-Minute Review',
    description:
      'n8n workflows built and run for you, on your own servers if you prefer. Book a free 20-minute automation review.',
    eyebrow: 'n8n automation',
    headline: 'n8n workflows, built and run for you',
    intro:
      'We build n8n workflows that connect your tools, and can run n8n in containers on your own servers so your data stays with you. When a workflow outgrows n8n, we build it as code.',
  },
  {
    slug: 'ai-automation',
    theme: 'automation',
    title: 'AI Automation: Free 20-Minute Review',
    description:
      'AI automation for the jobs your team repeats. AI where the input is messy, simple rules everywhere else. Book a free 20-minute review.',
    eyebrow: 'AI automation',
    headline: 'AI automation that takes repetitive work off your team',
    intro:
      'We use AI where the input is messy, such as documents and free-text messages, and simple rules everywhere else, so every step can be checked.',
  },
  {
    slug: 'ai-agents',
    theme: 'ai',
    title: 'AI Agent Development: Free 20-Minute Review',
    description:
      'AI agents that read context, call your tools and APIs and carry out defined workflows, with a person approving the steps that matter.',
    eyebrow: 'AI agent development',
    headline: 'AI agents that work from your own data and tools',
    intro:
      'Agents that read context, call your tools and APIs and carry out defined workflows. Each one has limits on what it can change, and a person approves the steps that matter.',
  },
  {
    slug: 'ai-chatbots',
    theme: 'ai',
    title: 'AI Chatbot Development: Free 20-Minute Review',
    description:
      'AI chatbots that look answers up in your own documents and data before they reply. Book a free 20-minute review.',
    eyebrow: 'AI chatbot development',
    headline: 'AI chatbots that answer from your own data',
    intro:
      'Chatbots that look the answer up in your documents or database before they reply, so they don’t make things up. Money Ball, our NFL stats chatbot, checks a live database before it answers.',
  },
];

export const getLpVariant = (slug: string) => LP_VARIANTS.find((variant) => variant.slug === slug);

export interface LpFaq {
  question: string;
  answer: string;
}

export interface LpThemeContent {
  offer: { title: string; description: string };
  /** What the form's free-text field asks for. */
  jobField: { label: string; placeholder: string; tab: string };
  proofOrder: readonly LpProofId[];
  pricing: { fromLabel: string; packageName: string; packageSummary: string; includes: string[] };
  steps: { title: string; description: string }[];
  faqs: LpFaq[];
  closing: { title: string; description: string };
}

const fixDays = () => (LP_STARTER_FIX_DAYS === null ? '[TBC] days' : `${LP_STARTER_FIX_DAYS} days`);

const OWNERSHIP: LpFaq = {
  question: 'Who owns what you build?',
  answer:
    'You do. Everything we build for you, including the source code and the intellectual property in it, belongs to you.',
};

const WHO: LpFaq = {
  question: 'Who will I be working with?',
  answer:
    'Stack360 Ltd is a UK company. We work with UK and US companies, and our engineering team in Lahore has delivered 200+ projects since 2019.',
};

const REPLY: LpFaq = {
  question: 'How quickly will you reply?',
  answer:
    'Within one business day if you send the form. If you book a call, you pick the time straight away.',
};

export function getLpThemeContent(theme: LpTheme): LpThemeContent {
  const prices = LP_PRICES[theme];
  const costAnswer = (noun: string, unit: string) =>
    `${noun} start from ${formatPrice(prices.from)}. The starter package is a fixed ${formatPrice(prices.starter)} for ${unit}. Larger projects are quoted after the review call.`;

  if (theme === 'automation') {
    return {
      offer: {
        title: 'Book a free 20-minute automation review',
        description:
          'Tell us one job your team repeats. We’ll show you what to automate first and what to leave to people.',
      },
      jobField: {
        label: 'The job you want automated',
        placeholder: 'e.g. Copy each new order into our accounts tool and email the warehouse',
        tab: 'Send the job',
      },
      proofOrder: ['luxe', 'alertia', 'moneyball'],
      pricing: {
        fromLabel: 'Automation projects from',
        packageName: 'Starter automation',
        packageSummary: 'One workflow, built, tested and live, at a fixed price.',
        includes: [
          'A 20-minute review call and a written plan',
          'One workflow built end to end, in n8n or as code',
          'Tested on real cases before it goes live',
          'Logging, and an alert if it ever fails',
          'You own the workflow and the code',
          `${fixDays()} of fixes after launch`,
        ],
      },
      steps: [
        {
          title: 'Free review call',
          description:
            '20 minutes with a lead engineer. Bring one job your team repeats, and we’ll tell you what to automate first.',
        },
        {
          title: 'A plan in two business days',
          description:
            'You get a written plan with milestones within two business days of the call.',
        },
        {
          title: 'Build, one job at a time',
          description:
            'Each automation is built, tested on real cases and switched on separately, with a person able to override it.',
        },
      ],
      faqs: [
        {
          question: 'What can you automate?',
          answer:
            'Booking and order alerts, review requests and reminders, inventory and order syncs, invoice generation, document checks and support routing. Each of these runs in a project we have built.',
        },
        {
          question: 'Do you build workflows in n8n or Zapier?',
          answer:
            'Yes. We build n8n workflows and can run n8n in containers on your own servers, so your data stays with you. For a simple link between two apps, Zapier is often enough. When a workflow outgrows these tools, we build it as code.',
        },
        {
          question: 'Where does AI fit in?',
          answer:
            'Where the input is messy, such as reading documents or routing free-text messages. Natif extracts fields from scans and handwriting, and Contakti routes tickets with AI. Rule-based steps usually work better without it.',
        },
        {
          question: 'What happens if an automation fails?',
          answer:
            'Every automation logs what it did, and a failure alerts someone instead of failing silently.',
        },
        {
          question: 'How much does it cost?',
          answer: costAnswer('Automation projects', 'one workflow'),
        },
        OWNERSHIP,
        WHO,
        REPLY,
      ],
      closing: {
        title: 'Ready to hand off the repetitive work?',
        description:
          'Book a free 20-minute automation review. Tell us one job your team repeats, and we’ll show you what to automate first.',
      },
    };
  }

  return {
    offer: {
      title: 'Book a free 20-minute AI review',
      description:
        'Tell us what the input looks like and what a good answer is. We’ll tell you whether AI is the right tool for it.',
    },
    jobField: {
      label: 'What should the agent or chatbot do?',
      placeholder:
        'e.g. Answer customer questions from our product manuals and pass hard ones to a person',
      tab: 'Send the task',
    },
    proofOrder: ['moneyball', 'luxe', 'alertia'],
    pricing: {
      fromLabel: 'AI projects from',
      packageName: 'AI pilot',
      packageSummary: 'One assistant or agent, proven on your own data, at a fixed price.',
      includes: [
        'A 20-minute review call and a written plan',
        'One assistant or agent connected to your data',
        'Tested on real examples before anyone relies on it',
        'A person in the loop for the steps that matter',
        'You own the code and the intellectual property',
        `${fixDays()} of fixes after launch`,
      ],
    },
    steps: [
      {
        title: 'Free review call',
        description:
          '20 minutes with a lead engineer. Bring one task, and we’ll tell you whether AI is the right tool for it.',
      },
      {
        title: 'A plan in two business days',
        description: 'You get a written plan with milestones within two business days of the call.',
      },
      {
        title: 'Build on your data',
        description:
          'We connect the model to your documents or databases and test it on real examples before anyone relies on it.',
      },
    ],
    faqs: [
      {
        question: 'How do you stop AI from making things up?',
        answer:
          'By grounding it in your data. We use retrieval so the model looks answers up in your databases or documents before replying, as in Money Ball. Where a mistake would be costly, we add checks and human review.',
      },
      {
        question: 'Can an AI agent take actions in our systems?',
        answer:
          'Yes. We build agents that read context, call your tools and APIs and carry out defined workflows. Each one has limits on what it can change, and a person approves the steps that matter.',
      },
      {
        question: 'Which AI models do you use?',
        answer:
          'OpenAI and Anthropic models, open models from Hugging Face, and custom models in PyTorch or TensorFlow. We choose per task, weighing accuracy, cost and where your data is allowed to go.',
      },
      {
        question: 'How do you handle our business data?',
        answer:
          'We agree up front where your data may go, then design around it. That covers which model providers can see it, whether it stays in your own cloud account, and which parts of the system can access what.',
      },
      {
        question: 'Can you add AI to software we already have?',
        answer:
          'Yes. Most of our AI work adds a capability to a product that already exists, such as document extraction, search or drafting, connected through your current APIs and databases.',
      },
      {
        question: 'How much does it cost?',
        answer: costAnswer('AI projects', 'one assistant or agent'),
      },
      OWNERSHIP,
      WHO,
      REPLY,
    ],
    closing: {
      title: 'Have a task AI could take on?',
      description:
        'Book a free 20-minute AI review. Tell us what the input looks like and what a good answer is.',
    },
  };
}

export type LpProofId = 'luxe' | 'alertia' | 'moneyball';

export interface LpProof {
  client: string;
  context: string;
  /** Headline result. A figure when the site publishes one. */
  result: string;
  resultLabel: string;
  description: string;
}

export const LP_PROOF: Record<LpProofId, LpProof> = {
  luxe: {
    client: 'Luxe Excursions',
    context: 'UK tour company in Tenerife',
    result: '75% → 0%',
    resultLabel: 'booking refusals',
    description:
      'Guests choose their activities and pay online, and the booking and tickets follow on their own. Staff hear about every booking instantly, and every guest gets one review request after their trip.',
  },
  alertia: {
    client: 'Alertia',
    context: 'Workforce compliance for security firms',
    result: 'Before each shift',
    resultLabel: 'guard licenses checked',
    description:
      'Alertia schedules guard shifts, checks each guard’s licenses before they start and sends renewal alerts, so firms hear about an expiring license in time to renew it.',
  },
  moneyball: {
    client: 'Money Ball',
    context: 'NFL stats chatbot',
    result: 'Live data',
    resultLabel: 'checked before it answers',
    description:
      'Fans and analysts ask about NFL players and teams in plain English. Before the model writes anything, it queries a live sports database, so the numbers come from data, not memory.',
  },
};

/** Figures copied from the public profiles, as shown on the home page's TrustBadges. */
export const LP_TRUST: readonly { label: string; href?: string }[] = [
  { label: '5.0 on Clutch', href: SITE_PROFILES.clutch },
  { label: '5.0 on G2', href: SITE_PROFILES.g2 },
  { label: 'Top Rated Plus on Upwork', href: SITE_PROFILES.upwork },
  { label: '200+ projects since 2019' },
];
