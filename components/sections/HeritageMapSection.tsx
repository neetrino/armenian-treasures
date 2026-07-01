import '@/components/sections/heritage-map/heritage-map-section.css';
import { HeritageMapPreview } from '@/components/sections/heritage-map/HeritageMapPreview';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function HeritageMapSection({ home }: HomeSectionContentProps) {
  const { heritageMap } = getHomeSections(home);

  return (
    <section
      id="map"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6"
      aria-labelledby="heritage-map-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <HomeSectionHeader
          id="heritage-map-heading"
          eyebrow={heritageMap.eyebrow}
          title={heritageMap.title}
          description={heritageMap.description}
        />

        <HeritageMapPreview
          placeholderTitle={heritageMap.placeholderTitle}
          placeholderSubtitle={heritageMap.placeholderSubtitle}
          ctaUrl={heritageMap.ctaUrl}
          legend={heritageMap.legend}
        />
      </div>
    </section>
  );
}
