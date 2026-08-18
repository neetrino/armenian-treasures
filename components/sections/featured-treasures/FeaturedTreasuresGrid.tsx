import { getFeaturedCultureItems } from '@/lib/queries/culture-items';
import { mapCultureItemsToFeaturedTreasures } from '@/lib/mappers/featured-treasures';
import {
  FEATURED_TREASURE_COUNT,
  FEATURED_TREASURE_GRID_ITEM_LAYOUT_CLASS,
  type FeaturedTreasure,
} from '@/lib/constants/featured-treasures';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { FeaturedTreasureCard } from '@/components/sections/featured-treasures/FeaturedTreasureCard';
import { cn } from '@/lib/utils';

interface FeaturedTreasuresGridProps {
  treasures?: FeaturedTreasure[];
}

export async function FeaturedTreasuresGrid(props: FeaturedTreasuresGridProps = {}) {
  const resolvedTreasures =
    props.treasures ??
    mapCultureItemsToFeaturedTreasures(await getFeaturedCultureItems(FEATURED_TREASURE_COUNT));

  if (resolvedTreasures.length === 0) {
    return null;
  }

  const treasures = resolvedTreasures.slice(0, FEATURED_TREASURE_COUNT);

  return (
    <Stagger className="featured-treasures-grid">
      {treasures.map((treasure) => (
        <StaggerItem
          key={`${treasure.number}-${treasure.title}`}
          className={cn(
            'featured-treasures-grid__item h-full min-h-0',
            FEATURED_TREASURE_GRID_ITEM_LAYOUT_CLASS[treasure.layout],
          )}
        >
          <FeaturedTreasureCard treasure={treasure} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
