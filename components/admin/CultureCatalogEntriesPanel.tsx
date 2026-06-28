'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { AdminHelpCallout } from '@/components/admin/AdminHelpCallout';
import { CultureCatalogEntryCard } from '@/components/admin/CultureCatalogEntryCard';
import { CultureCatalogEntrySheet } from '@/components/admin/CultureCatalogEntrySheet';
import { Button } from '@/components/ui/Button';
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
  const [sheetMode, setSheetMode] = useState<SheetMode | null>(null);
  const nextOrder = entries.reduce((max, entry) => Math.max(max, entry.order), -1) + 1;

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
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {entries.map((entry, index) => (
              <CultureCatalogEntryCard
                key={entry.id}
                entry={entry}
                index={index}
                onEdit={() => setSheetMode({ type: 'edit', entry, index })}
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
