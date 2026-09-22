'use client';

import { useCallback, useMemo, useState } from 'react';
import type { PageContentSlug } from '@/lib/types/page-content';
import { AdminFormTabs } from '@/components/admin/AdminFormTabs';
import { CulturalPortalPageContentForm } from '@/components/admin/page-content/forms/CulturalPortalPageContentForm';
import { DonationPageContentForm } from '@/components/admin/page-content/forms/DonationPageContentForm';
import { LandingPageContentForm } from '@/components/admin/page-content/forms/LandingPageContentForm';
import { PartnershipPageContentForm } from '@/components/admin/page-content/forms/PartnershipPageContentForm';
import { StaticPageHeroForm } from '@/components/admin/page-content/forms/StaticPageHeroForm';
import {
  isLocalizedJsonContent,
  resolveLocalizedJsonContent,
} from '@/lib/i18n/translatable-json-content';
import { SITE_LOCALE_CODES, SITE_LOCALE_DEFINITIONS, type SiteLocaleCode } from '@/lib/i18n/locale-config';

interface Props {
  slug: PageContentSlug;
  initial: Record<string, unknown>;
}

const LANDING_SLUGS = ['khndzoresk', 'khachaturian-museum', 'national-gallery-armenia'] as const;
const STATIC_HERO_SLUGS = ['contacts-page', 'projects-page'] as const;

type LocaleDraftMap = Partial<Record<SiteLocaleCode, Record<string, unknown>>>;

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hydrateLocaleDrafts(initial: Record<string, unknown>): LocaleDraftMap {
  const drafts: LocaleDraftMap = {};
  if (isLocalizedJsonContent(initial)) {
    for (const code of SITE_LOCALE_CODES) {
      const resolved = resolveLocalizedJsonContent(initial, code);
      if (Object.keys(resolved).length > 0) drafts[code] = resolved;
    }
    return drafts;
  }
  if (isJsonObject(initial) && Object.keys(initial).length > 0) {
    drafts.EN = initial;
  }
  return drafts;
}

export function PageContentForm({ slug, initial }: Props) {
  const [activeLocale, setActiveLocale] = useState<SiteLocaleCode>('EN');
  const [drafts, setDrafts] = useState<LocaleDraftMap>(() => hydrateLocaleDrafts(initial));

  const tabs = SITE_LOCALE_DEFINITIONS.map((locale) => ({ id: locale.code, label: locale.tabLabel }));

  const localeInitial = useMemo(
    () => drafts[activeLocale] ?? resolveLocalizedJsonContent(initial, activeLocale),
    [activeLocale, drafts, initial],
  );

  const onContentChange = useCallback(
    (content: Record<string, unknown>) => {
      setDrafts((prev) => ({ ...prev, [activeLocale]: content }));
    },
    [activeLocale],
  );

  const renderForm = () => {
    if (slug === 'donation-page') {
      return (
        <DonationPageContentForm
          key={activeLocale}
          initial={localeInitial}
          locale={activeLocale}
          allLocaleDrafts={drafts}
          onContentChange={onContentChange}
        />
      );
    }

    if (slug === 'partnership-page') {
      return (
        <PartnershipPageContentForm
          key={activeLocale}
          initial={localeInitial}
          locale={activeLocale}
          allLocaleDrafts={drafts}
          onContentChange={onContentChange}
        />
      );
    }

    if (slug === 'cultural-portal-page') {
      return (
        <CulturalPortalPageContentForm
          key={activeLocale}
          initial={localeInitial}
          locale={activeLocale}
          allLocaleDrafts={drafts}
          onContentChange={onContentChange}
        />
      );
    }

    if ((LANDING_SLUGS as readonly string[]).includes(slug)) {
      return (
        <LandingPageContentForm
          key={activeLocale}
          slug={slug as (typeof LANDING_SLUGS)[number]}
          initial={localeInitial}
          locale={activeLocale}
          allLocaleDrafts={drafts}
          onContentChange={onContentChange}
        />
      );
    }

    if ((STATIC_HERO_SLUGS as readonly string[]).includes(slug)) {
      return (
        <StaticPageHeroForm
          key={activeLocale}
          slug={slug as (typeof STATIC_HERO_SLUGS)[number]}
          initial={localeInitial}
          locale={activeLocale}
          allLocaleDrafts={drafts}
          onContentChange={onContentChange}
        />
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-4">
      <AdminFormTabs tabs={tabs} activeId={activeLocale} onChange={(id) => setActiveLocale(id as SiteLocaleCode)} />
      {renderForm()}
    </div>
  );
}
