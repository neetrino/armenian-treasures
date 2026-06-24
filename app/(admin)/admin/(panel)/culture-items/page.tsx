import type { Metadata } from 'next';
import { CultureItemsPageClient } from '@/components/admin/CultureItemsPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { toCultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Culture items',
  robots: { index: false, follow: false },
};

async function AdminCultureItemsPage() {
  const user = await requireAdmin();
  const [items, menuItems] = await Promise.all([
    prisma.cultureItem.findMany({
      orderBy: [{ menuItemId: 'asc' }, { order: 'asc' }],
      include: { menuItem: { include: { parent: true } } },
    }),
    prisma.cultureMenuItem.findMany({
      orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
      include: { parent: true },
    }),
  ]);

  const menuMap = new Map<string, string>();
  for (const m of menuItems) {
    const label = m.parent ? `${m.parent.title} / ${m.title}` : m.title;
    menuMap.set(m.id, label);
  }

  const rows = items.map((i) => ({
    id: i.id,
    title: i.title,
    slug: i.slug,
    region: i.region,
    periodLabel: i.periodLabel,
    showOnMap: i.showOnMap,
    order: i.order,
    status: i.status,
    image: i.image,
    menuPath: menuMap.get(i.menuItemId) ?? '—',
    editInitial: toCultureItemFormInitial(i),
  }));

  const menuOptions = menuItems.map((m) => ({
    id: m.id,
    title: m.parent ? `${m.parent.title} / ${m.title}` : m.title,
  }));

  return <CultureItemsPageClient user={user} rows={rows} menuOptions={menuOptions} />;
}

export default AdminCultureItemsPage;
