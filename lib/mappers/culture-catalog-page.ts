import type { PublicCultureItemDTO } from '@/lib/dto';
import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';

const UNESCO_SLUGS = new Set(['geghard-monastery', 'haghpat']);

export interface CultureCatalogStat {
  value: string;
  label: string;
}

export function buildCultureCatalogStats(
  items: PublicCultureItemDTO[],
  labels: CultureCatalogContent['statLabels'],
): CultureCatalogStat[] {
  const regions = new Set(items.map((item) => item.region).filter(Boolean));
  const centuries = new Set(items.map((item) => item.century).filter((c): c is number => c != null));
  const unescoCount = items.filter((item) => UNESCO_SLUGS.has(item.slug)).length;
  const toursCount = items.filter((item) => item.tourUrl).length;

  const thirdValue =
    labels.third === 'UNESCO Sites'
      ? unescoCount > 0
        ? String(unescoCount)
        : '—'
      : centuries.size > 0
        ? String(centuries.size)
        : '—';

  const fourthValue = labels.fourth === '3D Tours' ? (toursCount > 0 ? String(toursCount) : '—') : '—';

  return [
    { value: String(items.length), label: labels.entries },
    { value: String(regions.size), label: labels.regions },
    { value: thirdValue, label: labels.third },
    { value: fourthValue, label: labels.fourth },
  ];
}

export function buildCultureCatalogCategoryStats(
  subcategoryCount: number,
  totalItems: number,
  labels: Pick<CultureCatalogContent['statLabels'], 'entries' | 'regions'>,
): CultureCatalogStat[] {
  return [
    { value: String(subcategoryCount), label: labels.entries },
    { value: String(totalItems), label: labels.regions },
    { value: '—', label: 'Periods' },
    { value: '—', label: '3D Tours' },
  ];
}

export function filterMappableItems(items: PublicCultureItemDTO[]): PublicCultureItemDTO[] {
  return items.filter(
    (item) => item.showOnMap && item.latitude != null && item.longitude != null,
  );
}

export function countMappableItems(items: PublicCultureItemDTO[]): number {
  return filterMappableItems(items).length;
}
