import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/pages/our-work/blog/BlogArticle';
import JsonLd from '@/components/seo/JsonLd';
import PageClosingCta from '@/components/shared/PageClosingCta';
import { getBlogPost, getBlogSlugs } from '@/constants/component/blog-posts-data';
import { OUR_WORK_CTA } from '@/constants/component/our-work-data';
import { pageMeta } from '@/constants/seo';
import { blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/seo/json-ld';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Every slug is known at build time; anything else is a real 404, not a 200 "not found" page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return {};
  }

  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [post.category, 'Stack360 blog', ...post.sections.map((s) => s.heading)],
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <JsonLd
        data={[
          blogPostingJsonLd(post),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <BlogArticle post={post} />
      <PageClosingCta {...OUR_WORK_CTA} />
    </div>
  );
}
