import { DONATION_IMPACT_RANGES } from '@/lib/constants/donation-page';

export const PATRON_MIN = 500;
export const PATRON_MAX = 50000;
export const PATRON_DEFAULT = 1500;
export const PATRON_STEP = 100;

export function formatAmd(value: number): string {
  return value >= 1000 ? value.toLocaleString('en-US') : String(value);
}

export function logFill(value: number): string {
  const lo = Math.log(PATRON_MIN);
  const hi = Math.log(PATRON_MAX);
  return `${(((Math.log(value) - lo) / (hi - lo)) * 100).toFixed(1)}%`;
}

export function getImpactText(value: number): string {
  const entry = DONATION_IMPACT_RANGES.find((range) => value >= range.min && value < range.max);
  return entry?.text ?? DONATION_IMPACT_RANGES[0]?.text ?? '';
}

export function clampPatronAmount(value: number): number {
  return Math.max(PATRON_MIN, Math.min(PATRON_MAX, value));
}
