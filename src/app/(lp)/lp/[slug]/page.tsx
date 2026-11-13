import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPage from '@/components/pages/lp/LandingPage';
import { getLpVariant, LP_VARIANTS } from '@/constants/component/lp-data';
import { pageMeta } from '@/constants/seo';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Every landing page is built ahead of time; any other /lp/ address is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LP_VARIANTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const variant = getLpVariant(slug);
  if (!variant) {
    return {};
  }
  return {
    ...pageMeta({ title: variant.title, description: variant.description, path: `/lp/${slug}` }),
    // Ads traffic only. Kept out of search so they don't compete with the /what-we-build pages,
    // but not blocked in robots.txt: Google's ads crawler still has to read them.
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const variant = getLpVariant(slug);
  if (!variant) {
    notFound();
  }
  return <LandingPage variant={variant} />;
}
