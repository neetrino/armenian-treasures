import { DONATION_LEDGER, DONATION_PAGE } from '@/lib/constants/donation-page';

export function DonationLedger() {
  const { ledger } = DONATION_PAGE;

  return (
    <div className="sec" aria-label="Where your patronage goes">
      <div className="reveal">
        <p className="sec-label">{ledger.label}</p>
        <h2 className="sec-title">{ledger.title}</h2>
        <p className="sec-desc">{ledger.description}</p>
      </div>
      <div className="ledger reveal" role="list">
        {DONATION_LEDGER.map((item) => (
          <div key={item.label} className="ledger-item" role="listitem">
            <div className="ledger-val">{item.value}</div>
            <div className="ledger-lab">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
