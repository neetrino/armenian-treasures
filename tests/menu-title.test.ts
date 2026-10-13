import { describe, expect, it } from 'vitest';
import { isUntranslatedMenuTitle } from '@/lib/i18n/messages/menu';
import { ornamentMenuTitle } from '@/lib/i18n/ornament-label';

describe('isUntranslatedMenuTitle', () => {
  it('treats an Armenian-O ornaments title as the English catalog name', () => {
    expect(isUntranslatedMenuTitle('Օrmaments', '', 'Armaments')).toBe(true);
    expect(isUntranslatedMenuTitle('Ornaments', '', 'Armaments')).toBe(true);
  });

  it('keeps a real translation', () => {
    expect(isUntranslatedMenuTitle('Նախշազարդ', 'Ornaments', 'Ornaments')).toBe(false);
  });

  it('replaces stale ornament labels and keeps a custom title', () => {
    expect(ornamentMenuTitle('EN', 'ornaments', 'Artnament')).toBe('Ornament');
    expect(ornamentMenuTitle('EN', 'architecture/ornaments', 'Ornaments')).toBe('Ornament');
    expect(ornamentMenuTitle('HY', 'ornaments', 'Նախշազարդ')).toBe('Զարդանախշեր');
    expect(ornamentMenuTitle('EN', 'ornaments', 'Stone patterns')).toBeNull();
    expect(ornamentMenuTitle('EN', 'castles', 'Artnament')).toBeNull();
  });
});
