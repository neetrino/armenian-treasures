import { DONATION_PAGE, DONATION_PILLARS } from '@/lib/constants/donation-page';

export function DonationMission() {
  const { mission } = DONATION_PAGE;

  return (
    <div className="sec">
      <div className="reveal">
        <p className="sec-label">{mission.label}</p>
        <h2 className="sec-title">{mission.title}</h2>
        <p className="sec-desc">{mission.description}</p>
      </div>
      <div className="pillars-grid reveal">
        {DONATION_PILLARS.map((pillar) => (
          <div key={pillar.num} className="pillar">
            <div className="pillar-num">{pillar.num}</div>
            <div className="pillar-title">{pillar.title}</div>
            <div className="pillar-desc">{pillar.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
