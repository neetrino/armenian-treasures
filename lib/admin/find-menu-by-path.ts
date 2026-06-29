import { prisma } from '@/lib/db';
import type { MenuNode } from '@/lib/culture-menu';
import { toPublicMenuItem } from '@/lib/dto';

export interface MenuPathMatch {
  node: MenuNode;
  parent?: MenuNode;
}

export async function findCultureMenuItemByPath(menuPath: string): Promise<MenuPathMatch | null> {
  const segments = menuPath.split('/').filter(Boolean);
  if (segments.length === 0 || segments.length > 2) return null;

  if (segments.length === 1) {
    const row = await prisma.cultureMenuItem.findFirst({
      where: { slug: segments[0], parentId: null },
    });
    if (!row) return null;
    return { node: toPublicMenuItem(row) as MenuNode };
  }

  const parentRow = await prisma.cultureMenuItem.findFirst({
    where: { slug: segments[0], parentId: null },
  });
  if (!parentRow) return null;

  const childRow = await prisma.cultureMenuItem.findFirst({
    where: { slug: segments[1], parentId: parentRow.id },
  });
  if (!childRow) return null;

  return {
    parent: toPublicMenuItem(parentRow) as MenuNode,
    node: toPublicMenuItem(childRow) as MenuNode,
  };
}
