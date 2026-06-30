import Link from 'next/link';
import type { MemberDonationRecord } from '@/lib/queries/member-donations';

interface MemberDonationHistoryProps {
  donations: MemberDonationRecord[];
}

const STATUS_LABELS: Record<MemberDonationRecord['status'], string> = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
};

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value: Date | string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function MemberDonationHistory({ donations }: MemberDonationHistoryProps) {
  if (donations.length === 0) {
    return (
      <div className="auth-donation-empty">
        <p className="auth-donation-empty__title">No donations yet</p>
        <p className="auth-donation-empty__body">
          When you support the foundation, your patronage history will appear here.
        </p>
        <Link href="/donate" className="auth-form-link auth-donation-empty__link">
          Explore donation tiers →
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-donation-history">
      <ul className="auth-donation-list">
        {donations.map((donation) => (
          <li key={donation.id} className="auth-donation-item">
            <div className="auth-donation-item__main">
              <p className="auth-donation-item__label">{donation.label}</p>
              <p className="auth-donation-item__date">{formatDate(donation.createdAt)}</p>
            </div>
            <div className="auth-donation-item__meta">
              <p className="auth-donation-item__amount">
                {formatAmount(donation.amount, donation.currency)}
              </p>
              <span className={`auth-donation-status auth-donation-status--${donation.status.toLowerCase()}`}>
                {STATUS_LABELS[donation.status]}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
