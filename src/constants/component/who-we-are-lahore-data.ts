import { CULTURE_FOUNDER } from '@/constants/component/who-we-are-culture-data';
import { HOW_WE_WORK_LEADERS } from '@/constants/component/who-we-are-how-we-work-data';
import {
  LAHORE_OFFICE_ADDRESS,
  LAHORE_OFFICE_HOURS,
  LAHORE_OFFICE_MAP_URL,
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_PHONE_PK,
  SITE_PHONE_PK_HREF,
} from '@/constants/site';

export const LAHORE_HERO = {
  eyebrow: 'Who We Are · Lahore Office',
  title: 'Our office in',
  highlight: 'DHA Phase 1, Lahore.',
  description:
    'The whole Stack360 team works from one office in DHA Phase 1, Lahore. It is where we build software for US and UK companies, and where the engineers who join our clients’ teams full time sit.',
} as const;

/** Address, hours and contact details, in the same words as the Google Business Profile. */
export const LAHORE_VISIT = {
  title: 'Visit or call',
  items: [
    { label: 'Address', value: LAHORE_OFFICE_ADDRESS },
    { label: 'Hours', value: LAHORE_OFFICE_HOURS },
    { label: 'Phone', value: SITE_PHONE_PK, href: SITE_PHONE_PK_HREF },
    { label: 'Email', value: SITE_EMAIL, href: SITE_EMAIL_HREF },
  ],
  directions: { label: 'Get directions on Google Maps', href: LAHORE_OFFICE_MAP_URL },
  note: 'The office stays open until 10:00 PM Pakistan time, so our engineers overlap at least 4 hours with a US working day.',
} as const;

export const LAHORE_FACTS = [
  { label: 'Founded', value: '2019' },
  { label: 'Team size', value: '10–49' },
  { label: 'Projects delivered', value: '200+' },
  { label: 'Clients', value: 'US and UK' },
] as const;

export const LAHORE_WORK = {
  title: 'What happens here',
  intro: 'Everything we do for clients runs from this office, in three ways.',
  items: [
    {
      title: 'We build products',
      description:
        'A founder and a senior engineer join the discovery call, the client gets a plan with milestones within two business days, and sees working software in a weekly demo.',
      href: '/who-we-are/how-we-work',
      cta: 'How we work',
    },
    {
      title: 'Our engineers join client teams',
      description:
        'Developers work full time inside a client’s team, shortlisted within 2 days after a technical interview, a coding test, a review of past work and an English check.',
      href: '/work-with-us/hire',
      cta: 'Hire developers',
    },
    {
      title: 'We train interns',
      description:
        'Interns work on real client projects, and senior engineers mentor them through code review and architecture sessions.',
      href: '/work-with-us/careers',
      cta: 'Careers and internships',
    },
  ],
} as const;

export const LAHORE_LEADERS = [
  CULTURE_FOUNDER,
  ...HOW_WE_WORK_LEADERS.filter((leader) => leader.role.startsWith('Co-Founder')),
] as const;

export const LAHORE_FAQS = [
  {
    id: 'where',
    question: 'Where is the Stack360 office?',
    answer: `${LAHORE_OFFICE_ADDRESS}. The whole team works here; our US and UK addresses are mailing addresses.`,
  },
  {
    id: 'hours',
    question: 'What are your office hours?',
    answer:
      'Monday to Friday, 10:00 AM to 10:00 PM Pakistan time (UTC+5). The office is closed on Saturday and Sunday.',
  },
  {
    id: 'clients',
    question: 'Do you work with companies outside Pakistan?',
    answer:
      'Yes. Since 2019 we have built software and placed dedicated developers for companies in the US and the UK. Our engineers overlap at least 4 hours with a US working day.',
  },
  {
    id: 'hiring',
    question: 'Is Stack360 hiring in Lahore?',
    answer:
      'Open roles and internships are listed on our careers page when we are hiring. Interns work on real client projects with a senior engineer as mentor.',
  },
  {
    id: 'contact',
    question: 'How do I contact the Lahore office?',
    answer: `Call ${SITE_PHONE_PK} or email ${SITE_EMAIL}. For directions, open our location on Google Maps.`,
  },
] as const;

export const LAHORE_CTA = {
  title: 'Work with the Lahore team',
  description:
    'Book a discovery call with a founder, or tell us which engineers you need for your team.',
  primary: { label: 'Talk to us', href: '/contact' },
  secondary: { label: 'Hire developers', href: '/work-with-us/hire' },
} as const;
