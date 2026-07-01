'use client';

import { useState } from 'react';
import type { PageContentSlug } from '@/lib/types/page-content';
import { AdminFormTabs } from '@/components/admin/AdminFormTabs';
import { CulturalPortalPageContentForm } from '@/components/admin/page-content/forms/CulturalPortalPageContentForm';
import { DonationPageContentForm } from '@/components/admin/page-content/forms/DonationPageContentForm';
import { LandingPageContentForm } from '@/components/admin/page-content/forms/LandingPageContentForm';
import { PartnershipPageContentForm } from '@/components/admin/page-content/forms/PartnershipPageContentForm';
import { StaticPageHeroForm } from '@/components/admin/page-content/forms/StaticPageHeroForm';
import { resolveLocalizedJsonContent } from '@/lib/i18n/translatable-json-content';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

interface Props {
  slug: PageContentSlug;
  initial: Record<string, unknown>;
}

const LANDING_SLUGS = ['khndzoresk', 'khachaturian-museum', 'national-gallery-armenia'] as const;
const STATIC_HERO_SLUGS = ['contacts-page', 'projects-page'] as const;

export function PageContentForm({ slug, initial }: Props) {
  const [activeLocale, setActiveLocale] = useState<SiteLocaleCode>('EN');
  const localeInitial = resolveLocalizedJsonContent(initial, activeLocale);

  const tabs = SITE_LOCALE_CODES.map((locale) => ({ id: locale, label: locale }));

  const renderForm = () => {
  if (slug === 'donation-page') {
      return <DonationPageContentForm initial={localeInitial} locale={activeLocale} />;
  }

  if (slug === 'partnership-page') {
      return <PartnershipPageContentForm initial={localeInitial} locale={activeLocale} />;
  }

  if (slug === 'cultural-portal-page') {
      return <CulturalPortalPageContentForm initial={localeInitial} locale={activeLocale} />;
  }

  if ((LANDING_SLUGS as readonly string[]).includes(slug)) {
      return (
        <LandingPageContentForm
          slug={slug as (typeof LANDING_SLUGS)[number]}
          initial={localeInitial}
          locale={activeLocale}
        />
      );
  }

  if ((STATIC_HERO_SLUGS as readonly string[]).includes(slug)) {
      return (
        <StaticPageHeroForm
          slug={slug as (typeof STATIC_HERO_SLUGS)[number]}
          initial={localeInitial}
          locale={activeLocale}
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
