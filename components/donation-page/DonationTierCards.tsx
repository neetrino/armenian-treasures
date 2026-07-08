import { KeyboardEvent } from 'react';
import {
  DONATION_CHECKOUT_UNAVAILABLE,
  type DonationTier,
  type DonationTierId,
} from '@/lib/constants/donation-page';
import { TierIcon } from '@/components/donation-page/TierIcon';
import { formatAmd, getTierAmountAmd } from '@/components/donation-page/donation-utils';

type DonationTierCardsProps = {
  tiers: DonationTier[];
  selectedId: DonationTierId | null;
  checkoutEnabled: boolean;
  onSelect: (tierId: DonationTierId) => void;
};

export function DonationTierCards({
  tiers,
  selectedId,
  checkoutEnabled,
  onSelect,
}: DonationTierCardsProps) {
  const unavailable = DONATION_CHECKOUT_UNAVAILABLE;

  function handleKeyDown(event: KeyboardEvent, tierId: DonationTierId) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onSelect(tierId);
  }

  return (
    <div className="donation-tiers reveal" role="radiogroup" aria-label="Patronage tiers">
      {tiers.map((tier) => {
        const paymentDisabled = !checkoutEnabled;
        const amount = getTierAmountAmd(tier);

        return (
          <article
            key={tier.id}
            className={['tier-card', 'tier-card--amount-only', tier.primary ? 'primary' : '', selectedId === tier.id ? 'selected' : '']
              .filter(Boolean)
              .join(' ')}
            tabIndex={0}
            role="radio"
            aria-checked={selectedId === tier.id}
            onClick={() => onSelect(tier.id)}
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
              <span className="price-main">{formatAmd(amount)}</span>
              <span className="price-curr">AMD</span>
            </div>
            <button
              type="button"
              className={`tier-cta cta-${tier.ctaVariant}${paymentDisabled ? ' checkout-disabled' : ''}`}
              disabled={paymentDisabled}
              aria-disabled={paymentDisabled}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(tier.id);
              }}
            >
              {paymentDisabled ? unavailable.tierCtaLabel : tier.ctaLabel}
            </button>
            {paymentDisabled ? (
              <p className="cta-post">{unavailable.tierCtaPost}</p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
