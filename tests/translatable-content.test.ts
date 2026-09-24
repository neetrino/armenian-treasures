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
    expect(resolveLocalizedText('ԽՆՁՈՐԵՍԿ', 'HYW')).toBe('');
    expect(resolveLocalizedText('ԽՆՁՈՐԵՍԿ', 'EN')).toBe('');
    expect(resolveLocalizedText('ԽՆՁՈՐԵՍԿ', 'RU')).toBe('');
  });

  it('keeps unmarked Latin text on English only', () => {
    expect(resolveLocalizedText('Syunik', 'EN')).toBe('Syunik');
    expect(resolveLocalizedText('Syunik', 'HY')).toBe('');
    expect(resolveLocalizedText('Syunik', 'RU')).toBe('');
    expect(resolveLocalizedText('17th c.', 'EN')).toBe('17th c.');
    expect(resolveLocalizedText('17th c.', 'HY')).toBe('');
  });

  it('splits identical copies that were saved into every language', () => {
    const raw = encodeTranslatableText({
      HY: 'TESOUROS',
      EN: 'TESOUROS',
      PT: 'TESOUROS',
    });
    expect(resolveLocalizedText(raw, 'EN')).toBe('TESOUROS');
    expect(resolveLocalizedText(raw, 'HY')).toBe('');
    expect(resolveLocalizedText(raw, 'PT')).toBe('');
  });
});
