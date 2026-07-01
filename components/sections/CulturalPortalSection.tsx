import '@/components/sections/cultural-portal/cultural-portal-section.css';
import { CulturalCategoryGrid } from '@/components/sections/cultural-portal/CulturalCategoryGrid';
import { CulturalPortalOrnament } from '@/components/sections/cultural-portal/CulturalPortalOrnament';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function CulturalPortalSection({ home }: HomeSectionContentProps) {
  const { culturalPortal } = getHomeSections(home);

  return (
    <section
      id="cultural"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] bg-transparent px-5 heritage-section-py sm:px-6"
      aria-labelledby="cultural-portal-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <HomeSectionHeader
          id="cultural-portal-heading"
          eyebrow={culturalPortal.eyebrow}
          title={culturalPortal.title}
          description={culturalPortal.description}
        />

        <CulturalCategoryGrid />
        <CulturalPortalOrnament />
      </div>
    </section>
  );
}
