import { getFeaturedCultureItems } from '@/lib/queries/culture-items';
import { mapCultureItemsToFeaturedTreasures } from '@/lib/mappers/featured-treasures';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { FeaturedTreasureCard } from '@/components/sections/featured-treasures/FeaturedTreasureCard';
import { EmptyState } from '@/components/ui/EmptyState';

export async function FeaturedTreasuresGrid() {
  const items = await getFeaturedCultureItems(5);
  const treasures = mapCultureItemsToFeaturedTreasures(items);

  if (treasures.length === 0) {
    return (
      <EmptyState
        title="No featured treasures yet"
        description="Published culture items will appear here once curators add them in the admin panel."
      />
    );
  }

  return (
    <Stagger className="featured-treasures-grid">
      {treasures.map((treasure) => (
        <StaggerItem key={treasure.number} className="h-full">
          <FeaturedTreasureCard treasure={treasure} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
