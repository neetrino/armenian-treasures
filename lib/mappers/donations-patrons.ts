import type { DonationsPatronIconKey } from '@/lib/constants/home-donations-section';
import type { PublicDonatorDTO } from '@/lib/dto';

export interface DonationsPatronGroup {
  id: DonationsPatronIconKey;
  label: string;
  icon: DonationsPatronIconKey;
  description: string;
}

const TIER_META: Record<
  DonationsPatronIconKey,
  { label: string; order: number }
> = {
  gold: { label: '✦ GOLD PATRONS', order: 0 },
  silver: { label: '◈ SILVER PATRONS', order: 1 },
  bronze: { label: '◇ BRONZE PATRONS', order: 2 },
};

const TYPE_TIER: Record<string, DonationsPatronIconKey> = {
  'Founding Patron': 'gold',
  Institutional: 'silver',
  Patron: 'bronze',
  Academic: 'bronze',
};

function resolvePatronTier(type: string): DonationsPatronIconKey {
  return TYPE_TIER[type] ?? 'bronze';
}

export function groupDonatorsForHomeSection(donators: PublicDonatorDTO[]): DonationsPatronGroup[] {
  const groups = new Map<DonationsPatronIconKey, PublicDonatorDTO[]>();

  for (const donator of donators) {
    const tier = resolvePatronTier(donator.type || 'Patron');
    const list = groups.get(tier) ?? [];
    list.push(donator);
    groups.set(tier, list);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => TIER_META[a].order - TIER_META[b].order)
    .map(([tier, members]) => ({
      id: tier,
      label: TIER_META[tier].label,
      icon: tier,
      description: members.map((member) => member.name).join(' · '),
    }));
}
