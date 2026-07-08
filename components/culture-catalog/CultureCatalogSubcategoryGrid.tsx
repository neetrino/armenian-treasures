'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CultureCatalogSectionHeader } from '@/components/culture-catalog/CultureCatalogSectionHeader';
import { resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
import { resolveMenuIconKey } from '@/lib/navigation/menu-icons';
import { filterCatalogSubcategoriesBySearch } from '@/lib/culture-catalog/filter-catalog-entries';
import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import { CulturalCategoryIcon } from '@/components/sections/cultural-portal/CulturalCategoryIcon';
import { cn } from '@/lib/utils';

interface CultureCatalogSubcategoryGridProps {
  parent: MenuNode;
  nodes: MenuNode[];
  content: CultureCatalogContent['items'];
  /** Hub mode: large cards, no descriptions (category landing). */
  variant?: 'default' | 'hub';
}

export function CultureCatalogSubcategoryGrid({
  parent,
  nodes,
  content,
  variant = 'default',
}: CultureCatalogSubcategoryGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const visibleNodes = useMemo(
    () => filterCatalogSubcategoriesBySearch(nodes, searchQuery),
    [nodes, searchQuery],
  );
  const isHub = variant === 'hub';

  if (nodes.length === 0) {
    return null;
  }

  return (
    <section id="entries" className={cn(isHub && 'catalog-subcategory-hub')}>
      <CultureCatalogSectionHeader
        label={content.label}
        title={isHub ? parent.title : content.title}
        description={isHub ? undefined : content.description}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search categories…"
      />
      {visibleNodes.length === 0 ? (
        <p className="sec-desc reveal" style={{ marginTop: '2rem' }}>
          No categories match your search. Try another title or keyword.
        </p>
      ) : (
        <div className={cn('cat-grid', isHub && 'cat-grid--hub')}>
          {visibleNodes.map((node) => {
            const iconKey = resolveMenuIconKey(node.slug, parent.slug);
            const href = resolveMenuHref(node, parent);

            return (
              <Link
                key={node.id}
                href={href}
                className={cn(
                  'cat-card cat-card--catalog reveal group',
                  isHub && 'cat-card--hub',
                )}
              >
                <div className="cat-media">
                  <CulturalCategoryIcon
                    type={iconKey}
                    withBadge={false}
                    iconClassName="h-full w-full rounded-none object-cover"
                  />
                </div>
                <div className="cat-content cat-content--catalog">
                  <div className="cat-card-title">{node.title}</div>
                  {!isHub ? (
                    <div className="cat-card-sub">
                      {node.description ?? `Browse ${node.title.toLowerCase()}.`}
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
