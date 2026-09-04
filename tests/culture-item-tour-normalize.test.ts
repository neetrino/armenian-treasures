import { describe, expect, it } from 'vitest';
import { normalizeTourBlock, parseCultureItemMedia } from '@/lib/culture-item-media';

describe('normalizeTourBlock', () => {
  it('moves a Matterport URL from title into url when url is empty', () => {
    const normalized = normalizeTourBlock({
      id: 't1',
      type: 'LIDAR',
      title: 'https://my.matterport.com/show/?m=wKrfv5qLjTi',
      url: '',
      previewImage: '',
    });
    expect(normalized.url).toBe('https://my.matterport.com/show/?m=wKrfv5qLjTi');
    expect(normalized.title).toBe('');
  });

  it('keeps an explicit title when url is already set', () => {
    const normalized = normalizeTourBlock({
      id: 't1',
      type: 'SCAN_3D',
      title: 'LiDAR tour',
      url: 'https://my.matterport.com/show/?m=abc',
      previewImage: '',
    });
    expect(normalized.title).toBe('LiDAR tour');
    expect(normalized.url).toBe('https://my.matterport.com/show/?m=abc');
  });
});

describe('parseCultureItemMedia tour salvage', () => {
  it('normalizes tours during parse', () => {
    const media = parseCultureItemMedia({
      v: 1,
      tours: [
        {
          id: 'media-1',
          type: 'LIDAR',
          title: 'https://my.matterport.com/show/?m=example',
          url: '',
        },
      ],
    });
    expect(media.tours[0]?.url).toBe('https://my.matterport.com/show/?m=example');
    expect(media.tours[0]?.title).toBe('');
  });
});
