'use client';

import type { DonationTrustItem } from '@/lib/constants/donation-page';

function TrustIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M6.5 1L11 3.5v5L6.5 11 2 8.5v-5z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

type DonationClosingSectionsProps = {
  trustItems: DonationTrustItem[];
};

export function DonationClosingSections({ trustItems }: DonationClosingSectionsProps) {
  return (
    <div className="trust-row reveal" role="list" aria-label="Trust and security signals">
      {trustItems.map((item) => (
        <div key={item.label} className="trust-item" role="listitem">
          <TrustIcon />
          {item.label}
        </div>
      ))}
    </div>
  );
}
