import '@/components/sections/cultural-portal/cultural-portal-section.css';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { CulturalCategoryCard } from '@/components/sections/cultural-portal/CulturalCategoryCard';
import { CulturalPortalOrnament } from '@/components/sections/cultural-portal/CulturalPortalOrnament';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import type { CulturalPortalCategory } from '@/lib/constants/cultural-portal';

interface CulturalPortalCategoriesProps {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  categories: CulturalPortalCategory[];
}

export function CulturalPortalCategories({ section, categories }: CulturalPortalCategoriesProps) {
  return (
    <section
      id="cultural"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] bg-transparent px-5 heritage-section-py sm:px-6"
      aria-labelledby="culture-page-portal-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <HomeSectionHeader
          id="culture-page-portal-heading"
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />

        <Stagger className="cultural-portal-grid">
          {categories.map((category) => (
            <StaggerItem key={category.icon} className="h-full">
              <CulturalCategoryCard category={category} />
            </StaggerItem>
          ))}
        </Stagger>
        <CulturalPortalOrnament />
      </div>
    </section>
  );
}
