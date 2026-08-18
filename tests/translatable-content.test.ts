import { describe, expect, it } from 'vitest';
import {
  encodeTranslatableText,
  resolveLocalizedText,
} from '@/lib/i18n/translatable-content';

describe('resolveLocalizedText', () => {
  it('returns the Armenian value instead of the stored JSON payload', () => {
    const raw = encodeTranslatableText({ HY: 'Սյունիքի մարզ' });
    expect(raw).toContain('__at_i18n_v1');
    expect(resolveLocalizedText(raw, 'EN')).toBe('Սյունիքի մարզ');
    expect(resolveLocalizedText(raw, 'HY')).toBe('Սյունիքի մարզ');
  });

  it('does not surface raw JSON when only HY period text exists', () => {
    const raw = encodeTranslatableText({ HY: '9-րդ դար' });
    expect(resolveLocalizedText(raw, 'EN')).toBe('9-րդ դար');
    expect(resolveLocalizedText(raw, 'EN')).not.toContain('__at_i18n_v1');
  });
});
