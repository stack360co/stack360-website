import JsonLd from '@/components/seo/JsonLd';
import SectionHub from '@/components/shared/SectionHub';
import { WHO_WE_ARE_HUB } from '@/constants/component/section-hubs-data';
import { seo } from '@/constants/seo';
import { ORGANIZATION_ID, pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.whoWeAre;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata, { type: 'AboutPage', about: ORGANIZATION_ID })} />
      <SectionHub {...WHO_WE_ARE_HUB} />
    </>
  );
}
