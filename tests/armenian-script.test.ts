import { describe, expect, it } from 'vitest';
import { containsArmenianScript } from '@/lib/i18n/armenian-script';

describe('containsArmenianScript', () => {
  it('detects Armenian titles', () => {
    expect(containsArmenianScript('ԽՆՁՈՐԵՍԿ')).toBe(true);
    expect(containsArmenianScript('Saint Hripsime')).toBe(false);
    expect(containsArmenianScript('3D ՇՐՋԱՅՑ')).toBe(true);
  });
});
