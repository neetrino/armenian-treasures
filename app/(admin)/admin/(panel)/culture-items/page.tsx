import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Pencil, Plus } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { Badge } from '@/components/ui/Badge';
import { StatusPill } from '@/components/ui/StatusPill';
import { ButtonLink } from '@/components/ui/Button';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteCultureItemAction } from '@/app/(admin)/admin/(panel)/culture-items/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Culture items',
  robots: { index: false, follow: false },
};

interface Row {
  id: string;
  title: string;
  slug: string;
  region: string | null;
  periodLabel: string | null;
  showOnMap: boolean;
  order: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  image: string | null;
  menuPath: string;
}

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

  const rows: Row[] = items.map((i) => ({
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
  }));

  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'image',
      header: '',
      width: '64px',
      cell: (row) => (
        <div className="h-10 w-10 overflow-hidden rounded-md bg-stone-100">
          {row.image ? (
            <Image
              src={row.image}
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
      ),
    },
    {
      key: 'title',
      header: 'Title',
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-ink">{row.title}</span>
          <span className="text-xs text-ink-muted">/{row.slug}</span>
        </div>
      ),
    },
    {
      key: 'menu',
      header: 'Menu path',
      cell: (row) => <span className="text-xs text-ink-soft">{row.menuPath}</span>,
    },
    {
      key: 'region',
      header: 'Region · Period',
      cell: (row) => (
        <span className="text-xs text-ink-muted">
          {row.region ?? '—'}
          {row.periodLabel ? ` · ${row.periodLabel}` : ''}
        </span>
      ),
    },
    { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status} /> },
    {
      key: 'showOnMap',
      header: 'On map',
      cell: (row) => (row.showOnMap ? <Badge tone="green">Visible</Badge> : <Badge>—</Badge>),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/culture-items/${row.id}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
          >
            <Pencil size={12} aria-hidden /> Edit
          </Link>
          <DeleteActionButton action={deleteCultureItemAction} id={row.id} confirmText={`Delete “${row.title}”?`} />
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminTopbar title="Culture items" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Culture items"
          description="Curate the entries shown inside the Culture Portal. Items are grouped by their menu path."
          actions={
            <ButtonLink href="/admin/culture-items/new" variant="primary">
              <Plus size={14} aria-hidden /> Add item
            </ButtonLink>
          }
        />
        <AdminTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          empty="No culture items yet. Click Add item to start."
        />
      </div>
    </>
  );
}

export default AdminCultureItemsPage;
