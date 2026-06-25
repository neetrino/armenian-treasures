import '@/components/sections/featured-treasures/featured-treasures-section.css';
import { FeaturedTreasuresGrid } from '@/components/sections/featured-treasures/FeaturedTreasuresGrid';
import { getHomeContent, getHomeSections } from '@/lib/queries/home';

export async function FeaturedTreasuresSection() {
  const home = await getHomeContent();
  const { featuredTreasures } = getHomeSections(home);

  return (
    <section
      className="relative px-5 pb-[clamp(6.875rem,9vw,8.75rem)] pt-[clamp(4.5rem,6vw,6.5rem)] sm:px-6"
      aria-labelledby="featured-treasures-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <header className="mb-[52px] max-w-[43.75rem] text-left">
          <p className="mb-[14px] font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
            {featuredTreasures.eyebrow}
          </p>

          <h2
            id="featured-treasures-heading"
            className="font-cinzel text-[clamp(2.125rem,3vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-heritage-gold"
          >
            {featuredTreasures.title}
          </h2>
        </header>

        <FeaturedTreasuresGrid />
      </div>
    </section>
  );
}
