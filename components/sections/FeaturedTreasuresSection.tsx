import '@/components/sections/featured-treasures/featured-treasures-section.css';
import { FeaturedTreasuresGrid } from '@/components/sections/featured-treasures/FeaturedTreasuresGrid';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function FeaturedTreasuresSection({ home }: HomeSectionContentProps) {
  const { featuredTreasures } = getHomeSections(home);

  return (
    <section
      className="relative px-5 heritage-section-py sm:px-6"
      aria-labelledby="featured-treasures-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <HomeSectionHeader
          id="featured-treasures-heading"
          eyebrow={featuredTreasures.eyebrow}
          title={featuredTreasures.title}
        />

        <FeaturedTreasuresGrid />
      </div>
    </section>
  );
}
