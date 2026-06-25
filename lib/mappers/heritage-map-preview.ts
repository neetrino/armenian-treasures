import type { HeritageMapNode } from '@/lib/constants/heritage-map-section';
import type { PublicCultureItemDTO } from '@/lib/dto';

const ARMENIA_BOUNDS = {
  minLat: 38.8,
  maxLat: 41.35,
  minLng: 43.4,
  maxLng: 46.65,
};

function latLngToPercent(lat: number, lng: number): { x: number; y: number } {
  const x =
    ((lng - ARMENIA_BOUNDS.minLng) / (ARMENIA_BOUNDS.maxLng - ARMENIA_BOUNDS.minLng)) * 100;
  const y =
    ((ARMENIA_BOUNDS.maxLat - lat) / (ARMENIA_BOUNDS.maxLat - ARMENIA_BOUNDS.minLat)) * 100;
  return {
    x: Math.min(88, Math.max(12, x)),
    y: Math.min(88, Math.max(12, y)),
  };
}

export function mapItemsToHeritageMapNodes(items: PublicCultureItemDTO[]): HeritageMapNode[] {
  const mapped = items
    .filter((item) => item.latitude != null && item.longitude != null)
    .slice(0, 7)
    .map((item, index) => {
      const { x, y } = latLngToPercent(item.latitude!, item.longitude!);
      const tone: HeritageMapNode['tone'] = index === 0 ? 'gold' : index % 2 === 0 ? 'teal' : 'gold';
      return {
        x,
        y,
        tone,
        rings: index < 3 ? 2 : 1,
        featured: index === 0,
      } satisfies HeritageMapNode;
    });

  return mapped.length > 0 ? mapped : [];
}
