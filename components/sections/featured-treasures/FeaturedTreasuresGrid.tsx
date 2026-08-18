import { getFeaturedCultureItems } from '@/lib/queries/culture-items';
import { mapCultureItemsToFeaturedTreasures } from '@/lib/mappers/featured-treasures';
import {
  DISCOVER_MORE_HIGHLIGHTS_TREASURE,
  FEATURED_TREASURE_COUNT,
  FEATURED_TREASURE_GRID_ITEM_LAYOUT_CLASS,
  type FeaturedTreasure,
} from '@/lib/constants/featured-treasures';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { FeaturedTreasureCard } from '@/components/sections/featured-treasures/FeaturedTreasureCard';
import { cn } from '@/lib/utils';

interface FeaturedTreasuresGridProps {
  treasures?: FeaturedTreasure[];
  showDiscoverMore?: boolean;
  variant?: 'mosaic' | 'tiles';
}

export async function FeaturedTreasuresGrid({
  treasures: treasuresProp,
  showDiscoverMore = false,
  variant = 'mosaic',
}: FeaturedTreasuresGridProps = {}) {
  const resolvedTreasures =
    treasuresProp ??
    mapCultureItemsToFeaturedTreasures(await getFeaturedCultureItems(FEATURED_TREASURE_COUNT));

  if (resolvedTreasures.length === 0) {
    return null;
  }

  const treasures =
    variant === 'tiles' ? resolvedTreasures : resolvedTreasures.slice(0, FEATURED_TREASURE_COUNT);
  const items = showDiscoverMore ? [...treasures, DISCOVER_MORE_HIGHLIGHTS_TREASURE] : treasures;
  const gridClassName = cn(
    'featured-treasures-grid',
    variant === 'tiles' && 'featured-treasures-grid--tiles',
    showDiscoverMore && 'featured-treasures-grid--with-more',
  );

  if (variant === 'tiles') {
    return (
      <div className={gridClassName}>
        {items.map((treasure) => (
          <div
            key={`${treasure.number}-${treasure.title}`}
            className={cn(
              'featured-treasures-grid__item min-h-0',
              FEATURED_TREASURE_GRID_ITEM_LAYOUT_CLASS[treasure.layout],
            )}
          >
            <FeaturedTreasureCard treasure={treasure} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Stagger className={gridClassName}>
      {items.map((treasure) => (
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
