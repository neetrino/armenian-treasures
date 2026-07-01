import '@/components/sections/partnership/partnership-section.css';
import { PartnershipApplyCta } from '@/components/sections/partnership/PartnershipApplyCta';
import { PartnershipCategoryGrid } from '@/components/sections/partnership/PartnershipCategoryGrid';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function PartnershipSection({ home }: HomeSectionContentProps) {
  const { partnership } = getHomeSections(home);

  return (
    <section
      id="partners"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6"
      aria-labelledby="partnership-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <HomeSectionHeader
          id="partnership-heading"
          eyebrow={partnership.eyebrow}
          title={partnership.title}
          description={partnership.description}
        />

        <PartnershipCategoryGrid categories={partnership.categories} />

        <div className="mt-12 flex justify-center sm:mt-14">
          <PartnershipApplyCta ctaLabel={partnership.ctaLabel} ctaUrl={partnership.ctaUrl} />
        </div>
      </div>
    </section>
  );
}
