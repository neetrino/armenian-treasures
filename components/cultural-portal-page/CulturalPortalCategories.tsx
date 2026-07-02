import Link from 'next/link';
import { CulturalCategoryIcon } from '@/components/sections/cultural-portal/CulturalCategoryIcon';
import type { CulturalPortalCategory } from '@/lib/constants/cultural-portal';

interface CulturalPortalCategoriesProps {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  categories: CulturalPortalCategory[];
}

export function CulturalPortalCategories({ section, categories }: CulturalPortalCategoriesProps) {
  return (
    <section id="cultural">
      <p className="sec-label">{section.eyebrow}</p>
      <h2 className="sec-title">{section.title}</h2>
      <p className="sec-desc">{section.description}</p>
      <div className="cat-grid">
        {categories.map((category) => (
          <Link key={category.icon} href={category.href} className="cat-card reveal group">
            <div className="cat-media">
              <CulturalCategoryIcon
                type={category.icon}
                withBadge={false}
                iconClassName="h-full w-full rounded-none object-cover"
              />
            </div>
            <div className="cat-content">
              <div className="cat-card-title">{category.title}</div>
              <div className="cat-card-sub">{category.description}</div>
            </div>
            <span className="cat-arrow" aria-hidden>
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
