import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import {
  toPublicBlogPost,
  toPublicBlogPostDetail,
  type PublicBlogPostDTO,
  type PublicBlogPostDetailDTO,
} from '@/lib/dto';

async function fetchPublishedBlogPosts(): Promise<PublicBlogPostDTO[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
    return rows.map(toPublicBlogPost);
  } catch {
    return [];
  }
}

async function fetchBlogPostBySlug(slug: string): Promise<PublicBlogPostDetailDTO | null> {
  try {
    const row = await prisma.blogPost.findFirst({
      where: { slug, isPublished: true },
    });
    return row ? toPublicBlogPostDetail(row) : null;
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

export const getPublishedBlogPosts = unstable_cache(
  fetchPublishedBlogPosts,
  ['blog-posts-published'],
  { tags: ['blog-posts'], revalidate: 60 },
);

export async function getBlogPostBySlug(slug: string): Promise<PublicBlogPostDetailDTO | null> {
  return unstable_cache(
    () => fetchBlogPostBySlug(slug),
    ['blog-post-by-slug', slug],
    { tags: ['blog-posts'], revalidate: 60 },
  )();
}

export const getPublishedBlogSlugs = unstable_cache(
  fetchPublishedBlogSlugs,
  ['blog-post-slugs'],
  { tags: ['blog-posts'], revalidate: 60 },
);
