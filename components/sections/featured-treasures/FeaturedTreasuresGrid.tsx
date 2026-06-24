import { FEATURED_TREASURES } from '@/lib/constants/featured-treasures';
import { FeaturedTreasureCard } from '@/components/sections/featured-treasures/FeaturedTreasureCard';

export function FeaturedTreasuresGrid() {
  return (
    <div className="featured-treasures-grid">
      {FEATURED_TREASURES.map((treasure) => (
        <FeaturedTreasureCard key={treasure.number} treasure={treasure} />
      ))}
    </div>
  );
}
