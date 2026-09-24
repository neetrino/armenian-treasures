import {
  parseMapCoordinatesFromUrl,
  placeQueryFromMapUrl,
  type ParsedMapCoordinates,
} from '@/lib/culture-catalog/parse-map-url';
import { hasRenderableMapLocation } from '@/lib/culture-catalog/culture-item-map';

const SHORT_MAP_HOST =
  /(?:maps\.app\.goo\.gl|goo\.gl\/maps|g\.page)/i;

async function expandHttpRedirect(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'ArmenianTreasuresMapResolver/1.0' },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 86400 },
    });
    return response.url || null;
  } catch {
    return null;
  }
}

async function geocodePlace(query: string): Promise<ParsedMapCoordinates | null> {
  const endpoint = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'ArmenianTreasuresMapResolver/1.0',
      },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 86400 },
    });
    if (!response.ok) return null;
    const rows = (await response.json()) as { lat?: string; lon?: string }[];
    const first = rows[0];
    if (!first?.lat || !first?.lon) return null;
    return parseMapCoordinatesFromUrl(`${first.lat}, ${first.lon}`);
  } catch {
    return null;
  }
}

/** Resolve pin coordinates for public culture-item map embeds. Never falls back to Yerevan. */
export async function resolvePublicMapCoordinates(input: {
  latitude?: number | null;
  longitude?: number | null;
  mapUrl?: string | null;
  locationName?: string | null;
}): Promise<ParsedMapCoordinates | null> {
  if (hasRenderableMapLocation(input.latitude, input.longitude)) {
    return { latitude: input.latitude!, longitude: input.longitude! };
  }

  const mapUrl = input.mapUrl?.trim() ?? '';
  if (!mapUrl) return null;

  const fromUrl = parseMapCoordinatesFromUrl(mapUrl);
  if (fromUrl) return fromUrl;

  if (!SHORT_MAP_HOST.test(mapUrl) && !/^https?:\/\//i.test(mapUrl)) {
    return null;
  }

  const expanded = await expandHttpRedirect(mapUrl);
  if (expanded && expanded !== mapUrl) {
    const fromExpanded = parseMapCoordinatesFromUrl(expanded);
    if (fromExpanded) return fromExpanded;
  }

  const placeQuery = placeQueryFromMapUrl(expanded && expanded !== mapUrl ? expanded : mapUrl)
    ?? input.locationName?.trim()
    ?? '';
  if (!placeQuery) return null;
  return geocodePlace(placeQuery);
}
