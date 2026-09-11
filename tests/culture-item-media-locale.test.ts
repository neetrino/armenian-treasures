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
    byLocale.HY.tours = [];

    const resolved = mediaForLocale(english, byLocale, 'HY');
    expect(resolved.blocks[0]?.body).toBe('հայերեն');
    expect(resolved.tours).toHaveLength(1);
    expect(resolved.tours[0]?.url).toContain('matterport');
  });
});
