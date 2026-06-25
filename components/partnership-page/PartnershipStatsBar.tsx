import { getPartnershipPageContent } from '@/lib/queries/page-content';

export async function PartnershipStatsBar() {
  const { stats } = await getPartnershipPageContent();

  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item reveal">
          <div className="stat-num">{stat.num}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
