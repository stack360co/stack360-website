import IndustriesPage from '@/components/pages/who-we-help/industries';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.whoWeHelpIndustries;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata)} />
      <IndustriesPage />
    </>
  );
}
