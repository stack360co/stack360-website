import JsonLd from '@/components/seo/JsonLd';
import SectionHub from '@/components/shared/SectionHub';
import { WHO_WE_HELP_HUB } from '@/constants/component/section-hubs-data';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.whoWeHelp;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata, { type: 'CollectionPage' })} />
      <SectionHub {...WHO_WE_HELP_HUB} />
    </>
  );
}
