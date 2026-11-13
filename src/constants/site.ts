/** Canonical site origin — used by metadata, sitemap, robots, and JSON-LD. */
export const SITE_URL = 'https://stack360.co';
// export const SITE_URL = 'https://stack360static.netlify.app';
export const SITE_NAME = 'Stack360';
/** Page title / brand line from https://www.stack360.co/ */
export const SITE_TAGLINE = 'Your Reliable Software Development Agency';

/** Company description for the homepage meta and Organization schema; the same line as the footer. */
export const SITE_DESCRIPTION =
  'Stack360 builds software, automation and dedicated developer teams for UK and US companies. 200+ projects since 2019, built by our engineering team in Lahore.';

/** Sales inbox — display value and mailto target. */
export const SITE_EMAIL = 'sales@stack360.co';
export const SITE_EMAIL_HREF = `mailto:${SITE_EMAIL}` as const;

/**
 * UK number: WhatsApp messages only, no calls (Waris, 13 Nov 2026), so it links to WhatsApp,
 * never tel:. Display, E.164 and the click-to-chat link.
 */
export const SITE_PHONE = '+44 7460 333169';
export const SITE_PHONE_E164 = '+447460333169';
export const SITE_WHATSAPP_HREF = `https://wa.me/${SITE_PHONE_E164.slice(1)}` as const;

export const SITE_PHONE_USA = '+1 (713) 443 9180';

/** US phone — E.164 and tel: link (the display value is SITE_PHONE_USA). */
export const SITE_PHONE_USA_E164 = '+17134439180';
export const SITE_PHONE_USA_HREF = `tel:${SITE_PHONE_USA_E164}` as const;

/**
 * Lahore office, where the team works. Address, postcode, phone and hours match the
 * Google Business Profile (postcode 54660, confirmed 2026-10-16).
 */
export const SITE_PHONE_PK = '+92 331 1111753';
export const SITE_PHONE_PK_E164 = '+923311111753';
export const SITE_PHONE_PK_HREF = `tel:${SITE_PHONE_PK_E164}` as const;
export const LAHORE_OFFICE_POSTCODE = '54660';
export const LAHORE_OFFICE_ADDRESS = `82-G, First Floor, DHA Phase 1, Lahore ${LAHORE_OFFICE_POSTCODE}, Punjab, Pakistan`;
export const LAHORE_OFFICE_HOURS = 'Mon–Fri • 10:00 AM–10:00 PM Pakistan time (UTC+5)';
/** The Business Profile's own Maps place, so directions land on the right building. */
export const LAHORE_OFFICE_MAP_URL =
  'https://www.google.com/maps/place/?q=place_id:ChIJEwYaJrcFGTkRC8hxET6XWgo';

/** Stack360 Ltd, as registered at Companies House (incorporated 5 Nov 2026). */
export const UK_COMPANY_NAME = 'Stack360 Ltd';
export const UK_COMPANY_NUMBER = '17564014';
export const UK_OFFICE_ADDRESS =
  'Office 2253, 85 Dunstall Hill, Wolverhampton, WV6 0SR, United Kingdom';

export const SITE_SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/stack360co',
  github: 'https://github.com/stack360co',
  instagram: 'https://www.instagram.com/stack360co',
  facebook: 'https://www.facebook.com/stack360co',
} as const;

/**
 * Third-party review and directory profiles that link back to stack360.co.
 * Listed in the Organization JSON-LD `sameAs` so Google can tell us apart from
 * other companies called Stack360. Only add a profile after checking it is ours.
 */
export const SITE_PROFILES = {
  clutch: 'https://clutch.co/profile/stack360',
  goodfirms: 'https://www.goodfirms.co/company/stack360',
  designrush: 'https://www.designrush.com/agency/profile/stack360-2',
  crunchbase: 'https://www.crunchbase.com/organization/stack360',
  fiverr: 'https://www.fiverr.com/agencies/stack360',
  upwork: 'https://www.upwork.com/agencies/stack360/',
  g2: 'https://www.g2.com/products/stack360/reviews',
  trustpilot: 'https://www.trustpilot.com/review/stack360.co',
  techreviewer: 'https://techreviewer.co/companies/stack360',
  techbehemoths: 'https://techbehemoths.com/company/stack360',
} as const;

export const SITE_OFFICES = [
  {
    country: 'Pakistan',
    role: 'Lahore office',
    streetAddress: '82-G, First Floor, DHA Phase 1',
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    postalCode: LAHORE_OFFICE_POSTCODE,
    addressCountry: 'PK',
  },
  {
    country: 'United States',
    role: 'Stack360 AI Solutions LLC',
    streetAddress: '12828 Willow Centre Dr, Ste D',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77066',
    addressCountry: 'US',
  },
  {
    country: 'United Kingdom',
    role: 'Stack360 Ltd',
    streetAddress: 'Office 2253, 85 Dunstall Hill',
    addressLocality: 'Wolverhampton',
    addressRegion: 'England',
    postalCode: 'WV6 0SR',
    addressCountry: 'GB',
  },
] as const;
