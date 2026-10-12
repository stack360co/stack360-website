import EnterprisesPage from '@/components/pages/who-we-help/enterprises';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.whoWeHelpEnterprises;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata)} />
      <EnterprisesPage />
    </>
  );
}
