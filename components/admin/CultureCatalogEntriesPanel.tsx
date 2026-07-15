'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutGrid, List, Plus, Trash2 } from 'lucide-react';
import { AdminHelpCallout } from '@/components/admin/AdminHelpCallout';
import { CultureCatalogEntryCard } from '@/components/admin/CultureCatalogEntryCard';
import { CultureCatalogEntrySheet } from '@/components/admin/CultureCatalogEntrySheet';
import { Button } from '@/components/ui/Button';
import { deleteCultureCatalogEntryAction } from '@/app/(admin)/admin/(panel)/culture-pages/actions';
import { cultureCatalogPageAdminHref } from '@/lib/admin/culture-catalog-pages';
import type {
  CultureCatalogEntryAdmin,
  CultureCatalogSubpageLink,
} from '@/lib/admin/culture-catalog-entry';

type SheetMode =
  | { type: 'edit'; entry: CultureCatalogEntryAdmin; index: number }
  | { type: 'create' };

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
  const [sheetMode, setSheetMode] = useState<SheetMode | null>(null);
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [isDeleting, startDeleteTransition] = useTransition();
  const nextOrder = entries.reduce((max, entry) => Math.max(max, entry.order), -1) + 1;

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
        if (sheetMode?.type === 'edit' && sheetMode.entry.id === entry.id) {
          setSheetMode(null);
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
    <>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-end">
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
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <AdminHelpCallout title="Public grid cards" className="flex-1">
            Click any card to edit photo and text in a side panel — styled like the live public page.
          </AdminHelpCallout>
          <Button
            type="button"
            onClick={() => setSheetMode({ type: 'create' })}
            className="shrink-0"
          >
            <Plus size={16} aria-hidden /> Add card
          </Button>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-parchment-50 px-6 py-12 text-center">
            <p className="font-display text-xl text-ink">No cards yet</p>
            <p className="mt-2 text-sm text-ink-muted">Add Tatev, Geghard, and other monuments to the grid.</p>
            <Button type="button" className="mt-5" onClick={() => setSheetMode({ type: 'create' })} withArrow>
              Add first card
            </Button>
          </div>
        ) : viewMode === 'list' ? (
          <div className="overflow-hidden rounded-2xl border border-stone-200/70 bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-parchment-50 text-xs uppercase tracking-[0.14em] text-ink-muted">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.id} className="border-t border-stone-100">
                    <td className="px-4 py-3 text-ink-muted">{entry.order}</td>
                    <td className="px-4 py-3 font-medium text-ink">{entry.title || `Card ${index + 1}`}</td>
                    <td className="px-4 py-3 text-ink-soft">
                      <span className="line-clamp-2">{entry.description || 'No description yet.'}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setSheetMode({ type: 'edit', entry, index })}
                          disabled={isDeleting}
                        >
                          Edit
                        </Button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEntry(entry)}
                          disabled={isDeleting}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-pomegranate hover:bg-pomegranate/10 disabled:opacity-50"
                          title="Delete card"
                        >
                          <Trash2 size={12} aria-hidden />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {entries.map((entry, index) => (
              <CultureCatalogEntryCard
                key={entry.id}
                entry={entry}
                index={index}
                onEdit={() => setSheetMode({ type: 'edit', entry, index })}
                onDelete={() => handleDeleteEntry(entry)}
                deleteDisabled={isDeleting}
              />
            ))}
            <button
              type="button"
              onClick={() => setSheetMode({ type: 'create' })}
              className="flex min-h-[18rem] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-stone-200 bg-parchment-50/50 p-6 text-ink-muted transition hover:border-bronze-400 hover:bg-parchment-50 hover:text-bronze-800"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Plus size={22} aria-hidden />
              </span>
              <span className="text-sm font-medium">Add new card</span>
            </button>
          </div>
        )}
      </div>

      <CultureCatalogEntrySheet
        open={sheetMode !== null}
        onClose={() => setSheetMode(null)}
        mode={sheetMode}
        menuItemId={menuItemId}
        menuPath={menuPath}
        nextOrder={nextOrder}
      />
    </>
  );
}
