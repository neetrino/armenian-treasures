import { DEFAULT_MAP_COORDINATES } from '@/lib/culture-item-media';

export function hasRenderableMapLocation(
  latitude: number | null | undefined,
  longitude: number | null | undefined,
): boolean {
  return latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined;
}

export function resolveMapCoordinates(
  latitude: number | null | undefined,
  longitude: number | null | undefined,
): { latitude: number; longitude: number } {
  return {
    latitude: latitude ?? DEFAULT_MAP_COORDINATES.latitude,
    longitude: longitude ?? DEFAULT_MAP_COORDINATES.longitude,
  };
}
