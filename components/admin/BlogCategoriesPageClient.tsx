'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Pencil, Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { SortableAdminList } from '@/components/admin/SortableAdminList';
import { ButtonLink } from '@/components/ui/Button';
import {
  deleteBlogCategoryAction,
  reorderBlogCategoriesAction,
} from '@/app/(admin)/admin/(panel)/blog/categories/actions';
import type { AdminContext } from '@/lib/auth/require-admin';
import { cn } from '@/lib/utils';

interface Row {
  id: string;
  title: string;
  slug: string;
  postCount: number;
}

interface BlogCategoriesPageClientProps {
  user: AdminContext;
  rows: Row[];
}

export function BlogCategoriesPageClient({ user, rows }: BlogCategoriesPageClientProps) {
  return (
    <AdminPageShell
      user={user}
      topbarTitle="Blog categories"
      title="Blog categories"
      description="Public blog tabs. Drag a row to change their order."
      actions={
        <ButtonLink href="/admin/blog/categories/new" variant="primary">
          <Plus size={14} aria-hidden /> New category
        </ButtonLink>
      }
    >
      <SortableAdminList
        items={rows}
        persist={reorderBlogCategoriesAction}
        empty="No categories yet."
        renderItem={(row, handle, overlay) => (
          <CategorySortableRow row={row} handle={handle} overlay={overlay} />
        )}
      />
    </AdminPageShell>
  );
}

function CategorySortableRow({
  row,
  handle,
  overlay,
}: {
  row: Row;
  handle: ReactNode;
  overlay: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-3 py-3 shadow-sm sm:px-4',
        overlay && 'shadow-lg ring-1 ring-bronze-300/40',
      )}
    >
      {handle}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{row.title}</p>
        <p className="truncate text-xs text-ink-muted">/{row.slug}</p>
      </div>
      <span className="text-xs text-ink-soft">{row.postCount} posts</span>
      {overlay ? null : (
        <div className="flex shrink-0 items-center gap-1">
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
      )}
    </div>
  );
}
