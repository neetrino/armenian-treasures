import Image from 'next/image';
import Link from 'next/link';
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
          <Link key={category.icon} href={category.href} className="cat-card reveal">
            <div className="cat-icon">
              <Image src={category.iconSrc} alt="" width={72} height={72} aria-hidden />
            </div>
            <div className="cat-card-title">{category.title}</div>
            <div className="cat-card-sub">{category.description}</div>
            <span className="cat-arrow" aria-hidden>
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
