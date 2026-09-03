import type { PublicCultureItemDTO } from '@/lib/dto';

export type HeritageMapFilterValue =
  | 'ALL'
  | 'RELIGIOUS'
  | 'MONUMENTS'
  | 'MUSEUMS'
  | 'SETTLEMENTS'
  | 'OTHER';

export interface HeritageMapFilterOption {
  value: HeritageMapFilterValue;
  label: string;
  mapTypes: PublicCultureItemDTO['mapType'][] | null;
}

export const HERITAGE_MAP_FILTER_OPTIONS: HeritageMapFilterOption[] = [
  { value: 'ALL', label: 'All', mapTypes: null },
  {
    value: 'RELIGIOUS',
    label: 'Religious Sites',
    mapTypes: ['MONASTERY', 'CHURCH', 'CHAPEL'],
  },
  {
    value: 'MONUMENTS',
    label: 'Historical Monuments',
    mapTypes: ['FORTRESS', 'MEMORIAL', 'KHACHKAR'],
  },
  {
    value: 'MUSEUMS',
    label: 'Museums & Galleries',
    mapTypes: ['MUSEUM'],
  },
  {
    value: 'SETTLEMENTS',
    label: 'Historical Settlements',
    mapTypes: ['SETTLEMENT'],
  },
  {
    value: 'OTHER',
    label: 'Other Heritage',
    mapTypes: ['OTHER'],
  },
];

export function filterMapItemsByCategory(
  items: PublicCultureItemDTO[],
  filter: HeritageMapFilterValue,
): PublicCultureItemDTO[] {
  const option = HERITAGE_MAP_FILTER_OPTIONS.find((entry) => entry.value === filter);
  if (!option?.mapTypes) return items;
  return items.filter((item) => item.mapType != null && option.mapTypes!.includes(item.mapType));
}

export function filterMapItemsBySearch(
  items: PublicCultureItemDTO[],
  query: string,
): PublicCultureItemDTO[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;

  return items.filter((item) => {
    const searchable = [
      item.title,
      item.region,
      item.locationName,
      item.periodLabel,
      item.yearLabel,
      item.shortDescription,
      item.description,
      item.mapType?.replaceAll('_', ' '),
    ];

    return searchable.some((value) => value?.toLowerCase().includes(normalized));
  });
}

export const HERITAGE_MAP_FILTER_COLORS: Record<HeritageMapFilterValue, string> = {
  ALL: '#D6B85A',
  RELIGIOUS: '#27C6C8',
  MONUMENTS: '#D6B85A',
  MUSEUMS: '#9B7BD4',
  SETTLEMENTS: '#6BB578',
  OTHER: '#D6855A',
};
