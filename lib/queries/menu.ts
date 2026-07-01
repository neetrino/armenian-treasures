import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { buildMenuTree, type MenuNode } from '@/lib/culture-menu';
import { toPublicMenuItem, type PublicCultureMenuItemDTO } from '@/lib/dto';

async function fetchActiveMenu(locale: SiteLocaleCode): Promise<PublicCultureMenuItemDTO[]> {
  try {
    const rows = await prisma.cultureMenuItem.findMany({
      where: { isActive: true },
      orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
    });
    return rows.map((row) => toPublicMenuItem(row, locale));
  } catch (error) {
    console.warn('getActiveMenuItems: database unreachable, returning empty list.', error);
    return [];
  }
}

const getActiveMenuItemsCached = unstable_cache(
  fetchActiveMenu,
  ['culture-menu-active'],
  { tags: ['culture-menu'], revalidate: 60 },
);

export async function getActiveMenuItems(): Promise<PublicCultureMenuItemDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getActiveMenuItemsCached(locale);
}

export async function getMenuTree(): Promise<MenuNode[]> {
  const items = await getActiveMenuItems();
  return buildMenuTree(items as unknown as MenuNode[]);
}

export async function getMenuItemBySlug(
  slug: string,
  parentId: string | null = null,
): Promise<PublicCultureMenuItemDTO | null> {
  try {
    const locale = await getCurrentSiteLocale();
    const row = await prisma.cultureMenuItem.findFirst({
      where: { slug, parentId: parentId ?? null, isActive: true },
    });
    return row ? toPublicMenuItem(row, locale) : null;
  } catch (error) {
    console.warn('getMenuItemBySlug: database unreachable.', error);
    return null;
  }
}
