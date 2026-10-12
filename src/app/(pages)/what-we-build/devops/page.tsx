import CapabilityPage from '@/components/pages/what-we-build/CapabilityPage';
import { getCapabilityPage } from '@/constants/component/what-we-build-data';
import { seo } from '@/constants/seo';

const data = getCapabilityPage('devops');

export const metadata = seo.whatWeBuildDevops;

export default function Page() {
  return <CapabilityPage data={data} meta={metadata} />;
}
