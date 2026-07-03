import { formatUsd } from '@/components/project-portal/format-usd';
import { clamp } from '@/lib/utils';

interface ProjectFundingRangeProps {
  raisedUsd: number;
  goalUsd: number;
}

export function ProjectFundingRange({ raisedUsd, goalUsd }: ProjectFundingRangeProps) {
  const percent = goalUsd > 0 ? clamp(Math.round((raisedUsd / goalUsd) * 100), 0, 100) : 0;

  return (
    <div
      className="proj-funding"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${formatUsd(raisedUsd)} raised of ${formatUsd(goalUsd)} goal`}
    >
      <div className="proj-funding-meta">
        <span className="proj-funding-raised">
          <span className="proj-funding-raised-value">{formatUsd(raisedUsd)}</span>
          {' raised'}
        </span>
        <span className="proj-funding-percent">{percent}%</span>
      </div>

      <div className="proj-funding-track">
        <div className="proj-funding-fill" style={{ width: `${percent}%` }} />
        <span className="proj-funding-thumb" style={{ left: `${percent}%` }} aria-hidden />
      </div>

      <div className="proj-funding-goal">Goal: {formatUsd(goalUsd)}</div>
    </div>
  );
}
