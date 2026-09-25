'use server';

import { revalidatePath } from 'next/cache';
import { nextSortIndex } from '@/lib/admin/next-sort-index';
import { spliceListOrder } from '@/lib/admin/splice-list-order';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateCultureItemCache } from '@/lib/cache/revalidation';
import { prisma } from '@/lib/db';
import { listReorderSchema } from '@/lib/validation';

export type ListReorderResult = { ok: true } | { ok: false; message: string };

export async function nextCultureItemOrder(menuItemId: string): Promise<number> {
  const maxOrder = await prisma.cultureItem.aggregate({
    where: { menuItemId },
    _max: { order: true },
  });
  return nextSortIndex(maxOrder._max.order);
}

export async function reorderCultureItemsAction(orderedIds: string[]): Promise<ListReorderResult> {
  await requireAdmin();
  const parsed = listReorderSchema.safeParse({ order: orderedIds });
  if (!parsed.success) return { ok: false, message: 'Invalid reorder payload.' };

  const rows = await prisma.cultureItem.findMany({
    where: { id: { in: orderedIds } },
    select: { id: true, menuItemId: true, slug: true },
  });
  if (rows.length !== orderedIds.length) {
    return { ok: false, message: 'Some items are missing.' };
  }

  const byId = new Map(rows.map((row) => [row.id, row]));
  const groups = new Map<string, string[]>();
  for (const id of orderedIds) {
    const row = byId.get(id);
    if (!row) continue;
    const list = groups.get(row.menuItemId) ?? [];
    list.push(id);
    groups.set(row.menuItemId, list);
  }

  try {
    await applyGroupedOrder(groups);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not save order. Please try again.';
    return { ok: false, message };
  }

  await revalidateCultureItemCache(
    rows.map((row) => row.slug),
    [...groups.keys()],
  );
  revalidatePath('/admin/culture-pages', 'layout');
  return { ok: true };
}

async function applyGroupedOrder(groups: Map<string, string[]>): Promise<void> {
  const updates: Array<{ id: string; order: number }> = [];
  for (const [menuItemId, ids] of groups) {
    const siblings = await prisma.cultureItem.findMany({
      where: { menuItemId },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      select: { id: true },
    });
    const next = spliceListOrder(
      siblings.map((row) => row.id),
      ids,
    );
    if (!next) throw new Error('Order must stay inside the same category.');
    next.forEach((id, index) => updates.push({ id, order: index }));
  }

  await prisma.$transaction(
    updates.map((row) => prisma.cultureItem.update({ where: { id: row.id }, data: { order: row.order } })),
  );
}
