import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyDetailView from '@/components/pages/our-work/case-studies/CaseStudyDetail';
import PageClosingCta from '@/components/shared/PageClosingCta';
import { getCaseStudy, getCaseStudySlugs } from '@/constants/component/our-work-case-studies-data';
import { OUR_WORK_CTA } from '@/constants/component/our-work-data';
import { pageMeta } from '@/constants/seo';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Every slug is known at build time; anything else is a real 404, not a 200 "not found" page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return {};
  }

  return pageMeta({
    title: `${study.name} Case Study`,
    description: study.tagline,
    path: `/our-work/case-studies/${study.slug}`,
    keywords: [study.name, study.industry, 'Stack360 case study'],
  });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <CaseStudyDetailView study={study} />
      <PageClosingCta {...OUR_WORK_CTA} />
    </div>
  );
}
