import Link from 'next/link';
import type { KhndzoreskPageContent } from '@/lib/queries/page-content';
import { hasNonEmptyArray } from '@/lib/landing/landing-section-utils';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
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

type KhndzoreskSitesProps = {
  sites: KhndzoreskPageContent['sites'];
  locale?: SiteLocaleCode;
};

export function KhndzoreskSites({ sites, locale = 'EN' }: KhndzoreskSitesProps) {
  if (!hasNonEmptyArray(sites)) {
    return null;
  }

  return (
    <section id="sites">
      <p className="sec-label">{uiMessage(locale, 'sacredMonuments')}</p>
      <h2 className="sec-title">{uiMessage(locale, 'sanctuariesOfKhndzoresk')}</h2>
      <p className="sec-desc">{uiMessage(locale, 'sanctuariesDesc')}</p>
      <div className="cat-grid">
        {sites.map((site) => {
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
