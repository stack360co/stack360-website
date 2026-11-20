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
  /**
   * The page's H1: the words people search for, so Google Ads rates the page relevant to the
   * keyword. Never implies a UK office or a UK-based team.
   */
  h1: string;
  /** The searcher's problem, as a question, under the H1. Matches the ads' first headline. */
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
  /** Sections for one trade (LP_SECTORS), each at its own id, before the prices. */
  sectors?: readonly LpSectorId[];
  /** Adds the Luxe case study (#luxe) after the proof cards: automation or Google-side version. */
  caseStudy?: 'automation' | 'google';
  /** The client quote in the proof section when there's no case study (default: Mitchell's). */
  proofReview?: LpReviewId;
}

export const LP_VARIANTS: readonly LpVariant[] = [
  {
    slug: 'automation',
    theme: 'automation',
    packages: ['single', 'pack', 'presence', 'monitoring', 'care'],
    title: 'Business Automation Services for UK Firms',
    description:
      'Still retyping data between systems? We connect your tools so the data moves on its own. Fixed-price packages and a free 20-minute review.',
    eyebrow: 'Business automation',
    h1: 'Business automation services for UK firms',
    headline: 'Still retyping data between systems?',
    subhead:
      'We connect your tools so the data moves on its own, with every run logged and failures flagged to a person. Start with a free 20-minute review.',
    topic: 'automation',
    proof: ['luxe', 'cercle', 'alertia'],
    legalAccounting: true,
    sectors: ['lettings'],
    caseStudy: 'automation',
  },
  {
    slug: 'ai-automation',
    theme: 'automation',
    packages: ['single', 'pack', 'presence', 'monitoring', 'care'],
    title: 'AI Automation Agency for UK Businesses',
    description:
      'Jobs your team keeps forgetting? Staff get an alert the moment a lead or booking arrives. Fixed-price packages and a free 20-minute review.',
    eyebrow: 'AI automation',
    h1: 'AI automation agency for UK businesses',
    headline: 'Jobs your team keeps forgetting?',
    subhead:
      'We automate the jobs that depend on someone remembering, so staff get an alert the moment a lead or booking arrives. A free 20-minute review tells you what to automate first.',
    topic: 'AI automation',
    proof: ['luxe', 'bookkeeping', 'alertia'],
    caseStudy: 'automation',
  },
  {
    slug: 'n8n',
    theme: 'automation',
    packages: ['single', 'pack', 'monitoring', 'care'],
    packageSummaries: {
      single: 'One workflow, built in your own n8n, cloud or self-hosted.',
      pack: '3 connected workflows in your own n8n that pass data between your tools.',
    },
    title: 'n8n Agency: Workflows Built and Monitored for You',
    description:
      'n8n workflows breaking without anyone noticing? We build and look after n8n workflows that report their own failures, on your own servers if you want.',
    eyebrow: 'n8n automation',
    h1: 'n8n agency: workflows built and monitored for you',
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
    title: 'AI Agent Development for UK Businesses',
    description:
      'Requests piling up and documents read by hand? AI agents that work from your own data, with a person checking where it matters.',
    eyebrow: 'AI agent development',
    h1: 'AI agent development for UK businesses',
    headline: 'Requests piling up and documents read by hand?',
    subhead:
      'AI agents that work from your own data and tools, with a person checking where it matters. Start with a free 20-minute review of the task.',
    topic: 'AI agents',
    proof: ['natif', 'moneyball', 'alertia'],
    proofReview: 'corcoran',
  },
  {
    slug: 'ai-chatbots',
    theme: 'ai',
    packages: ['chatbot', 'monitoring', 'care'],
    title: 'AI Chatbot Development for UK Businesses',
    description:
      'Answering the same questions all day? A chatbot that looks the answer up in your own records before it replies. Book a free 20-minute review.',
    eyebrow: 'AI chatbot development',
    h1: 'AI chatbot development for UK businesses',
    headline: 'Answering the same questions all day?',
    subhead:
      'A chatbot that looks the answer up in your own records before it replies, so it doesn’t make things up. Start with a free 20-minute review.',
    topic: 'an AI chatbot',
    proof: ['moneyball', 'natif', 'luxe'],
    proofReview: 'corcoran',
  },
  {
    slug: 'online-presence',
    theme: 'presence',
    packages: ['presence', 'monitoring', 'care'],
    title: 'Google Business Profile and Local SEO for Small Businesses',
    description:
      'Not showing up when local customers search on Google? We refresh your website, set up your Google Business Profile, ask every customer for a review and put every enquiry in one pipeline.',
    eyebrow: 'Local search and lead capture',
    h1: 'Google Business Profile and local SEO for small businesses',
    headline: 'Not showing up when local customers search on Google?',
    subhead:
      'We refresh your website, set up your Google Business Profile, ask every customer for a review, and put every enquiry in one pipeline. Fixed price, live in 3–4 weeks.',
    topic: 'the online presence and lead engine',
    proof: ['luxeSeo', 'luxeReviews', 'luxePin'],
    sectors: ['vets'],
    caseStudy: 'google',
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

export type LpPackageId = 'single' | 'pack' | 'presence' | 'chatbot' | 'monitoring' | 'care';

/** The two monthly plans offered after go-live (approved by Waris on 17 Nov 2026). */
export const isLpPlan = (id: LpPackageId) => id === 'monitoring' || id === 'care';

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
  monitoring: {
    name: 'Monitoring plan',
    price: 199,
    per: 'a month',
    timing: 'Monthly, cancel with 30 days’ notice',
    payment: 'Monthly in advance',
    summary: 'We watch what we built and tell you when something breaks.',
    includes: [
      'Monitoring of up to 5 automations, or one chatbot',
      'Alerts when something breaks, and a one-page monthly report',
      'Hosting and security updates for a site we built',
      'The first 30 days after a build are included',
      'Fixes and changes are quoted in writing first',
    ],
    excluded: 'New builds, third-party subscriptions.',
  },
  care: {
    name: 'Care plan',
    price: 700,
    per: 'a month',
    timing: 'Monthly, cancel with 30 days’ notice',
    payment: 'Monthly in advance',
    summary: 'Monitoring, plus fixes within 2 working days and monthly changes.',
    includes: [
      'Everything in Monitoring',
      'Fixes within 2 working days',
      'Up to 5 hours of changes a month (unused hours don’t carry over)',
      'Anything beyond that is quoted in writing first',
    ],
    excluded: 'New builds, third-party subscriptions.',
  },
};

/**
 * True for every package. Shown under the cards. The last sentence keeps the plans in line with
 * the guarantee: our own bugs are fixed free during the fix period, plan or no plan.
 */
export const LP_PACKAGE_TERMS =
  'Every package is a fixed price, agreed up front. You own every account and workflow. After go-live you can add the Monitoring or Care plan, or run it all yourself. Bugs in what we built are fixed free during its fix period, with or without a plan.';

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

/**
 * "For accounting practices" inside /lp/automation#legal-accounting, at #accountants. UK cold
 * emails to accountancy practices link here. Approved by Waris on 16 Nov 2026 (marketing chat's
 * note "accountants section and ads"). UK spelling.
 *
 * Don't add Xero, QuickBooks, Dext or MTD integration claims, or ATC/Zoho proof: none of them is
 * on the site. The MTD dates are GOV.UK's; add no more without a source.
 */
export const LP_ACCOUNTANTS = {
  title: 'For accounting practices',
  pain: 'Chasing clients for records every quarter?',
  mtd: 'Making Tax Digital for Income Tax applies to sole traders and landlords with income over £50,000 from April 2026, and over £30,000 from April 2027. Every client who moves onto it adds quarterly work.',
  mtdSource: {
    label: 'GOV.UK: when you need to use Making Tax Digital for Income Tax',
    href: 'https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax',
  },
  automate:
    'We automate the admin around it: document requests and reminders that go out on their own, client onboarding that lands in your practice tools, and syncs between the systems you already use, so nobody retypes data.',
  proof: [
    'For a bookkeeping firm, every new lead now gets a text and an email straight away and goes to a named person.',
    'For Natif.ai, we built AI that pulls the fields out of invoices, forms and low-quality scans, so staff stop keying them in.',
    'Deadlines and checks are rules, so we run them as plain automation: predictable, logged and easy to test.',
  ],
} as const;

/**
 * Sections for one trade, at /lp/<slug>#<id>. The B02 cold emails (December 2026) link straight
 * to them with utm_content=step2, so keep the ids. Brief from the cold email chat, 20 Nov 2026,
 * from emails Waris approved. UK spelling.
 *
 * Every fact and date is from the GOV.UK page in `source`; add no more without one. Lettings:
 * leave out the registration fee and any fines (only secondary sources give them). Vets: we help
 * practices publish and run what the order asks for, never legal advice. Neither section has a
 * client case study: none of our projects is in lettings or veterinary work.
 */
export type LpSectorId = 'lettings' | 'vets';

export interface LpSector {
  eyebrow: string;
  title: string;
  intro: string;
  changesTitle: string;
  /** A label (region or date) with a date range, or with the list of what applies from then. */
  changes: readonly { label: string; detail: string | readonly string[] }[];
  source: { label: string; href: string };
  buildTitle: string;
  build: readonly string[];
  note: string;
  price: string;
}

export const LP_SECTORS: Record<LpSectorId, LpSector> = {
  lettings: {
    eyebrow: 'For letting agents',
    title: 'Automations for letting agents: the rental register',
    intro:
      'England’s Register your rental property service opens region by region from 15 December 2026. Landlords start each registration. Agents can then add the tenancy details and the gas safety, EICR and EPC certificates through a link for each property. Landlords must keep the details up to date within 28 days of any change, and agents can send those updates for them.',
    changesTitle: 'Each region’s registration window',
    changes: [
      { label: 'West Midlands', detail: '15 Dec 2026 to 14 Mar 2027' },
      { label: 'East of England', detail: '15 Jan to 14 Apr 2027' },
      { label: 'East Midlands', detail: '15 Feb to 14 May 2027' },
      { label: 'South East', detail: '15 Mar to 14 Jun 2027' },
      { label: 'Yorkshire and Humberside', detail: '15 Apr to 14 Jul 2027' },
      { label: 'North West', detail: '15 May to 14 Aug 2027' },
      { label: 'North East', detail: '15 Jun to 14 Sep 2027' },
      { label: 'London', detail: '15 Jul to 14 Oct 2027' },
      { label: 'South West', detail: '15 Aug to 14 Nov 2027' },
    ],
    source: {
      label:
        'GOV.UK: Register your rental property service, guidance for letting agents and property managers (29 October 2026)',
      href: 'https://www.gov.uk/guidance/register-your-rental-property-service-guidance-for-letting-agents-and-property-managers',
    },
    buildTitle: 'What we automate',
    build: [
      'Expiry dates read from each new gas safety certificate, EICR and EPC, with that property’s register update queued for the right person.',
      'Reminders to the contractor and the landlord before a certificate expires.',
      'A nudge to landlords who haven’t registered before their region’s deadline.',
      'Every viewing request and out-of-hours enquiry logged, with the right person alerted.',
    ],
    note: 'Updates still go through each property’s GOV.UK link. The automations make sure the right person knows when one is due, and every run is logged.',
    price: `Three of these automations: fixed price from ${formatPrice(LP_PACKAGES.pack.price)} + VAT at 20%, and you pay the second half only once they work as agreed. A single automation from ${formatPrice(LP_PACKAGES.single.price)} + VAT at 20%.`,
  },
  vets: {
    eyebrow: 'For veterinary practices',
    title: 'Ready for the CMA’s vet pricing rules',
    intro:
      'The Competition and Markets Authority’s order on veterinary services changes what practices must publish and send to pet owners. These are the dates for businesses with 14 or fewer practices.',
    changesTitle: 'What the order asks for, and when',
    changes: [
      {
        label: 'From 23 March 2027',
        detail: [
          'A price list on your website for the standard services in Schedule 1 (up to 36), also available at each of your premises',
          'Information on who owns the business, its practices and how to complain',
          'The consultation price and a link to the price list in every booking confirmation sent by email or text',
          'Prices updated on the list before a new price is charged',
        ],
      },
      {
        label: 'From 23 September 2027',
        detail: [
          'Written estimates for treatment likely to cost £500 or more, in the cases the order sets out',
          'Itemised bills',
        ],
      },
    ],
    source: {
      label:
        'GOV.UK: small veterinary businesses complying with the CMA’s order (updated 15 October 2026)',
      href: 'https://www.gov.uk/guidance/small-veterinary-businesses-complying-with-the-cmas-order',
    },
    buildTitle: 'What we build',
    build: [
      'Your price list, ownership and complaints pages, kept in one place so a price change shows everywhere at once.',
      'The consultation price and a link to the price list added to every booking confirmation.',
      'Every complaint logged with the date it arrived.',
      'Optional: answers to price questions out of hours, taken from the published list.',
    ],
    note: 'We help you publish and run these. It isn’t legal advice: check what applies to your practice in the CMA’s guidance.',
    price: `The online presence package: fixed price from ${formatPrice(LP_PACKAGES.presence.price)} + VAT at 20%, and you pay the second half only once it works as agreed. The booking-message automation on its own from ${formatPrice(LP_PACKAGES.single.price)} + VAT at 20%.`,
  },
};

/* ------------------------------------------------------------------------------------------------
 * Guarantee, reviews and the Luxe case study (approved by Waris on 16 Nov 2026; marketing chat's
 * note "lp proof, reviews and guarantee"). The Luxe duration and cost are Waris's figures (16 Nov),
 * shown with Mitchell's OK. Cameron Kashani's and Mohammed Jafar's quotes stay off the /lp pages for now.
 * --------------------------------------------------------------------------------------------- */

/**
 * Option A, "works as agreed, or we fix it free". UK advertising rules want the significant
 * conditions next to the promise, so the terms render right under the line (#guarantee-terms).
 * Not about response times.
 */
export const LP_GUARANTEE = {
  title: 'Our guarantee',
  line: 'Every fixed-price build has a written scope and a go-live date. If it doesn’t do what the scope says, we fix it at no extra cost.',
  secondHalf:
    'On the pack and the online presence package, you pay the second half only once it works as agreed.',
  terms: [
    'Applies to fixed-price packages with a signed scope.',
    '“Works as agreed” means the acceptance checks written into that scope.',
    'Fixes during the package’s fix period are free.',
    'Scope changes are quoted in writing first.',
    'Doesn’t cover third-party outages or changes to a tool’s API.',
  ],
} as const;

export type LpReviewId = 'mitchell' | 'bilel' | 'corcoran' | 'ernest';

export interface LpReview {
  quote: string;
  name: string;
  role: string;
  company: string;
  source?: { label: string; href: string };
}

/** Exact words from the public review or the site's testimonial; shorten with an ellipsis only. */
export const LP_REVIEWS: Record<LpReviewId, LpReview> = {
  mitchell: {
    quote:
      'I had a fantastic experience with Stack360. The team developed our Luxe Excursions Tenerife website and set up our Google and Meta advertising campaigns. They brought experience and guided us on the technical side of our business. I appreciate their availability and reliability; they help answer our users’ questions on both the technical and business sides. They automated booking and ticket generation based on the excursions a person selects, and implemented a dynamic booking system and CMS. I value their technical knowledge, flawless communication, helpful answers, and proactive work with us toward a common goal. I highly recommend them.',
    name: 'Mitchell Woods',
    role: 'Director',
    company: 'Luxe Excursions Tenerife',
    source: { label: 'Verified review on G2', href: SITE_PROFILES.g2 },
  },
  bilel: {
    quote: 'The team successfully delivered the right feature on schedule.',
    name: 'Bilel Kedidi',
    role: 'CEO',
    company: 'B-Solution',
    source: { label: 'Verified review on Clutch', href: SITE_PROFILES.clutch },
  },
  corcoran: {
    quote:
      'I’m impressed with the personality and craftsmanship of the engineers… communication has always been great with keen attention to detail.',
    name: 'John Corcoran',
    role: 'CEO & Head of Product',
    company: 'Full Blown Media',
    source: { label: 'Verified review on Clutch', href: SITE_PROFILES.clutch },
  },
  ernest: {
    quote:
      'Stack360 built NPTAAS from the ground up, including multi-tenant workflows, secure client portals, and the automation we needed to run a modern accounting and tax practice at scale.',
    name: 'Ernest Tomkiewicz',
    role: 'Founder & Certified Public Accountant',
    company: 'NPTAAS',
  },
};

/** The Luxe case study (#luxe). Every line is on stack360.co (automation page, Luxe blog post). */
export const LP_LUXE_CASE = {
  eyebrow: 'Case study · Luxe Excursions Tenerife (UK company)',
  title: 'A tour company that hears about every booking the moment it’s paid',
  problem: [
    'The old booking planner refused 3 in 4 trips: 75% of every 3-activity combination on a 3-day stay. All 164 refusals came from the weekday data in the CMS, and 3 of 4 partner timetables were wrong.',
    'When a guest paid, only the guest got an email, so the team could miss a sale or a trip request.',
    'Google review requests went out by hand, when someone remembered.',
  ],
  built: [
    {
      title: 'Pay first, schedule after',
      text: 'Guests choose their activities and pay online, the booking and tickets follow on their own, and staff assign the times afterwards.',
    },
    {
      title: 'Instant staff alerts',
      text: 'An email the moment a booking is paid or a trip request comes in, with the guest as reply-to. Each alert goes out once per booking, so a payment retry never sends a duplicate.',
    },
    {
      title: 'Review requests on autopilot',
      text: 'One Google review request at 10:00 the day after the guest’s last activity, within a week of the trip, never twice, and never for test or agency bookings. Every guest is asked, as Google’s rules require.',
    },
    {
      title: 'Tracking',
      text: 'Bookings, trip requests and WhatsApp clicks tracked in Google Analytics, so Google Ads learns from them.',
    },
  ],
  builtGoogle: [
    {
      title: 'Review requests',
      text: 'Every guest gets one Google review request the day after their trip, and every guest is asked, as Google’s rules require.',
    },
    {
      title: 'Business Profile fixed',
      text: 'The Business Profile pin was about 460 m from the shop; we corrected it on Google, the website and Facebook.',
    },
    {
      title: 'Fast, findable site',
      text: 'Google’s own SEO check scores the site 100, and the main image shows in 1.3 seconds on a phone.',
    },
    {
      title: 'Tracking',
      text: 'Google Analytics tracks bookings, trip requests and WhatsApp clicks, and Google Ads learns from them.',
    },
  ],
  /** A past project's cost, billed in dollars, not an offer: so no "+ VAT". £ at $1.30–$1.38. */
  timeAndCost: '3 months from brief to live. Total cost: about £4,500 (US$6,000).',
  result: [
    'Booking refusals went from 75% to 0%.',
    'The team hears about every sale and enquiry as it happens, and review requests go out on their own.',
    'Staff edit tours, prices and images in the CMS without a developer.',
  ],
} as const;

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
  const builds = variant.packages
    .filter((id) => !isLpPlan(id))
    .map((id) => `${LP_PACKAGES[id].name}: ${LP_PACKAGES[id].payment.toLowerCase()}.`);
  const plans = variant.packages.some(isLpPlan)
    ? ['Monitoring and Care plans: monthly in advance, cancel with 30 days’ notice.']
    : [];
  const payment = [...builds, ...plans].join(' ');
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
          answer: `You can add the Monitoring plan at ${priceText('monitoring')} or the Care plan at ${priceText('care')}, + VAT at 20%, and cancel with 30 days’ notice. Or run it all yourself. You own every account either way.`,
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
