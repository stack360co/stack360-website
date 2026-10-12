import SoftwarePartnerPage from '@/components/pages/work-with-us/software-partner';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.workWithUsSoftwarePartner;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata)} />
      <SoftwarePartnerPage />
    </>
  );
}
