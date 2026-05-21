import { Badge } from './Badge';

type Status =
  | 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  | 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED'
  | 'NEW' | 'READ' | 'REPLIED'
  | 'UPCOMING' | 'ACTIVE' | 'FUNDED' | 'COMPLETED';

const TONE_MAP: Record<Status, 'amber' | 'green' | 'stone' | 'red' | 'bronze' | 'pomegranate' | 'midnight'> = {
  DRAFT: 'amber',
  PUBLISHED: 'green',
  ARCHIVED: 'stone',
  PENDING: 'amber',
  REVIEWING: 'bronze',
  APPROVED: 'green',
  REJECTED: 'red',
  NEW: 'pomegranate',
  READ: 'midnight',
  REPLIED: 'green',
  UPCOMING: 'bronze',
  ACTIVE: 'green',
  FUNDED: 'pomegranate',
  COMPLETED: 'midnight',
};

interface StatusPillProps {
  status: Status;
  className?: string;
}

export function StatusPill({ status, className }: StatusPillProps) {
  return (
    <Badge tone={TONE_MAP[status]} className={className}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}
