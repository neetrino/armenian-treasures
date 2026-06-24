import Link from 'next/link';
import { CULTURAL_PORTAL_DONORS } from '@/lib/constants/cultural-portal-page';

function DonorTierIcon({ stroke }: { stroke: string }) {
  if (stroke === 'var(--gold)') {
    return (
      <svg className="donor-icon" viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="1.4" aria-hidden>
        <path d="M16 3l2.5 7.5H26l-6 4.5 2.5 7.5L16 18l-6.5 4.5 2.5-7.5-6-4.5h7.5z" />
      </svg>
    );
  }

  if (stroke === '#B0B0B0') {
    return (
      <svg className="donor-icon" viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="1.4" aria-hidden>
        <circle cx="16" cy="16" r="11" />
        <path d="M16 9v7l5 3" />
      </svg>
    );
  }

  return (
    <svg className="donor-icon" viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="1.4" aria-hidden>
      <path d="M16 4c-5 4-9 8-9 13a9 9 0 0018 0c0-5-4-9-9-13z" />
    </svg>
  );
}

export function CulturalPortalDonors() {
  const donors = CULTURAL_PORTAL_DONORS;

  return (
    <section id="donors">
      <p className="sec-label">{donors.eyebrow}</p>
      <h2 className="sec-title">{donors.title}</h2>
      <p className="sec-desc">{donors.description}</p>
      <div className="donor-list">
        {donors.tiers.map((tier) => (
          <div key={tier.badge} className="donor-row reveal">
            <DonorTierIcon stroke={tier.iconStroke} />
            <div className={`donor-badge ${tier.badgeClass}`}>{tier.badge}</div>
            <div className="donor-names">{tier.names}</div>
          </div>
        ))}
      </div>
      <div className="section-cta">
        <Link href={donors.ctaHref} className="btn-gold">
          {donors.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
