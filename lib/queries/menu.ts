import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { buildMenuTree, type MenuNode } from '@/lib/culture-menu';
import { toPublicMenuItem, type PublicCultureMenuItemDTO } from '@/lib/dto';

async function fetchActiveMenu(): Promise<PublicCultureMenuItemDTO[]> {
  try {
    const rows = await prisma.cultureMenuItem.findMany({
      where: { isActive: true },
      orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
    });
    return rows.map(toPublicMenuItem);
  } catch (error) {
    console.warn('getActiveMenuItems: database unreachable, returning empty list.', error);
    return [];
  }
}

export const getActiveMenuItems = unstable_cache(
  fetchActiveMenu,
  ['culture-menu-active'],
  { tags: ['culture-menu'], revalidate: 60 },
);

export async function getMenuTree(): Promise<MenuNode[]> {
  const items = await getActiveMenuItems();
  return buildMenuTree(items as unknown as MenuNode[]);
}

export async function getMenuItemBySlug(
  slug: string,
  parentId: string | null = null,
): Promise<PublicCultureMenuItemDTO | null> {
  try {
    const row = await prisma.cultureMenuItem.findFirst({
      where: { slug, parentId: parentId ?? null, isActive: true },
    });
    return row ? toPublicMenuItem(row) : null;
  } catch (error) {
    console.warn('getMenuItemBySlug: database unreachable.', error);
    return null;
  }
}
