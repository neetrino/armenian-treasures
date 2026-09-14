import { unstable_cache } from 'next/cache';
import type { BlogCategory, BlogPost } from '@prisma/client';
import { prisma } from '@/lib/db';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import {
  toPublicBlogCategory,
  toPublicBlogPost,
  toPublicBlogPostDetail,
  type PublicBlogCategoryDTO,
  type PublicBlogPostDTO,
  type PublicBlogPostDetailDTO,
} from '@/lib/dto';
import { FEATURED_BLOG_COUNT } from '@/lib/constants/featured-treasures';
import { fetchHomepageFeaturedBlogIds } from '@/lib/queries/featured-blog-sql';

type BlogPostWithCategory = BlogPost & { category: BlogCategory | null };

async function attachCategories(rows: BlogPost[]): Promise<BlogPostWithCategory[]> {
  const ids = [
    ...new Set(rows.map((row) => row.categoryId).filter((id): id is string => Boolean(id))),
  ];
  if (ids.length === 0) {
    return rows.map((row) => ({ ...row, category: null }));
  }
  try {
    const categories = await prisma.blogCategory.findMany({ where: { id: { in: ids } } });
    const byId = new Map(categories.map((category) => [category.id, category]));
    return rows.map((row) => ({
      ...row,
      category: row.categoryId ? (byId.get(row.categoryId) ?? null) : null,
    }));
  } catch {
    return rows.map((row) => ({ ...row, category: null }));
  }
}

async function fetchPublishedBlogPosts(locale: SiteLocaleCode): Promise<PublicBlogPostDTO[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
    const withCategory = await attachCategories(rows);
    return withCategory.map((row) => toPublicBlogPost(row, locale));
  } catch {
    return [];
  }
}

async function fetchPublishedBlogCategories(locale: SiteLocaleCode): Promise<PublicBlogCategoryDTO[]> {
  try {
    const rows = await prisma.blogCategory.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
    return rows
      .map((row) => toPublicBlogCategory(row, locale))
      .filter((category) => category.title.trim().length > 0);
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
    if (!row) return null;
    const [withCategory] = await attachCategories([row]);
    return withCategory ? toPublicBlogPostDetail(withCategory, locale) : null;
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
  ['blog-posts-published-v3'],
  { tags: ['blog-posts'], revalidate: 60 },
);

const getPublishedBlogCategoriesCached = unstable_cache(
  fetchPublishedBlogCategories,
  ['blog-categories-published-v2'],
  { tags: ['blog-posts'], revalidate: 60 },
);

export async function getPublishedBlogPosts(): Promise<PublicBlogPostDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getPublishedBlogPostsCached(locale);
}

export async function getPublishedBlogCategories(): Promise<PublicBlogCategoryDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getPublishedBlogCategoriesCached(locale);
}

export async function getBlogPostBySlug(slug: string): Promise<PublicBlogPostDetailDTO | null> {
  const locale = await getCurrentSiteLocale();
  return unstable_cache(
    () => fetchBlogPostBySlug(locale, slug),
    ['blog-post-by-slug-v3', locale, slug],
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
  let ids: string[] = [];
  try {
    ids = await fetchHomepageFeaturedBlogIds(limit);
  } catch {
    return [];
  }
  if (ids.length === 0) {
    return [];
  }
  try {
    const rows = await prisma.blogPost.findMany({
      where: { id: { in: ids }, isPublished: true },
    });
    const withCategory = await attachCategories(rows);
    return sortBlogPostsByIds(withCategory, ids).map((row) => toPublicBlogPost(row, locale));
  } catch {
    return [];
  }
}

const getFeaturedBlogPostsCached = unstable_cache(
  fetchFeaturedBlogPosts,
  ['blog-posts-featured-v3'],
  { tags: ['blog-posts'], revalidate: 60 },
);

export async function getFeaturedBlogPosts(
  limit = FEATURED_BLOG_COUNT,
): Promise<PublicBlogPostDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getFeaturedBlogPostsCached(locale, limit);
}
