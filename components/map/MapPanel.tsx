'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Castle,
  Church,
  Landmark,
  MapPin,
  Mountain,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PublicCultureItemDTO } from '@/lib/dto';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import {
  filterMapItemsByCategory,
  HERITAGE_MAP_FILTER_OPTIONS,
  type HeritageMapFilterValue,
} from '@/lib/constants/heritage-map-filters';

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
}

const FILTER_ICONS: Record<HeritageMapFilterValue, LucideIcon> = {
  ALL: MapPin,
  RELIGIOUS: Church,
  MONUMENTS: Castle,
  MUSEUMS: Landmark,
  ARCHAEOLOGICAL: Mountain,
  OTHER: Sparkles,
};

export function MapPanel({ items }: MapPanelProps) {
  const [filter, setFilter] = useState<HeritageMapFilterValue>('ALL');
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);

  const visible = useMemo(() => filterMapItemsByCategory(items, filter), [items, filter]);

  const selected = visible.find((item) => item.id === selectedId) ?? visible[0] ?? null;

  const handleFilterChange = (next: HeritageMapFilterValue): void => {
    setFilter(next);
    setSelectedId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter heritage sites by category"
      >
        {HERITAGE_MAP_FILTER_OPTIONS.map((option) => {
          const Icon = FILTER_ICONS[option.value];
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => handleFilterChange(option.value)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2',
                active
                  ? 'border-heritage-gold bg-heritage-gold/15 text-heritage-gold'
                  : 'border-stone-200/80 bg-white/80 text-ink-soft hover:border-heritage-teal/40 hover:text-heritage-teal',
              )}
            >
              <Icon size={14} aria-hidden /> {option.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <ul className="scrollbar-none flex max-h-[640px] flex-col gap-2 overflow-y-auto rounded-2xl border border-stone-200/70 bg-white/90 p-3 shadow-card backdrop-blur-sm">
          {visible.length === 0 ? (
            <li className="px-3 py-6 text-sm text-ink-muted">
              No published sites match this filter yet. Try another category or check back as the
              archive grows.
            </li>
          ) : (
            visible.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    'w-full rounded-lg px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500',
                    selectedId === item.id
                      ? 'bg-heritage-teal/10 text-heritage-teal'
                      : 'text-ink-soft hover:bg-stone-100 hover:text-ink',
                  )}
                >
                  <span className="block font-medium text-ink">{item.title}</span>
                  <span className="text-[11px] uppercase tracking-eyebrow text-bronze-700">
                    {item.region ?? 'Armenia'}
                    {item.periodLabel ? ` · ${item.periodLabel}` : ''}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="relative h-[420px] overflow-hidden rounded-2xl border border-stone-200/70 bg-stone-100 shadow-card lg:h-[640px]">
          {items.length > 0 ? (
            <LeafletMap items={visible} selectedId={selectedId} onSelect={setSelectedId} />
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

      {selected ? (
        <div className="rounded-2xl border border-stone-200/70 bg-white/90 p-6 shadow-card backdrop-blur-sm">
          <p className="eyebrow">{selected.mapType ?? 'Heritage site'}</p>
          <h2 className="mt-2 font-display text-2xl text-ink">{selected.title}</h2>
          <p className="mt-1 text-xs uppercase tracking-eyebrow text-bronze-700">
            {selected.region ?? 'Armenia'}
            {selected.periodLabel ? ` · ${selected.periodLabel}` : ''}
          </p>
          {selected.description ? (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft">
              {selected.description}
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-3">
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
