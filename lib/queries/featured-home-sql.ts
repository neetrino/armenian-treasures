import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';

export interface FeaturedHomeState {
  featuredOnHome: boolean;
  featuredOrder: number | null;
}

interface FeaturedIdRow {
  id: string;
}

interface FeaturedHomeRow {
  id: string;
  featuredOnHome: boolean;
  featuredOrder: number | null;
}

export async function fetchHomepageFeaturedIds(limit: number): Promise<string[]> {
  try {
    const featured = await prisma.$queryRaw<FeaturedIdRow[]>`
      SELECT id
      FROM "CultureItem"
      WHERE status = 'PUBLISHED' AND "featuredOnHome" = true
      ORDER BY "featuredOrder" ASC NULLS LAST, "order" ASC, "createdAt" DESC
      LIMIT ${limit}
    `;
    if (featured.length > 0) {
      return featured.map((row) => row.id);
    }
  } catch {
    // Columns or a stale Prisma client should not break public pages.
  }

  const fallback = await prisma.cultureItem.findMany({
    where: { status: 'PUBLISHED' },
    select: { id: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    take: limit,
  });
  return fallback.map((row) => row.id);
}

export async function fetchFeaturedHomeByIds(
  ids: string[],
): Promise<Map<string, FeaturedHomeState>> {
  const result = new Map<string, FeaturedHomeState>();
  if (ids.length === 0) {
    return result;
  }

  try {
    const rows = await prisma.$queryRaw<FeaturedHomeRow[]>`
      SELECT id, "featuredOnHome", "featuredOrder"
      FROM "CultureItem"
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

export async function persistCultureItemFeaturedHome(
  id: string,
  featuredOnHome: boolean,
  featuredOrder: number | null,
): Promise<void> {
  await prisma.$executeRaw`
    UPDATE "CultureItem"
    SET
      "featuredOnHome" = ${featuredOnHome},
      "featuredOrder" = ${featuredOrder}
    WHERE id = ${id}
  `;
}
