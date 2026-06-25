import { FEATURED_TREASURES } from '@/lib/constants/featured-treasures';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { FeaturedTreasureCard } from '@/components/sections/featured-treasures/FeaturedTreasureCard';

export function FeaturedTreasuresGrid() {
  return (
    <Stagger className="featured-treasures-grid">
      {FEATURED_TREASURES.map((treasure) => (
        <StaggerItem key={treasure.number} className="h-full">
          <FeaturedTreasureCard treasure={treasure} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
