import { describe, expect, it } from 'vitest';
import {
  firstBlockBody,
  firstTourUrl,
  galleryUrlsFromMedia,
  hydrateCultureItemMedia,
  parseCultureItemMedia,
} from '@/lib/culture-item-media';
import { readCultureItemMediaFromForm } from '@/lib/admin/culture-item-media-form';

describe('culture item media', () => {
  it('hydrates legacy description, tour, and gallery into structured blocks', () => {
    const media = hydrateCultureItemMedia({
      description: 'Tatev stands on a plateau.',
      tourUrl: 'https://my.matterport.com/show/?m=example',
      galleryImages: ['/images/a.jpg', '/images/b.jpg'],
    });

    expect(media.blocks[0]?.body).toBe('Tatev stands on a plateau.');
    expect(firstTourUrl(media)).toBe('https://my.matterport.com/show/?m=example');
    expect(galleryUrlsFromMedia(media)).toEqual(['/images/a.jpg', '/images/b.jpg']);
  });

  it('keeps stored media blocks ahead of legacy fallbacks', () => {
    const media = hydrateCultureItemMedia({
      mediaContent: {
        v: 1,
        address: 'Syunik',
        blocks: [{ id: '1', title: 'Ornaments', subtitle: '', body: 'Carved stone.', image: '', caption: '' }],
        tours: [],
        videos: [],
        gallery: [],
      },
      description: 'Legacy text',
    });

    expect(firstBlockBody(media)).toBe('Carved stone.');
    expect(media.address).toBe('Syunik');
  });

  it('parses unlimited tours and before/after gallery from form data', () => {
    const formData = new FormData();
    formData.set('toursCount', '2');
    formData.set('tour.0.id', 't1');
    formData.set('tour.0.type', 'LIDAR');
    formData.set('tour.0.title', 'Scan');
    formData.set('tour.0.url', 'https://example.com/tour');
    formData.set('tour.1.id', 't2');
    formData.set('tour.1.type', 'MATTERPORT');
    formData.set('tour.1.url', 'https://my.matterport.com/show/?m=x');
    formData.set('galleryCount', '1');
    formData.set('gallery.0.id', 'g1');
    formData.set('gallery.0.kind', 'beforeAfter');
    formData.set('gallery.0.beforeUrl', '/before.jpg');
    formData.set('gallery.0.afterUrl', '/after.jpg');

    const media = readCultureItemMediaFromForm(formData);
    expect(media.tours).toHaveLength(2);
    expect(media.gallery[0]).toMatchObject({
      kind: 'beforeAfter',
      beforeUrl: '/before.jpg',
      afterUrl: '/after.jpg',
    });
    expect(parseCultureItemMedia(media).tours[0]?.type).toBe('LIDAR');
  });
});
