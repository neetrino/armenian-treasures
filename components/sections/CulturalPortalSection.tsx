import '@/components/sections/cultural-portal/cultural-portal-section.css';
import { CulturalCategoryGrid } from '@/components/sections/cultural-portal/CulturalCategoryGrid';
import { CulturalPortalOrnament } from '@/components/sections/cultural-portal/CulturalPortalOrnament';
import { getHomeContent, getHomeSections } from '@/lib/queries/home';

export async function CulturalPortalSection() {
  const home = await getHomeContent();
  const { culturalPortal } = getHomeSections(home);

  return (
    <section
      id="cultural"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] bg-transparent px-5 pb-[clamp(6.875rem,9vw,8.75rem)] pt-[clamp(3rem,5vw,4.5rem)] sm:px-6"
      aria-labelledby="cultural-portal-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <header className="mb-[52px] max-w-[43.75rem] text-left">
          <p className="mb-[14px] font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
            {culturalPortal.eyebrow}
          </p>

          <h2
            id="cultural-portal-heading"
            className="mb-[18px] font-cinzel text-[clamp(2.125rem,3vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-heritage-gold"
          >
            {culturalPortal.title}
          </h2>

          <p className="max-w-[41.25rem] font-display text-[clamp(0.9375rem,1vw,1.125rem)] italic leading-[1.55] text-[rgba(232,216,155,0.68)]">
            {culturalPortal.description}
          </p>
        </header>

        <CulturalCategoryGrid />
        <CulturalPortalOrnament />
      </div>
    </section>
  );
}
