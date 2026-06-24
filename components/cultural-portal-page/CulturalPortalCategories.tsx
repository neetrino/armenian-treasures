import Image from 'next/image';
import Link from 'next/link';
import {
  CULTURAL_PORTAL_CATEGORIES,
  CULTURAL_PORTAL_SECTION,
} from '@/lib/constants/cultural-portal-page';

export function CulturalPortalCategories() {
  return (
    <section id="cultural">
      <p className="sec-label">{CULTURAL_PORTAL_SECTION.eyebrow}</p>
      <h2 className="sec-title">{CULTURAL_PORTAL_SECTION.title}</h2>
      <p className="sec-desc">{CULTURAL_PORTAL_SECTION.description}</p>
      <div className="cat-grid">
        {CULTURAL_PORTAL_CATEGORIES.map((category) => (
          <Link key={category.title} href={category.href} className="cat-card reveal">
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
