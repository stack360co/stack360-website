/** Canonical site origin — used by metadata, sitemap, robots, and JSON-LD. */
export const SITE_URL = 'https://stack360.co';
// export const SITE_URL = 'https://stack360static.netlify.app';
export const SITE_NAME = 'Stack360';
/** Page title / brand line from https://www.stack360.co/ */
export const SITE_TAGLINE = 'Your Reliable Software Development Agency';

/** Company description for the homepage meta and Organization schema; the same line as the footer. */
export const SITE_DESCRIPTION =
  'Stack360 is a software development company with its team in Lahore, building software and placing dedicated developers for US and UK companies since 2019.';

/** Sales inbox — display value and mailto target. */
export const SITE_EMAIL = 'sales@stack360.co';
export const SITE_EMAIL_HREF = `mailto:${SITE_EMAIL}` as const;

/** UK phone — display, E.164, and tel: link. */
export const SITE_PHONE = '+44 7404 350490';
export const SITE_PHONE_USA = '+1 (713) 443 9180';
export const SITE_PHONE_2 = '+44 7460 333169';
export const SITE_PHONE_E164 = '+447404350490';
export const SITE_PHONE_E164_2 = '+447460333169';
export const SITE_PHONE_HREF = `tel:${SITE_PHONE_E164}` as const;
export const SITE_PHONE_HREF_2 = `tel:${SITE_PHONE_E164_2}` as const;

/** US phone — E.164 and tel: link (the display value is SITE_PHONE_USA). */
export const SITE_PHONE_USA_E164 = '+17134439180';
export const SITE_PHONE_USA_HREF = `tel:${SITE_PHONE_USA_E164}` as const;

/**
 * Lahore office, where the team works. Address, phone and hours match the
 * Google Business Profile. The postcode is left out until the profile (54660)
 * and the directories (54792) agree.
 */
export const SITE_PHONE_PK = '+92 331 1111753';
export const SITE_PHONE_PK_E164 = '+923311111753';
export const SITE_PHONE_PK_HREF = `tel:${SITE_PHONE_PK_E164}` as const;
export const LAHORE_OFFICE_ADDRESS = '82-G, First Floor, DHA Phase 1, Lahore, Punjab, Pakistan';
export const LAHORE_OFFICE_HOURS = 'Mon–Fri • 10:00 AM–10:00 PM Pakistan time (UTC+5)';
export const LAHORE_OFFICE_MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=Stack360%2C%2082-G%20DHA%20Phase%201%2C%20Lahore';

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
  designrush: 'https://www.designrush.com/agency/profile/stack-360',
  crunchbase: 'https://www.crunchbase.com/organization/stack360',
  fiverr: 'https://www.fiverr.com/agencies/stack360',
} as const;

export const SITE_OFFICES = [
  {
    country: 'Pakistan',
    role: 'Lahore office',
    streetAddress: '82-G, First Floor, DHA Phase 1',
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    addressCountry: 'PK',
  },
  {
    country: 'United States',
    role: 'Stack360 Ai Solutions LLC',
    streetAddress: '12828 Willow Centre Dr',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77066',
    addressCountry: 'US',
  },
  {
    country: 'United Kingdom',
    role: 'Mailing address',
    streetAddress: '58 St. Johns Road',
    addressLocality: 'Barking',
    addressRegion: 'Essex',
    postalCode: 'IG11 7XL',
    addressCountry: 'GB',
  },
] as const;
