import type { Metadata } from 'next';
import '@/components/sections/featured-treasures/featured-treasures-section.css';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingHero } from '@/components/landing/LandingHero';
import { FeaturedTreasuresGrid } from '@/components/sections/featured-treasures/FeaturedTreasuresGrid';
import {
  HIGHLIGHT_TREASURE_COUNT,
  HIGHLIGHTS_PAGE,
  HIGHLIGHTS_PAGE_PATH,
} from '@/lib/constants/featured-treasures';
import { mapCultureItemsToHighlightTreasures } from '@/lib/mappers/featured-treasures';
import { getHighlightCultureItems } from '@/lib/queries/culture-items';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

export const revalidate = 60;

export const metadata: Metadata = buildPublicPageMetadata({
  title: 'Highlights — Armenian Treasures',
  description: HIGHLIGHTS_PAGE.subtitle,
  pathname: HIGHLIGHTS_PAGE_PATH,
});

async function HighlightsPage() {
  const [items, locale] = await Promise.all([
    getHighlightCultureItems(HIGHLIGHT_TREASURE_COUNT),
    getCurrentSiteLocale(),
  ]);
  const treasures = mapCultureItemsToHighlightTreasures(items);

  return (
    <HeritageLandingShell>
      <LandingHero
        locale={locale}
        eyebrow={HIGHLIGHTS_PAGE.eyebrow}
        title={HIGHLIGHTS_PAGE.title}
        accent={HIGHLIGHTS_PAGE.accent}
        subtitle={HIGHLIGHTS_PAGE.subtitle}
        ctas={[
          { label: uiMessage(locale, 'browseHighlights'), href: '#highlights', variant: 'gold' },
          { label: uiMessage(locale, 'supportTheMission'), href: '/donate', variant: 'teal' },
        ]}
      />
      <KhndzoreskDivider />
      <section id="highlights" className="relative px-5 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12">
        <div className="relative z-10 mx-auto w-full max-w-[76rem]">
          {treasures.length === 0 ? (
            <p className="font-display text-[var(--surface-text-body)]">
              {uiMessage(locale, 'moreHighlightsSoon')}
            </p>
          ) : (
            <FeaturedTreasuresGrid treasures={treasures} variant="tiles" />
          )}
        </div>
      </section>
    </HeritageLandingShell>
  );
}

export default HighlightsPage;
