import { DONATION_TIERS, type DonationTierId } from '@/lib/constants/donation-page';

export interface MembershipTier {
  id: DonationTierId;
  label: string;
  monthlyAmd: number | null;
  annualAmd: number | null;
  featureLabels: readonly string[];
  /** Entitlements to gate once checkout and auth are linked. */
  entitlements: readonly string[];
}

function includedFeatureLabels(tierId: DonationTierId): string[] {
  const tier = DONATION_TIERS.find((entry) => entry.id === tierId);
  if (!tier) return [];
  return tier.features.filter((feature) => feature.included).map((feature) => feature.text);
}

/** Backend-ready membership tiers aligned with /donate UI copy. */
export const MEMBERSHIP_TIERS: MembershipTier[] = DONATION_TIERS.map((tier) => ({
  id: tier.id,
  label: tier.label,
  monthlyAmd: tier.monthlyAmd,
  annualAmd: tier.annualAmd,
  featureLabels: includedFeatureLabels(tier.id),
  entitlements:
    tier.id === '1000' || tier.id === 'custom'
      ? ['archive_full', 'map_full', 'virtual_tours', 'offline_guides', 'ai_historian']
      : tier.id === '500'
        ? ['archive_basic', 'map_basic']
        : ['archive_basic', 'patron_wall'],
}));

export const MEMBERSHIP_CHECKOUT_ENV_KEYS = [
  'DONATION_CHECKOUT_ENABLED',
  'PAYMENT_PROVIDER',
  'PAYMENT_PROVIDER_SECRET',
] as const;
