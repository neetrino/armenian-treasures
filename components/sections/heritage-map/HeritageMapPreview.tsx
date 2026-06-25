import Link from 'next/link';
import { getMapItems } from '@/lib/queries/culture-items';
import { mapItemsToHeritageMapNodes } from '@/lib/mappers/heritage-map-preview';
import type { HeritageMapLegendItem } from '@/lib/constants/heritage-map-section';
import { HERITAGE_MAP_NODES } from '@/lib/constants/heritage-map-section';

function HeritageMapNodeIcon() {
  return (
    <svg viewBox="0 0 14 14" className="heritage-map-node__icon" fill="none" aria-hidden>
      <path
        d="M7 1.5v1.5M5.75 3.25h2.5L7 6 5.75 3.25Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.75 7h4.5v4.5H4.75V7Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface HeritageMapPreviewProps {
  placeholderTitle: string;
  placeholderSubtitle: string;
  ctaUrl: string;
  legend: HeritageMapLegendItem[];
}

export async function HeritageMapPreview({
  placeholderTitle,
  placeholderSubtitle,
  ctaUrl,
  legend,
}: HeritageMapPreviewProps) {
  const items = await getMapItems();
  const nodes = mapItemsToHeritageMapNodes(items);
  const mapNodes = nodes.length > 0 ? nodes : HERITAGE_MAP_NODES;
  const subtitle =
    items.length > 0
      ? `${items.length} mapped location${items.length === 1 ? '' : 's'} — open the full interactive map`
      : placeholderSubtitle;

  return (
    <Link
      href={ctaUrl}
      className="heritage-map-panel group block outline-none focus-visible:ring-1 focus-visible:ring-heritage-teal focus-visible:ring-offset-4 focus-visible:ring-offset-heritage-black"
      aria-label={`${placeholderTitle}. ${subtitle}`}
    >
      <span className="heritage-map-panel__overlay" aria-hidden />

      <div className="heritage-map-panel__stage">
        <div className="heritage-map-focus">
          <div className="heritage-map-cluster">
            {mapNodes.map((node, index) => (
              <span
                key={`${node.tone}-${index}`}
                className={`heritage-map-node heritage-map-node--${node.tone}${node.featured ? ' heritage-map-node--featured' : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                aria-hidden
              >
                {node.rings >= 2 ? (
                  <span className="heritage-map-node__ring heritage-map-node__ring--outer" />
                ) : null}
                <span className="heritage-map-node__ring heritage-map-node__ring--inner" />
                <span className="heritage-map-node__dot" />
                {node.featured ? <HeritageMapNodeIcon /> : null}
              </span>
            ))}
          </div>

          <div className="heritage-map-copy">
            <h3 className="font-cinzel text-[clamp(1.125rem,1.6vw,1.5rem)] font-extrabold uppercase tracking-[0.04em] text-heritage-gold transition-colors duration-[240ms] group-hover:text-[#E6C766]">
              {placeholderTitle}
            </h3>

            <p className="mx-auto mt-2 max-w-[20rem] font-display text-[clamp(0.8125rem,0.95vw,0.9375rem)] italic leading-[1.45] text-[rgba(232,216,155,0.48)]">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="heritage-map-legend-wrap">
          <div className="heritage-map-legend">
            {legend.map((item) => (
              <span key={item.label} className="heritage-map-legend__item">
                <span
                  className="heritage-map-legend__dot"
                  style={{ backgroundColor: item.color, color: item.color }}
                  aria-hidden
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
