'use client';

import Image from 'next/image';
import { useCallback, useMemo, useState, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Plus, ExternalLink } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminModal } from '@/components/admin/AdminModal';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { CultureItemForm } from '@/components/admin/CultureItemForm';
import { DeleteIconButton } from '@/components/admin/DeleteIconButton';
import { Badge } from '@/components/ui/Badge';
import { StatusPill } from '@/components/ui/StatusPill';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { deleteCultureItemAction } from '@/app/(admin)/admin/(panel)/culture-items/actions';
import type { CultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import type { AdminContext } from '@/lib/auth/require-admin';

interface MenuOption {
  id: string;
  title: string;
}

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
  editInitial: CultureItemFormInitial;
}

interface CultureItemsPageClientProps {
  user: AdminContext;
  rows: Row[];
  menuOptions: MenuOption[];
  pagination: {
    page: number;
    pageCount: number;
    total: number;
    pageSize: number;
    query?: string;
  };
}

const FALLBACK_CULTURE_ENTRY_IMAGE = resolvePublicAssetUrl('/images/culture/card-heritage.webp');

interface CultureItemThumbProps {
  src?: string | null;
  alt: string;
}

function CultureItemThumb({ src, alt }: CultureItemThumbProps) {
  const initialSrc = src?.trim() ? resolvePublicAssetUrl(src.trim()) : FALLBACK_CULTURE_ENTRY_IMAGE;
  const [imageSrc, setImageSrc] = useState(initialSrc);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={40}
      height={40}
      className="h-full w-full object-cover"
      unoptimized
      onError={() => setImageSrc(FALLBACK_CULTURE_ENTRY_IMAGE)}
    />
  );
}

function rowSearchText(row: Row): string {
  return [
    row.title,
    row.slug,
    row.region,
    row.periodLabel,
    row.status,
    row.menuPath,
  ]
    .filter((part): part is string => Boolean(part))
    .join(' ')
    .toLowerCase();
}

export function CultureItemsPageClient({
  user,
  rows,
  menuOptions,
  pagination,
}: CultureItemsPageClientProps) {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = useMemo(() => {
    const paths = new Set<string>();
    for (const row of rows) {
      if (row.menuPath !== '—') paths.add(row.menuPath);
    }
    return Array.from(paths).sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (categoryFilter && row.menuPath !== categoryFilter) return false;
      if (!query) return true;
      return rowSearchText(row).includes(query);
    });
  }, [rows, search, categoryFilter]);

  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);
  const openEditModal = useCallback((row: Row) => setEditingRow(row), []);
  const closeEditModal = useCallback(() => setEditingRow(null), []);

  const handleModalSuccess = useCallback(() => {
    setIsCreateModalOpen(false);
    setEditingRow(null);
    router.refresh();
  }, [router]);

  const handleDelete = useCallback(
    async (id: string) => {
      const result = await deleteCultureItemAction(id);
      if (!result.ok) {
        return result;
      }
      router.refresh();
    },
    [router],
  );

  const handleEditClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>, row: Row) => {
      event.stopPropagation();
      openEditModal(row);
    },
    [openEditModal],
  );

  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'image',
      header: '',
      width: '64px',
      cell: (row) => (
        <div className="h-10 w-10 overflow-hidden rounded-md bg-stone-100">
          <CultureItemThumb src={row.image} alt={row.title} />
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
          {row.status === 'PUBLISHED' ? (
            <a
              href={resolveCultureItemHref(row.slug)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View public page for ${row.title}`}
              className="inline-flex items-center justify-center rounded-md p-1.5 text-ink-soft transition hover:bg-stone-100 hover:text-ink"
            >
              <ExternalLink size={14} aria-hidden />
            </a>
          ) : null}
          <button
            type="button"
            aria-label="Edit culture item"
            onClick={(event) => handleEditClick(event, row)}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-ink-soft transition hover:bg-stone-100 hover:text-ink"
          >
            <Pencil size={14} aria-hidden />
          </button>
          <DeleteIconButton
            action={handleDelete}
            id={row.id}
            ariaLabel="Delete culture item"
            confirmMessage={`Are you sure you want to delete “${row.title}”? This cannot be undone.`}
          />
        </div>
      ),
    },
  ];

  const tableEmpty =
    rows.length === 0
      ? 'No culture items yet. Click Add item to start.'
      : 'No culture items match your search or category filter.';

  return (
    <>
      <AdminPageShell
        user={user}
        topbarTitle="Culture items"
        title="Culture items"
        description="Curate the entries shown inside the Culture Portal. Items are grouped by their menu path."
        size="wide"
        actions={
          <Button type="button" variant="primary" onClick={openCreateModal}>
            <Plus size={14} aria-hidden /> Add item
          </Button>
        }
      >
        <AdminPanelCard padding="sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex flex-1 flex-col gap-1.5">
              <label htmlFor="culture-items-search" className="text-xs font-medium text-ink-muted">
                Search
              </label>
              <Input
                id="culture-items-search"
                type="search"
                placeholder="Title, slug, region, period, status, category…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="flex w-full flex-col gap-1.5 sm:w-72">
              <label htmlFor="culture-items-category" className="text-xs font-medium text-ink-muted">
                Category
              </label>
              <Select
                id="culture-items-category"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="">All categories</option>
                {categories.map((path) => (
                  <option key={path} value={path}>
                    {path}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </AdminPanelCard>
        <AdminTable
          columns={columns}
          rows={filteredRows}
          getRowId={(row) => row.id}
          empty={tableEmpty}
          onRowClick={openEditModal}
        />
        <div className="px-6 pb-6">
          <AdminPagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            total={pagination.total}
            pageSize={pagination.pageSize}
            basePath="/admin/culture-items"
            query={pagination.query}
          />
        </div>
      </AdminPageShell>
      {isCreateModalOpen ? (
        <AdminModal
          eyebrow="Culture items"
          title="Create culture item"
          onClose={closeCreateModal}
          maxWidthClass="max-w-4xl"
        >
          <CultureItemForm
            mode="create"
            menuOptions={menuOptions}
            onSuccess={handleModalSuccess}
            onCancel={closeCreateModal}
          />
        </AdminModal>
      ) : null}
      {editingRow ? (
        <AdminModal
          eyebrow="Culture items"
          title="Edit culture item"
          description={editingRow.title}
          onClose={closeEditModal}
          maxWidthClass="max-w-4xl"
        >
          <CultureItemForm
            key={editingRow.id}
            mode="edit"
            itemId={editingRow.id}
            menuOptions={menuOptions}
            initial={editingRow.editInitial}
            onSuccess={handleModalSuccess}
            onCancel={closeEditModal}
          />
        </AdminModal>
      ) : null}
    </>
  );
}
