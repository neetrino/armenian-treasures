import Link from 'next/link';
import type { CulturalPortalHighlightIcon } from '@/lib/constants/cultural-portal-page';
import { CulturalCategoryIcon } from '@/components/sections/cultural-portal/CulturalCategoryIcon';
import type { CulturalPortalIconKey } from '@/lib/constants/cultural-portal';

interface CulturalPortalHighlight {
  num: string;
  icon: CulturalPortalHighlightIcon;
  tag: string;
  title: string;
  excerpt: string;
  href: string;
  featured?: boolean;
}

interface CulturalPortalHighlightsProps {
  highlights: CulturalPortalHighlight[];
}

const HIGHLIGHT_ICON_TO_PORTAL_ICON: Record<CulturalPortalHighlightIcon, CulturalPortalIconKey> = {
  geghard: 'churches',
  duduk: 'music',
  tigranes: 'famousArmenians',
  areni: 'foodDrink',
};

function HighlightIcon({ type }: { type: CulturalPortalHighlightIcon }) {
  const iconType = HIGHLIGHT_ICON_TO_PORTAL_ICON[type];
  return (
    <div className="hl-icon-badge" aria-hidden>
      <CulturalCategoryIcon
        type={iconType}
        withBadge={false}
        iconClassName="hl-icon"
      />
    </div>
  );
}

export function CulturalPortalHighlights({ highlights }: CulturalPortalHighlightsProps) {
  return (
    <section>
      <p className="sec-label">Featured Treasures</p>
      <h2 className="sec-title">Stories Worth Discovering</h2>
      {highlights.length === 0 ? (
        <p className="sec-desc">Featured culture items will appear here once published in the admin panel.</p>
      ) : (
        <div className="hl-grid">
          {highlights.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hl-card reveal${item.featured ? ' featured' : ''}`}
            >
              <HighlightIcon type={item.icon} />
              <span className="hl-tag">{item.tag}</span>
              <div className="hl-title">{item.title}</div>
              <p className="hl-excerpt">{item.excerpt}</p>
              <div className="hl-num">{item.num}</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
