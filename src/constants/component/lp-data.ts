import { SITE_PHONE, SITE_PROFILES } from '@/constants/site';

/**
 * Landing pages for Google Ads traffic, at /lp/<slug>. One template, one page per ad group. Each
 * page opens with the searcher's problem, then the outcome, then the offer, in the same words as
 * its ads (the ad copy is in the marketing chat's Google Ads plan, section e).
 *
 * Every claim here is already on stack360.co (the automation and AI pages, the portfolio, the blog
 * and the reviews). Keep it that way: add a figure only once it is published elsewhere on the site.
 * The pages are noindex and left out of the sitemap, so they don't compete with the SEO pages.
 */

export type LpTheme = 'automation' | 'ai';

export interface LpVariant {
  slug: string;
  /** automation pages show the packages and prices; ai pages offer the free review only. */
  theme: LpTheme;
  /** Browser tab title, before " | Stack360". */
  title: string;
  /** Meta description. The page is noindex, so this mostly shows when the link is shared. */
  description: string;
  eyebrow: string;
  /** The searcher's problem, as a question. Matches the ads' first headline. */
  headline: string;
  /** The outcome, then the offer. */
  subhead: string;
  /** Pre-filled in the WhatsApp message: "I'm interested in <topic>". */
  topic: string;
  /** Project cards, strongest first. The first one also sits in the first screen. */
  proof: readonly [LpProofId, LpProofId, LpProofId];
  /** Adds the "law firms and accountants" section (#legal-accounting). */
  legalAccounting?: boolean;
}

export const LP_VARIANTS: readonly LpVariant[] = [
  {
    slug: 'automation',
    theme: 'automation',
    title: 'Business Automation: Free 20-Minute Review',
    description:
      'Still retyping data between systems? We connect your tools so the data moves on its own. Fixed-price packages and a free 20-minute review.',
    eyebrow: 'Business automation',
    headline: 'Still retyping data between systems?',
    subhead:
      'We connect your tools so the data moves on its own, with every run logged and failures flagged to a person. Start with a free 20-minute review.',
    topic: 'automation',
    proof: ['luxe', 'cercle', 'alertia'],
    legalAccounting: true,
  },
  {
    slug: 'ai-automation',
    theme: 'automation',
    title: 'AI Automation: Free 20-Minute Review',
    description:
      'Jobs your team keeps forgetting? Staff get an alert the moment a lead or booking arrives. Fixed-price packages and a free 20-minute review.',
    eyebrow: 'AI automation',
    headline: 'Jobs your team keeps forgetting?',
    subhead:
      'We automate the jobs that depend on someone remembering, so staff get an alert the moment a lead or booking arrives. A free 20-minute review tells you what to automate first.',
    topic: 'AI automation',
    proof: ['luxe', 'bookkeeping', 'alertia'],
  },
  {
    slug: 'n8n',
    theme: 'automation',
    title: 'n8n Automation: Free 20-Minute Review',
    description:
      'n8n workflows breaking without anyone noticing? We build and look after n8n workflows that report their own failures, on your own servers if you want.',
    eyebrow: 'n8n automation',
    headline: 'n8n workflows breaking without anyone noticing?',
    subhead:
      'We build and look after n8n workflows that log every run and alert a person when something fails, on your own servers if you want. Start with a free 20-minute review.',
    topic: 'n8n workflows',
    proof: ['luxe', 'alertia', 'bookkeeping'],
  },
  {
    slug: 'ai-agents',
    theme: 'ai',
    title: 'AI Agent Development: Free 20-Minute Review',
    description:
      'Requests piling up and documents read by hand? AI agents that work from your own data, with a person checking where it matters.',
    eyebrow: 'AI agent development',
    headline: 'Requests piling up and documents read by hand?',
    subhead:
      'AI agents that work from your own data and tools, with a person checking where it matters. Start with a free 20-minute review of the task.',
    topic: 'AI agents',
    proof: ['natif', 'moneyball', 'alertia'],
  },
  {
    slug: 'ai-chatbots',
    theme: 'ai',
    title: 'AI Chatbot Development: Free 20-Minute Review',
    description:
      'Answering the same questions all day? A chatbot that looks the answer up in your own records before it replies. Book a free 20-minute review.',
    eyebrow: 'AI chatbot development',
    headline: 'Answering the same questions all day?',
    subhead:
      'A chatbot that looks the answer up in your own records before it replies, so it doesn’t make things up. Start with a free 20-minute review.',
    topic: 'an AI chatbot',
    proof: ['moneyball', 'natif', 'luxe'],
  },
];

export const getLpVariant = (slug: string) => LP_VARIANTS.find((variant) => variant.slug === slug);

/* ------------------------------------------------------------------------------------------------
 * WhatsApp
 * --------------------------------------------------------------------------------------------- */

const WHATSAPP_NUMBER = SITE_PHONE.replace(/[^0-9]/g, '');

/** Click-to-chat link with the page in the message, so the CRM can tell where the chat came from. */
export const lpWhatsAppLink = (variant: LpVariant) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Stack360, I'm interested in ${variant.topic} (from /lp/${variant.slug})`
  )}`;

/* ------------------------------------------------------------------------------------------------
 * Packages and prices
 * --------------------------------------------------------------------------------------------- */

/**
 * Prices are Waris's call and aren't approved yet. While a value is null the page shows an obvious
 * "£[TBC]" placeholder, so a preview can't be mistaken for a finished page. Google Ads requires
 * the price in an ad to match this page exactly, so change them together.
 */
export const LP_PRICES = {
  single: null as number | null,
  pack: null as number | null,
  presence: null as number | null,
  /** A month. */
  care: null as number | null,
};

/** Whether the prices include VAT. null shows a placeholder. */
export const LP_PRICES_INCLUDE_VAT: boolean | null = null;

export const formatPrice = (value: number | null) =>
  value === null ? '£[TBC]' : `£${value.toLocaleString('en-GB')}`;

export const vatNote = () =>
  LP_PRICES_INCLUDE_VAT === null
    ? 'Prices [TBC: including or excluding] VAT.'
    : LP_PRICES_INCLUDE_VAT
      ? 'Prices include VAT.'
      : 'Prices exclude VAT.';

export interface LpPackage {
  id: string;
  name: string;
  summary: string;
  price: number | null;
  /** "from £X" rather than a set price. */
  from?: boolean;
  /** Shown after the price, e.g. "a month". */
  per?: string;
  timing: string;
  includes: string[];
}

/** The four paid packages. The free review sits above them as the main offer. */
export const LP_PACKAGES: readonly LpPackage[] = [
  {
    id: 'single',
    name: 'Single automation',
    summary: 'One workflow, built end to end and switched on.',
    price: LP_PRICES.single,
    from: true,
    timing: 'Live in about 1 week',
    includes: [
      'One workflow, in n8n or as code',
      'Tested on real cases before it goes live',
      'Every run logged, failures flagged to a person',
      'You own the workflow and the code',
    ],
  },
  {
    id: 'pack',
    name: 'Business automation pack',
    summary: '3–5 connected workflows that pass data between your tools.',
    price: LP_PRICES.pack,
    from: true,
    timing: 'Live in 2–3 weeks',
    includes: [
      '3–5 workflows, connected to each other',
      'Each one switched on separately, with a person able to override it',
      'Every run logged, failures flagged to a person',
      'You own the workflows and the code',
    ],
  },
  {
    id: 'presence',
    name: 'Online presence and lead engine',
    summary: 'Get found, get reviewed and catch every lead.',
    price: LP_PRICES.presence,
    from: true,
    timing: 'Live in 3–4 weeks',
    includes: [
      'Website refresh',
      'Google Business Profile set up',
      'Review requests sent after each job',
      'Lead capture into a CRM',
    ],
  },
  {
    id: 'care',
    name: 'Care plan',
    summary: 'We keep your automations running after launch.',
    price: LP_PRICES.care,
    per: 'a month',
    timing: 'Monthly, after launch',
    includes: ['Monitoring', 'Fixes when something breaks', 'Small changes each month'],
  },
];

/* ------------------------------------------------------------------------------------------------
 * Proof
 * --------------------------------------------------------------------------------------------- */

export type LpProofId =
  | 'luxe'
  | 'cercle'
  | 'alertia'
  | 'bookkeeping'
  | 'natif'
  | 'moneyball'
  | 'legalatoms';

export interface LpProof {
  client: string;
  context: string;
  /** Headline figure, in the site's project-card style. */
  metric: string;
  metricLabel: string;
  description: string;
}

export const LP_PROOF: Record<LpProofId, LpProof> = {
  luxe: {
    client: 'Luxe Excursions',
    context: 'UK tour company in Tenerife',
    metric: '75% → 0%',
    metricLabel: 'Booking refusals',
    description:
      'Guests choose their activities and pay online, and the booking and tickets follow on their own. Staff get an email the moment a booking is paid, with the guest set as reply-to.',
  },
  cercle: {
    client: 'Cercle',
    context: 'UK fashion rental marketplace',
    metric: '60%',
    metricLabel: 'Fewer manual workflows',
    description:
      'Cercle’s catalog and orders sync with Facebook on their own. Across the project, its manual workflows fell by 60%.',
  },
  alertia: {
    client: 'Alertia',
    context: 'Workforce compliance for security firms',
    metric: '~$1,000',
    metricLabel: 'AI bill avoided',
    description:
      'The client first asked for AI, but the data arrived in a few known formats, so we ran it as a plain automation service. It was predictable, easy to test, and spared the client an AI bill of around $1,000.',
  },
  bookkeeping: {
    client: 'A US bookkeeping firm',
    context: 'Leads from Meta, LinkedIn, Google Ads, the website and calls',
    metric: 'Text + email',
    metricLabel: 'Sent to every new lead straight away',
    description:
      'Each new lead gets a text and an email immediately and is assigned to a rep, and the follow-up stops when the lead replies. We configured an existing tool instead of building a CRM.',
  },
  natif: {
    client: 'Natif.ai',
    context: 'Document processing',
    metric: 'Scans + handwriting',
    metricLabel: 'Read automatically',
    description:
      'OCR and handwriting recognition classify each document and pull out the fields, even from low-quality photos. A person reviewed every extraction before it was used.',
  },
  moneyball: {
    client: 'Money Ball',
    context: 'NFL stats chatbot',
    metric: 'Live data',
    metricLabel: 'Checked before it answers',
    description:
      'Fans and analysts ask about NFL players and teams in plain English. Before the model writes anything, it queries a live sports database, so the numbers come from data, not memory.',
  },
  legalatoms: {
    client: 'LegalAtoms',
    context: 'Legal-tech SaaS',
    metric: 'Court documents',
    metricLabel: 'Generated in the background',
    description:
      'Paperwork prepared and sent without anyone retyping it. LegalAtoms generates court documents in the background and emails case updates.',
  },
};

/** Figures copied from the public profiles, as shown on the home page's TrustBadges. */
export const LP_TRUST: readonly { label: string; href?: string }[] = [
  { label: '5.0 on Clutch', href: SITE_PROFILES.clutch },
  { label: '5.0 on G2', href: SITE_PROFILES.g2 },
  { label: 'Top Rated Plus, 100% Job Success on Upwork', href: SITE_PROFILES.upwork },
  { label: '200+ projects since 2019' },
  { label: 'Stack360 Ltd, a UK company' },
];

/** Mitchell's G2 review, shortened with an ellipsis only, for the first screen. */
export const LP_SHORT_QUOTE =
  'They automated booking and ticket generation based on the excursions a person selects…';

/* ------------------------------------------------------------------------------------------------
 * Theme content: offer, form, steps, FAQ, closing
 * --------------------------------------------------------------------------------------------- */

export interface LpFaq {
  id: string;
  question: string;
  answer: string;
}

export interface LpThemeContent {
  offer: { title: string; description: string };
  /** What the form's free-text field asks for. */
  jobField: { label: string; placeholder: string; tab: string };
  steps: { phase: string; title: string; description: string }[];
  faqs: LpFaq[];
  closing: { title: string; description: string };
}

const OWNERSHIP: LpFaq = {
  id: 'ownership',
  question: 'Who owns what you build?',
  answer:
    'You do. Everything we build for you, including the source code and the intellectual property in it, belongs to you.',
};

const WHO: LpFaq = {
  id: 'who',
  question: 'Who will I be working with?',
  answer:
    'Stack360 Ltd is a UK company. We work with UK and US companies, and our engineering team in Lahore has delivered 200+ projects since 2019. A founder and a senior engineer join the first call.',
};

const COMMIT: LpFaq = {
  id: 'commit',
  question: 'Does the review commit me to anything?',
  answer:
    'No. The call doesn’t commit you to anything, and there is no long-term contract to start. If an existing tool fits better, we will say so.',
};

const REPLY: LpFaq = {
  id: 'reply',
  question: 'How quickly will you reply?',
  answer:
    'Within one business day if you send the form or a WhatsApp message. If you book a call, you pick the time straight away.',
};

const step2 = {
  phase: 'Step 2',
  title: 'A plan in two business days',
  description: 'You get a written plan with milestones within two business days of the call.',
};

export function getLpThemeContent(theme: LpTheme): LpThemeContent {
  if (theme === 'automation') {
    return {
      offer: {
        title: 'Book a free 20-minute automation review',
        description:
          'Tell us one job your team repeats. We’ll show you what to automate first and what to leave to people.',
      },
      jobField: {
        label: 'What job should we automate?',
        placeholder: 'e.g. Copy each new order into our accounts tool and email the warehouse',
        tab: 'Send the job',
      },
      steps: [
        {
          phase: 'Step 1',
          title: 'Free 20-minute review',
          description:
            'A founder and a senior engineer join the call. Bring one job your team repeats, and we’ll tell you what to automate first.',
        },
        step2,
        {
          phase: 'Step 3',
          title: 'Built and live',
          description:
            'Each automation is built, tested on real cases and switched on separately, with a person able to override it. A single automation goes live in about a week.',
        },
      ],
      faqs: [
        {
          id: 'what',
          question: 'What can you automate?',
          answer:
            'Booking and order alerts, review requests and reminders, inventory and order syncs, invoice generation, document checks and support routing. Each of these runs in a project we have built.',
        },
        {
          id: 'cost',
          question: 'How much does it cost?',
          answer: `Fixed prices, agreed before we start: a single automation from ${formatPrice(LP_PRICES.single)}, a pack of 3–5 workflows from ${formatPrice(LP_PRICES.pack)}, and a care plan at ${formatPrice(LP_PRICES.care)} a month. Larger or custom projects are quoted after the review. ${vatNote()}`,
        },
        {
          id: 'tools',
          question: 'Do you build workflows in n8n or Zapier?',
          answer:
            'Yes. We build n8n workflows and can run n8n in containers on your own servers, so your data stays with you. For a simple link between two apps, Zapier is often enough. When a workflow outgrows these tools, we build it as code.',
        },
        {
          id: 'fails',
          question: 'What happens if an automation fails?',
          answer:
            'Every automation logs what it did, and a failure alerts someone instead of failing silently.',
        },
        {
          id: 'ai',
          question: 'Where does AI fit in?',
          answer:
            'Where the input is messy, such as reading documents or routing free-text messages. Rule-based steps usually work better without it: for Alertia, plain rules spared the client an AI bill of around $1,000.',
        },
        COMMIT,
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
    steps: [
      {
        phase: 'Step 1',
        title: 'Free 20-minute review',
        description:
          'A founder and a senior engineer join the call. Bring one task, and we’ll tell you whether AI is the right tool for it.',
      },
      step2,
      {
        phase: 'Step 3',
        title: 'Built on your data',
        description:
          'We connect the model to your documents or databases and test it on real examples before anyone relies on it.',
      },
    ],
    faqs: [
      {
        id: 'accuracy',
        question: 'How do you stop AI from making things up?',
        answer:
          'By grounding it in your data. We use retrieval so the model looks answers up in your databases or documents before replying, as in Money Ball. Where a mistake would be costly, we add checks and human review.',
      },
      {
        id: 'agents',
        question: 'Can an AI agent take actions in our systems?',
        answer:
          'Yes. We build agents that read context, call your tools and APIs and carry out defined workflows. Each one has limits on what it can change, and a person approves the steps that matter.',
      },
      {
        id: 'cost',
        question: 'How much does it cost?',
        answer:
          'It depends on the task and your data, so we price it after the review: you get a fixed price, agreed before we start.',
      },
      {
        id: 'models',
        question: 'Which AI models do you use?',
        answer:
          'OpenAI and Anthropic models, open models from Hugging Face, and custom models in PyTorch or TensorFlow. We choose per task, weighing accuracy, cost and where your data is allowed to go.',
      },
      {
        id: 'data',
        question: 'How do you handle our business data?',
        answer:
          'We agree up front where your data may go, then design around it. That covers which model providers can see it, whether it stays in your own cloud account, and which parts of the system can access what.',
      },
      {
        id: 'existing',
        question: 'Can you add AI to software we already have?',
        answer:
          'Yes. Most of our AI work adds a capability to a product that already exists, such as document extraction, search or drafting, connected through your current APIs and databases.',
      },
      COMMIT,
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
