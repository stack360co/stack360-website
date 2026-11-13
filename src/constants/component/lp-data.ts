import { SITE_PHONE_E164, SITE_PROFILES } from '@/constants/site';

/**
 * Landing pages for Google Ads traffic, at /lp/<slug>. One template, one page per ad group. Each
 * page opens with the searcher's problem, then the outcome, then the offer, in the same words as
 * its ads (the marketing chat's "Google Ads ready-to-apply" notes in ~/stack360-crm/hub/notes).
 *
 * Every claim here is already on stack360.co (the automation and AI pages, the portfolio, the blog
 * and the reviews). Keep it that way: add a figure only once it is published elsewhere on the site.
 * The pages are noindex and left out of the sitemap, so they don't compete with the SEO pages.
 */

export type LpTheme = 'automation' | 'ai' | 'presence';

export interface LpVariant {
  slug: string;
  /** Picks the offer wording, the form's question, the steps and the FAQ. */
  theme: LpTheme;
  /** Fixed-price packages shown under the free review (#pricing), in order. Empty: no prices. */
  packages: readonly LpPackageId[];
  /** Replaces a package's one-line summary on this page, e.g. "built in your own n8n". */
  packageSummaries?: Partial<Record<LpPackageId, string>>;
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
  /** A line under the proof section's heading. */
  proofNote?: string;
  /** Adds the "law firms and accountants" section (#legal-accounting). */
  legalAccounting?: boolean;
}

export const LP_VARIANTS: readonly LpVariant[] = [
  {
    slug: 'automation',
    theme: 'automation',
    packages: ['single', 'pack', 'presence', 'care'],
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
    packages: ['single', 'pack', 'presence', 'care'],
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
    packages: ['single', 'pack', 'care'],
    packageSummaries: {
      single: 'One workflow, built in your own n8n, cloud or self-hosted.',
      pack: '3 connected workflows in your own n8n that pass data between your tools.',
    },
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
    packages: [],
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
    packages: ['chatbot', 'care'],
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
  {
    slug: 'online-presence',
    theme: 'presence',
    packages: ['presence', 'care'],
    title: 'Google Business Profile, Reviews and Leads: Free 20-Minute Review',
    description:
      'Not showing up when local customers search on Google? We refresh your website, set up your Google Business Profile, ask every customer for a review and put every enquiry in one pipeline.',
    eyebrow: 'Local search and lead capture',
    headline: 'Not showing up when local customers search on Google?',
    subhead:
      'We refresh your website, set up your Google Business Profile, ask every customer for a review, and put every enquiry in one pipeline. Fixed price, live in 3–4 weeks.',
    topic: 'the online presence and lead engine',
    proof: ['luxeSeo', 'luxeReviews', 'luxePin'],
    proofNote:
      'We ask every customer for a review, not just the happy ones, as Google’s rules require.',
  },
];

export const getLpVariant = (slug: string) => LP_VARIANTS.find((variant) => variant.slug === slug);

/* ------------------------------------------------------------------------------------------------
 * WhatsApp
 * --------------------------------------------------------------------------------------------- */

/** WhatsApp messages only (+44 7460 333169, the site footer's WhatsApp number): no calls from the ads. */
const WHATSAPP_NUMBER = SITE_PHONE_E164.replace(/[^0-9]/g, '');

/** Click-to-chat link with the page in the message, so the CRM can tell where the chat came from. */
export const lpWhatsAppLink = (variant: LpVariant) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Stack360, I'm interested in ${variant.topic} (from /lp/${variant.slug})`
  )}`;

/* ------------------------------------------------------------------------------------------------
 * Packages and prices
 * --------------------------------------------------------------------------------------------- */

/**
 * The final, profit-checked price list Waris approved on 13 Nov 2026 (research note "UK pricing
 * benchmark", sections 3 and 10). Stack360 Ltd is VAT-registered, so every price is shown with
 * VAT added at 20%. Google Ads requires the price in an ad to match the page exactly, so change
 * ads and pages together. Prices appear on the /lp pages only, not on the main site.
 */
export const VAT_LABEL = '+ VAT at 20% (business price)';

export const formatPrice = (value: number) => `£${value.toLocaleString('en-GB')}`;

export type LpPackageId = 'single' | 'pack' | 'presence' | 'care' | 'chatbot';

export interface LpPackage {
  name: string;
  price: number;
  /** "from £X": the price for the scope shown. */
  from?: boolean;
  /** Shown after the price, e.g. "a month". */
  per?: string;
  timing: string;
  payment: string;
  summary: string;
  includes: string[];
  /** Small print: what the fixed price doesn't cover. */
  excluded: string;
}

const AUTOMATION_EXCLUDED = 'Tool subscriptions, AI usage, apps with no API, cleaning messy data';

export const LP_PACKAGES: Record<LpPackageId, LpPackage> = {
  single: {
    name: 'Single automation',
    price: 1195,
    from: true,
    timing: 'Live in about 1 week',
    payment: 'Paid in full at the start',
    summary: 'One workflow, end to end, in n8n, Make, Zapier or as code.',
    includes: [
      'One trigger, up to 4 connected apps with APIs, up to about 15 steps',
      'One AI step allowed',
      'A short discovery call, then testing on real cases',
      'Failures flagged to a person',
      'A handover video and 30 days of fixes',
    ],
    excluded: `${AUTOMATION_EXCLUDED}.`,
  },
  pack: {
    name: 'Business automation pack',
    price: 2950,
    from: true,
    timing: 'Live in 2–3 weeks',
    payment: '50% at the start, 50% at go-live',
    summary: '3 connected workflows that pass data between your tools.',
    includes: [
      '3 workflows included; extra workflows £695 each, up to 5',
      'A person able to override each one',
      'A half-day discovery session',
      'A walkthrough for your staff',
      '60 days of fixes',
    ],
    excluded: `${AUTOMATION_EXCLUDED}, data migration, custom software.`,
  },
  presence: {
    name: 'Online presence and lead engine',
    price: 2450,
    from: true,
    timing: 'Live in 3–4 weeks',
    payment: '50% at the start, 50% at go-live',
    summary: 'Get found on Google, get reviewed and catch every enquiry.',
    includes: [
      'Up to 6 pages of your existing site refreshed (mobile speed, schema, copy edits)',
      'Google Business Profile set up and optimized, with the first 4 posts',
      'A review request sent after each job',
      'Leads from forms, calls and WhatsApp clicks in one CRM pipeline',
      'GA4 and Search Console, with conversions tracked',
    ],
    excluded: 'New copywriting beyond edits, photography, CRM or SMS licenses, ad spend.',
  },
  chatbot: {
    name: 'AI Chatbot Pilot',
    price: 1950,
    timing: 'Live in 1 week, then a 30-day pilot',
    payment: 'Paid in full at the start',
    summary: 'A chatbot that answers from your own records.',
    includes: [
      'Trained on your website, FAQs and up to 20 documents',
      'On your website (WhatsApp +£300)',
      'Leads into your CRM or inbox',
      'Hands off to a person, with guardrails',
      'A 30-day pilot with weekly tuning',
    ],
    excluded:
      'Model and hosting costs, paid direct (typically £20–£60 a month), WhatsApp API fees.',
  },
  care: {
    name: 'Care plan',
    price: 199,
    per: 'a month',
    timing: 'Monthly, cancel with 30 days’ notice',
    payment: 'Monthly in advance',
    summary: 'We monitor and fix what we built. Offered with every package.',
    includes: [
      'Monitoring of up to 5 automations, or one chatbot',
      'Fixes within 2 working days',
      'Hosting and updates for a site we built',
      'Up to 2 hours of changes a month',
      'A one-page monthly report; the first 30 days after a build are included',
    ],
    excluded: 'New builds, third-party subscriptions.',
  },
};

/** True for every package. Shown under the cards. */
export const LP_PACKAGE_TERMS =
  'Every package is a fixed price, agreed up front. You own every account and workflow, and a care plan is offered with every package.';

/** A package's price with "from" and the period, for running text. */
export const priceText = (id: LpPackageId) => {
  const pkg = LP_PACKAGES[id];
  return `${pkg.from ? 'from ' : ''}${formatPrice(pkg.price)}${pkg.per ? ` ${pkg.per}` : ''}`;
};

/* ------------------------------------------------------------------------------------------------
 * Proof
 * --------------------------------------------------------------------------------------------- */

export type LpProofId =
  | 'luxe'
  | 'luxeSeo'
  | 'luxeReviews'
  | 'luxePin'
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

const LUXE = { client: 'Luxe Excursions', context: 'UK tour company in Tenerife' };

export const LP_PROOF: Record<LpProofId, LpProof> = {
  luxe: {
    ...LUXE,
    metric: '75% → 0%',
    metricLabel: 'Booking refusals',
    description:
      'Guests choose their activities and pay online, and the booking and tickets follow on their own. Staff get an email the moment a booking is paid, with the guest set as reply-to.',
  },
  luxeSeo: {
    ...LUXE,
    metric: '100',
    metricLabel: 'Google’s own SEO check',
    description:
      'We run its SEO, Google Ads and Business Profile. Google’s own SEO check scores the site 100, the main image shows in 1.3 seconds on a phone, and bookings, trip requests and WhatsApp clicks are tracked in Google Analytics.',
  },
  luxeReviews: {
    ...LUXE,
    metric: 'Every guest',
    metricLabel: 'Asked for a Google review',
    description:
      'Every guest gets one automatic review request the day after their trip, whatever we think of how it went, because Google forbids asking only happy customers.',
  },
  luxePin: {
    ...LUXE,
    metric: '460 m',
    metricLabel: 'Map pin error, corrected',
    description:
      'A guest followed the map to the wrong street: the Business Profile pin was about 460 m from the shop. We corrected the address and pin on Google, the website and Facebook.',
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
 * Page content: offer, form, steps, FAQ, closing
 * --------------------------------------------------------------------------------------------- */

export interface LpFaq {
  id: string;
  question: string;
  answer: string;
}

export interface LpPageContent {
  offer: { title: string; cardTitle: string; description: string };
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
    'You do. You own every account, and everything we build for you, including the source code and the intellectual property in it, belongs to you.',
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

/** The cost and payment answers, built from the packages this page actually shows. */
function pricingFaqs(variant: LpVariant): LpFaq[] {
  if (variant.packages.length === 0) {
    return [
      {
        id: 'cost',
        question: 'How much does it cost?',
        answer:
          'It depends on the task and your data, so we price it after the review: you get a fixed price, agreed up front.',
      },
    ];
  }
  const list = variant.packages.map((id) => `${LP_PACKAGES[id].name} ${priceText(id)}`).join('; ');
  const payment = variant.packages
    .map((id) => `${LP_PACKAGES[id].name}: ${LP_PACKAGES[id].payment.toLowerCase()}.`)
    .join(' ');
  return [
    {
      id: 'cost',
      question: 'How much does it cost?',
      answer: `Fixed prices, agreed up front, + VAT at 20%: ${list}. Larger or custom projects are quoted after the review, and work outside a package is quoted in writing first.`,
    },
    {
      id: 'payment',
      question: 'How do payments work?',
      answer: `${payment} You own every account and workflow.`,
    },
  ];
}

export function getLpPageContent(variant: LpVariant): LpPageContent {
  if (variant.theme === 'automation') {
    return {
      offer: {
        title: 'Book a free 20-minute automation review',
        cardTitle: 'Free 20-minute automation review',
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
            'Each automation is tested on real cases and switched on with a person able to override it. A single automation goes live in about a week, a pack in 2–3 weeks.',
        },
      ],
      faqs: [
        {
          id: 'what',
          question: 'What can you automate?',
          answer:
            'Booking and order alerts, review requests and reminders, inventory and order syncs, invoice generation, document checks and support routing. Each of these runs in a project we have built.',
        },
        ...pricingFaqs(variant),
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

  if (variant.theme === 'presence') {
    return {
      offer: {
        title: 'Book a free 20-minute review',
        cardTitle: 'Free 20-minute review',
        description: 'We’ll show you what’s holding your Google listing back.',
      },
      jobField: {
        label: 'What does your business do, and what isn’t working?',
        placeholder: 'e.g. Plumber in Leeds. Few Google reviews and the phone isn’t ringing',
        tab: 'Send the details',
      },
      steps: [
        {
          phase: 'Step 1',
          title: 'Free 20-minute review',
          description:
            'A founder and a senior engineer join the call and show you what’s holding your Google listing back.',
        },
        step2,
        {
          phase: 'Step 3',
          title: 'Live in 3–4 weeks',
          description:
            'We refresh up to 6 pages of your site, set up your Business Profile, switch on review requests and put every enquiry in one pipeline.',
        },
      ],
      faqs: [
        {
          id: 'new-site',
          question: 'Do I need a new website?',
          answer:
            'No. We refresh up to 6 pages of the site you already have, in its current brand: mobile speed, schema and copy edits.',
        },
        ...pricingFaqs(variant),
        {
          id: 'reviews',
          question: 'How do the review requests work?',
          answer:
            'A request goes out after each job. We ask every customer, not just the happy ones, as Google’s rules require.',
        },
        {
          id: 'after',
          question: 'What happens after the 3–4 weeks?',
          answer: `You can take the care plan at ${priceText('care')} + VAT at 20%, cancel with 30 days’ notice, or run it all yourself. You own every account either way.`,
        },
        {
          id: 'ranking',
          question: 'Can you promise a top spot on Google?',
          answer:
            'No one can honestly promise rankings. We fix what is in your control: an accurate, complete Business Profile, a steady flow of reviews, a fast site and every enquiry in one place.',
        },
        COMMIT,
        OWNERSHIP,
        WHO,
        REPLY,
      ],
      closing: {
        title: 'Ready to be found, reviewed and called?',
        description:
          'Book a free 20-minute review. We’ll show you what’s holding your Google listing back.',
      },
    };
  }

  return {
    offer: {
      title: 'Book a free 20-minute AI review',
      cardTitle: 'Free 20-minute AI review',
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
        description: variant.packages.includes('chatbot')
          ? 'We connect the chatbot to your documents and test it on real questions. The pilot goes live in a week, then we tune it weekly for 30 days.'
          : 'We connect the model to your documents or databases and test it on real examples before anyone relies on it.',
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
      ...pricingFaqs(variant),
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
