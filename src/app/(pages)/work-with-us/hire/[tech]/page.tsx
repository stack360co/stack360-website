import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HireTechPageView from '@/components/pages/work-with-us/hire/HireTechPage';
import { getHireTechPage, getHireTechSlugs } from '@/constants/component/hire-tech-data';
import { pageMeta } from '@/constants/seo';

type PageProps = {
  params: Promise<{ tech: string }>;
};

// Every technology page is known at build time; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getHireTechSlugs().map((tech) => ({ tech }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tech } = await params;
  const page = getHireTechPage(tech);
  if (!page) {
    return {};
  }

  return pageMeta({
    title: page.meta.title,
    description: page.meta.description,
    path: `/work-with-us/hire/${page.slug}`,
    keywords: [...page.meta.keywords],
  });
}

export default async function Page({ params }: PageProps) {
  const { tech } = await params;
  const page = getHireTechPage(tech);
  if (!page) {
    notFound();
  }

  return <HireTechPageView page={page} />;
}
