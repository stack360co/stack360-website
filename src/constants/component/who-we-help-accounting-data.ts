/**
 * /who-we-help/accounting-firms: the indexed page for UK accountancy and bookkeeping firms (Waris,
 * 24 Nov 2026: "go all fronts on accounting in UK"). It makes the same checked claims as the ads
 * page /lp/accounting-automation, but shows no prices (prices are on the /lp pages and in ads only)
 * and doesn't link to the /lp page, so organic visitors stay on indexed pages.
 *
 * Rules (HQ's note of 24 Nov 2026, and Waris on 26 Nov):
 * - The auditing firm is never named: "a US auditing firm". Its AI audit modules are only ever
 *   "in testing", with no figures. "Weeks to days" is worded as elsewhere on the site.
 * - We collect ID and AML documents; never say we run AML or ID checks.
 * - Not here until Waris OKs them: engagement letters, tool-integration claims (Xero, QuickBooks,
 *   Dext, MTD software), the ATC/Zoho work.
 * - No location for the team, and no UK office or UK team claim.
 * - MTD facts are GOV.UK's (linked); add no more without a source.
 */

export const ACCOUNTING_HERO = {
  eyebrow: 'Who We Help',
  title: 'Automation for UK',
  highlight: 'accounting firms.',
  description:
    'Document requests and reminders that go out to your clients on their own, onboarding that lands in your practice tools, and syncs so nobody retypes data. For accountancy and bookkeeping firms.',
  cta: { label: 'Book a free automation review', href: '/contact' },
} as const;

export const ACCOUNTING_JOBS = {
  title: 'What we automate for accountancy firms',
  intro:
    'The admin that eats a firm’s week. Every run is logged, a failure alerts a person instead of failing silently, and a person can override each automation.',
  items: [
    {
      title: 'Document requests, automated',
      description:
        'Requests go out to clients on their own before each deadline, so nobody has to remember to send them.',
    },
    {
      title: 'Reminders until clients upload',
      description:
        'Reminders that send themselves until the client uploads what you asked for, and a list of who is still missing what.',
    },
    {
      title: 'Staff alerted when files land',
      description:
        'The right person hears the moment a client’s files arrive, instead of checking an inbox.',
    },
    {
      title: 'Client onboarding, automated',
      description:
        'Onboarding questionnaires, and secure uploads for the ID and AML documents your checks need. You run the checks; the details land in your practice tools once.',
    },
    {
      title: 'A client portal for your firm',
      description:
        'One secure place where clients answer questionnaires, upload documents and message your team, like the portal we build for a US auditing firm.',
    },
    {
      title: 'Syncs so nobody retypes data',
      description:
        'Data moves between the systems you already use, so the same figures aren’t keyed in twice.',
    },
  ],
} as const;

export const ACCOUNTING_MTD = {
  eyebrow: 'Making Tax Digital for Income Tax',
  title: 'More clients on MTD means more chasing every quarter',
  intro:
    'Making Tax Digital for Income Tax brings sole-trader and landlord clients into quarterly updates in three waves, by their qualifying income from self-employment and property. Each client who joins adds four quarterly updates a year, and each update starts with chasing records.',
  thresholdsTitle: 'Who joins, and when',
  thresholds: [
    { label: 'From 6 April 2026', value: 'Qualifying income over £50,000' },
    { label: 'From 6 April 2027', value: 'Qualifying income over £30,000' },
    { label: 'From 6 April 2028', value: 'Qualifying income over £20,000' },
    {
      label: 'Quarterly update deadlines',
      // Non-breaking spaces keep each date on one line.
      value: '7 August, 7 November, 7 February and 7 May',
    },
  ],
  sources: [
    {
      label:
        'GOV.UK: find out if and when you need to use Making Tax Digital for Income Tax (updated 26 March 2026)',
      href: 'https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax',
    },
    {
      label: 'GOV.UK: send quarterly updates (updated 18 November 2026)',
      href: 'https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/send-quarterly-updates',
    },
  ],
  buildTitle: 'What we automate around MTD',
  build: [
    'Record requests that go out on their own before each quarterly update.',
    'Reminders to the client until the records arrive, and your staff alerted the moment they do.',
    'A list for your team of which clients are still missing records, and for which deadline.',
  ],
  note: 'Your team still checks the work and sends each update from its MTD software. The automations do the chasing around it.',
} as const;

export const ACCOUNTING_PROOF = {
  title: 'Work we have built',
  intro:
    'The auditing firm and the bookkeeping firm are US clients; Luxe Excursions is a UK company. The same kinds of automation work for UK firms, around UK deadlines such as MTD.',
  items: [
    {
      client: 'A US auditing firm',
      context: 'Client portal and audit workflows',
      metric: 'Weeks → days',
      metricLabel: 'Client review process',
      description:
        'We build its multi-tenant platform, which cut a client review process from weeks to days. Clients fill in onboarding questionnaires, upload documents securely and chat with the firm, and everyone assigned to a client is notified. AI audit modules are in testing with the firm.',
    },
    {
      client: 'A US bookkeeping firm',
      context: 'Leads from Meta, LinkedIn, Google Ads, the website and calls',
      metric: 'Text + email',
      metricLabel: 'Sent to every new lead straight away',
      description:
        'Each new lead gets a text and an email immediately and is assigned to a rep, and the follow-up stops when the lead replies. We configured an existing tool instead of building a CRM.',
    },
    {
      client: 'Natif.ai',
      context: 'Document processing',
      metric: 'Scans + handwriting',
      metricLabel: 'Read automatically',
      description:
        'AI that pulls the fields out of invoices, forms and low-quality scans, so staff stop keying them in. A person reviewed every extraction before it was used.',
    },
    {
      client: 'Luxe Excursions',
      context: 'UK tour company in Tenerife',
      metric: '75% → 0%',
      metricLabel: 'Booking refusals',
      description:
        'Guests choose their activities and pay online, and the booking and tickets follow on their own. Staff get an email the moment a booking is paid.',
    },
  ],
  review: {
    quote:
      'Stack360 built … from the ground up, including multi-tenant workflows, secure client portals, and the automation we needed to run a modern accounting and tax practice at scale.',
    name: 'Founder',
    role: 'Certified Public Accountant',
    company: 'A US auditing firm',
  },
} as const;

export const ACCOUNTING_AI = {
  title: 'AI where it helps, plain rules where they’re enough',
  intro:
    'Deadlines and checks are rules someone has already written, so they run better as plain automation: predictable, logged and easy to test. AI earns its place where the input is messy.',
  points: [
    { label: 'AI reads', text: 'Invoices, forms, low-quality scans and free-text messages.' },
    {
      label: 'Plain rules run',
      text: 'Deadlines, reminders and checks your process already defines.',
    },
    { label: 'People review', text: 'Anything where a mistake would be costly.' },
  ],
} as const;

export const ACCOUNTING_FAQS = [
  {
    id: 'accounting-mtd',
    question: 'Do you send MTD quarterly updates for us?',
    answer:
      'No. Quarterly updates go to HMRC from compatible software, sent by you or your client. We automate the work around them: requesting records, reminding clients and showing your team who is still missing what.',
  },
  {
    id: 'accounting-tools',
    question: 'Which tools can you connect?',
    answer:
      'Tools with an API, such as practice management systems, CRMs, email, calendars, forms, e-signature and document storage. We check your tools in the free review, and if one has no API, we say so. We build in n8n, Make or Zapier, or as code, and n8n can run on your own servers.',
  },
  {
    id: 'accounting-data',
    question: 'How do you keep client data safe under UK GDPR?',
    answer:
      'We build in accounts you own, and n8n can run on your own servers, so client data stays in systems you control. We work through access you grant and can remove at any time, each automation only reaches the data it needs, and every run is logged. Before any personal data goes to an outside service, such as an AI model, we agree it with you. Our privacy notice sets out how we handle personal data.',
  },
  {
    id: 'accounting-cost',
    question: 'How much does it cost?',
    answer:
      'Every automation is a fixed price, agreed up front after a free 20-minute review, and you own every account and workflow. Larger projects, such as a client portal, are quoted after the review.',
  },
  {
    id: 'accounting-time',
    question: 'How long does it take?',
    answer:
      'A single automation goes live in about a week, and three connected automations in 2–3 weeks. You get a written plan with milestones within two business days of the free review.',
  },
  {
    id: 'accounting-experience',
    question: 'Have you worked with accounting firms before?',
    answer:
      'Yes. For a US auditing firm, we build a multi-tenant client portal with onboarding questionnaires, secure document upload, engagements, staff roles, chat and notifications, and it cut a client review process from weeks to days. For a US bookkeeping firm, every new lead gets a text and an email straight away and goes to a named person.',
  },
  {
    id: 'accounting-ai-audit',
    question: 'Can you use AI for audit and review work?',
    answer:
      'Carefully. With a US auditing firm we are testing AI modules that draft audit planning documents and match statements against the ledger. The AI reads the documents, plain code does every calculation, and people review every exception and conclusion. They are in testing with the firm, not live yet.',
  },
  {
    id: 'accounting-who',
    question: 'Who is Stack360?',
    answer:
      'Stack360 Ltd is a UK company. We have delivered 200+ projects since 2019 for UK and US businesses, and a founder and a senior engineer join the first call.',
  },
] as const;

export const ACCOUNTING_CTA = {
  title: 'Ready to stop chasing clients for records?',
  description:
    'Book a free 20-minute automation review. Tell us one job your firm repeats, and we’ll show you what to automate first.',
  primary: { label: 'Book a free automation review', href: '/contact' },
  secondary: { label: 'Our automation services', href: '/what-we-build/automation' },
} as const;
