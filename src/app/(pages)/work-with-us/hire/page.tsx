import HireTalentPage from '@/components/pages/work-with-us/hire';
import JsonLd from '@/components/seo/JsonLd';
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
        data={[...pageJsonLdFromMeta(metadata, { about: String(service['@id']) }), service]}
      />
      <HireTalentPage />
    </>
  );
}
