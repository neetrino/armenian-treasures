import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import type { FeaturedHomeState } from '@/lib/queries/featured-home-sql';

interface FeaturedIdRow {
  id: string;
}

interface FeaturedHomeRow {
  id: string;
  featuredOnHome: boolean;
  featuredOrder: number | null;
}

export async function fetchHomepageFeaturedBlogIds(limit: number): Promise<string[]> {
  try {
    const featured = await prisma.$queryRaw<FeaturedIdRow[]>`
      SELECT id
      FROM "BlogPost"
      WHERE "isPublished" = true AND "featuredOnHome" = true
      ORDER BY "featuredOrder" ASC NULLS LAST, "publishedAt" DESC, "createdAt" DESC
      LIMIT ${limit}
    `;
    if (featured.length > 0) {
      return featured.map((row) => row.id);
    }
  } catch {
    // Columns or a stale Prisma client should not break public pages.
  }

  const fallback = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: { id: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });
  return fallback.map((row) => row.id);
}

export async function fetchFeaturedBlogByIds(
  ids: string[],
): Promise<Map<string, FeaturedHomeState>> {
  const result = new Map<string, FeaturedHomeState>();
  if (ids.length === 0) {
    return result;
  }

  try {
    const rows = await prisma.$queryRaw<FeaturedHomeRow[]>`
      SELECT id, "featuredOnHome", "featuredOrder"
      FROM "BlogPost"
      WHERE id IN (${Prisma.join(ids.map((id) => Prisma.sql`${id}`))})
    `;
    for (const row of rows) {
      result.set(row.id, {
        featuredOnHome: row.featuredOnHome,
        featuredOrder: row.featuredOrder,
      });
    }
  } catch {
    return result;
  }

  return result;
}

export async function persistBlogPostFeaturedHome(
  id: string,
  featuredOnHome: boolean,
  featuredOrder: number | null,
): Promise<void> {
  await prisma.$executeRaw`
    UPDATE "BlogPost"
    SET
      "featuredOnHome" = ${featuredOnHome},
      "featuredOrder" = ${featuredOrder}
    WHERE id = ${id}
  `;
}
