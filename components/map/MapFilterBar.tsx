'use client';

import { Amphora, Castle, Church, Columns3, Compass, Landmark } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  heritageMapFilterOptions,
  type HeritageMapFilterValue,
} from '@/lib/constants/heritage-map-filters';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

const HERITAGE_FILTER_CATEGORIES: { value: HeritageMapFilterValue; icon: LucideIcon }[] = [
  { value: 'ALL', icon: Compass },
  { value: 'RELIGIOUS', icon: Church },
  { value: 'MONUMENTS', icon: Columns3 },
  { value: 'MUSEUMS', icon: Landmark },
  { value: 'SETTLEMENTS', icon: Castle },
  { value: 'OTHER', icon: Amphora },
];

function heritageFilterIcon(value: HeritageMapFilterValue): LucideIcon {
  return HERITAGE_FILTER_CATEGORIES.find((category) => category.value === value)?.icon ?? Compass;
}

interface MapFilterBarProps {
  filter: HeritageMapFilterValue;
  onFilterChange: (value: HeritageMapFilterValue) => void;
  locale?: SiteLocaleCode;
  overlay?: boolean;
}

export function MapFilterBar({
  filter,
  onFilterChange,
  locale = 'EN',
  overlay = false,
}: MapFilterBarProps) {
  const filterOptions = heritageMapFilterOptions(locale);

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2',
        overlay && 'pointer-events-auto',
      )}
      role="group"
      aria-label={uiMessage(locale, 'filterSitesByCategory')}
    >
      {filterOptions.map((option) => {
        const Icon = heritageFilterIcon(option.value);
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
                  ? 'border-heritage-gold bg-neutral-300 text-neutral-950'
                  : 'border-black bg-black text-heritage-gold hover:bg-neutral-950'
                : active
                  ? 'border-heritage-gold bg-heritage-gold/15 text-heritage-gold'
                  : 'border-stone-200/80 bg-white/80 text-ink-soft hover:border-heritage-teal/40 hover:text-heritage-teal',
            )}
          >
            <Icon
              size={18}
              strokeWidth={active ? 1.9 : 1.65}
              className="shrink-0"
              aria-hidden="true"
            />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
