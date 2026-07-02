'use client';

import { useEffect, useRef, useState } from 'react';
import {
  DONATION_CHECKOUT_ENABLED,
  DONATION_CHECKOUT_UNAVAILABLE,
  type DonationImpactRange,
  type DonationTier,
} from '@/lib/constants/donation-page';
import type { DonationPageContent } from '@/lib/queries/page-content';
import { DonationPatronSlider } from '@/components/donation-page/DonationPatronSlider';
import { DonationTierCards } from '@/components/donation-page/DonationTierCards';
import { PATRON_DEFAULT, clampPatronAmount } from '@/components/donation-page/donation-utils';

type BillingMode = 'monthly' | 'annual';

type DonationEngineProps = {
  engine: DonationPageContent['page']['engine'];
  tiers: DonationTier[];
  impactRanges: DonationImpactRange[];
  patronSliderTicks: readonly number[];
  patronQuickChips: readonly number[];
};

export function DonationEngine({
  engine,
  tiers,
  impactRanges,
  patronSliderTicks,
  patronQuickChips,
}: DonationEngineProps) {
  const patronCardRef = useRef<HTMLDivElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  const [billing, setBilling] = useState<BillingMode>('monthly');
  const [selectedId, setSelectedId] = useState<DonationTier['id'] | null>(null);
  const [sliderVal, setSliderVal] = useState(PATRON_DEFAULT);
  const [inputNudge, setInputNudge] = useState(false);

  const checkoutEnabled = DONATION_CHECKOUT_ENABLED;
  const unavailable = DONATION_CHECKOUT_UNAVAILABLE;

  useEffect(() => {
    const page = document.querySelector('.khndzoresk-page');
    page?.classList.toggle('donation-annual-mode', billing === 'annual');
    return () => page?.classList.remove('donation-annual-mode');
  }, [billing]);

  function scrollToPatron() {
    setSelectedId('custom');
    patronCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => customInputRef.current?.focus(), 600);
  }

  function handleCustomBlur(value: string) {
    const parsed = parseInt(value, 10);
    if (!Number.isNaN(parsed) && parsed > 0 && parsed < 1000) {
      setInputNudge(true);
      window.setTimeout(() => setInputNudge(false), 2000);
    }
  }

  return (
    <>
      <section className="sec" id="give" aria-label="Choose your patronage level">
        <div className="reveal">
          <p className="sec-label">{engine.label}</p>
          <h2 className="sec-title">{engine.title}</h2>
          <p className="sec-desc">{engine.description}</p>
        </div>

        {!checkoutEnabled ? (
          <div className="donation-checkout-notice reveal" role="status">
            <p className="donation-checkout-notice__title">{unavailable.noticeTitle}</p>
            <p className="donation-checkout-notice__body">{unavailable.noticeBody}</p>
          </div>
        ) : null}

        <div style={{ marginTop: 38 }} className="reveal">
          <div className="freq-toggle" role="group" aria-label="Billing frequency">
            <button
              type="button"
              className={`freq-btn${billing === 'monthly' ? ' on' : ''}`}
              aria-pressed={billing === 'monthly'}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`freq-btn${billing === 'annual' ? ' on' : ''}`}
              aria-pressed={billing === 'annual'}
              onClick={() => setBilling('annual')}
            >
              Annual{' '}
              <span style={{ fontSize: '8.5px', opacity: 0.7, marginLeft: 3 }}>— Save 17%</span>
            </button>
          </div>
        </div>

        <DonationTierCards
          tiers={tiers}
          billing={billing}
          selectedId={selectedId}
          checkoutEnabled={checkoutEnabled}
          onSelect={setSelectedId}
          onScrollToPatron={scrollToPatron}
        />

        <DonationPatronSlider
          cardRef={patronCardRef}
          inputRef={customInputRef}
          sliderVal={sliderVal}
          inputNudge={inputNudge}
          impactRanges={impactRanges}
          patronSliderTicks={patronSliderTicks}
          patronQuickChips={patronQuickChips}
          checkoutEnabled={checkoutEnabled}
          onSliderChange={(value) => setSliderVal(clampPatronAmount(value))}
          onCustomBlur={handleCustomBlur}
        />
      </section>
    </>
  );
}
