import '@/components/sections/featured-treasures/featured-treasures-section.css';
import { FeaturedTreasuresGrid } from '@/components/sections/featured-treasures/FeaturedTreasuresGrid';
import { FEATURED_TREASURE_COUNT, FEATURED_TREASURES_SECTION } from '@/lib/constants/featured-treasures';
import { getFeaturedCultureItems } from '@/lib/queries/culture-items';
import { mapCultureItemsToFeaturedTreasures } from '@/lib/mappers/featured-treasures';

export async function CulturalPortalHighlights() {
  const items = await getFeaturedCultureItems(FEATURED_TREASURE_COUNT);
  const treasures = mapCultureItemsToFeaturedTreasures(items);

  if (treasures.length === 0) {
    return null;
  }

  return (
    <section>
      <p className="sec-label">{FEATURED_TREASURES_SECTION.eyebrow}</p>
      <h2 className="sec-title">{FEATURED_TREASURES_SECTION.title}</h2>
      <div className="cultural-portal-featured-treasures">
        <FeaturedTreasuresGrid treasures={treasures} />
      </div>
    </section>
  );
}
