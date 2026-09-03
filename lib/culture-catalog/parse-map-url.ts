export interface ParsedMapCoordinates {
  latitude: number;
  longitude: number;
}

function asCoordPair(latitude: number, longitude: number): ParsedMapCoordinates | null {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;
  return { latitude, longitude };
}

function readPair(first: string | undefined, second: string | undefined): ParsedMapCoordinates | null {
  if (!first || !second) return null;
  return asCoordPair(Number(first), Number(second));
}

export function parseMapCoordinatesFromUrl(raw: string): ParsedMapCoordinates | null {
  const value = raw.trim();
  if (!value) return null;

  const atMatch = value.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  const fromAt = readPair(atMatch?.[1], atMatch?.[2]);
  if (fromAt) return fromAt;

  const queryMatch = value.match(/[?&#](?:q|query|ll)=(-?\d+(?:\.\d+)?)[+,](-?\d+(?:\.\d+)?)/i);
  const fromQuery = readPair(queryMatch?.[1], queryMatch?.[2]);
  if (fromQuery) return fromQuery;

  const bangMatch = value.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  const fromBang = readPair(bangMatch?.[1], bangMatch?.[2]);
  if (fromBang) return fromBang;

  const osmMatch = value.match(/#map=\d+\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/);
  const fromOsm = readPair(osmMatch?.[1], osmMatch?.[2]);
  if (fromOsm) return fromOsm;

  const geoMatch = value.match(/^geo:(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/i);
  const fromGeo = readPair(geoMatch?.[1], geoMatch?.[2]);
  if (fromGeo) return fromGeo;

  const plainMatch = value.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  return readPair(plainMatch?.[1], plainMatch?.[2]);
}

export function isExternalMapLink(raw: string): boolean {
  const value = raw.trim();
  if (!value) return false;
  return /^(https?:\/\/|geo:)/i.test(value);
}

export function mapUrlFromCoordinates(
  latitude: number | null | undefined,
  longitude: number | null | undefined,
): string | null {
  if (latitude == null || longitude == null) return null;
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  return `https://www.google.com/maps/@${latitude},${longitude},17z`;
}

export function resolveStoredMapUrl(
  mapUrl: string | null | undefined,
  latitude: number | null | undefined,
  longitude: number | null | undefined,
): string | null {
  const stored = mapUrl?.trim();
  if (stored) return stored;
  return mapUrlFromCoordinates(latitude, longitude);
}
