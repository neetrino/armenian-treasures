import { describe, expect, it } from 'vitest';
import { emptyDescriptionBlock, parseCultureItemMedia } from '@/lib/culture-item-media';
import {
  emptyTextLocaleMedia,
  mediaForLocale,
  parseMediaByLocale,
  sliceLocaleMedia,
} from '@/lib/culture-item-media-locale';

describe('culture item locale media', () => {
  it('keeps EN copy when HY text is filled later', () => {
    const english = {
      ...parseCultureItemMedia(null),
      blocks: [{ ...emptyDescriptionBlock(), id: 'block-1', title: 'Tatev', body: 'English body' }],
    };
    const byLocale = {
      EN: sliceLocaleMedia(english),
      HY: emptyTextLocaleMedia(sliceLocaleMedia(english)),
    };
    byLocale.HY.blocks[0] = { ...byLocale.HY.blocks[0]!, title: 'Տաթև', body: 'Հայերեն' };

    const stored = { ...english, byLocale };
    expect(parseCultureItemMedia(stored).byLocale).toBeDefined();

    const parsed = parseMediaByLocale(stored);
    expect(mediaForLocale(english, parsed, 'EN').blocks[0]?.body).toBe('English body');
    expect(mediaForLocale(english, parsed, 'HY').blocks[0]?.body).toBe('Հայերեն');
    expect(mediaForLocale(english, parsed, 'HY').blocks[0]?.title).toBe('Տաթև');
  });

  it('does not invent EN from root when only HY exists in byLocale', () => {
    const hyOnly = {
      ...parseCultureItemMedia(null),
      blocks: [{ ...emptyDescriptionBlock(), id: 'block-1', title: 'Տաթև', body: 'Հայերեն' }],
      byLocale: {
        HY: {
          address: '',
          blocks: [{ ...emptyDescriptionBlock(), id: 'block-1', title: 'Տաթև', body: 'հայերեն' }],
          tours: [],
          videos: [],
          gallery: [],
        },
      },
    };
    const parsed = parseMediaByLocale(hyOnly);
    expect(parsed.EN).toBeUndefined();
    expect(mediaForLocale(hyOnly, parsed, 'HY').blocks[0]?.body).toBe('հայերեն');
    expect(mediaForLocale(hyOnly, parsed, 'EN').blocks).toEqual([]);
    expect(mediaForLocale(hyOnly, parsed, 'RU').blocks).toEqual([]);
  });

  it('keeps shared tours on root when resolving locale blocks', () => {
    const english = {
      ...parseCultureItemMedia(null),
      blocks: [{ ...emptyDescriptionBlock(), id: 'block-1', title: 'Tatev', body: 'English body' }],
      tours: [{ id: 't1', type: 'LIDAR' as const, title: 'Scan', url: 'https://my.matterport.com/show/?m=abc', previewImage: '' }],
    };
    const byLocale = {
      EN: sliceLocaleMedia(english),
      HY: emptyTextLocaleMedia(sliceLocaleMedia(english)),
    };
    byLocale.HY.blocks[0] = { ...byLocale.HY.blocks[0]!, title: 'Տաթև', body: 'հայերեն' };
    byLocale.HY.tours = [{ ...byLocale.HY.tours[0]!, title: 'Սքան' }];

    const resolved = mediaForLocale(english, byLocale, 'HY');
    expect(resolved.blocks[0]?.body).toBe('հայերեն');
    expect(resolved.tours).toHaveLength(1);
    expect(resolved.tours[0]?.url).toContain('matterport');
    expect(resolved.tours[0]?.title).toBe('Սքան');

    const enResolved = mediaForLocale(english, byLocale, 'EN');
    expect(enResolved.tours[0]?.title).toBe('Scan');

    const ruResolved = mediaForLocale(english, byLocale, 'RU');
    expect(ruResolved.tours[0]?.title).toBe('');
    expect(ruResolved.tours[0]?.url).toContain('matterport');
  });

  it('attributes legacy root without byLocale to HY when text is Armenian', () => {
    const hyLegacy = {
      ...parseCultureItemMedia(null),
      address: 'Խնձորեսկ',
      blocks: [{ ...emptyDescriptionBlock(), id: 'block-1', title: 'ԽՆՁՈՐԵՍԿ', body: 'հայերեն' }],
    };
    const parsed = parseMediaByLocale(hyLegacy);
    expect(parsed.HY?.blocks[0]?.title).toBe('ԽՆՁՈՐԵՍԿ');
    expect(parsed.EN).toBeUndefined();
    expect(mediaForLocale(hyLegacy, parsed, 'EN').blocks).toEqual([]);
    expect(mediaForLocale(hyLegacy, parsed, 'EN').address).toBe('');
  });

  it('keeps address independent per locale', () => {
    const english = {
      ...parseCultureItemMedia(null),
      address: 'Syunik EN',
      blocks: [{ ...emptyDescriptionBlock(), id: 'block-1', title: 'Tatev', body: 'English body' }],
    };
    const byLocale = {
      EN: sliceLocaleMedia(english),
      HY: {
        ...emptyTextLocaleMedia(sliceLocaleMedia(english)),
        address: 'Սյունիք HY',
      },
    };

    expect(mediaForLocale(english, byLocale, 'EN').address).toBe('Syunik EN');
    expect(mediaForLocale(english, byLocale, 'HY').address).toBe('Սյունիք HY');
  });
});
