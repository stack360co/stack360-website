import LahoreOfficePage from '@/components/pages/who-we-are/lahore';
import JsonLd from '@/components/seo/JsonLd';
import { LAHORE_FAQS } from '@/constants/component/who-we-are-lahore-data';
import { seo } from '@/constants/seo';
import { LAHORE_OFFICE_ID, lahoreOfficeJsonLd, pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.whoWeAreLahore;

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          ...pageJsonLdFromMeta(metadata, { about: LAHORE_OFFICE_ID, faqs: LAHORE_FAQS }),
          lahoreOfficeJsonLd(),
        ]}
      />
      <LahoreOfficePage />
    </>
  );
}
