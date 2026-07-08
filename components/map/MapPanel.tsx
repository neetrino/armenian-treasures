'use client';

import { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Castle, Church, Landmark, MapPin, Mountain, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PublicCultureItemDTO } from '@/lib/dto';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import {
  filterMapItemsByCategory,
  filterMapItemsBySearch,
  type HeritageMapFilterValue,
} from '@/lib/constants/heritage-map-filters';
import { MapFilterBar } from '@/components/map/MapFilterBar';
import { MapSiteListPanel } from '@/components/map/MapSiteListPanel';

const LeafletMap = dynamic(
  () => import('./LeafletMap').then((m) => ({ default: m.LeafletMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-stone-100 text-sm text-ink-muted">
        Loading map…
      </div>
    ),
  },
);

interface MapPanelProps {
  items: PublicCultureItemDTO[];
  /** Home map: filters + site list overlaid on the map viewport. */
  embedToolbar?: boolean;
}

const MAP_TYPE_ICONS: Record<string, LucideIcon> = {
  MONASTERY: Church,
  CHURCH: Church,
  FORTRESS: Castle,
  MUSEUM: Landmark,
  ARCHAEOLOGICAL: Mountain,
  OTHER: Sparkles,
};

function resolveMapItemIcon(mapType: PublicCultureItemDTO['mapType']): LucideIcon {
  if (!mapType) return MapPin;
  return MAP_TYPE_ICONS[mapType] ?? MapPin;
}

export function MapPanel({ items, embedToolbar = false }: MapPanelProps) {
  const [filter, setFilter] = useState<HeritageMapFilterValue>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);
  const mapViewportRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const filtered = filterMapItemsByCategory(items, filter);
    return filterMapItemsBySearch(filtered, searchQuery);
  }, [items, filter, searchQuery]);

  const activeId = useMemo(() => {
    if (selectedId && visible.some((item) => item.id === selectedId)) return selectedId;
    return visible[0]?.id ?? null;
  }, [visible, selectedId]);

  const selected = visible.find((item) => item.id === activeId) ?? visible[0] ?? null;

  const handleFilterChange = (next: HeritageMapFilterValue): void => {
    setFilter(next);
    setSelectedId(null);
  };

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
    setSelectedId(null);
  };

  const handleSelectItem = (id: string): void => {
    setSelectedId(id);
  };

  return (
    <div className="flex flex-col gap-6">
      {!embedToolbar ? (
        <MapFilterBar filter={filter} onFilterChange={handleFilterChange} />
      ) : null}

      <div
        className={cn(
          'grid gap-6',
          embedToolbar ? 'grid-cols-1' : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]',
        )}
      >
        {!embedToolbar ? (
          <MapSiteListPanel
            items={visible}
            activeId={activeId}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSelect={handleSelectItem}
            resolveIcon={resolveMapItemIcon}
          />
        ) : null}

        <div
          ref={mapViewportRef}
          className={cn(
            'relative overflow-hidden rounded-2xl border border-stone-200/70 bg-stone-100 shadow-card',
            embedToolbar ? 'h-[min(78vh,720px)] lg:h-[min(82vh,860px)]' : 'h-[420px] lg:h-[640px]',
          )}
        >
          {embedToolbar ? (
            <div className="pointer-events-none absolute inset-0 z-[400]">
              <div className="pointer-events-auto absolute inset-x-3 top-3">
                <MapFilterBar filter={filter} onFilterChange={handleFilterChange} overlay />
              </div>
              <div className="pointer-events-auto absolute bottom-3 left-3 right-3 top-[4.75rem] w-auto sm:right-auto sm:w-[min(calc(100%-1.5rem),22rem)]">
                <MapSiteListPanel
                  items={visible}
                  activeId={activeId}
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  onSelect={handleSelectItem}
                  resolveIcon={resolveMapItemIcon}
                  overlay
                  className="h-full"
                />
              </div>
            </div>
          ) : null}

          {items.length > 0 ? (
            <LeafletMap items={visible} selectedId={activeId} onSelect={setSelectedId} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <MapPin className="text-heritage-gold/60" size={32} aria-hidden />
              <p className="max-w-sm text-sm text-ink-muted">
                No geo-located heritage sites are published yet. Coordinates appear here once
                curators verify locations in the admin CMS.
              </p>
            </div>
          )}
        </div>
      </div>

      {items.length > 0 ? (
        <p className="text-right text-[10px] text-surface-muted">
          Map tiles ©{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:text-heritage-teal hover:underline"
          >
            OpenStreetMap
          </a>{' '}
          contributors
        </p>
      ) : null}

      {selected && !embedToolbar ? (
        <div className="relative overflow-hidden rounded-3xl border border-heritage-gold/20 bg-slate-950/75 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.25)] backdrop-blur-md">
          <p className="relative font-cinzel text-[11px] uppercase tracking-[0.24em] text-heritage-gold/90">
            {selected.mapType ?? 'Heritage site'}
          </p>
          <h2 className="relative mt-2 font-display text-2xl text-white">{selected.title}</h2>
          <p className="relative mt-1 text-xs uppercase tracking-eyebrow text-heritage-champagne">
            {selected.region ?? 'Armenia'}
            {selected.periodLabel ? ` · ${selected.periodLabel}` : ''}
          </p>
          {selected.description ? (
            <p className="relative mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
              {selected.description}
            </p>
          ) : null}
          <div className="relative mt-5 flex flex-wrap gap-3">
            <Link
              href={resolveCultureItemHref(selected.slug)}
              className="inline-flex items-center rounded-full border border-heritage-gold/30 bg-heritage-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-eyebrow text-heritage-gold transition hover:bg-heritage-gold/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500"
            >
              View entry
            </Link>
            {selected.tourUrl ? (
              <a
                href={selected.tourUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-heritage-teal/30 bg-heritage-teal/10 px-4 py-2 text-xs font-semibold uppercase tracking-eyebrow text-heritage-teal transition hover:bg-heritage-teal/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500"
              >
                360° tour
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
