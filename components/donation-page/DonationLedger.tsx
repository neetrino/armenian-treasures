import type { DonationLedgerItem } from '@/lib/constants/donation-page';
import { hasNonEmptyArray } from '@/lib/landing/landing-section-utils';
import type { DonationPageContent } from '@/lib/queries/page-content';

type DonationLedgerProps = {
  ledger: DonationPageContent['page']['ledger'];
  items: DonationLedgerItem[];
};

export function DonationLedger({ ledger, items }: DonationLedgerProps) {
  if (!hasNonEmptyArray(items)) {
    return null;
  }

  return (
    <div className="sec" aria-label="Where your patronage goes">
      <div className="reveal">
        <p className="sec-label">{ledger.label}</p>
        <h2 className="sec-title">{ledger.title}</h2>
        <p className="sec-desc">{ledger.description}</p>
      </div>
      <div className="ledger reveal" role="list">
        {items.map((item) => (
          <div key={item.label} className="ledger-item" role="listitem">
            <div className="ledger-val">{item.value}</div>
            <div className="ledger-lab">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
