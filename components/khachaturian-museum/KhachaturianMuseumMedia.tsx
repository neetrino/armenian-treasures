import Link from 'next/link';
import type { KhachaturianPageContent } from '@/lib/queries/page-content';
import { hasNonEmptyArray, hasTrimmedText } from '@/lib/landing/landing-section-utils';
import {
  FilmMusicIcon,
  GayaneIcon,
  MasqueradeIcon,
  SpartacusIcon,
  SymphoniesIcon,
  ViolinIcon,
} from '@/components/khachaturian-museum/site-icons';

const WORK_ICONS = {
  gayane: GayaneIcon,
  spartacus: SpartacusIcon,
  masquerade: MasqueradeIcon,
  violin: ViolinIcon,
  symphonies: SymphoniesIcon,
  film: FilmMusicIcon,
} as const;

type KhachaturianMuseumWorksProps = {
  works: KhachaturianPageContent['works'];
};

export function KhachaturianMuseumWorks({ works }: KhachaturianMuseumWorksProps) {
  if (!hasNonEmptyArray(works)) {
    return null;
  }

  return (
    <section id="works">
      <p className="sec-label">Musical Legacy</p>
      <h2 className="sec-title">His Greatest Works</h2>
      <p className="sec-desc">
        From thundering ballet suites to lyrical violin concertos — the compositions that made Khachaturian a world
        classic.
      </p>
      <div className="cat-grid">
        {works.map((work) => {
          const Icon = WORK_ICONS[work.icon];
          return (
            <Link key={work.id} href={work.href} className="cat-card reveal">
              <div className="cat-icon">
                <Icon />
              </div>
              <div className="cat-card-title">{work.title}</div>
              <div className="cat-card-sub">{work.sub}</div>
              <span className="cat-arrow">→</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function KhachaturianMuseumVirtualTour({
  virtualTour,
}: {
  virtualTour: KhachaturianPageContent['virtualTour'];
}) {
  if (!hasTrimmedText(virtualTour.embed)) {
    return null;
  }

  return (
    <section id="virtual-tour">
      <p className="sec-label">Virtual Experience</p>
      <h2 className="sec-title">Walk Through the Museum — From Anywhere</h2>
      <p className="sec-desc">
        Step inside Khachaturian&apos;s private rooms, study, and exhibition halls in this high-resolution virtual
        walkthrough — preserved digitally for the world.
      </p>
      <div className="tour-wrap reveal">
        <iframe
          className="tour-embed"
          src={virtualTour.embed}
          allowFullScreen
          allow="xr-spatial-tracking"
          title="Aram Khachaturian House-Museum Virtual Tour"
        />
        <div className="tour-label">
          <span className="tour-name">{virtualTour.title}</span>
          <span className="tour-tag">{virtualTour.tag}</span>
        </div>
      </div>
    </section>
  );
}
