import CaseStudiesPage from '@/components/pages/our-work/case-studies';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.ourWorkCaseStudies;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata, { type: 'CollectionPage' })} />
      <CaseStudiesPage />
    </>
  );
}
