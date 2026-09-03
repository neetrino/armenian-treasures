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

  it('clones EN media structure with cleared text for a new locale', () => {
    const source = sliceLocaleMedia({
      ...parseCultureItemMedia(null),
      blocks: [{ ...emptyDescriptionBlock(), title: 'Keep image', body: 'Secret', image: '/a.webp' }],
    });
    const cloned = emptyTextLocaleMedia(source);
    expect(cloned.blocks[0]?.image).toBe('/a.webp');
    expect(cloned.blocks[0]?.title).toBe('');
    expect(cloned.blocks[0]?.body).toBe('');
  });
});
