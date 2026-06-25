import { WallTierIcon } from '@/components/donation-page/donation-icons';
import type { DonationWallTier } from '@/lib/constants/donation-page';
import type { PublicDonatorDTO } from '@/lib/dto';
import { groupDonatorsForPatronWall } from '@/lib/mappers/donations-patrons';
import type { DonationPageContent } from '@/lib/queries/page-content';

type DonationPatronWallProps = {
  patronWall: DonationPageContent['page']['patronWall'];
  wallBadges: DonationWallTier[];
  donators: PublicDonatorDTO[];
};

export function DonationPatronWall({ patronWall, wallBadges, donators }: DonationPatronWallProps) {
  const wallItems = groupDonatorsForPatronWall(donators, wallBadges);

  return (
    <div className="sec" aria-label="Current patron supporters">
      <div className="reveal">
        <p className="sec-label">{patronWall.label}</p>
        <h2 className="sec-title">{patronWall.title}</h2>
        <p className="sec-desc">{patronWall.description}</p>
      </div>
      {wallItems.length > 0 ? (
        <div className="wall-row reveal" role="list">
          {wallItems.map((item) => (
            <div key={item.tier} className="wall-item" role="listitem">
              <WallTierIcon tier={item.tier} />
              <div className={`wall-badge wb-${item.tier}`}>{item.badge}</div>
              <div className="wall-names">{item.names}</div>
              <div className="wall-count">{item.count}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="sec-desc reveal">
          Public patrons will appear here once curators publish them in the admin panel.
        </p>
      )}
      <div className="wall-cta reveal">
        <a href="#give" className="btn-gold">
          {patronWall.ctaLabel}
        </a>
      </div>
    </div>
  );
}
