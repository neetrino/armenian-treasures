import { getFeaturedCultureItems } from '@/lib/queries/culture-items';
import { mapCultureItemsToFeaturedTreasures } from '@/lib/mappers/featured-treasures';
import type { FeaturedTreasure } from '@/lib/constants/featured-treasures';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { FeaturedTreasureCard } from '@/components/sections/featured-treasures/FeaturedTreasureCard';

interface FeaturedTreasuresGridProps {
  treasures?: FeaturedTreasure[];
}

export async function FeaturedTreasuresGrid(props: FeaturedTreasuresGridProps = {}) {
  const resolvedTreasures =
    props.treasures ??
    mapCultureItemsToFeaturedTreasures(await getFeaturedCultureItems(5));

  if (resolvedTreasures.length === 0) {
    return null;
  }

  return (
    <Stagger className="featured-treasures-grid">
      {resolvedTreasures.map((treasure) => (
        <StaggerItem key={treasure.number} className="h-full">
          <FeaturedTreasureCard treasure={treasure} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
