'use client';

import { useState } from 'react';
import { Castle, Church, Landmark, MapPin, Mountain, Search, Sparkles, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PublicCultureItemDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

const SUGGESTION_LIST_ID = 'map-site-suggestions';

const SUGGESTION_ICONS: Record<string, LucideIcon> = {
  MONASTERY: Church,
  CHURCH: Church,
  CHAPEL: Church,
  FORTRESS: Castle,
  SETTLEMENT: Mountain,
  MUSEUM: Landmark,
  MEMORIAL: Landmark,
  KHACHKAR: Sparkles,
  OTHER: Sparkles,
};

function suggestionIcon(mapType: PublicCultureItemDTO['mapType']): LucideIcon {
  if (!mapType) return MapPin;
  return SUGGESTION_ICONS[mapType] ?? MapPin;
}

interface MapSiteListPanelProps {
  suggestions?: PublicCultureItemDTO[];
  locale?: SiteLocaleCode;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelect?: (id: string) => void;
  overlay?: boolean;
  className?: string;
}

export function MapSiteListPanel({
  suggestions = [],
  locale = 'EN',
  searchQuery,
  onSearchChange,
  onSelect,
  overlay = false,
  className,
}: MapSiteListPanelProps) {
  const [open, setOpen] = useState(false);
  const showSuggestions = open && searchQuery.trim().length > 0;

  return (
    <div className={cn('relative', overlay && 'pointer-events-auto', className)}>
      <SearchField
        locale={locale}
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          onSearchChange(value);
          setOpen(true);
        }}
        expanded={showSuggestions}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      {showSuggestions ? (
        <SuggestionList
          items={suggestions}
          locale={locale}
          onSelect={(id) => {
            setOpen(false);
            onSelect?.(id);
          }}
        />
      ) : null}
    </div>
  );
}

function SearchField({
  locale,
  searchQuery,
  onSearchChange,
  expanded,
  onFocus,
  onBlur,
}: {
  locale: SiteLocaleCode;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  expanded: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{uiMessage(locale, 'searchSites')}</span>
      <Search
        size={15}
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-heritage-gold/80"
      />
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={uiMessage(locale, 'searchSites')}
        role="combobox"
        aria-expanded={expanded}
        aria-controls={SUGGESTION_LIST_ID}
        aria-autocomplete="list"
        className="w-full rounded-xl border border-heritage-gold/40 bg-slate-950/90 py-3 pl-11 pr-11 font-sans text-base text-heritage-champagne shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md caret-heritage-gold outline-none transition placeholder:text-heritage-champagne/75 focus:border-heritage-gold/70 focus:ring-2 focus:ring-heritage-gold/25 [-webkit-text-fill-color:var(--heritage-champagne)] sm:py-2.5 sm:pl-10 sm:pr-10 sm:text-sm"
      />
      {searchQuery ? (
        <button
          type="button"
          aria-label={uiMessage(locale, 'clearSearch')}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition hover:text-heritage-gold"
        >
          <X size={14} aria-hidden />
        </button>
      ) : null}
    </label>
  );
}

function SuggestionList({
  items,
  locale,
  onSelect,
}: {
  items: PublicCultureItemDTO[];
  locale: SiteLocaleCode;
  onSelect: (id: string) => void;
}) {
  return (
    <ul
      id={SUGGESTION_LIST_ID}
      role="listbox"
      className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-10 max-h-[min(52vh,24rem)] overflow-y-auto rounded-xl border border-heritage-gold/30 bg-slate-950/95 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-md sm:max-h-80"
    >
      {items.length === 0 ? (
        <li className="px-3 py-2.5 text-sm text-slate-300">{uiMessage(locale, 'noSitesMatch')}</li>
      ) : (
        items.map((item) => (
          <li key={item.id}>
            <SuggestionOption item={item} locale={locale} onSelect={onSelect} />
          </li>
        ))
      )}
    </ul>
  );
}

function SuggestionOption({
  item,
  locale,
  onSelect,
}: {
  item: PublicCultureItemDTO;
  locale: SiteLocaleCode;
  onSelect: (id: string) => void;
}) {
  const Icon = suggestionIcon(item.mapType);
  const place = item.region ?? uiMessage(locale, 'armenia');
  const detail = item.periodLabel ? `${place} · ${item.periodLabel}` : place;

  return (
    <button
      type="button"
      role="option"
      aria-selected={false}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onSelect(item.id)}
      className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-heritage-gold/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold/70"
    >
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-heritage-gold/40 bg-heritage-gold/10 text-heritage-gold">
        <Icon size={15} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block whitespace-normal break-words text-base font-semibold leading-snug text-white sm:text-sm">
          {item.title}
        </span>
        <span className="mt-1 block whitespace-normal break-words text-xs font-medium uppercase leading-snug tracking-[0.06em] text-heritage-champagne sm:text-[11px]">
          {detail}
        </span>
      </span>
    </button>
  );
}
