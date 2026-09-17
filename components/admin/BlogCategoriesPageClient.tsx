'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { ButtonLink } from '@/components/ui/Button';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteBlogCategoryAction } from '@/app/(admin)/admin/(panel)/blog/categories/actions';
import type { AdminContext } from '@/lib/auth/require-admin';

interface Row {
  id: string;
  title: string;
  slug: string;
  order: number;
  postCount: number;
}

interface BlogCategoriesPageClientProps {
  user: AdminContext;
  rows: Row[];
}

export function BlogCategoriesPageClient({ user, rows }: BlogCategoriesPageClientProps) {
  const router = useRouter();

  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'title',
      header: 'Category',
      width: '42%',
      cell: (row) => (
        <div className="min-w-0">
          <p className="line-clamp-2 whitespace-normal break-words font-medium leading-snug text-ink">
            {row.title}
          </p>
          <p className="truncate text-xs text-ink-muted">/{row.slug}</p>
        </div>
      ),
    },
    {
      key: 'posts',
      header: 'Posts',
      width: '8rem',
      cell: (row) => <span className="text-sm text-ink-soft">{row.postCount}</span>,
    },
    {
      key: 'order',
      header: 'Order',
      width: '6rem',
      cell: (row) => <span className="text-sm text-ink-soft">{row.order}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '9rem',
      align: 'right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/blog/categories/${row.id}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
          >
            <Pencil size={12} aria-hidden /> Edit
          </Link>
          <DeleteActionButton
            action={deleteBlogCategoryAction}
            id={row.id}
            confirmText={`Delete “${row.title}”? Posts will keep publishing without this category.`}
          />
        </div>
      ),
    },
  ];

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Blog categories"
      title="Blog categories"
      description="Flat categories for public blog tabs. Name, slug, and translations — no hierarchy."
      actions={
        <ButtonLink href="/admin/blog/categories/new" variant="primary">
          <Plus size={14} aria-hidden /> New category
        </ButtonLink>
      }
    >
      <AdminTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        empty="No categories yet."
        onRowClick={(row) => router.push(`/admin/blog/categories/${row.id}`)}
      />
    </AdminPageShell>
  );
}
