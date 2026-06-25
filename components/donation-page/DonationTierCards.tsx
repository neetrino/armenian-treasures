import { KeyboardEvent } from 'react';
import type { DonationTier, DonationTierId } from '@/lib/constants/donation-page';
import { FeatureCheckIcon, FeatureLockedIcon } from '@/components/donation-page/donation-icons';
import { TierIcon } from '@/components/donation-page/TierIcon';
import { formatAmd } from '@/components/donation-page/donation-utils';

type DonationTierCardsProps = {
  tiers: DonationTier[];
  billing: 'monthly' | 'annual';
  selectedId: DonationTierId | null;
  onSelect: (tierId: DonationTierId) => void;
  onScrollToPatron: () => void;
  onConfirmTier: (tierId: DonationTierId, name: string, monthlyAmd: number) => void;
};

export function DonationTierCards({
  tiers,
  billing,
  selectedId,
  onSelect,
  onScrollToPatron,
  onConfirmTier,
}: DonationTierCardsProps) {
  const isAnnual = billing === 'annual';

  function handleKeyDown(
    event: KeyboardEvent,
    tierId: DonationTierId,
    monthlyAmd?: number,
    name?: string,
  ) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (tierId === 'custom') {
      onScrollToPatron();
      return;
    }
    if (monthlyAmd && name) onConfirmTier(tierId, name, monthlyAmd);
  }

  return (
    <div className="donation-tiers reveal" role="radiogroup" aria-label="Patronage tiers">
      {tiers.map((tier) => {
        const checkColor = tier.primary ? '#2ABFBF' : '#C9A84C';
        const displayAmount = tier.customPrice ? null : isAnnual ? tier.annualAmd : tier.monthlyAmd;

        return (
          <article
            key={tier.id}
            className={['tier-card', tier.primary ? 'primary' : '', selectedId === tier.id ? 'selected' : '']
              .filter(Boolean)
              .join(' ')}
            tabIndex={0}
            role="radio"
            aria-checked={selectedId === tier.id}
            onClick={() => (tier.id === 'custom' ? onScrollToPatron() : onSelect(tier.id))}
            onKeyDown={(event) => handleKeyDown(event, tier.id, tier.monthlyAmd ?? undefined, tier.label)}
          >
            {tier.recommended ? (
              <>
                <div className="shimmer" aria-hidden />
                <div className="badge-rec">Most Chosen</div>
              </>
            ) : null}
            <div className="tier-icon" aria-hidden>
              <TierIcon tierId={tier.id} />
            </div>
            <div className="tier-label">{tier.label}</div>
            <div className="tier-price">
              {tier.customPrice ? (
                <span className="price-main custom">
                  You
                  <br />
                  Decide
                </span>
              ) : (
                <>
                  <span className="price-main">{formatAmd(displayAmount ?? 0)}</span>
                  <span className="price-curr">AMD</span>
                </>
              )}
            </div>
            <div className="price-period">{tier.customPrice ? 'your own amount' : isAnnual ? '/ year' : '/ month'}</div>
            {!tier.customPrice && tier.annualAmd ? (
              <div className="price-annual" aria-live="polite">
                ↳ {formatAmd(tier.annualAmd)} AMD billed annually
              </div>
            ) : (
              <div className="price-annual" aria-hidden>
                —
              </div>
            )}
            <div className="tier-divider" aria-hidden />
            <ul className="feat-list" aria-label={`${tier.label} tier features`}>
              {tier.features.map((feature) => (
                <li
                  key={feature.text}
                  className={`feat-item${feature.included ? '' : ' locked'}`}
                  aria-label={feature.lockedLabel}
                >
                  {feature.included ? <FeatureCheckIcon color={checkColor} /> : <FeatureLockedIcon />}
                  {feature.text}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`tier-cta cta-${tier.ctaVariant}`}
              onClick={(event) => {
                event.stopPropagation();
                if (tier.id === 'custom') {
                  onScrollToPatron();
                  return;
                }
                if (tier.monthlyAmd) onConfirmTier(tier.id, tier.label, tier.monthlyAmd);
              }}
            >
              {tier.ctaLabel}
            </button>
            <p className="cta-post">{tier.ctaPost}</p>
          </article>
        );
      })}
    </div>
  );
}
