import Link from 'next/link';
import { Plus } from 'lucide-react';
import { resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
import { resolveMenuIconKey } from '@/lib/navigation/menu-icons';
import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import { CulturalCategoryIcon } from '@/components/sections/cultural-portal/CulturalCategoryIcon';

interface CultureCatalogSubcategoryGridProps {
  parent: MenuNode;
  nodes: MenuNode[];
  formChild?: MenuNode;
  content: CultureCatalogContent['items'];
}

export function CultureCatalogSubcategoryGrid({
  parent,
  nodes,
  formChild,
  content,
}: CultureCatalogSubcategoryGridProps) {
  return (
    <section id="entries">
      <p className="sec-label">{content.label}</p>
      <h2 className="sec-title">{content.title}</h2>
      <p className="sec-desc">{content.description}</p>
      <div className="cat-grid">
        {nodes.map((node) => {
          const iconKey = resolveMenuIconKey(node.slug, parent.slug);
          const href = resolveMenuHref(node, parent);

          return (
            <Link key={node.id} href={href} className="cat-card cat-card--catalog reveal group">
              <div className="cat-media">
                <CulturalCategoryIcon
                  type={iconKey}
                  withBadge={false}
                  iconClassName="h-full w-full rounded-none object-cover"
                />
              </div>
              <div className="cat-content cat-content--catalog">
                <div className="cat-card-title">{node.title}</div>
                <div className="cat-card-sub">{node.description ?? `Browse ${node.title.toLowerCase()}.`}</div>
              </div>
            </Link>
          );
        })}
        {formChild ? (
          <Link href={resolveMenuHref(formChild, parent)} className="catalog-add-card reveal">
            <span className="catalog-add-card__icon">
              <Plus size={22} strokeWidth={1.5} aria-hidden />
            </span>
            <span className="catalog-add-card__title">Add a new sub-catalog</span>
            <span className="catalog-add-card__sub">
              Propose a new {parent.title.toLowerCase()} sub-catalog.
            </span>
          </Link>
        ) : null}
      </div>
      <div className="catalog-submit-cta reveal">
        <p>{content.submitPrompt}</p>
        <Link href="/culture/submit" className="btn-outline">
          Suggest an Entry
        </Link>
      </div>
    </section>
  );
}
