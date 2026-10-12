import {
  HIRE_HUB_FAQS,
  HIRE_OWNERSHIP_FAQ,
  HIRE_REPLACEMENT_FAQ,
  HIRE_VETTING_FAQ,
} from '@/constants/component/hire-tech-data';

/** FAQs shown on the hire hub, in page order. Also feeds the hub's FAQ schema. */
export const HIRE_HUB_FAQ_LIST = [
  HIRE_HUB_FAQS[0],
  HIRE_VETTING_FAQ,
  HIRE_HUB_FAQS[1],
  HIRE_HUB_FAQS[2],
  HIRE_REPLACEMENT_FAQ,
  HIRE_OWNERSHIP_FAQ,
] as const;
