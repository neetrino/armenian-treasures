interface CulturalPortalStat {
  value: string;
  label: string;
}

interface CulturalPortalStatsBarProps {
  stats: CulturalPortalStat[];
  quiet?: boolean;
}

export function CulturalPortalStatsBar({ stats, quiet = false }: CulturalPortalStatsBarProps) {
  const visible = stats.filter((stat) => stat.label.trim().length > 0);
  if (visible.length === 0) {
    return null;
  }

  return (
    <div className={quiet ? 'stats-bar stats-bar--quiet' : 'stats-bar'}>
      {visible.map((stat, index) => (
        <div key={`${stat.label}-${index}`} className="stat-item reveal">
          <div className="stat-num">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
