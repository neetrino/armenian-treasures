'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Pencil, Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminSheet } from '@/components/admin/AdminSheet';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { BlogForm } from '@/components/admin/BlogForm';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteBlogPostAction } from '@/app/(admin)/admin/(panel)/blog/actions';
import { truncateBlogDescription } from '@/lib/blog-description';
import { formatBlogDate } from '@/lib/format-blog-date';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { AdminContext } from '@/lib/auth/require-admin';

interface Row {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  publishedAt: string;
  isPublished: boolean;
}

interface BlogsPageClientProps {
  user: AdminContext;
  rows: Row[];
}

export function BlogsPageClient({ user, rows }: BlogsPageClientProps) {
  const router = useRouter();
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);

  const openCreateSheet = useCallback(() => setIsCreateSheetOpen(true), []);
  const closeCreateSheet = useCallback(() => setIsCreateSheetOpen(false), []);
  const openEditSheet = useCallback((row: Row) => setEditingRow(row), []);
  const closeEditSheet = useCallback(() => setEditingRow(null), []);

  const handleSheetSuccess = useCallback(() => {
    setIsCreateSheetOpen(false);
    setEditingRow(null);
    router.refresh();
  }, [router]);

  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'post',
      header: 'Post',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
            {row.image ? (
              <Image
                src={resolvePublicAssetUrl(row.image)}
                alt=""
                fill
                className="object-cover"
                sizes="72px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-wider text-ink-muted">
                No img
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-ink">{row.title}</p>
            <p className="truncate text-xs text-ink-muted">
              /blog/{row.slug} · {formatBlogDate(row.publishedAt)}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'content',
      header: 'Description',
      cell: (row) => (
        <p className="line-clamp-2 max-w-md text-sm text-ink-soft">
          {truncateBlogDescription(row.content) || '—'}
        </p>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => (row.isPublished ? <Badge tone="green">Published</Badge> : <Badge>Draft</Badge>),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1">
          {row.isPublished ? (
            <Link
              href={`/blog/${row.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
            >
              <ExternalLink size={12} aria-hidden /> View
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => openEditSheet(row)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
          >
            <Pencil size={12} aria-hidden /> Edit
          </button>
          <DeleteActionButton action={deleteBlogPostAction} id={row.id} confirmText={`Delete “${row.title}”?`} />
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminPageShell
        user={user}
        topbarTitle="Blog"
        title="Blog posts"
        description="Articles shown on /blog with cover image, summary, and full story pages."
        actions={
          <Button type="button" variant="primary" onClick={openCreateSheet}>
            <Plus size={14} aria-hidden /> New post
          </Button>
        }
      >
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} onRowClick={openEditSheet} />
      </AdminPageShell>
      <AdminSheet
        open={isCreateSheetOpen}
        onClose={closeCreateSheet}
        eyebrow="Blog"
        title="Create post"
        description="Add a new article with cover image and description."
        size="2xl"
      >
        <BlogForm mode="create" onSuccess={handleSheetSuccess} onCancel={closeCreateSheet} />
      </AdminSheet>
      <AdminSheet
        open={editingRow !== null}
        onClose={closeEditSheet}
        eyebrow="Blog"
        title="Edit post"
        description={editingRow?.title}
        size="2xl"
      >
        {editingRow ? (
          <BlogForm
            key={editingRow.id}
            mode="edit"
            itemId={editingRow.id}
            initial={{
              title: editingRow.title,
              content: editingRow.content,
              image: editingRow.image ?? '',
              publishedAt: editingRow.publishedAt,
              isPublished: editingRow.isPublished,
            }}
            onSuccess={handleSheetSuccess}
            onCancel={closeEditSheet}
          />
        ) : null}
      </AdminSheet>
    </>
  );
}
