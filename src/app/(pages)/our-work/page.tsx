import OurWorkPage from '@/components/pages/our-work';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.ourWork;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata, { type: 'CollectionPage' })} />
      <OurWorkPage />
    </>
  );
}
