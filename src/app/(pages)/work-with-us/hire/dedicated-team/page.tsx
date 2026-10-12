import DedicatedTeamPage from '@/components/pages/work-with-us/hire/DedicatedTeamPage';
import JsonLd from '@/components/seo/JsonLd';
import {
  DEDICATED_TEAM_FAQS,
  HIRE_OWNERSHIP_FAQ,
  HIRE_REPLACEMENT_FAQ,
  HIRE_VETTING_FAQ,
} from '@/constants/component/hire-tech-data';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta, serviceJsonLd } from '@/lib/seo/json-ld';

export const metadata = seo.workWithUsDedicatedTeam;

const faqs = [
  ...DEDICATED_TEAM_FAQS.slice(0, 2),
  HIRE_VETTING_FAQ,
  DEDICATED_TEAM_FAQS[2],
  HIRE_REPLACEMENT_FAQ,
  DEDICATED_TEAM_FAQS[3],
  HIRE_OWNERSHIP_FAQ,
];

const service = serviceJsonLd({
  path: '/work-with-us/hire/dedicated-team',
  name: 'Dedicated development team',
  serviceType: 'Dedicated development team',
  description: metadata.description ?? '',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[...pageJsonLdFromMeta(metadata, { about: String(service['@id']), faqs }), service]}
      />
      <DedicatedTeamPage faqs={faqs} />
    </>
  );
}
