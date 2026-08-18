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
  /** Hub mode: title + description, then large shortcut cards. */
  variant?: 'default' | 'hub';
}

function SubcategoryCatalogCard({
  node,
  parent,
  isHub,
}: {
  node: MenuNode;
  parent: MenuNode;
  isHub: boolean;
}) {
  const iconKey = resolveMenuIconKey(node.slug, parent.slug);
  const href = resolveMenuHref(node, parent);

  return (
    <Link
      href={href}
      className={cn('cat-card cat-card--catalog reveal group', isHub && 'cat-card--hub')}
      data-category-icon={iconKey}
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
}

function CultureCatalogHubGrid({
  parent,
  nodes,
  content,
}: Omit<CultureCatalogSubcategoryGridProps, 'variant'>) {
  return (
    <section id="entries" className="catalog-subcategory-hub">
      <div className="catalog-hub-intro">
        <p className="sec-label">{content.label}</p>
        <h2 className="sec-title">{parent.title}</h2>
        {content.description ? <p className="sec-desc">{content.description}</p> : null}
      </div>
      <div className="cat-grid cat-grid--hub">
        {nodes.map((node) => (
          <SubcategoryCatalogCard key={node.id} node={node} parent={parent} isHub />
        ))}
      </div>
    </section>
  );
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

  if (nodes.length === 0) {
    return null;
  }

  if (variant === 'hub') {
    return <CultureCatalogHubGrid parent={parent} nodes={nodes} content={content} />;
  }

  return (
    <section id="entries">
      <CultureCatalogSectionHeader
        label={content.label}
        title={content.title}
        description={content.description}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search categories…"
      />
      {visibleNodes.length === 0 ? (
        <p className="sec-desc reveal" style={{ marginTop: '2rem' }}>
          No categories match your search. Try another title or keyword.
        </p>
      ) : (
        <div className="cat-grid">
          {visibleNodes.map((node) => (
            <SubcategoryCatalogCard key={node.id} node={node} parent={parent} isHub={false} />
          ))}
        </div>
      )}
    </section>
  );
}
