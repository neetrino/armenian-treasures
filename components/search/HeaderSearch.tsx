'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import {
  CATALOG_PERIOD_OPTIONS,
  CATALOG_REGION_OPTIONS,
  CATALOG_TYPE_OPTIONS,
} from '@/lib/culture-catalog/catalog-filter-options';
import {
  CATALOG_SEARCH_PATH,
  parseCatalogSearchParams,
} from '@/lib/culture-catalog/catalog-search-params';
import { CatalogSearchFields } from '@/components/search/CatalogSearchFields';
import { cn } from '@/lib/utils';

const ICON_BUTTON =
  'inline-flex h-9 w-9 items-center justify-center border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)] border-[var(--surface-border)] text-[var(--nav-text)] hover:border-[rgba(39,198,200,0.45)] hover:text-[var(--nav-text-active)]';

export function HeaderSearch() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const defaults = parseCatalogSearchParams(searchParams);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className={cn(ICON_BUTTON, open && 'border-[rgba(39,198,200,0.45)] text-heritage-teal')}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="header-catalog-search"
        aria-label="Search heritage catalog"
        onClick={() => setOpen((value) => !value)}
      >
        <Search size={16} strokeWidth={1.6} aria-hidden />
      </button>

      {open ? (
        <div
          id="header-catalog-search"
          role="dialog"
          aria-label="Search by region, period, and type"
          className="absolute right-0 top-[calc(100%+8px)] z-[1002] w-[min(22.5rem,calc(100vw-2rem))] border border-[var(--dropdown-border)] bg-[var(--dropdown-bg)] p-4 shadow-[var(--shadow-dropdown)] backdrop-blur-[20px]"
        >
          <form action={CATALOG_SEARCH_PATH} method="get" className="flex flex-col gap-3">
            <CatalogSearchFields
              defaults={defaults}
              regions={CATALOG_REGION_OPTIONS}
              periods={CATALOG_PERIOD_OPTIONS}
              types={CATALOG_TYPE_OPTIONS}
              variant="header"
            />
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center bg-gradient-to-r from-[#c9a84c] to-[#d6b85a] font-cinzel text-[10px] font-bold uppercase tracking-[0.16em] text-[#0a0805] [clip-path:polygon(6px_0%,100%_0%,calc(100%-6px)_100%,0%_100%)]"
            >
              Search catalog
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
