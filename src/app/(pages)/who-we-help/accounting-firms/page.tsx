import AccountingFirmsPage from '@/components/pages/who-we-help/accounting-firms';
import JsonLd from '@/components/seo/JsonLd';
import { ACCOUNTING_FAQS } from '@/constants/component/who-we-help-accounting-data';
import { seo } from '@/constants/seo';
import { faqPageJsonLd, pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.whoWeHelpAccountingFirms;

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          ...pageJsonLdFromMeta(metadata),
          faqPageJsonLd(ACCOUNTING_FAQS, '/who-we-help/accounting-firms'),
        ]}
      />
      <AccountingFirmsPage />
    </>
  );
}
