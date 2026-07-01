import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import {
  toPublicBlogPost,
  toPublicBlogPostDetail,
  type PublicBlogPostDTO,
  type PublicBlogPostDetailDTO,
} from '@/lib/dto';

async function fetchPublishedBlogPosts(locale: SiteLocaleCode): Promise<PublicBlogPostDTO[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
    return rows.map((row) => toPublicBlogPost(row, locale));
  } catch {
    return [];
  }
}

async function fetchBlogPostBySlug(
  locale: SiteLocaleCode,
  slug: string,
): Promise<PublicBlogPostDetailDTO | null> {
  try {
    const row = await prisma.blogPost.findFirst({
      where: { slug, isPublished: true },
    });
    return row ? toPublicBlogPostDetail(row, locale) : null;
  } catch {
    return null;
  }
}

async function fetchPublishedBlogSlugs(): Promise<{ slug: string; publishedAt: Date }[]> {
  try {
    return await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    });
  } catch {
    return [];
  }
}

const getPublishedBlogPostsCached = unstable_cache(
  fetchPublishedBlogPosts,
  ['blog-posts-published'],
  { tags: ['blog-posts'], revalidate: 60 },
);

export async function getPublishedBlogPosts(): Promise<PublicBlogPostDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getPublishedBlogPostsCached(locale);
}

export async function getBlogPostBySlug(slug: string): Promise<PublicBlogPostDetailDTO | null> {
  const locale = await getCurrentSiteLocale();
  return unstable_cache(
    () => fetchBlogPostBySlug(locale, slug),
    ['blog-post-by-slug', locale, slug],
    { tags: ['blog-posts'], revalidate: 60 },
  )();
}

export const getPublishedBlogSlugs = unstable_cache(
  fetchPublishedBlogSlugs,
  ['blog-post-slugs'],
  { tags: ['blog-posts'], revalidate: 60 },
);
