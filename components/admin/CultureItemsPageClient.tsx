'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { CultureItemsSortableList, type CultureItemListRow } from '@/components/admin/CultureItemsSortableList';
import { ButtonLink } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { deleteCultureItemAction } from '@/app/(admin)/admin/(panel)/culture-items/actions';
import type { AdminContext } from '@/lib/auth/require-admin';

interface MenuOption {
  id: string;
  title: string;
}

interface CultureItemsPageClientProps {
  user: AdminContext;
  rows: CultureItemListRow[];
  menuOptions: MenuOption[];
  pagination: {
    page: number;
    pageCount: number;
    total: number;
    pageSize: number;
    query?: string;
  };
}

function buildCultureItemsHref(query?: string, page?: number): string {
  const params = new URLSearchParams();
  if (query?.trim()) params.set('q', query.trim());
  if (page && page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `/admin/culture-items?${qs}` : '/admin/culture-items';
}

function cultureItemEditHref(id: string): string {
  return `/admin/culture-items/${id}`;
}

const CULTURE_ITEM_CREATE_HREF = '/admin/culture-items/new';

export function CultureItemsPageClient({
  user,
  rows,
  menuOptions,
  pagination,
}: CultureItemsPageClientProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(pagination.query ?? '');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    setSearchInput(pagination.query ?? '');
  }, [pagination.query]);

  useEffect(() => {
    const trimmed = searchInput.trim();
    const current = pagination.query ?? '';
    if (trimmed === current) return;

    const timer = window.setTimeout(() => {
      router.push(buildCultureItemsHref(trimmed));
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput, pagination.query, router]);

  const categories = useMemo(
    () => menuOptions.map((option) => option.title).sort((a, b) => a.localeCompare(b)),
    [menuOptions],
  );

  const filteredRows = useMemo(() => {
    if (!categoryFilter) return rows;
    return rows.filter((row) => row.menuPath === categoryFilter);
  }, [rows, categoryFilter]);

  const openEditPage = useCallback((row: CultureItemListRow) => {
    router.push(cultureItemEditHref(row.id));
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

  const tableEmpty =
    pagination.total === 0
      ? pagination.query
        ? `No culture items match “${pagination.query}”.`
        : 'No culture items yet. Click Add item to start.'
      : filteredRows.length === 0
        ? 'No culture items match your category filter.'
        : 'No culture items match your search or category filter.';

  return (
    <>
      <AdminPageShell
        user={user}
        topbarTitle="Culture items"
        title="Culture items"
        description="Curate Culture Portal entries. Drag a row inside its category to change the public order."
        size="wide"
        actions={
          <ButtonLink href={CULTURE_ITEM_CREATE_HREF} variant="primary">
            <Plus size={14} aria-hidden /> Add item
          </ButtonLink>
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
                placeholder="Title, slug, region, period, category…"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
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
        <CultureItemsSortableList
          rows={filteredRows}
          empty={tableEmpty}
          onEdit={openEditPage}
          onDelete={handleDelete}
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
    </>
  );
}
