import { describe, expect, it } from 'vitest';
import { PARTNERSHIP_CATEGORIES } from '@/lib/constants/partnership-page';
import { collectHighlightedPartnerLogos } from '@/lib/mappers/partner-logos';

describe('collectHighlightedPartnerLogos', () => {
  it('keeps image partners and skips placeholders and future slots', () => {
    const logos = collectHighlightedPartnerLogos(PARTNERSHIP_CATEGORIES);
    const names = logos.map((logo) => logo.name);

    expect(logos.length).toBeGreaterThan(0);
    expect(logos.every((logo) => logo.src.startsWith('/partnerships/logos/'))).toBe(true);
    expect(names).not.toContain('Regional Dioceses Network');
    expect(names).not.toContain('Strategic Technology Partner');
    expect(logos.some((logo) => logo.href.startsWith('#'))).toBe(false);
  });
});
