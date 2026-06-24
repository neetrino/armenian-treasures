import { PARTNERSHIP_STATS } from '@/lib/constants/partnership-page';

export function PartnershipStatsBar() {
  return (
    <div className="stats-bar">
      {PARTNERSHIP_STATS.map((stat) => (
        <div key={stat.label} className="stat-item reveal">
          <div className="stat-num">{stat.num}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
