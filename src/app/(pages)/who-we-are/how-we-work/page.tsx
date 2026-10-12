import HowWeWorkPage from '@/components/pages/who-we-are/how-we-work';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.whoWeAreHowWeWork;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata)} />
      <HowWeWorkPage />
    </>
  );
}
