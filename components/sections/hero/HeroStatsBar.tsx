import { StatsBar, type StatItem } from '@/components/ui/StatsBar';

export type { StatItem as HomeStat };

interface HeroStatsBarProps {
  stats: StatItem[];
}

export function HeroStatsBar({ stats }: HeroStatsBarProps) {
  return (
    <StatsBar
      stats={stats}
      aria-label="Archive statistics"
    />
  );
}
