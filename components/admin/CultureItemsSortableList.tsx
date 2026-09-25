'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import { ExternalLink, Pencil } from 'lucide-react';
import { DeleteIconButton } from '@/components/admin/DeleteIconButton';
import { SortableAdminList } from '@/components/admin/SortableAdminList';
import { Badge } from '@/components/ui/Badge';
import { StatusPill } from '@/components/ui/StatusPill';
import { reorderCultureItemsAction } from '@/app/(admin)/admin/(panel)/culture-items/reorder-action';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { cn } from '@/lib/utils';

export interface CultureItemListRow {
  id: string;
  title: string;
  slug: string;
  region: string | null;
  periodLabel: string | null;
  showOnMap: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  image: string | null;
  menuPath: string;
  menuItemId: string;
}

interface CultureItemsSortableListProps {
  rows: CultureItemListRow[];
  empty: string;
  onEdit: (row: CultureItemListRow) => void;
  onDelete: (id: string) => Promise<AdminDeleteResult | void>;
}

const FALLBACK_IMAGE = resolvePublicAssetUrl('/images/culture/card-heritage.webp');

export function CultureItemsSortableList({ rows, empty, onEdit, onDelete }: CultureItemsSortableListProps) {
  return (
    <SortableAdminList
      items={rows}
      persist={reorderCultureItemsAction}
      empty={empty}
      rejectMessage="Drag inside the same category."
      canMove={sameCategorySlice}
      renderItem={(row, handle, overlay) => (
        <CultureItemSortableRow
          row={row}
          handle={handle}
          overlay={overlay}
          onEdit={() => onEdit(row)}
          onDelete={onDelete}
        />
      )}
    />
  );
}

function sameCategorySlice(items: CultureItemListRow[], fromIndex: number, toIndex: number): boolean {
  const menuItemId = items[fromIndex]?.menuItemId;
  if (!menuItemId) return false;
  const start = Math.min(fromIndex, toIndex);
  const end = Math.max(fromIndex, toIndex);
  return items.slice(start, end + 1).every((item) => item.menuItemId === menuItemId);
}

function CultureItemSortableRow({
  row,
  handle,
  overlay,
  onEdit,
  onDelete,
}: {
  row: CultureItemListRow;
  handle: ReactNode;
  overlay: boolean;
  onEdit: () => void;
  onDelete: (id: string) => Promise<AdminDeleteResult | void>;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-3 py-3 shadow-sm sm:px-4',
        overlay && 'shadow-lg ring-1 ring-bronze-300/40',
      )}
    >
      {handle}
      <button type="button" onClick={onEdit} className="flex min-w-0 flex-1 items-center gap-3 text-left">
        <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-stone-100">
          <ItemThumb src={row.image} alt={row.title} />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium text-ink">{row.title}</span>
          <span className="block truncate text-xs text-ink-muted">
            {row.menuPath}
            {row.region ? ` · ${row.region}` : ''}
            {row.periodLabel ? ` · ${row.periodLabel}` : ''}
          </span>
        </span>
      </button>
      <StatusPill status={row.status} />
      {row.showOnMap ? <Badge tone="green">On map</Badge> : null}
      {overlay ? null : <ItemActions row={row} onEdit={onEdit} onDelete={onDelete} />}
    </div>
  );
}

function ItemActions({
  row,
  onEdit,
  onDelete,
}: {
  row: CultureItemListRow;
  onEdit: () => void;
  onDelete: (id: string) => Promise<AdminDeleteResult | void>;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
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
        onClick={onEdit}
        className="inline-flex items-center justify-center rounded-md p-1.5 text-ink-soft transition hover:bg-stone-100 hover:text-ink"
      >
        <Pencil size={14} aria-hidden />
      </button>
      <DeleteIconButton
        action={onDelete}
        id={row.id}
        ariaLabel="Delete culture item"
        confirmMessage={`Are you sure you want to delete “${row.title}”? This cannot be undone.`}
      />
    </div>
  );
}

function ItemThumb({ src, alt }: { src?: string | null; alt: string }) {
  const initialSrc = src?.trim() ? resolvePublicAssetUrl(src.trim()) : FALLBACK_IMAGE;
  const [imageSrc, setImageSrc] = useState(initialSrc);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={48}
      height={48}
      className="h-full w-full object-cover"
      unoptimized
      onError={() => setImageSrc(FALLBACK_IMAGE)}
    />
  );
}
