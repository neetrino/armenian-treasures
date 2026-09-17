import { describe, expect, it } from 'vitest';
import { overlayLocalizedDefaults } from '@/lib/i18n/overlay-localized-defaults';

describe('overlayLocalizedDefaults', () => {
  it('keeps English stored values for EN', () => {
    const stored = { label: 'Years of Habitation' };
    expect(overlayLocalizedDefaults(stored, stored, { label: 'Բնակեցման տարիներ' }, 'EN')).toEqual(
      stored,
    );
  });

  it('replaces default English copy for other locales', () => {
    const english = { label: 'Years of Habitation' };
    const stored = { label: 'Years of Habitation' };
    const localized = { label: 'Բնակեցման տարիներ' };
    expect(overlayLocalizedDefaults(stored, english, localized, 'HY')).toEqual(localized);
  });

  it('keeps admin-customized copy that differs from the English default', () => {
    const english = { label: 'Years of Habitation' };
    const stored = { label: 'Custom admin label' };
    const localized = { label: 'Բնակեցման տարիներ' };
    expect(overlayLocalizedDefaults(stored, english, localized, 'HY')).toEqual(stored);
  });
});
