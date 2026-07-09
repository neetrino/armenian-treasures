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

function shuffleTreasures(items: FeaturedTreasure[]): FeaturedTreasure[] {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = next[index]!;
    next[index] = next[swapIndex]!;
    next[swapIndex] = current;
  }
  return next.map((treasure, index) => ({
    ...treasure,
    number: String(index + 1).padStart(2, '0'),
  }));
}

export async function FeaturedTreasuresGrid(props: FeaturedTreasuresGridProps = {}) {
  const resolvedTreasures =
    props.treasures ??
    mapCultureItemsToFeaturedTreasures(await getFeaturedCultureItems(FEATURED_TREASURE_COUNT));

  if (resolvedTreasures.length === 0) {
    return null;
  }

  const limitedTreasures = resolvedTreasures.slice(0, FEATURED_TREASURE_COUNT);
  const treasures = props.treasures ? limitedTreasures : shuffleTreasures(limitedTreasures);

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
