export const CATALOG_SEARCH_PATH = '/search';

export interface CatalogSearchFilters {
  q: string;
  region: string;
  period: string;
  type: string;
}

export type CatalogSearchParamInput =
  | URLSearchParams
  | Record<string, string | string[] | undefined>;

export function emptyCatalogSearchFilters(): CatalogSearchFilters {
  return { q: '', region: '', period: '', type: '' };
}

function readSearchParam(input: CatalogSearchParamInput, key: string): string {
  if (input instanceof URLSearchParams) {
    return input.get(key)?.trim() ?? '';
  }
  const raw = input[key];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value?.trim() ?? '';
}

export function parseCatalogSearchParams(
  input: CatalogSearchParamInput,
): CatalogSearchFilters {
  return {
    q: readSearchParam(input, 'q'),
    region: readSearchParam(input, 'region'),
    period: readSearchParam(input, 'period'),
    type: readSearchParam(input, 'type'),
  };
}

export function hasCatalogSearchFilters(filters: CatalogSearchFilters): boolean {
  return Boolean(filters.q || filters.region || filters.period || filters.type);
}

export function catalogSearchHref(
  filters: CatalogSearchFilters,
  path = CATALOG_SEARCH_PATH,
): string {
  const params = new URLSearchParams();
  if (filters.q) params.set('q', filters.q);
  if (filters.region) params.set('region', filters.region);
  if (filters.period) params.set('period', filters.period);
  if (filters.type) params.set('type', filters.type);
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}
