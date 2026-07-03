import { MapPanel } from '@/components/map/MapPanel';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { getMapItems } from '@/lib/queries/culture-items';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function HeritageMapSection({ home }: HomeSectionContentProps) {
  const { heritageMap } = getHomeSections(home);
  const items = await getMapItems();

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

        <MapPanel items={items} />
      </div>
    </section>
  );
}
