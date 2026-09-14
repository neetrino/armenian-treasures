import '@/components/sections/featured-treasures/featured-treasures-section.css';
import { FeaturedTreasuresGrid } from '@/components/sections/featured-treasures/FeaturedTreasuresGrid';
import { FEATURED_TREASURE_COUNT } from '@/lib/constants/featured-treasures';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { getFeaturedCultureItems } from '@/lib/queries/culture-items';
import { mapCultureItemsToFeaturedTreasures } from '@/lib/mappers/featured-treasures';

export async function CulturalPortalHighlights() {
  const [items, locale] = await Promise.all([
    getFeaturedCultureItems(FEATURED_TREASURE_COUNT),
    getCurrentSiteLocale(),
  ]);
  const treasures = mapCultureItemsToFeaturedTreasures(items, locale);

  if (treasures.length === 0) {
    return null;
  }

  return (
    <section>
      <p className="sec-label">{uiMessage(locale, 'featuredTreasuresEyebrow')}</p>
      <h2 className="sec-title">{uiMessage(locale, 'featuredTreasuresTitle')}</h2>
      <div className="cultural-portal-featured-treasures">
        <FeaturedTreasuresGrid treasures={treasures} />
      </div>
    </section>
  );
}
