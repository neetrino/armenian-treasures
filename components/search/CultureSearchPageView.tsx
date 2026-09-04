import { CultureCatalogItemGrid } from '@/components/culture-catalog/CultureCatalogItemGrid';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { LandingHero } from '@/components/landing/LandingHero';
import { CatalogSearchForm } from '@/components/search/CatalogSearchForm';
import type { CatalogFilterOption } from '@/lib/culture-catalog/catalog-filter-options';
import {
  CATALOG_SEARCH_PATH,
  type CatalogSearchFilters,
} from '@/lib/culture-catalog/catalog-search-params';
import type { PublicCultureItemDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

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
  locale?: SiteLocaleCode;
}

export function CultureSearchPageView({
  items,
  filters,
  regions,
  periods,
  types,
  locale = 'EN',
}: CultureSearchPageViewProps) {
  return (
    <CultureCatalogShell>
      <LandingHero
        locale={locale}
        eyebrow={uiMessage(locale, 'catalogSearch')}
        title={uiMessage(locale, 'searchThe')}
        accent={uiMessage(locale, 'archive')}
        subtitle={uiMessage(locale, 'searchHeroSubtitle')}
        ctas={[{ label: uiMessage(locale, 'openHeritageMap'), href: '/map', variant: 'teal' }]}
      />
      <KhndzoreskDivider />
      <section id="results">
        <p className="sec-label">{uiMessage(locale, 'filters')}</p>
        <h2 className="sec-title">{uiMessage(locale, 'regionPeriodType')}</h2>
        <CatalogSearchForm
          action={CATALOG_SEARCH_PATH}
          filters={filters}
          regions={regions}
          periods={periods}
          types={types}
        />
        {items.length > 0 ? (
          <CultureCatalogItemGrid
            items={items}
            content={RESULTS_CONTENT}
            sectionId="matches"
            locale={locale}
          />
        ) : (
          <p className="sec-desc" style={{ marginTop: '2rem' }}>
            {uiMessage(locale, 'noEntriesMatch')}
          </p>
        )}
      </section>
    </CultureCatalogShell>
  );
}
