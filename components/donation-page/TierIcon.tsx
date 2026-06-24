import type { DonationTierId } from '@/lib/constants/donation-page';

export function TierIcon({ tierId }: { tierId: DonationTierId }) {
  if (tierId === '1000') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <polygon points="9,1.5 16.5,5.5 16.5,12.5 9,16.5 1.5,12.5 1.5,5.5" stroke="#2ABFBF" strokeWidth="1.1" />
        <circle cx="9" cy="9" r="3" stroke="#2ABFBF" strokeWidth="1.1" />
        <circle cx="9" cy="9" r="1" fill="#2ABFBF" />
      </svg>
    );
  }
  if (tierId === 'custom') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M9 2c-3 2.5-6 5-6 8.5a6 6 0 0 0 12 0C15 7 12 4.5 9 2z" stroke="#C9A84C" strokeWidth="1.1" />
        <circle cx="9" cy="11" r="2" stroke="#C9A84C" strokeWidth="1.1" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7" stroke="#C9A84C" strokeWidth="1.1" />
      <path d="M9 4.5v4.5l3 2" stroke="#C9A84C" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
