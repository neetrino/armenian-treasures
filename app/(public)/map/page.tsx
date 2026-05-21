import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { MapPanel } from '@/components/map/MapPanel';
import { EmptyState } from '@/components/ui/EmptyState';
import { getMapItems } from '@/lib/queries/culture-items';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Interactive map',
  description:
    'Monasteries, fortresses and museums of Armenia plotted on an interactive map. Filter by type and explore each site.',
};

async function MapPage() {
  const items = await getMapItems();
  return (
    <>
      <HeroPage
        eyebrow="Interactive map"
        title="Armenia, plotted on stone."
        description="Every monument, fortress and museum we have begun digitizing — interactive, filtered by type."
        size="sm"
      />
      <Container className="py-16 lg:py-24">
        {items.length === 0 ? (
          <EmptyState
            title="No mapped sites yet"
            description="Once items are marked as visible on the map in the admin panel, they will appear here."
          />
        ) : (
          <MapPanel items={items} />
        )}
      </Container>
    </>
  );
}

export default MapPage;
