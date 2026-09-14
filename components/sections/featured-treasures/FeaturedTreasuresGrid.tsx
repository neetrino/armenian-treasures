import { getFeaturedCultureItems } from '@/lib/queries/culture-items';
import {
  buildHomeFeaturedMosaic,
  mapCultureItemsToFeaturedTreasures,
} from '@/lib/mappers/featured-treasures';
import {
  FEATURED_TREASURE_COUNT,
  FEATURED_TREASURE_GRID_ITEM_LAYOUT_CLASS,
  type FeaturedTreasure,
} from '@/lib/constants/featured-treasures';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { FeaturedTreasureCard } from '@/components/sections/featured-treasures/FeaturedTreasureCard';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { cn } from '@/lib/utils';

interface FeaturedTreasuresGridProps {
  treasures?: FeaturedTreasure[];
  showDiscoverMore?: boolean;
  variant?: 'mosaic' | 'tiles';
  locale?: SiteLocaleCode;
}

export async function FeaturedTreasuresGrid({
  treasures: treasuresProp,
  showDiscoverMore = false,
  variant = 'mosaic',
  locale = 'EN',
}: FeaturedTreasuresGridProps = {}) {
  const resolvedTreasures =
    treasuresProp ??
    mapCultureItemsToFeaturedTreasures(
      await getFeaturedCultureItems(FEATURED_TREASURE_COUNT),
      locale,
    );

  if (resolvedTreasures.length === 0) {
    return null;
  }

  const treasures =
    variant === 'tiles' ? resolvedTreasures : resolvedTreasures.slice(0, FEATURED_TREASURE_COUNT);
  const items =
    variant === 'mosaic' && showDiscoverMore
      ? buildHomeFeaturedMosaic(resolvedTreasures, locale)
      : treasures;
  const gridClassName = cn(
    'featured-treasures-grid',
    variant === 'tiles' && 'featured-treasures-grid--tiles',
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
