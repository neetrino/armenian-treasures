import type { PublicCultureItemDTO } from '@/lib/dto';

export type HeritageMapFilterValue =
  | 'ALL'
  | 'RELIGIOUS'
  | 'MONUMENTS'
  | 'MUSEUMS'
  | 'ARCHAEOLOGICAL'
  | 'OTHER';

export interface HeritageMapFilterOption {
  value: HeritageMapFilterValue;
  label: string;
  /** Matches `MapType` values on culture items; null means no filter. */
  mapTypes: PublicCultureItemDTO['mapType'][] | null;
}

export const HERITAGE_MAP_FILTER_OPTIONS: HeritageMapFilterOption[] = [
  { value: 'ALL', label: 'All', mapTypes: null },
  {
    value: 'RELIGIOUS',
    label: 'Religious Sites',
    mapTypes: ['MONASTERY', 'CHURCH'],
  },
  {
    value: 'MONUMENTS',
    label: 'Historical Monuments',
    mapTypes: ['FORTRESS', 'OTHER'],
  },
  {
    value: 'MUSEUMS',
    label: 'Museums & Galleries',
    mapTypes: ['MUSEUM'],
  },
  {
    value: 'ARCHAEOLOGICAL',
    label: 'Archaeological Sites',
    mapTypes: ['ARCHAEOLOGICAL'],
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

/** Aligns marketing legend colours with filter chips on the map page. */
export const HERITAGE_MAP_FILTER_COLORS: Record<HeritageMapFilterValue, string> = {
  ALL: '#D6B85A',
  RELIGIOUS: '#27C6C8',
  MONUMENTS: '#D6B85A',
  MUSEUMS: '#9B7BD4',
  ARCHAEOLOGICAL: '#6BB578',
  OTHER: '#D6855A',
};
