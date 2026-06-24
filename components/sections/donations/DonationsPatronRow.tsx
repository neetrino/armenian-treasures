import type { DonationsPatronTier } from '@/lib/constants/home-donations-section';
import { DonationsPatronIcon } from '@/components/sections/donations/DonationsPatronIcon';

interface DonationsPatronRowProps {
  patron: DonationsPatronTier;
}

export function DonationsPatronRow({ patron }: DonationsPatronRowProps) {
  return (
    <div className="donations-patron-row">
      <div className="donations-patron-row__lead">
        <DonationsPatronIcon type={patron.icon} />
        <span className="heritage-cta-clip inline-flex h-[22px] shrink-0 items-center border border-[rgba(214,184,90,0.24)] bg-[rgba(214,184,90,0.055)] px-3.5 font-cinzel text-[8px] font-extrabold uppercase tracking-[0.2em] text-heritage-gold sm:text-[9px]">
          {patron.label}
        </span>
      </div>

      <p className="donations-patron-row__description font-display text-[clamp(0.8125rem,0.9vw,0.9375rem)] leading-[1.55] text-[rgba(232,216,155,0.58)]">
        {patron.description}
      </p>
    </div>
  );
}
