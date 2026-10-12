import ContactPage from '@/components/pages/contact';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { ORGANIZATION_ID, pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.contact;

export default function Page() {
  return (
    <>
      <JsonLd
        data={pageJsonLdFromMeta(metadata, { type: 'ContactPage', about: ORGANIZATION_ID })}
      />
      <ContactPage />
    </>
  );
}
