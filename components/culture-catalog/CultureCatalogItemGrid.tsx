'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, MapPin } from 'lucide-react';
import { CultureCatalogSectionHeader } from '@/components/culture-catalog/CultureCatalogSectionHeader';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import { filterCatalogItemsBySearch } from '@/lib/culture-catalog/filter-catalog-entries';
import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import type { PublicCultureItemDTO } from '@/lib/dto';

interface CultureCatalogItemGridProps {
  items: PublicCultureItemDTO[];
  content: CultureCatalogContent['items'];
  sectionId?: string;
}

export function CultureCatalogItemGrid({
  items,
  content,
  sectionId = 'entries',
}: CultureCatalogItemGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const visibleItems = useMemo(
    () => filterCatalogItemsBySearch(items, searchQuery),
    [items, searchQuery],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <section id={sectionId}>
      <CultureCatalogSectionHeader
        label={content.label}
        title={content.title}
        description={content.description}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search sites…"
      />
      {visibleItems.length === 0 ? (
        <p className="sec-desc reveal" style={{ marginTop: '2rem' }}>
          No entries match your search. Try another name, region, or period.
        </p>
      ) : (
        <div className="catalog-item-grid">
          {visibleItems.map((item, index) => {
            const href = resolveCultureItemHref(item.slug);
            const imageSrc = item.image
              ? resolvePublicAssetUrl(item.image)
              : resolvePublicAssetUrl('/images/placeholder.svg');

            return (
              <Link key={item.id} href={href} className="catalog-item-card reveal">
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
                      <Box size={11} aria-hidden /> 3D Tour
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
                  {item.description ? (
                    <p className="catalog-item-card__excerpt">{item.description}</p>
                  ) : null}
                  <span className="catalog-item-card__cta">Explore →</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
