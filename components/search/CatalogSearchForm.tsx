import { CatalogSearchFields } from '@/components/search/CatalogSearchFields';
import type { CatalogSearchFormModel } from '@/lib/culture-catalog/catalog-filter-options';
import { catalogSearchHref } from '@/lib/culture-catalog/catalog-search-params';

export function CatalogSearchForm({
  action,
  filters,
  regions,
  periods,
  types,
}: CatalogSearchFormModel) {
  return (
    <form
      key={catalogSearchHref(filters, action)}
      action={action}
      method="get"
      className="catalog-search-form"
    >
      <CatalogSearchFields
        defaults={filters}
        regions={regions}
        periods={periods}
        types={types}
      />
      <button type="submit" className="btn-gold catalog-search-form__submit">
        Apply filters
      </button>
    </form>
  );
}
