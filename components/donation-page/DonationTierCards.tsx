import { KeyboardEvent } from 'react';
import {
  DONATION_CHECKOUT_UNAVAILABLE,
  type DonationTier,
  type DonationTierId,
} from '@/lib/constants/donation-page';
import { FeatureCheckIcon, FeatureLockedIcon } from '@/components/donation-page/donation-icons';
import { TierIcon } from '@/components/donation-page/TierIcon';
import { formatAmd } from '@/components/donation-page/donation-utils';

type DonationTierCardsProps = {
  tiers: DonationTier[];
  billing: 'monthly' | 'annual';
  selectedId: DonationTierId | null;
  checkoutEnabled: boolean;
  onSelect: (tierId: DonationTierId) => void;
  onScrollToPatron: () => void;
};

export function DonationTierCards({
  tiers,
  billing,
  selectedId,
  checkoutEnabled,
  onSelect,
  onScrollToPatron,
}: DonationTierCardsProps) {
  const isAnnual = billing === 'annual';
  const unavailable = DONATION_CHECKOUT_UNAVAILABLE;

  function handleKeyDown(event: KeyboardEvent, tierId: DonationTierId) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (tierId === 'custom') {
      onScrollToPatron();
      return;
    }
    onSelect(tierId);
  }

  return (
    <div className="donation-tiers reveal" role="radiogroup" aria-label="Patronage tiers">
      {tiers.map((tier) => {
        const checkColor = tier.primary ? '#2ABFBF' : '#C9A84C';
        const displayAmount = tier.customPrice ? null : isAnnual ? tier.annualAmd : tier.monthlyAmd;
        const isPaidTier = tier.id !== 'custom';
        const paymentDisabled = !checkoutEnabled && isPaidTier;

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
            onKeyDown={(event) => handleKeyDown(event, tier.id)}
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
              className={`tier-cta cta-${tier.ctaVariant}${paymentDisabled ? ' checkout-disabled' : ''}`}
              disabled={paymentDisabled}
              aria-disabled={paymentDisabled}
              onClick={(event) => {
                event.stopPropagation();
                if (tier.id === 'custom') {
                  onScrollToPatron();
                  return;
                }
                if (!paymentDisabled) onSelect(tier.id);
              }}
            >
              {paymentDisabled ? unavailable.tierCtaLabel : tier.ctaLabel}
            </button>
            <p className="cta-post">{paymentDisabled ? unavailable.tierCtaPost : tier.ctaPost}</p>
          </article>
        );
      })}
    </div>
  );
}
