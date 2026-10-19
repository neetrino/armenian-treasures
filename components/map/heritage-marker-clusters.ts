import type { Map as LeafletMapInstance } from 'leaflet';
import type { PublicCultureItemDTO } from '@/lib/dto';

const CLUSTER_RADIUS_PX = 46;

export interface HeritageMarkerGroup {
  items: PublicCultureItemDTO[];
  latitude: number;
  longitude: number;
}

interface PlacedItem {
  item: PublicCultureItemDTO;
  x: number;
  y: number;
}

function placedItems(map: LeafletMapInstance, items: PublicCultureItemDTO[]): PlacedItem[] {
  return items.map((item) => {
    const point = map.latLngToContainerPoint([item.latitude!, item.longitude!]);
    return { item, x: point.x, y: point.y };
  });
}

function withinRadius(left: PlacedItem, right: PlacedItem): boolean {
  const dx = left.x - right.x;
  const dy = left.y - right.y;
  return dx * dx + dy * dy <= CLUSTER_RADIUS_PX * CLUSTER_RADIUS_PX;
}

function absorbGroup(seed: PlacedItem, pending: PlacedItem[]): PlacedItem[] {
  const group = [seed];
  const queue = [seed];
  while (queue.length > 0) {
    const current = queue.pop();
    if (!current) break;
    for (let index = pending.length - 1; index >= 0; index -= 1) {
      const candidate = pending[index];
      if (!candidate || !withinRadius(current, candidate)) continue;
      pending.splice(index, 1);
      group.push(candidate);
      queue.push(candidate);
    }
  }
  return group;
}

function toGroup(members: PlacedItem[]): HeritageMarkerGroup {
  const count = members.length;
  const latitude = members.reduce((sum, entry) => sum + (entry.item.latitude ?? 0), 0) / count;
  const longitude = members.reduce((sum, entry) => sum + (entry.item.longitude ?? 0), 0) / count;
  return {
    items: members.map((entry) => entry.item),
    latitude,
    longitude,
  };
}

export function clusterHeritageMarkers(
  map: LeafletMapInstance,
  items: PublicCultureItemDTO[],
): HeritageMarkerGroup[] {
  const pool = placedItems(map, items);
  const groups: HeritageMarkerGroup[] = [];
  while (pool.length > 0) {
    const seed = pool.shift();
    if (!seed) break;
    groups.push(toGroup(absorbGroup(seed, pool)));
  }
  return groups;
}
