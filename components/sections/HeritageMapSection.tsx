import { MapPanel } from '@/components/map/MapPanel';
import { getMapItems } from '@/lib/queries/culture-items';
import type { HomeSectionContentProps } from '@/lib/queries/home';

export async function HeritageMapSection(_props: HomeSectionContentProps) {
  const items = await getMapItems();

  return (
    <section
      id="map"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-3 heritage-section-py sm:px-4"
      aria-labelledby="heritage-map-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[90rem]">
        <div className="heritage-map-embed">
          <MapPanel items={items} embedToolbar />
        </div>
      </div>
    </section>
  );
}
