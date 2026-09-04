import type { PublicCultureItemDTO } from '@/lib/dto';
import { uiMessage } from '@/lib/i18n/ui-messages';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

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

const FILTER_MAP_TYPES: Record<
  HeritageMapFilterValue,
  PublicCultureItemDTO['mapType'][] | null
> = {
  ALL: null,
  RELIGIOUS: ['MONASTERY', 'CHURCH', 'CHAPEL'],
  MONUMENTS: ['FORTRESS', 'MEMORIAL', 'KHACHKAR'],
  MUSEUMS: ['MUSEUM'],
  SETTLEMENTS: ['SETTLEMENT'],
  OTHER: ['OTHER'],
};

const FILTER_LABEL_KEYS = {
  ALL: 'filterAll',
  RELIGIOUS: 'filterReligious',
  MONUMENTS: 'filterMonuments',
  MUSEUMS: 'filterMuseums',
  SETTLEMENTS: 'filterSettlements',
  OTHER: 'filterOther',
} as const;

export function heritageMapFilterOptions(locale: SiteLocaleCode): HeritageMapFilterOption[] {
  return (Object.keys(FILTER_MAP_TYPES) as HeritageMapFilterValue[]).map((value) => ({
    value,
    label: uiMessage(locale, FILTER_LABEL_KEYS[value]),
    mapTypes: FILTER_MAP_TYPES[value],
  }));
}

/** English defaults for non-locale-aware call sites. */
export const HERITAGE_MAP_FILTER_OPTIONS: HeritageMapFilterOption[] =
  heritageMapFilterOptions('EN');

export function filterMapItemsByCategory(
  items: PublicCultureItemDTO[],
  filter: HeritageMapFilterValue,
): PublicCultureItemDTO[] {
  const mapTypes = FILTER_MAP_TYPES[filter];
  if (!mapTypes) return items;
  return items.filter((item) => item.mapType != null && mapTypes.includes(item.mapType));
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
