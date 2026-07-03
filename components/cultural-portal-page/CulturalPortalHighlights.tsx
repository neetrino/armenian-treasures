import '@/components/sections/featured-treasures/featured-treasures-section.css';
import { FeaturedTreasuresGrid } from '@/components/sections/featured-treasures/FeaturedTreasuresGrid';
import { FEATURED_TREASURES_SECTION } from '@/lib/constants/featured-treasures';

export function CulturalPortalHighlights() {
  return (
    <section>
      <p className="sec-label">{FEATURED_TREASURES_SECTION.eyebrow}</p>
      <h2 className="sec-title">{FEATURED_TREASURES_SECTION.title}</h2>
      <div className="cultural-portal-featured-treasures">
        <FeaturedTreasuresGrid />
      </div>
    </section>
  );
}
