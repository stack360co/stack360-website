import {
  LAHORE_OFFICE_ADDRESS,
  LAHORE_OFFICE_HOURS,
  LAHORE_OFFICE_MAP_URL,
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_PHONE,
  SITE_PHONE_PK,
  SITE_PHONE_PK_HREF,
  SITE_PHONE_USA,
  SITE_PHONE_USA_HREF,
} from '@/constants/site';

export const CONTACT_HERO = {
  eyebrow: 'Contact',
  title: 'Talk to us about your next build.',
  description:
    'Whether you need a dedicated engineering pod or a full product partner, our team responds fast with clear next steps — no sales maze.',
} as const;

export const CONTACT_CTA = {
  title: 'Prefer to explore before we meet?',
  description:
    'Review our case studies and partnership model — then reach out when you are ready to scope.',
  primary: { label: 'Partner with us', href: '/work-with-us/software-partner' },
  secondary: { label: 'See our work', href: '/our-work/case-studies' },
} as const;

export const CONTACT_CHANNELS = [
  {
    type: 'phone',
    label: 'WhatsApp (UK)',
    value: SITE_PHONE,
    href: `https://wa.me/${SITE_PHONE.replace(/[^0-9]/g, '')}`,
    hint: LAHORE_OFFICE_HOURS,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    type: 'phone',
    label: 'US',
    value: SITE_PHONE_USA,
    href: SITE_PHONE_USA_HREF,
    hint: LAHORE_OFFICE_HOURS,
    target: '_self',
    rel: undefined,
  },
  {
    type: 'email',
    label: 'Email',
    value: SITE_EMAIL,
    href: SITE_EMAIL_HREF,
    hint: 'We reply within one business day',
    target: '_self',
    rel: undefined,
  },
] as const;

export const CONTACT_OFFICES = [
  {
    country: 'Pakistan',
    role: 'Lahore office · where our team works',
    flagSrc: 'https://flagcdn.com/pk.svg',
    address: LAHORE_OFFICE_ADDRESS,
    phone: { label: SITE_PHONE_PK, href: SITE_PHONE_PK_HREF },
    hours: LAHORE_OFFICE_HOURS,
    mapUrl: LAHORE_OFFICE_MAP_URL,
  },
  {
    country: 'United States',
    role: 'Registered address · Stack360 Ai Solutions LLC',
    flagSrc: 'https://flagcdn.com/us.svg',
    address: '12828 Willow Centre Dr, Houston, TX 77066, USA',
  },
  {
    country: 'United Kingdom',
    role: 'Mailing address',
    flagSrc: 'https://flagcdn.com/gb.svg',
    address: '58 St. Johns Road, Barking, Essex, IG11 7XL, United Kingdom',
  },
] as const;

export const CONTACT_FORM_FIELDS = [
  { id: 'name', label: 'Full name', type: 'text', placeholder: 'Jane Smith' },
  { id: 'email', label: 'Work email', type: 'email', placeholder: 'jane@company.com' },
] as const;
