import HireTalentPage from '@/components/pages/work-with-us/hire';
import JsonLd from '@/components/seo/JsonLd';
import { HIRE_HUB_FAQ_LIST } from '@/constants/component/hire-hub-faqs';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta, serviceJsonLd } from '@/lib/seo/json-ld';

export const metadata = seo.workWithUsHire;

const service = serviceJsonLd({
  path: '/work-with-us/hire',
  name: 'Hire developers',
  serviceType: 'Staff augmentation',
  description: metadata.description ?? '',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          ...pageJsonLdFromMeta(metadata, {
            about: String(service['@id']),
            faqs: HIRE_HUB_FAQ_LIST,
          }),
          service,
        ]}
      />
      <HireTalentPage />
    </>
  );
}
