import { getFeaturedCultureItems } from '@/lib/queries/culture-items';
import { mapCultureItemsToFeaturedTreasures } from '@/lib/mappers/featured-treasures';
import type { FeaturedTreasure } from '@/lib/constants/featured-treasures';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { FeaturedTreasureCard } from '@/components/sections/featured-treasures/FeaturedTreasureCard';

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
    mapCultureItemsToFeaturedTreasures(await getFeaturedCultureItems(5));

  if (resolvedTreasures.length === 0) {
    return null;
  }

  const treasures = props.treasures ? resolvedTreasures : shuffleTreasures(resolvedTreasures);

  return (
    <Stagger className="featured-treasures-grid">
      {treasures.map((treasure) => (
        <StaggerItem key={`${treasure.number}-${treasure.title}`} className="h-full">
          <FeaturedTreasureCard treasure={treasure} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
