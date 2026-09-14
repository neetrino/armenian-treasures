'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Pencil, Plus, Search } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteBlogPostAction } from '@/app/(admin)/admin/(panel)/blog/actions';
import { formatBlogDate } from '@/lib/format-blog-date';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { AdminContext } from '@/lib/auth/require-admin';

interface Row {
  id: string;
  title: string;
  slug: string;
  categoryTitle: string | null;
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
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) => {
      const haystack = [row.title, row.slug, row.categoryTitle ?? ''].join(' ').toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, rows]);

  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'post',
      header: 'Post',
      width: '48%',
      cell: (row) => (
        <div className="flex min-w-0 items-center gap-3">
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
            <p className="line-clamp-2 whitespace-normal break-words font-medium leading-snug text-ink">
              {row.title}
            </p>
            <p className="truncate text-xs text-ink-muted">
              /blog/{row.slug} · {formatBlogDate(row.publishedAt)}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      width: '18%',
      cell: (row) => <span className="text-sm text-ink-soft">{row.categoryTitle || '—'}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      width: '8rem',
      cell: (row) => (row.isPublished ? <Badge tone="green">Published</Badge> : <Badge>Draft</Badge>),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '11rem',
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
          <Link
            href={`/admin/blog/${row.id}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
          >
            <Pencil size={12} aria-hidden /> Edit
          </Link>
          <DeleteActionButton action={deleteBlogPostAction} id={row.id} confirmText={`Delete “${row.title}”?`} />
        </div>
      ),
    },
  ];

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Blog"
      title="Blog posts"
      description="Articles shown on /blog. Create and edit each post on its own page."
      actions={
        <ButtonLink href="/admin/blog/new" variant="primary">
          <Plus size={14} aria-hidden /> New post
        </ButtonLink>
      }
    >
      <div className="mb-4">
        <label className="relative block max-w-md">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, slug, or category"
            className="pl-9"
            aria-label="Search blog posts"
          />
        </label>
      </div>
      <AdminTable
        columns={columns}
        rows={filtered}
        getRowId={(row) => row.id}
        empty={query.trim() ? 'No posts match this search.' : 'No posts yet.'}
        onRowClick={(row) => router.push(`/admin/blog/${row.id}`)}
      />
    </AdminPageShell>
  );
}
