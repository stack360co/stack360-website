import JsonLd from '@/components/seo/JsonLd';
import SectionHub from '@/components/shared/SectionHub';
import { WHAT_WE_BUILD_HUB } from '@/constants/component/section-hubs-data';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.whatWeBuild;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata, { type: 'CollectionPage' })} />
      <SectionHub {...WHAT_WE_BUILD_HUB} />
    </>
  );
}
