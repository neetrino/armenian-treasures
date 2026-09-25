'use client';

import { useMemo, useState, useTransition, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutGrid, List, Plus, Search, Trash2 } from 'lucide-react';
import { AdminHelpCallout } from '@/components/admin/AdminHelpCallout';
import { CultureCatalogEntryCard } from '@/components/admin/CultureCatalogEntryCard';
import { SortableAdminList } from '@/components/admin/SortableAdminList';
import { Button } from '@/components/ui/Button';
import { deleteCultureCatalogEntryAction } from '@/app/(admin)/admin/(panel)/culture-pages/actions';
import { reorderCultureItemsAction } from '@/app/(admin)/admin/(panel)/culture-items/reorder-action';
import { cultureCatalogPageAdminHref } from '@/lib/admin/culture-catalog-pages';
import type {
  CultureCatalogEntryAdmin,
  CultureCatalogSubpageLink,
} from '@/lib/admin/culture-catalog-entry';
import { cn } from '@/lib/utils';

interface CultureCatalogEntriesPanelProps {
  menuItemId: string;
  menuPath: string;
  pageLabel: string;
  entries: CultureCatalogEntryAdmin[];
  subpageLinks: CultureCatalogSubpageLink[];
  managesGridCards: boolean;
}

export function CultureCatalogEntriesPanel({
  menuItemId,
  menuPath,
  pageLabel,
  entries,
  subpageLinks,
  managesGridCards,
}: CultureCatalogEntriesPanelProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [query, setQuery] = useState('');
  const [isDeleting, startDeleteTransition] = useTransition();
  const createHref = `/admin/culture-items/new?menuItemId=${encodeURIComponent(menuItemId)}`;

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return entries;
    return entries.filter((entry) => {
      const haystack = [entry.title, entry.region, entry.periodLabel, entry.slug]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [entries, query]);

  function handleDeleteEntry(entry: CultureCatalogEntryAdmin): void {
    if (typeof window === 'undefined') return;
    const label = entry.title.trim() || `Card #${entry.order}`;
    if (!window.confirm(`Delete "${label}"?`)) return;
    startDeleteTransition(() => {
      void deleteCultureCatalogEntryAction(entry.id, menuItemId, menuPath).then((result) => {
        if (!result.ok) {
          window.alert(result.message);
          return;
        }
        router.refresh();
      });
    });
  }

  if (!managesGridCards) {
    return (
      <AdminHelpCallout title="Grid cards live in sub-pages">
        <p>
          <strong>{pageLabel}</strong> shows sub-catalog links on the public site. Edit monument photos and
          text inside each sub-page:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {subpageLinks.map((link) => (
            <li key={link.menuPath}>
              <Link href={cultureCatalogPageAdminHref(link.menuPath)} className="text-bronze-800 underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </AdminHelpCallout>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="relative min-w-[14rem] flex-1 max-w-md">
          <span className="sr-only">Search cards</span>
          <Search
            size={15}
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cards…"
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-ink-muted focus:border-bronze-400 focus:ring-2 focus:ring-bronze-400/20"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-xl border border-stone-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('board')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                viewMode === 'board'
                  ? 'bg-pomegranate text-white'
                  : 'text-ink-soft hover:bg-stone-100 hover:text-ink'
              }`}
            >
              <LayoutGrid size={14} aria-hidden />
              Board
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                viewMode === 'list'
                  ? 'bg-pomegranate text-white'
                  : 'text-ink-soft hover:bg-stone-100 hover:text-ink'
              }`}
            >
              <List size={14} aria-hidden />
              List
            </button>
          </div>
          <Button type="button" onClick={() => router.push(createHref)} className="shrink-0">
            <Plus size={16} aria-hidden /> Add card
          </Button>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-parchment-50 px-6 py-12 text-center">
          <p className="font-display text-xl text-ink">No cards yet</p>
          <p className="mt-2 text-sm text-ink-muted">Add Tatev, Geghard, and other monuments to the grid.</p>
          <Button type="button" className="mt-5" onClick={() => router.push(createHref)} withArrow>
            Add first card
          </Button>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-parchment-50 px-6 py-10 text-center">
          <p className="text-sm text-ink-muted">No cards match “{query.trim()}”.</p>
        </div>
      ) : (
        <SortableAdminList
          items={filteredEntries}
          persist={(orderedIds) =>
            query.trim()
              ? Promise.resolve({ ok: false, message: 'Clear the search before reordering.' })
              : reorderCultureItemsAction(orderedIds)
          }
          empty="No cards match this search."
          layout={viewMode === 'board' ? 'grid' : 'stack'}
          handleClassName={
            viewMode === 'board'
              ? 'border-white/30 bg-black/45 text-white shadow-none hover:border-white/60 hover:text-white'
              : undefined
          }
          trailing={
            viewMode === 'board' ? (
              <button
                type="button"
                onClick={() => router.push(createHref)}
                className="flex min-h-[18rem] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-stone-200 bg-parchment-50/50 p-6 text-ink-muted transition hover:border-bronze-400 hover:bg-parchment-50 hover:text-bronze-800"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <Plus size={22} aria-hidden />
                </span>
                <span className="text-sm font-medium">Add new card</span>
              </button>
            ) : null
          }
          renderItem={(entry, handle, overlay, index) =>
            viewMode === 'board' ? (
              <CultureCatalogEntryCard
                entry={entry}
                index={index}
                dragHandle={handle}
                overlay={overlay}
                onEdit={() => router.push(`/admin/culture-items/${entry.id}`)}
                onDelete={() => handleDeleteEntry(entry)}
                deleteDisabled={isDeleting}
              />
            ) : (
              <CatalogEntryRow
                entry={entry}
                handle={handle}
                overlay={overlay}
                onEdit={() => router.push(`/admin/culture-items/${entry.id}`)}
                onDelete={() => handleDeleteEntry(entry)}
                deleteDisabled={isDeleting}
              />
            )
          }
        />
      )}
    </div>
  );
}

function CatalogEntryRow({
  entry,
  handle,
  overlay,
  onEdit,
  onDelete,
  deleteDisabled,
}: {
  entry: CultureCatalogEntryAdmin;
  handle: ReactNode;
  overlay: boolean;
  onEdit: () => void;
  onDelete: () => void;
  deleteDisabled: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-3 py-3 shadow-sm sm:px-4',
        overlay && 'shadow-lg ring-1 ring-bronze-300/40',
      )}
    >
      {handle}
      <button type="button" onClick={onEdit} className="min-w-0 flex-1 text-left">
        <p className="truncate font-medium text-ink">{entry.title || 'Untitled card'}</p>
        <p className="truncate text-xs text-ink-muted">{entry.region || '—'}</p>
      </button>
      {overlay ? null : (
        <button
          type="button"
          onClick={onDelete}
          disabled={deleteDisabled}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-pomegranate hover:bg-pomegranate/10 disabled:opacity-50"
        >
          <Trash2 size={12} aria-hidden />
          Delete
        </button>
      )}
    </div>
  );
}
