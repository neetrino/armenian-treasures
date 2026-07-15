'use client';

import Image from 'next/image';
import { Box, MapPin, Pencil, Trash2 } from 'lucide-react';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { CultureCatalogEntryAdmin } from '@/lib/admin/culture-catalog-entry';
import { cn } from '@/lib/utils';

interface CultureCatalogEntryCardProps {
  entry: CultureCatalogEntryAdmin;
  index: number;
  onEdit: () => void;
  onDelete?: () => void;
  deleteDisabled?: boolean;
}

export function CultureCatalogEntryCard({
  entry,
  index,
  onEdit,
  onDelete,
  deleteDisabled = false,
}: CultureCatalogEntryCardProps) {
  const cardNumber = String(index + 1).padStart(2, '0');
  const imageSrc = entry.image
    ? resolvePublicAssetUrl(entry.image)
    : resolvePublicAssetUrl('/images/placeholder.svg');
  const isDraft = entry.status !== 'PUBLISHED';

  return (
    <button
      type="button"
      onClick={onEdit}
      className={cn(
        'group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-stone-800/80 bg-[#0f1419] text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:border-bronze-500/50 hover:shadow-xl',
        isDraft && 'opacity-80 ring-1 ring-amber-400/40',
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-transparent to-transparent" />
        {onDelete ? (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onDelete();
            }}
            disabled={deleteDisabled}
            className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-pomegranate/70 bg-pomegranate px-2.5 py-1 text-[11px] font-semibold text-white opacity-95 shadow-[0_4px_14px_rgba(0,0,0,0.45)] transition hover:bg-[#8f0f2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-1 focus-visible:ring-offset-black disabled:opacity-50"
            title="Delete card"
          >
            <Trash2 size={12} aria-hidden />
            Delete
          </button>
        ) : null}
        {entry.tourUrl ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-bronze-400/40 bg-black/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-bronze-200">
            <Box size={11} aria-hidden /> 3D Tour
          </span>
        ) : null}
        <span className="absolute bottom-2 right-3 font-display text-4xl leading-none text-white/15">
          {cardNumber}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-pomegranate px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow transition group-hover:opacity-100">
          <Pencil size={12} aria-hidden /> Edit
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-teal-300/90">
          {entry.region ? (
            <span className="inline-flex items-center gap-1">
              <MapPin size={11} aria-hidden /> {entry.region}
            </span>
          ) : null}
          {entry.periodLabel ? <span>{entry.periodLabel}</span> : null}
        </div>
        <h3 className="mt-2 font-display text-lg uppercase leading-tight text-bronze-200">{entry.title}</h3>
        {entry.description ? (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-400">{entry.description}</p>
        ) : null}
        {isDraft ? (
          <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-amber-400">Draft — not public</p>
        ) : null}
      </div>
    </button>
  );
}
