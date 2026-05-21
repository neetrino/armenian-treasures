import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicCultureItem, type PublicCultureItemDTO } from '@/lib/dto';

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
