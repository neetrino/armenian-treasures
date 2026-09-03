import type { DonationImpactRange, DonationTier } from '@/lib/constants/donation-page';

export const PATRON_MIN = 500;
export const PATRON_MAX = 50000;
export const PATRON_DEFAULT = 1500;
export const PATRON_STEP = 100;

export function formatAmd(value: number): string {
  return value >= 1000 ? value.toLocaleString('en-US') : String(value);
}

export function linearFill(value: number): string {
  const clamped = clampPatronAmount(value);
  return `${(((clamped - PATRON_MIN) / (PATRON_MAX - PATRON_MIN)) * 100).toFixed(1)}%`;
}

export function getImpactText(value: number, impactRanges: DonationImpactRange[]): string {
  const entry = impactRanges.find((range, index) => {
    const isLast = index === impactRanges.length - 1;
    return isLast ? value >= range.min && value <= range.max : value >= range.min && value < range.max;
  });
  return entry?.text ?? impactRanges[0]?.text ?? '';
}

export function clampPatronAmount(value: number): number {
  if (!Number.isFinite(value)) return PATRON_DEFAULT;
  return Math.max(PATRON_MIN, Math.min(PATRON_MAX, value));
}

export function getTierAmountAmd(tier: DonationTier): number {
  const raw = tier.amountAmd ?? tier.monthlyAmd ?? tier.annualAmd;
  return clampPatronAmount(typeof raw === 'number' ? raw : PATRON_DEFAULT);
}
