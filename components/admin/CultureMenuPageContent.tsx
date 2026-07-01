import { CultureMenuPageClient } from '@/components/admin/CultureMenuPageClient';
import type { AdminContext } from '@/lib/auth/require-admin';
import { buildMenuTree, type MenuNode } from '@/lib/culture-menu';
import { prisma } from '@/lib/db';
import { toPublicMenuItem } from '@/lib/dto';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

interface CultureMenuPageContentProps {
  user: AdminContext;
}

export async function CultureMenuPageContent({ user }: CultureMenuPageContentProps) {
  const [rows, parents] = await Promise.all([
    prisma.cultureMenuItem.findMany({
      orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
    }),
    prisma.cultureMenuItem.findMany({
      where: { parentId: null },
      orderBy: { order: 'asc' },
      select: { id: true, title: true },
    }),
  ]);
  const tree = buildMenuTree(rows.map((row) => toPublicMenuItem(row)) as unknown as MenuNode[]);

  return (
    <CultureMenuPageClient
      user={user}
      tree={tree}
      parents={parents.map((parent) => ({
        ...parent,
        title: getAdminLocaleValue(parent.title),
      }))}
    />
  );
}
