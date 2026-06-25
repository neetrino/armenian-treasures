import type { DonationPillar } from '@/lib/constants/donation-page';
import type { DonationPageContent } from '@/lib/queries/page-content';

type DonationMissionProps = {
  mission: DonationPageContent['page']['mission'];
  pillars: DonationPillar[];
};

export function DonationMission({ mission, pillars }: DonationMissionProps) {
  return (
    <div className="sec">
      <div className="reveal">
        <p className="sec-label">{mission.label}</p>
        <h2 className="sec-title">{mission.title}</h2>
        <p className="sec-desc">{mission.description}</p>
      </div>
      <div className="pillars-grid reveal">
        {pillars.map((pillar) => (
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
