import HistoryPage from '@/components/pages/who-we-are/history';
import JsonLd from '@/components/seo/JsonLd';
import { seo } from '@/constants/seo';
import { ORGANIZATION_ID, pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.whoWeAreHistory;

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLdFromMeta(metadata, { type: 'AboutPage', about: ORGANIZATION_ID })} />
      <HistoryPage />
    </>
  );
}
