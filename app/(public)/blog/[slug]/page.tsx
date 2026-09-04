import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogDetailView } from '@/components/blog/BlogDetailView';
import { blogMetaDescription } from '@/lib/blog-description';
import { getBlogPostBySlug } from '@/lib/queries/blogs';
import { buildNotFoundMetadata, buildPublicPageMetadata } from '@/lib/seo/metadata';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import '@/components/khndzoresk/khndzoresk.css';
import '@/components/blog/blog.css';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return buildNotFoundMetadata('Blog post');

  return buildPublicPageMetadata({
    title: post.title,
    description: blogMetaDescription(post.content),
    pathname: `/blog/${post.slug}`,
    openGraphImage: post.image ?? undefined,
  });
}

async function BlogPostPage(props: PageProps) {
  const params = await props.params;
  const [post, locale] = await Promise.all([
    getBlogPostBySlug(params.slug),
    getCurrentSiteLocale(),
  ]);
  if (!post) notFound();

  return <BlogDetailView post={post} locale={locale} />;
}

export default BlogPostPage;
