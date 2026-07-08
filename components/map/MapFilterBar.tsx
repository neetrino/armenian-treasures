'use client';

import { Castle, Church, Landmark, MapPin, Mountain, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  HERITAGE_MAP_FILTER_OPTIONS,
  type HeritageMapFilterValue,
} from '@/lib/constants/heritage-map-filters';

const FILTER_ICONS: Record<HeritageMapFilterValue, LucideIcon> = {
  ALL: MapPin,
  RELIGIOUS: Church,
  MONUMENTS: Castle,
  MUSEUMS: Landmark,
  ARCHAEOLOGICAL: Mountain,
  OTHER: Sparkles,
};

interface MapFilterBarProps {
  filter: HeritageMapFilterValue;
  onFilterChange: (value: HeritageMapFilterValue) => void;
  overlay?: boolean;
}

export function MapFilterBar({ filter, onFilterChange, overlay = false }: MapFilterBarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2',
        overlay && 'pointer-events-auto',
      )}
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
            onClick={() => onFilterChange(option.value)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2',
              overlay
                ? active
                  ? 'border-heritage-gold bg-slate-950/90 text-heritage-gold shadow-lg backdrop-blur-md'
                  : 'border-white/20 bg-slate-950/80 text-slate-100 shadow-md backdrop-blur-md hover:border-heritage-gold/50'
                : active
                  ? 'border-heritage-gold bg-heritage-gold/15 text-heritage-gold'
                  : 'border-stone-200/80 bg-white/80 text-ink-soft hover:border-heritage-teal/40 hover:text-heritage-teal',
            )}
          >
            <Icon size={14} aria-hidden /> {option.label}
          </button>
        );
      })}
    </div>
  );
}
