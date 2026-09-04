import Link from 'next/link';
import type { MemberDonationRecord } from '@/lib/queries/member-donations';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage, type UiMessageKey } from '@/lib/i18n/ui-messages';

interface MemberDonationHistoryProps {
  donations: MemberDonationRecord[];
  locale: SiteLocaleCode;
}

const STATUS_MESSAGE_KEYS: Record<MemberDonationRecord['status'], UiMessageKey> = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
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

export function MemberDonationHistory({ donations, locale }: MemberDonationHistoryProps) {
  if (donations.length === 0) {
    return (
      <div className="auth-donation-empty">
        <p className="auth-donation-empty__title">{uiMessage(locale, 'noDonationsYet')}</p>
        <p className="auth-donation-empty__body">
          {uiMessage(locale, 'donationHistoryLead')}
        </p>
        <Link href="/donate" className="auth-form-link auth-donation-empty__link">
          {uiMessage(locale, 'exploreDonationTiers')}
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
                {uiMessage(locale, STATUS_MESSAGE_KEYS[donation.status])}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
