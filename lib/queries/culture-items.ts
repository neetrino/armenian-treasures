import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import {
  toPublicCultureItem,
  toPublicCultureItemDetail,
  type PublicCultureItemDTO,
  type PublicCultureItemDetailDTO,
} from '@/lib/dto';

async function fetchPublishedItemsByMenu(menuItemId: string): Promise<PublicCultureItemDTO[]> {
  try {
    const rows = await prisma.cultureItem.findMany({
      where: { menuItemId, status: 'PUBLISHED' },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    });
    return rows.map(toPublicCultureItem);
  } catch {
    return [];
  }
}

export const getItemsByMenuItem = unstable_cache(
  fetchPublishedItemsByMenu,
  ['culture-items-by-menu'],
  { tags: ['culture-items'], revalidate: 60 },
);

async function fetchItemBySlug(slug: string): Promise<PublicCultureItemDTO | null> {
  try {
    const row = await prisma.cultureItem.findUnique({ where: { slug } });
    if (!row || row.status !== 'PUBLISHED') return null;
    return toPublicCultureItem(row);
  } catch {
    return null;
  }
}

export const getCultureItemBySlug = unstable_cache(
  fetchItemBySlug,
  ['culture-item-by-slug'],
  { tags: ['culture-items'], revalidate: 60 },
);

async function fetchCultureItemDetailBySlug(
  slug: string,
): Promise<PublicCultureItemDetailDTO | null> {
  try {
    const row = await prisma.cultureItem.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: {
        menuItem: {
          include: { parent: true },
        },
      },
    });
    if (!row) return null;
    return toPublicCultureItemDetail(row);
  } catch {
    return null;
  }
}

export const getCultureItemDetailBySlug = unstable_cache(
  fetchCultureItemDetailBySlug,
  ['culture-item-detail-by-slug'],
  { tags: ['culture-items'], revalidate: 60 },
);

async function fetchMapItems(): Promise<PublicCultureItemDTO[]> {
  try {
    const rows = await prisma.cultureItem.findMany({
      where: {
        showOnMap: true,
        status: 'PUBLISHED',
        latitude: { not: null },
        longitude: { not: null },
      },
      orderBy: { title: 'asc' },
    });
    return rows.map(toPublicCultureItem);
  } catch {
    return [];
  }
}

export const getMapItems = unstable_cache(fetchMapItems, ['culture-map-items'], {
  tags: ['culture-items'],
  revalidate: 60,
});

export async function getPublishedCultureItemSlugs(): Promise<
  { slug: string; updatedAt: Date }[]
> {
  try {
    return await prisma.cultureItem.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
      orderBy: { slug: 'asc' },
    });
  } catch {
    return [];
  }
}
