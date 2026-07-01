'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { AdminFormTabs } from '@/components/admin/AdminFormTabs';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import { cn } from '@/lib/utils';

interface TranslatableFieldsTabsProps {
  children: (locale: SiteLocaleCode) => ReactNode;
  tabErrors?: Partial<Record<SiteLocaleCode, boolean>>;
  className?: string;
}

const DEFAULT_ACTIVE_LOCALE: SiteLocaleCode = 'EN';

export function TranslatableFieldsTabs({
  children,
  tabErrors,
  className,
}: TranslatableFieldsTabsProps) {
  const [activeLocale, setActiveLocale] = useState<SiteLocaleCode>(DEFAULT_ACTIVE_LOCALE);

  const tabs = useMemo(
    () =>
      SITE_LOCALE_CODES.map((locale) => ({
        id: locale,
        label: locale,
        hint: tabErrors?.[locale] ? 'Needs review' : undefined,
      })),
    [tabErrors],
  );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <AdminFormTabs
        tabs={tabs}
        activeId={activeLocale}
        onChange={(id) => setActiveLocale(id as SiteLocaleCode)}
      />
      <div
        className="rounded-2xl border border-stone-200/70 bg-white/90 p-4 shadow-sm sm:p-5"
        key={activeLocale}
      >
        {children(activeLocale)}
      </div>
    </div>
  );
}
