import LandingPage from '@/components/pages/landing';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { ORGANIZATION_ID, pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.home;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata, { about: ORGANIZATION_ID })} />
      <LandingPage />
    </>
  );
}
