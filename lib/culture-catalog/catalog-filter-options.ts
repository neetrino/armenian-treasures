import { CULTURE_ITEM_TYPE_OPTIONS } from '@/lib/admin/enum-labels';
import type { PublicCultureItemDTO } from '@/lib/dto';

export interface CatalogFilterOption {
  value: string;
  label: string;
}

export const CATALOG_REGION_OPTIONS: CatalogFilterOption[] = [
  { value: 'Yerevan', label: 'Yerevan' },
  { value: 'Aragatsotn', label: 'Aragatsotn' },
  { value: 'Ararat', label: 'Ararat' },
  { value: 'Armavir', label: 'Armavir' },
  { value: 'Gegharkunik', label: 'Gegharkunik' },
  { value: 'Kotayk', label: 'Kotayk' },
  { value: 'Lori', label: 'Lori' },
  { value: 'Shirak', label: 'Shirak' },
  { value: 'Syunik', label: 'Syunik' },
  { value: 'Tavush', label: 'Tavush' },
  { value: 'Vayots Dzor', label: 'Vayots Dzor' },
];

export const CATALOG_PERIOD_OPTIONS: CatalogFilterOption[] = [
  { value: '4th c.', label: '4th century' },
  { value: '5th c.', label: '5th century' },
  { value: '7th c.', label: '7th century' },
  { value: '9th c.', label: '9th century' },
  { value: '10th c.', label: '10th century' },
  { value: '11th c.', label: '11th century' },
  { value: '13th c.', label: '13th century' },
  { value: '17th–20th c.', label: '17th–20th century' },
  { value: '782 BC', label: '782 BC' },
];

export const CATALOG_TYPE_OPTIONS: CatalogFilterOption[] = CULTURE_ITEM_TYPE_OPTIONS;

function mergeUniqueOptions(
  base: readonly CatalogFilterOption[],
  extras: string[],
): CatalogFilterOption[] {
  const seen = new Set(base.map((option) => option.value.toLowerCase()));
  const merged = [...base];
  for (const extra of extras) {
    const value = extra.trim();
    if (!value || seen.has(value.toLowerCase())) continue;
    seen.add(value.toLowerCase());
    merged.push({ value, label: value });
  }
  return merged;
}

export function collectCatalogFilterOptions(items: PublicCultureItemDTO[]): {
  regions: CatalogFilterOption[];
  periods: CatalogFilterOption[];
  types: CatalogFilterOption[];
} {
  const regions = items.map((item) => item.region ?? '').filter(Boolean);
  const periods = items.map((item) => item.periodLabel ?? '').filter(Boolean);
  return {
    regions: mergeUniqueOptions(CATALOG_REGION_OPTIONS, regions),
    periods: mergeUniqueOptions(CATALOG_PERIOD_OPTIONS, periods),
    types: CATALOG_TYPE_OPTIONS,
  };
}
