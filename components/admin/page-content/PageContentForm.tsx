'use client';

import type { PageContentSlug } from '@/lib/types/page-content';
import { CulturalPortalPageContentForm } from '@/components/admin/page-content/forms/CulturalPortalPageContentForm';
import { DonationPageContentForm } from '@/components/admin/page-content/forms/DonationPageContentForm';
import { LandingPageContentForm } from '@/components/admin/page-content/forms/LandingPageContentForm';
import { PartnershipPageContentForm } from '@/components/admin/page-content/forms/PartnershipPageContentForm';
import { StaticPageHeroForm } from '@/components/admin/page-content/forms/StaticPageHeroForm';

interface Props {
  slug: PageContentSlug;
  initial: Record<string, unknown>;
}

const LANDING_SLUGS = ['khndzoresk', 'khachaturian-museum', 'national-gallery-armenia'] as const;
const STATIC_HERO_SLUGS = ['contacts-page', 'projects-page'] as const;

export function PageContentForm({ slug, initial }: Props) {
  if (slug === 'donation-page') {
    return <DonationPageContentForm initial={initial} />;
  }

  if (slug === 'partnership-page') {
    return <PartnershipPageContentForm initial={initial} />;
  }

  if (slug === 'cultural-portal-page') {
    return <CulturalPortalPageContentForm initial={initial} />;
  }

  if ((LANDING_SLUGS as readonly string[]).includes(slug)) {
    return (
      <LandingPageContentForm
        slug={slug as (typeof LANDING_SLUGS)[number]}
        initial={initial}
      />
    );
  }

  if ((STATIC_HERO_SLUGS as readonly string[]).includes(slug)) {
    return (
      <StaticPageHeroForm
        slug={slug as (typeof STATIC_HERO_SLUGS)[number]}
        initial={initial}
      />
    );
  }

  return null;
}
