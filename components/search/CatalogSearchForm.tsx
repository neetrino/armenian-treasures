import { CatalogSearchFields } from '@/components/search/CatalogSearchFields';
import {
  localizeCatalogFilterOptions,
  type CatalogSearchFormModel,
} from '@/lib/culture-catalog/catalog-filter-options';
import { catalogSearchHref } from '@/lib/culture-catalog/catalog-search-params';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

export function CatalogSearchForm({
  action,
  filters,
  regions,
  periods,
  types,
  locale = 'EN',
}: CatalogSearchFormModel & { locale?: SiteLocaleCode }) {
  const localized = localizeCatalogFilterOptions({ regions, periods, types }, locale);
  return (
    <form
      key={catalogSearchHref(filters, action)}
      action={action}
      method="get"
      className="catalog-search-form"
    >
      <CatalogSearchFields
        defaults={filters}
        regions={localized.regions}
        periods={localized.periods}
        types={localized.types}
        locale={locale}
      />
      <button type="submit" className="btn-gold catalog-search-form__submit">
        {uiMessage(locale, 'applyFilters')}
      </button>
    </form>
  );
}
