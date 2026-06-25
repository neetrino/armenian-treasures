import Link from 'next/link';
import type { DonationsPatronGroup } from '@/lib/mappers/donations-patrons';

interface CulturalPortalDonorsProps {
  eyebrow: string;
  title: string;
  description: string;
  groups: DonationsPatronGroup[];
  ctaHref: string;
  ctaLabel: string;
}

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

const ICON_STROKE: Record<string, string> = {
  gold: 'var(--gold)',
  silver: '#B0B0B0',
  bronze: '#CD7F32',
};

export function CulturalPortalDonors({
  eyebrow,
  title,
  description,
  groups,
  ctaHref,
  ctaLabel,
}: CulturalPortalDonorsProps) {
  return (
    <section id="donors">
      <p className="sec-label">{eyebrow}</p>
      <h2 className="sec-title">{title}</h2>
      <p className="sec-desc">{description}</p>
      {groups.length === 0 ? (
        <p className="sec-desc">Public patrons will appear here once published in the admin panel.</p>
      ) : (
        <div className="donor-list">
          {groups.map((tier) => (
            <div key={tier.id} className="donor-row reveal">
              <DonorTierIcon stroke={ICON_STROKE[tier.icon] ?? '#CD7F32'} />
              <div className={`donor-badge badge-${tier.icon}`}>{tier.label}</div>
              <div className="donor-names">{tier.description}</div>
            </div>
          ))}
        </div>
      )}
      <div className="section-cta">
        <Link href={ctaHref} className="btn-gold">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
