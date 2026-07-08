'use client';

import { ChevronRight, Search, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PublicCultureItemDTO } from '@/lib/dto';

interface MapSiteListPanelProps {
  items: PublicCultureItemDTO[];
  activeId: string | null;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelect: (id: string) => void;
  resolveIcon: (mapType: PublicCultureItemDTO['mapType']) => LucideIcon;
  overlay?: boolean;
  className?: string;
}

export function MapSiteListPanel({
  items,
  activeId,
  searchQuery,
  onSearchChange,
  onSelect,
  resolveIcon,
  overlay = false,
  className,
}: MapSiteListPanelProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-3xl border border-heritage-gold/20 bg-slate-950/90 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md',
        overlay ? 'pointer-events-auto' : 'p-3',
        className,
      )}
    >
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

      <div className="relative flex items-center justify-between px-3 pb-2 pt-3">
        <p className="font-cinzel text-[11px] uppercase tracking-[0.24em] text-heritage-gold/90">
          Heritage Locations
        </p>
        <span className="text-[11px] uppercase tracking-[0.2em] text-heritage-teal/80">
          {items.length} visible
        </span>
      </div>

      <label className="relative mb-3 block px-3">
        <span className="sr-only">Search heritage sites</span>
        <Search
          size={15}
          aria-hidden
          className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-heritage-teal/70"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search sites…"
          className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2.5 pl-10 pr-10 font-display text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-heritage-gold/45 focus:ring-2 focus:ring-heritage-gold/20"
        />
        {searchQuery ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onSearchChange('')}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-heritage-gold"
          >
            <X size={14} aria-hidden />
          </button>
        ) : null}
      </label>

      <ul className="scrollbar-none relative flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3">
        {items.length === 0 ? (
          <li className="rounded-2xl border border-heritage-gold/20 bg-slate-900/70 px-4 py-6 text-sm text-slate-300">
            {searchQuery.trim()
              ? 'No published sites match your search. Try another name, region, or period.'
              : 'No published sites match this filter yet. Try another category or check back as the archive grows.'}
          </li>
        ) : (
          items.map((item) => {
            const active = activeId === item.id;
            const ItemIcon = resolveIcon(item.mapType);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
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
                        active
                          ? 'translate-x-0 opacity-100'
                          : 'opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100',
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
  );
}
