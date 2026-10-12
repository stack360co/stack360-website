import CapabilityPage from '@/components/pages/what-we-build/CapabilityPage';
import { getCapabilityPage } from '@/constants/component/what-we-build-data';
import { seo } from '@/constants/seo';

const data = getCapabilityPage('erp');

export const metadata = seo.whatWeBuildErp;

export default function Page() {
  return <CapabilityPage data={data} meta={metadata} />;
}
