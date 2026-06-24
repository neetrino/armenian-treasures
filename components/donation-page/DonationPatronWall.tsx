import { DONATION_PAGE, DONATION_WALL } from '@/lib/constants/donation-page';
import { WallTierIcon } from '@/components/donation-page/donation-icons';

export function DonationPatronWall() {
  const { patronWall } = DONATION_PAGE;

  return (
    <div className="sec" aria-label="Current patron supporters">
      <div className="reveal">
        <p className="sec-label">{patronWall.label}</p>
        <h2 className="sec-title">{patronWall.title}</h2>
        <p className="sec-desc">{patronWall.description}</p>
      </div>
      <div className="wall-row reveal" role="list">
        {DONATION_WALL.map((item) => (
          <div key={item.tier} className="wall-item" role="listitem">
            <WallTierIcon tier={item.tier} />
            <div className={`wall-badge wb-${item.tier}`}>{item.badge}</div>
            <div className="wall-names">{item.names}</div>
            <div className="wall-count">{item.count}</div>
          </div>
        ))}
      </div>
      <div className="wall-cta reveal">
        <a href="#give" className="btn-gold">
          {patronWall.ctaLabel}
        </a>
      </div>
    </div>
  );
}
