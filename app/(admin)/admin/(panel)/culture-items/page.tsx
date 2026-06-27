import type { Metadata } from 'next';
import { CultureItemsPageClient } from '@/components/admin/CultureItemsPageClient';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { requireAdmin } from '@/lib/auth/require-admin';
import { toCultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';
import { buildAdminPageCount, parseAdminListQuery } from '@/lib/admin/list-query';
import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Culture items',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

async function AdminCultureItemsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const user = await requireAdmin();
  const listQuery = parseAdminListQuery(searchParams);
  const where: Prisma.CultureItemWhereInput = listQuery.query
    ? {
        OR: [
          { title: { contains: listQuery.query, mode: 'insensitive' } },
          { slug: { contains: listQuery.query, mode: 'insensitive' } },
          { region: { contains: listQuery.query, mode: 'insensitive' } },
          { periodLabel: { contains: listQuery.query, mode: 'insensitive' } },
        ],
      }
    : {};

  const [items, total, menuItems] = await Promise.all([
    prisma.cultureItem.findMany({
      where,
      orderBy: [{ menuItemId: 'asc' }, { order: 'asc' }],
      include: { menuItem: { include: { parent: true } } },
      skip: listQuery.skip,
      take: listQuery.pageSize,
    }),
    prisma.cultureItem.count({ where }),
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

  const pageCount = buildAdminPageCount(total, listQuery.pageSize);

  return (
    <>
      <CultureItemsPageClient user={user} rows={rows} menuOptions={menuOptions} />
      <div className="px-6 pb-6">
        <AdminPagination
          page={listQuery.page}
          pageCount={pageCount}
          total={total}
          pageSize={listQuery.pageSize}
          basePath="/admin/culture-items"
          query={listQuery.query || undefined}
        />
      </div>
    </>
  );
}

export default AdminCultureItemsPage;
