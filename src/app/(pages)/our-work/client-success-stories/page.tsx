import ClientSuccessStoriesPage from '@/components/pages/our-work/client-success-stories';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.ourWorkClientSuccessStories;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata)} />
      <ClientSuccessStoriesPage />
    </>
  );
}
