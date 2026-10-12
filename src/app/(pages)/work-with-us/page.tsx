import JsonLd from '@/components/seo/JsonLd';
import SectionHub from '@/components/shared/SectionHub';
import { WORK_WITH_US_HUB } from '@/constants/component/section-hubs-data';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.workWithUs;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata, { type: 'CollectionPage' })} />
      <SectionHub {...WORK_WITH_US_HUB} />
    </>
  );
}
