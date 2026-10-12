import FeaturedProjectsPage from '@/components/pages/our-work/featured-projects';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.ourWorkFeaturedProjects;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata, { type: 'CollectionPage' })} />
      <FeaturedProjectsPage />
    </>
  );
}
