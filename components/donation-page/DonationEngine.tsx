'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { DONATION_PAGE, type DonationTierId } from '@/lib/constants/donation-page';
import { NarrativeOrnamentIcon, ToastCheckIcon } from '@/components/donation-page/donation-icons';
import { DonationPatronSlider } from '@/components/donation-page/DonationPatronSlider';
import { DonationTierCards } from '@/components/donation-page/DonationTierCards';
import { PATRON_DEFAULT, clampPatronAmount, formatAmd } from '@/components/donation-page/donation-utils';

type BillingMode = 'monthly' | 'annual';

export function DonationEngine() {
  const { engine } = DONATION_PAGE;
  const patronCardRef = useRef<HTMLDivElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);
  const toastTimerRef = useRef<number | null>(null);

  const [billing, setBilling] = useState<BillingMode>('monthly');
  const [selectedId, setSelectedId] = useState<DonationTierId | null>(null);
  const [sliderVal, setSliderVal] = useState(PATRON_DEFAULT);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [inputNudge, setInputNudge] = useState(false);

  const isAnnual = billing === 'annual';

  const showToast = useCallback((message: string) => {
    setToastMsg(message);
    setToastVisible(true);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastVisible(false), 3400);
  }, []);

  useEffect(() => {
    const page = document.querySelector('.khndzoresk-page');
    page?.classList.toggle('donation-annual-mode', billing === 'annual');
    return () => page?.classList.remove('donation-annual-mode');
  }, [billing]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  function scrollToPatron() {
    setSelectedId('custom');
    patronCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => customInputRef.current?.focus(), 600);
  }

  function confirmTier(tierId: DonationTierId, name: string, monthlyAmd: number) {
    setSelectedId(tierId);
    const period = isAnnual ? '/ year' : '/ month';
    const amount = isAnnual ? `${formatAmd(monthlyAmd * 10)} AMD` : `${formatAmd(monthlyAmd)} AMD`;
    showToast(`${name} · ֏${amount} ${period} — redirecting to checkout`);
  }

  function confirmPatron() {
    setSelectedId('custom');
    showToast(`֏${formatAmd(sliderVal)} / month — redirecting to checkout`);
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
        <div className="narrative-block reveal">
          <div className="narrative-ornament" aria-hidden>
            <NarrativeOrnamentIcon />
          </div>
          {engine.narrative.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="narrative-text">
              {paragraph}
            </p>
          ))}
          <p className="narrative-closing">{engine.narrative.closing}</p>
        </div>

        <div className="reveal">
          <p className="sec-label">{engine.label}</p>
          <h2 className="sec-title">{engine.title}</h2>
          <p className="sec-desc">{engine.description}</p>
        </div>

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
          billing={billing}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onScrollToPatron={scrollToPatron}
          onConfirmTier={confirmTier}
        />

        <DonationPatronSlider
          cardRef={patronCardRef}
          inputRef={customInputRef}
          sliderVal={sliderVal}
          inputNudge={inputNudge}
          onSliderChange={(value) => setSliderVal(clampPatronAmount(value))}
          onCustomBlur={handleCustomBlur}
          onConfirm={confirmPatron}
        />
      </section>

      <div className={`toast${toastVisible ? ' show' : ''}`} role="alert" aria-live="assertive">
        <ToastCheckIcon />
        <span>{toastMsg}</span>
      </div>
    </>
  );
}
