import type { Metadata } from 'next';
import { CultureSearchPageView } from '@/components/search/CultureSearchPageView';
import { collectCatalogFilterOptions } from '@/lib/culture-catalog/catalog-filter-options';
import { filterCatalogItems } from '@/lib/culture-catalog/filter-catalog-entries';
import { parseCatalogSearchParams } from '@/lib/culture-catalog/catalog-search-params';
import { getPublishedCultureItems } from '@/lib/queries/culture-items';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';

export const revalidate = 60;

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicPageMetadata({
    title: 'Search the archive — Armenian Treasures',
    description:
      'Search Armenian heritage entries by name, region, period, and type.',
    pathname: '/search',
  });
}

async function SearchPage(props: SearchPageProps) {
  const [params, items, locale] = await Promise.all([
    props.searchParams,
    getPublishedCultureItems(),
    getCurrentSiteLocale(),
  ]);
  const filters = parseCatalogSearchParams(params);
  const matches = filterCatalogItems(items, filters);
  const options = collectCatalogFilterOptions(items);

  return (
    <CultureSearchPageView
      items={matches}
      filters={filters}
      regions={options.regions}
      periods={options.periods}
      types={options.types}
      locale={locale}
    />
  );
}

export default SearchPage;
