import { prisma } from '@/lib/db';
import type { AdminDeleteResult } from '@/lib/admin/action-result';

export async function collectMenuSubtreeIds(rootId: string): Promise<string[]> {
  const rows = await prisma.cultureMenuItem.findMany({
    select: { id: true, parentId: true },
  });
  const childrenByParent = new Map<string, string[]>();
  for (const row of rows) {
    if (!row.parentId) continue;
    const siblings = childrenByParent.get(row.parentId) ?? [];
    siblings.push(row.id);
    childrenByParent.set(row.parentId, siblings);
  }

  const ids: string[] = [];
  const stack = [rootId];
  while (stack.length > 0) {
    const id = stack.pop();
    if (!id) continue;
    ids.push(id);
    for (const childId of childrenByParent.get(id) ?? []) {
      stack.push(childId);
    }
  }
  return ids;
}

export async function checkMenuItemDeletable(id: string): Promise<AdminDeleteResult> {
  const node = await prisma.cultureMenuItem.findUnique({
    where: { id },
    select: { id: true, title: true },
  });
  if (!node) {
    return { ok: false, message: 'Menu item not found or already deleted.' };
  }

  const subtreeIds = await collectMenuSubtreeIds(id);
  const linkedItemCount = await prisma.cultureItem.count({
    where: { menuItemId: { in: subtreeIds } },
  });

  if (linkedItemCount > 0) {
    const label = linkedItemCount === 1 ? '1 culture item is' : `${linkedItemCount} culture items are`;
    return {
      ok: false,
      message: `Cannot delete “${node.title}”: ${label} assigned to this menu item or its sub-catalogs. Reassign or delete those items first.`,
    };
  }

  return { ok: true };
}
