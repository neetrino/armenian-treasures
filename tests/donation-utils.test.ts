import { describe, expect, it } from 'vitest';
import { DONATION_IMPACT_RANGES } from '@/lib/constants/donation-page';
import { getImpactText, linearFill, PATRON_MAX, PATRON_MIN } from '@/components/donation-page/donation-utils';

describe('donation slider math', () => {
  it('uses a linear fill from min to max', () => {
    expect(linearFill(PATRON_MIN)).toBe('0.0%');
    expect(linearFill(PATRON_MAX)).toBe('100.0%');
    expect(Number(linearFill(1500).replace('%', ''))).toBeGreaterThan(0);
  });

  it('includes the last impact range at its max value', () => {
    expect(getImpactText(35000, DONATION_IMPACT_RANGES)).toContain('Endows a named object');
    expect(getImpactText(50000, DONATION_IMPACT_RANGES)).toContain('Endows a named object');
    expect(getImpactText(799, DONATION_IMPACT_RANGES)).toContain('Seeds one artifact');
  });
});
