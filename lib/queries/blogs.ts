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
import { FEATURED_BLOG_COUNT } from '@/lib/constants/featured-treasures';
import { fetchHomepageFeaturedBlogIds } from '@/lib/queries/featured-blog-sql';

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

function sortBlogPostsByIds<T extends { id: string }>(rows: T[], ids: string[]): T[] {
  const order = new Map(ids.map((id, index) => [id, index]));
  return [...rows].sort((left, right) => (order.get(left.id) ?? 0) - (order.get(right.id) ?? 0));
}

async function fetchFeaturedBlogPosts(
  locale: SiteLocaleCode,
  limit = FEATURED_BLOG_COUNT,
): Promise<PublicBlogPostDTO[]> {
  try {
    const ids = await fetchHomepageFeaturedBlogIds(limit);
    if (ids.length === 0) {
      return [];
    }
    const rows = await prisma.blogPost.findMany({
      where: { id: { in: ids }, isPublished: true },
    });
    return sortBlogPostsByIds(rows, ids).map((row) => toPublicBlogPost(row, locale));
  } catch {
    return [];
  }
}

const getFeaturedBlogPostsCached = unstable_cache(
  fetchFeaturedBlogPosts,
  ['blog-posts-featured-v1'],
  { tags: ['blog-posts'], revalidate: 60 },
);

export async function getFeaturedBlogPosts(
  limit = FEATURED_BLOG_COUNT,
): Promise<PublicBlogPostDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getFeaturedBlogPostsCached(locale, limit);
}
