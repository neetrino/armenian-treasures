import Image from 'next/image';
import Link from 'next/link';
import { Box, MapPin } from 'lucide-react';
import { CatalogSearchForm } from '@/components/search/CatalogSearchForm';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import type { CatalogSearchFormModel } from '@/lib/culture-catalog/catalog-filter-options';
import type { PublicCultureItemDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface CultureCatalogItemGridProps {
  items: PublicCultureItemDTO[];
  content: CultureCatalogContent['items'];
  sectionId?: string;
  searchForm?: CatalogSearchFormModel;
  locale?: SiteLocaleCode;
}

function CatalogItemCard({
  item,
  index,
  locale,
}: {
  item: PublicCultureItemDTO;
  index: number;
  locale: SiteLocaleCode;
}) {
  const href = resolveCultureItemHref(item.slug);
  const imageSrc = item.image
    ? resolvePublicAssetUrl(item.image)
    : resolvePublicAssetUrl('/images/placeholder.svg');

  return (
    <Link href={href} className="catalog-item-card reveal">
      <div className="catalog-item-card__media">
        <Image
          src={imageSrc}
          alt={item.title}
          width={640}
          height={400}
          className="catalog-item-card__img"
        />
        <div className="catalog-item-card__overlay" aria-hidden />
        {item.tourUrl ? (
          <span className="catalog-item-card__badge">
            <Box size={11} aria-hidden /> {uiMessage(locale, 'tour3d')}
          </span>
        ) : null}
        <span className="catalog-item-card__num" aria-hidden>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="catalog-item-card__body">
        <div className="catalog-item-card__meta">
          {item.region ? (
            <span className="catalog-item-card__region">
              <MapPin size={11} aria-hidden /> {item.region}
            </span>
          ) : null}
          {item.periodLabel ? (
            <span className="catalog-item-card__period">{item.periodLabel}</span>
          ) : null}
        </div>
        <h3 className="catalog-item-card__title">{item.title}</h3>
        {item.description ? <p className="catalog-item-card__excerpt">{item.description}</p> : null}
        <span className="catalog-item-card__cta">{uiMessage(locale, 'exploreArrow')}</span>
      </div>
    </Link>
  );
}

export function CultureCatalogItemGrid({
  items,
  content,
  sectionId = 'entries',
  searchForm,
  locale = 'EN',
}: CultureCatalogItemGridProps) {
  if (!searchForm && items.length === 0) {
    return null;
  }

  return (
    <section id={sectionId}>
      <div className="catalog-section-intro">
        <div className="catalog-section-intro__copy">
          <p className="sec-label">{content.label}</p>
          <h2 className="sec-title">{content.title}</h2>
          {content.description ? <p className="sec-desc">{content.description}</p> : null}
        </div>
      </div>
      {searchForm ? <CatalogSearchForm {...searchForm} /> : null}
      {items.length === 0 ? (
        <p className="sec-desc reveal" style={{ marginTop: '2rem' }}>
          {uiMessage(locale, 'noEntriesMatch')}
        </p>
      ) : (
        <div className="catalog-item-grid">
          {items.map((item, index) => (
            <CatalogItemCard key={item.id} item={item} index={index} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}
