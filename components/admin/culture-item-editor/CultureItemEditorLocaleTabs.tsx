'use client';

import { Check } from 'lucide-react';
import { SITE_LOCALE_DEFINITIONS, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import { cn } from '@/lib/utils';

interface CultureItemEditorLocaleTabsProps {
  activeLocale: SiteLocaleCode;
  completedLocales: Partial<Record<SiteLocaleCode, boolean>>;
  tabErrors?: Partial<Record<SiteLocaleCode, boolean>>;
  onChange: (locale: SiteLocaleCode) => void;
}

export function CultureItemEditorLocaleTabs({
  activeLocale,
  completedLocales,
  tabErrors,
  onChange,
}: CultureItemEditorLocaleTabsProps) {
  return (
    <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Content languages">
      {SITE_LOCALE_DEFINITIONS.map((locale) => {
        const active = locale.code === activeLocale;
        const completed = completedLocales[locale.code];
        const hasError = tabErrors?.[locale.code];

        return (
          <button
            key={locale.code}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(locale.code)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide transition',
              active
                ? 'border-pomegranate bg-pomegranate text-white shadow-sm'
                : 'border-stone-200 bg-white text-ink-soft hover:border-bronze-400 hover:text-ink',
              hasError && !active && 'border-pomegranate/40 text-pomegranate',
            )}
          >
            {locale.tabLabel}
            {completed ? (
              <Check size={12} className={active ? 'text-white/90' : 'text-emerald-600'} aria-hidden />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
