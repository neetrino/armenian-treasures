'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Castle, Church, Landmark, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PublicCultureItemDTO } from '@/lib/dto';

const LeafletMap = dynamic(() => import('./LeafletMap').then((m) => m.LeafletMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-stone-100 text-sm text-ink-muted">
      Loading map…
    </div>
  ),
});

interface MapPanelProps {
  items: PublicCultureItemDTO[];
}

type Filter = 'ALL' | 'MONASTERY' | 'FORTRESS' | 'MUSEUM';

const FILTERS: { value: Filter; label: string; icon: LucideIcon }[] = [
  { value: 'ALL', label: 'All', icon: MapPin },
  { value: 'MONASTERY', label: 'Monasteries', icon: Church },
  { value: 'FORTRESS', label: 'Fortresses', icon: Castle },
  { value: 'MUSEUM', label: 'Museums', icon: Landmark },
];

export function MapPanel({ items }: MapPanelProps) {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);

  const visible = useMemo(() => {
    if (filter === 'ALL') return items;
    return items.filter((item) => item.mapType === filter);
  }, [items, filter]);

  const selected = visible.find((item) => item.id === selectedId) ?? visible[0] ?? null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const Icon = f.icon;
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition',
                active
                  ? 'border-pomegranate bg-pomegranate text-parchment-50'
                  : 'border-stone-200 bg-white text-ink-soft hover:border-pomegranate hover:text-pomegranate',
              )}
            >
              <Icon size={14} aria-hidden /> {f.label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <ul className="flex max-h-[640px] flex-col gap-2 overflow-y-auto rounded-2xl border border-stone-100 bg-white p-3 shadow-card">
          {visible.length === 0 ? (
            <li className="px-3 py-6 text-sm text-ink-muted">No items match this filter.</li>
          ) : (
            visible.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    'w-full rounded-lg px-3 py-2.5 text-left text-sm transition',
                    selectedId === item.id
                      ? 'bg-pomegranate/10 text-pomegranate'
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
        <div className="relative h-[420px] overflow-hidden rounded-2xl border border-stone-100 bg-stone-100 shadow-card lg:h-[640px]">
          <LeafletMap items={visible} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>
      {selected ? (
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <p className="eyebrow">{selected.mapType ?? 'Heritage site'}</p>
          <h3 className="mt-2 font-display text-2xl text-ink">{selected.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-eyebrow text-bronze-700">
            {selected.region ?? 'Armenia'}
            {selected.periodLabel ? ` · ${selected.periodLabel}` : ''}
          </p>
          {selected.description ? (
            <p className="mt-4 max-w-3xl text-sm text-ink-soft">{selected.description}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
