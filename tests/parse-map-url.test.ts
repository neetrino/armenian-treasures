import { describe, expect, it } from 'vitest';
import { isExternalMapLink, parseMapCoordinatesFromUrl, resolveStoredMapUrl } from '@/lib/culture-catalog/parse-map-url';

describe('parseMapCoordinatesFromUrl', () => {
  it('reads Google Maps @lat,lng', () => {
    expect(
      parseMapCoordinatesFromUrl('https://www.google.com/maps/place/Tatev/@39.3793,46.2502,17z'),
    ).toEqual({ latitude: 39.3793, longitude: 46.2502 });
  });

  it('reads q= query pairs and OSM hash maps', () => {
    expect(parseMapCoordinatesFromUrl('https://maps.google.com/?q=40.1792,44.4991')).toEqual({
      latitude: 40.1792,
      longitude: 44.4991,
    });
    expect(parseMapCoordinatesFromUrl('https://www.openstreetmap.org/#map=15/40.1792/44.4991')).toEqual({
      latitude: 40.1792,
      longitude: 44.4991,
    });
  });

  it('reads geo: and plain lat,lng', () => {
    expect(parseMapCoordinatesFromUrl('geo:39.684,45.2326')).toEqual({
      latitude: 39.684,
      longitude: 45.2326,
    });
    expect(parseMapCoordinatesFromUrl('40.1422, 44.8181')).toEqual({
      latitude: 40.1422,
      longitude: 44.8181,
    });
  });

  it('rejects empty or out-of-range values', () => {
    expect(parseMapCoordinatesFromUrl('')).toBeNull();
    expect(parseMapCoordinatesFromUrl('https://maps.app.goo.gl/abc')).toBeNull();
    expect(parseMapCoordinatesFromUrl('91,0')).toBeNull();
  });
});

describe('isExternalMapLink', () => {
  it('accepts http(s) and geo links', () => {
    expect(isExternalMapLink('https://maps.google.com/?q=40,44')).toBe(true);
    expect(isExternalMapLink('geo:40,44')).toBe(true);
    expect(isExternalMapLink('40,44')).toBe(false);
  });
});

describe('resolveStoredMapUrl', () => {
  it('keeps an editor link and otherwise builds one from coordinates', () => {
    expect(resolveStoredMapUrl('https://maps.google.com/?q=40,44', 39.3, 46.2)).toBe(
      'https://maps.google.com/?q=40,44',
    );
    expect(resolveStoredMapUrl(null, 39.3793, 46.2502)).toBe(
      'https://www.google.com/maps/@39.3793,46.2502,17z',
    );
    expect(resolveStoredMapUrl('  ', null, null)).toBeNull();
  });
});
