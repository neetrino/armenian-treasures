import { describe, expect, it, vi, afterEach } from 'vitest';
import { resolvePublicMapCoordinates } from '@/lib/culture-catalog/resolve-public-map-coordinates';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('resolvePublicMapCoordinates', () => {
  it('uses stored latitude/longitude first', async () => {
    await expect(
      resolvePublicMapCoordinates({
        latitude: 39.5,
        longitude: 46.4,
        mapUrl: 'https://maps.app.goo.gl/abc',
      }),
    ).resolves.toEqual({ latitude: 39.5, longitude: 46.4 });
  });

  it('parses coordinates from a full Google Maps URL', async () => {
    await expect(
      resolvePublicMapCoordinates({
        latitude: null,
        longitude: null,
        mapUrl: 'https://www.google.com/maps/place/Test/@39.5024893,46.4322088,17z',
      }),
    ).resolves.toEqual({ latitude: 39.5024893, longitude: 46.4322088 });
  });

  it('expands short map links and parses the final URL', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        url: 'https://www.google.com/maps/place/Old+Khndzoresk+Church/@39.5024893,46.4322088,730m',
      })),
    );

    await expect(
      resolvePublicMapCoordinates({
        latitude: null,
        longitude: null,
        mapUrl: 'https://maps.app.goo.gl/sX3LH9Erhhg8pB94A',
      }),
    ).resolves.toEqual({ latitude: 39.5024893, longitude: 46.4322088 });
  });

  it('does not fall back to default Yerevan coordinates', async () => {
    await expect(
      resolvePublicMapCoordinates({
        latitude: null,
        longitude: null,
        mapUrl: '',
      }),
    ).resolves.toBeNull();
  });
});
