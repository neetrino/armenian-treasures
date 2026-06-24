import { CULTURAL_PORTAL_STATS } from '@/lib/constants/cultural-portal-page';

export function CulturalPortalStatsBar() {
  return (
    <div className="stats-bar">
      {CULTURAL_PORTAL_STATS.map((stat) => (
        <div key={stat.label} className="stat-item reveal">
          <div className="stat-num">{stat.num}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
