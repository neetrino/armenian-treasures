import Link from 'next/link';
import type { NationalGalleryPageContent } from '@/lib/queries/page-content';
import { hasNonEmptyArray, hasTrimmedText } from '@/lib/landing/landing-section-utils';
import {
  AivazovskyCollectionIcon,
  ArmenianPaintingIcon,
  DecorativeArtIcon,
  EuropeanArtIcon,
  GraphicsIcon,
  SculptureIcon,
} from '@/components/national-gallery-armenia/site-icons';

const COLLECTION_ICONS = {
  armenian: ArmenianPaintingIcon,
  aivazovsky: AivazovskyCollectionIcon,
  european: EuropeanArtIcon,
  graphics: GraphicsIcon,
  sculpture: SculptureIcon,
  decorative: DecorativeArtIcon,
} as const;

type NationalGalleryCollectionProps = {
  collections: NationalGalleryPageContent['collections'];
};

export function NationalGalleryCollection({ collections }: NationalGalleryCollectionProps) {
  if (!hasNonEmptyArray(collections)) {
    return null;
  }

  return (
    <section id="collection">
      <p className="sec-label">Permanent Collection</p>
      <h2 className="sec-title">Six Departments, One Civilisation</h2>
      <p className="sec-desc">
        From ancient Egyptian decorative art to Soviet-era Armenian painting — 56 halls spanning the full arc of world
        visual culture.
      </p>
      <div className="cat-grid">
        {collections.map((item) => {
          const Icon = COLLECTION_ICONS[item.icon];
          return (
            <Link key={item.id} href={item.href} className="cat-card reveal">
              <div className="cat-icon">
                <Icon />
              </div>
              <div className="cat-card-title">{item.title}</div>
              <div className="cat-card-sub">{item.sub}</div>
              <span className="cat-arrow">→</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function NationalGalleryVirtualTour({
  virtualTour,
}: {
  virtualTour: NationalGalleryPageContent['virtualTour'];
}) {
  if (!hasTrimmedText(virtualTour.embed)) {
    return null;
  }

  return (
    <section id="virtual-tour">
      <p className="sec-label">Virtual Experience</p>
      <h2 className="sec-title">Walk the Galleries — From Anywhere on Earth</h2>
      <p className="sec-desc">
        Step inside the Aivazovsky Hall and the Armenian painting rooms in this high-resolution virtual walkthrough —
        preserved digitally for the world.
      </p>
      <div className="tour-wrap reveal">
        <iframe
          className="tour-embed"
          src={virtualTour.embed}
          allowFullScreen
          allow="xr-spatial-tracking"
          title="National Gallery of Armenia — Aivazovsky Hall Virtual Tour"
        />
        <div className="tour-label">
          <span className="tour-name">{virtualTour.title}</span>
          <span className="tour-tag">{virtualTour.tag}</span>
        </div>
      </div>
    </section>
  );
}
