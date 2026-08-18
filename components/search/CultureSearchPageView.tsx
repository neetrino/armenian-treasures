import { CultureCatalogItemGrid } from '@/components/culture-catalog/CultureCatalogItemGrid';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { LandingHero } from '@/components/landing/LandingHero';
import { CatalogSearchFields } from '@/components/search/CatalogSearchFields';
import type { CatalogFilterOption } from '@/lib/culture-catalog/catalog-filter-options';
import {
  CATALOG_SEARCH_PATH,
  catalogSearchHref,
  type CatalogSearchFilters,
} from '@/lib/culture-catalog/catalog-search-params';
import type { PublicCultureItemDTO } from '@/lib/dto';

const RESULTS_CONTENT = {
  label: 'Catalog results',
  title: 'Matching heritage entries',
  description: 'Filter by region, period, and type, or search by name.',
  submitPrompt: '',
  emptyMessage: 'No entries match these filters.',
};

interface CultureSearchPageViewProps {
  items: PublicCultureItemDTO[];
  filters: CatalogSearchFilters;
  regions: CatalogFilterOption[];
  periods: CatalogFilterOption[];
  types: CatalogFilterOption[];
}

export function CultureSearchPageView({
  items,
  filters,
  regions,
  periods,
  types,
}: CultureSearchPageViewProps) {
  return (
    <CultureCatalogShell>
      <LandingHero
        eyebrow="CATALOG SEARCH"
        title="SEARCH THE"
        accent="ARCHIVE"
        subtitle="Find monasteries, museums, people, and heritage objects by region, period, and type."
        ctas={[{ label: 'Open heritage map', href: '/map', variant: 'teal' }]}
      />
      <KhndzoreskDivider />
      <section id="results">
        <p className="sec-label">Filters</p>
        <h2 className="sec-title">Region, period, type</h2>
        <form
          key={catalogSearchHref(filters)}
          action={CATALOG_SEARCH_PATH}
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
        {items.length > 0 ? (
          <CultureCatalogItemGrid items={items} content={RESULTS_CONTENT} sectionId="matches" />
        ) : (
          <p className="sec-desc" style={{ marginTop: '2rem' }}>
            {RESULTS_CONTENT.emptyMessage} Try another region, period, or keyword.
          </p>
        )}
      </section>
    </CultureCatalogShell>
  );
}
