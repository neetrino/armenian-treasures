import Link from 'next/link';
import { KHNDZORESK_SITES } from '@/lib/constants/khndzoresk';
import {
  CaveDwellingsIcon,
  SparapetTombIcon,
  StHripsimeIcon,
  StTatevosIcon,
  SuspensionBridgeIcon,
  VillageMuseumIcon,
} from '@/components/khndzoresk/site-icons';

const SITE_ICONS = {
  hripsime: StHripsimeIcon,
  sparapet: SparapetTombIcon,
  tatevos: StTatevosIcon,
  caves: CaveDwellingsIcon,
  bridge: SuspensionBridgeIcon,
  museum: VillageMuseumIcon,
} as const;

export function KhndzoreskSites() {
  return (
    <section id="sites">
      <p className="sec-label">Sacred Monuments</p>
      <h2 className="sec-title">The Sanctuaries of Khndzoresk</h2>
      <p className="sec-desc">
        Six heritage landmarks digitally preserved — each holding centuries of Armenian faith, military history,
        and daily life.
      </p>
      <div className="cat-grid">
        {KHNDZORESK_SITES.map((site) => {
          const Icon = SITE_ICONS[site.icon];
          return (
            <Link key={site.id} href={site.href} className="cat-card reveal">
              <div className="cat-icon">
                <Icon />
              </div>
              <div className="cat-card-title">{site.title}</div>
              <div className="cat-card-sub">{site.sub}</div>
              <span className="cat-arrow">→</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
