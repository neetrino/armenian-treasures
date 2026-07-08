'use client';

import { useState } from 'react';
import {
  DONATION_CHECKOUT_ENABLED,
  DONATION_CHECKOUT_UNAVAILABLE,
  DONATION_PAGE,
  type DonationImpactRange,
  type DonationTier,
} from '@/lib/constants/donation-page';
import type { DonationPageContent } from '@/lib/queries/page-content';
import { DonationTierCards } from '@/components/donation-page/DonationTierCards';
import { DonationCertificateBlock } from '@/components/donation-page/DonationCertificateBlock';

type DonationEngineProps = {
  engine: DonationPageContent['page']['engine'];
  tiers: DonationTier[];
  impactRanges: DonationImpactRange[];
  patronSliderTicks: readonly number[];
  patronQuickChips: readonly number[];
};

export function DonationEngine({ engine, tiers }: DonationEngineProps) {
  const [selectedId, setSelectedId] = useState<DonationTier['id'] | null>(null);
  const checkoutEnabled = DONATION_CHECKOUT_ENABLED;
  const unavailable = DONATION_CHECKOUT_UNAVAILABLE;
  const certificates = DONATION_PAGE.certificates;

  return (
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

      <DonationTierCards
        tiers={tiers}
        selectedId={selectedId}
        checkoutEnabled={checkoutEnabled}
        onSelect={setSelectedId}
      />

      <DonationCertificateBlock
        certificates={certificates}
        selectedTierId={selectedId}
      />
    </section>
  );
}
