'use client';

import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface MapWheelZoomHintProps {
  active: boolean;
  locale?: SiteLocaleCode;
}

export function MapWheelZoomHint({ active, locale = 'EN' }: MapWheelZoomHintProps) {
  const label = active
    ? uiMessage(locale, 'mapScrollToZoom')
    : uiMessage(locale, 'mapClickToZoom');

  return (
    <div
      className={
        active
          ? 'pointer-events-none absolute bottom-4 left-1/2 z-[500] -translate-x-1/2 rounded-full border border-heritage-teal/35 bg-slate-950/80 px-3 py-1.5 text-center text-[10px] uppercase tracking-[0.16em] text-heritage-teal shadow-lg backdrop-blur-sm'
          : 'pointer-events-none absolute bottom-4 left-1/2 z-[500] max-w-[min(calc(100%-2rem),20rem)] -translate-x-1/2 rounded-full border border-white/15 bg-slate-950/75 px-4 py-2 text-center text-[11px] uppercase tracking-[0.18em] text-slate-200 shadow-lg backdrop-blur-sm'
      }
      aria-hidden
    >
      {label}
    </div>
  );
}
