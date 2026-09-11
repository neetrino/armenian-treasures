import { describe, expect, it } from 'vitest';
import {
  encodeTranslatableText,
  resolveLocalizedText,
} from '@/lib/i18n/translatable-content';

describe('resolveLocalizedText', () => {
  it('returns only the requested locale and never falls back', () => {
    const raw = encodeTranslatableText({ HY: 'Սյունիքի մարզ' });
    expect(raw).toContain('__at_i18n_v1');
    expect(resolveLocalizedText(raw, 'HY')).toBe('Սյունիքի մարզ');
    expect(resolveLocalizedText(raw, 'EN')).toBe('');
    expect(resolveLocalizedText(raw, 'RU')).toBe('');
  });

  it('does not surface raw JSON when only HY period text exists', () => {
    const raw = encodeTranslatableText({ HY: '9-րդ դար' });
    expect(resolveLocalizedText(raw, 'HY')).toBe('9-րդ դար');
    expect(resolveLocalizedText(raw, 'EN')).toBe('');
    expect(resolveLocalizedText(raw, 'EN')).not.toContain('__at_i18n_v1');
  });

  it('attributes unmarked Armenian plain strings to HY only', () => {
    expect(resolveLocalizedText('ԽՆՁՈՐԵՍԿ', 'HY')).toBe('ԽՆՁՈՐԵՍԿ');
    expect(resolveLocalizedText('ԽՆՁՈՐԵՍԿ', 'HYW')).toBe('ԽՆՁՈՐԵՍԿ');
    expect(resolveLocalizedText('ԽՆՁՈՐԵՍԿ', 'EN')).toBe('');
    expect(resolveLocalizedText('ԽՆՁՈՐԵՍԿ', 'RU')).toBe('');
  });

  it('keeps unmarked Latin legacy fields shared across locales', () => {
    expect(resolveLocalizedText('Syunik', 'EN')).toBe('Syunik');
    expect(resolveLocalizedText('Syunik', 'HY')).toBe('Syunik');
    expect(resolveLocalizedText('Syunik', 'RU')).toBe('Syunik');
    expect(resolveLocalizedText('17th c.', 'HY')).toBe('17th c.');
  });
});
