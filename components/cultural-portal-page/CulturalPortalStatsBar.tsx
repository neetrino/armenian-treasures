interface CulturalPortalStat {
  value: string;
  label: string;
}

interface CulturalPortalStatsBarProps {
  stats: CulturalPortalStat[];
}

export function CulturalPortalStatsBar({ stats }: CulturalPortalStatsBarProps) {
  if (stats.length === 0) {
    return null;
  }

  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item reveal">
          <div className="stat-num">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
