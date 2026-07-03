'use client';

import { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Castle,
  ChevronRight,
  Church,
  Landmark,
  MapPin,
  Mountain,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PublicCultureItemDTO } from '@/lib/dto';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import {
  filterMapItemsByCategory,
  filterMapItemsBySearch,
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

export function MapPanel({ items }: MapPanelProps) {
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
    mapViewportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
        <div className="relative overflow-hidden rounded-3xl border border-heritage-gold/20 bg-slate-950/75 p-3 shadow-[0_8px_24px_rgba(15,23,42,0.25)] backdrop-blur-md">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 18% 12%, rgba(214,184,90,0.28) 0%, transparent 55%), linear-gradient(150deg, rgba(39,198,200,0.08), transparent 50%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(214,184,90,0.12) 0px, rgba(214,184,90,0.12) 1px, transparent 1px, transparent 14px)',
            }}
            aria-hidden
          />
          <div className="relative flex items-center justify-between px-2 pb-2 pt-1">
            <p className="font-cinzel text-[11px] uppercase tracking-[0.24em] text-heritage-gold/90">
              Heritage Locations
            </p>
            <span className="text-[11px] uppercase tracking-[0.2em] text-heritage-teal/80">
              {visible.length} visible
            </span>
          </div>
          <label className="relative mb-3 block px-2">
            <span className="sr-only">Search heritage sites</span>
            <Search
              size={15}
              aria-hidden
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-heritage-teal/70"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search sites…"
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2.5 pl-10 pr-10 font-display text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-heritage-gold/45 focus:ring-2 focus:ring-heritage-gold/20"
            />
            {searchQuery ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => handleSearchChange('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-heritage-gold"
              >
                <X size={14} aria-hidden />
              </button>
            ) : null}
          </label>
          <ul className="scrollbar-none relative flex max-h-[585px] flex-col gap-2 overflow-y-auto pr-1">
            {visible.length === 0 ? (
              <li className="rounded-2xl border border-heritage-gold/20 bg-slate-900/70 px-4 py-6 text-sm text-slate-300">
                {searchQuery.trim()
                  ? 'No published sites match your search. Try another name, region, or period.'
                  : 'No published sites match this filter yet. Try another category or check back as the archive grows.'}
              </li>
            ) : (
              visible.map((item) => {
                const active = activeId === item.id;
                const ItemIcon = resolveMapItemIcon(item.mapType);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectItem(item.id)}
                      className={cn(
                        'group relative w-full overflow-hidden rounded-2xl border px-3.5 py-3 text-left transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold/70',
                        active
                          ? 'border-heritage-gold/60 bg-gradient-to-r from-heritage-gold/20 via-heritage-gold/10 to-transparent shadow-[0_8px_18px_rgba(214,184,90,0.18)]'
                          : 'border-white/10 bg-slate-900/65 hover:-translate-y-0.5 hover:border-heritage-gold/40 hover:bg-slate-900/85',
                      )}
                    >
                      <span
                        className={cn(
                          'absolute left-0 top-2 h-[calc(100%-1rem)] w-[3px] rounded-r-full transition-colors',
                          active ? 'bg-heritage-gold' : 'bg-transparent group-hover:bg-heritage-gold/60',
                        )}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          'absolute right-2 top-2 h-2 w-2 rounded-full transition-all',
                          active
                            ? 'bg-heritage-gold shadow-[0_0_0_3px_rgba(214,184,90,0.22)]'
                            : 'bg-heritage-gold/0 group-hover:bg-heritage-gold/65',
                        )}
                        aria-hidden
                      />
                      <span className="relative flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors',
                            active
                              ? 'border-heritage-gold/50 bg-heritage-gold/15 text-heritage-gold'
                              : 'border-white/15 bg-slate-800/80 text-heritage-teal group-hover:border-heritage-gold/30 group-hover:text-heritage-gold',
                          )}
                        >
                          <ItemIcon size={15} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              'block truncate text-[1.02rem] leading-tight transition-colors',
                              active
                                ? 'font-semibold text-white'
                                : 'font-medium text-slate-100 group-hover:text-white',
                            )}
                          >
                            {item.title}
                          </span>
                          <span
                            className={cn(
                              'mt-1.5 inline-flex max-w-full flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em]',
                              active ? 'text-heritage-champagne' : 'text-amber-200/75',
                            )}
                          >
                            <span className="truncate">{item.region ?? 'Armenia'}</span>
                            {item.periodLabel ? (
                              <>
                                <span className="h-1 w-1 rounded-full bg-current/80" aria-hidden />
                                <span className="truncate">{item.periodLabel}</span>
                              </>
                            ) : null}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'pt-0.5 text-heritage-gold/70 transition-transform duration-200',
                            active ? 'translate-x-0 opacity-100' : 'opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100',
                          )}
                        >
                          <ChevronRight size={16} aria-hidden />
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        <div
          ref={mapViewportRef}
          className="relative h-[420px] overflow-hidden rounded-2xl border border-stone-200/70 bg-stone-100 shadow-card lg:h-[640px]"
        >
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

      {selected ? (
        <div className="relative overflow-hidden rounded-3xl border border-heritage-gold/20 bg-slate-950/75 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.25)] backdrop-blur-md">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 18% 12%, rgba(214,184,90,0.28) 0%, transparent 55%), linear-gradient(150deg, rgba(39,198,200,0.08), transparent 50%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(214,184,90,0.12) 0px, rgba(214,184,90,0.12) 1px, transparent 1px, transparent 14px)',
            }}
            aria-hidden
          />
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
