import { describe, expect, it } from 'vitest';
import { isUntranslatedMenuTitle } from '@/lib/i18n/messages/menu';

describe('isUntranslatedMenuTitle', () => {
  it('treats an Armenian-O ornaments title as the English catalog name', () => {
    expect(isUntranslatedMenuTitle('Օrmaments', '', 'Armaments')).toBe(true);
    expect(isUntranslatedMenuTitle('Ornaments', '', 'Armaments')).toBe(true);
  });

  it('keeps a real translation', () => {
    expect(isUntranslatedMenuTitle('Նախշազարդ', 'Ornaments', 'Ornaments')).toBe(false);
  });
});
