import { RefObject } from 'react';
import { PATRON_QUICK_CHIPS, PATRON_SLIDER_TICKS } from '@/lib/constants/donation-page';
import { PATRON_MAX, PATRON_MIN, formatAmd, getImpactText, logFill } from '@/components/donation-page/donation-utils';

const TICK_LABELS = ['500', '1K', '1.5K', '5K', '10K', '25K', '50K'] as const;

type DonationPatronSliderProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  sliderVal: number;
  inputNudge: boolean;
  onSliderChange: (value: number) => void;
  onCustomBlur: (value: string) => void;
  onConfirm: () => void;
};

export function DonationPatronSlider({
  cardRef,
  inputRef,
  sliderVal,
  inputNudge,
  onSliderChange,
  onCustomBlur,
  onConfirm,
}: DonationPatronSliderProps) {
  const sliderFill = logFill(sliderVal);

  return (
    <div ref={cardRef} className="patron-card reveal" aria-label="Custom monthly contribution">
      <div className="patron-head">
        <div>
          <div className="patron-label">Patron Contribution</div>
          <div className="patron-title">Set Your Monthly Legacy</div>
        </div>
        <div className="impact-block" aria-live="polite" aria-label="Your contribution impact">
          <div className="impact-amd">
            {formatAmd(sliderVal)} <small>AMD</small>
          </div>
          <div className="impact-what">{getImpactText(sliderVal)}</div>
        </div>
      </div>

      <div className="track-wrap">
        <input
          type="range"
          className="patron-slider"
          min={PATRON_MIN}
          max={PATRON_MAX}
          step={100}
          value={sliderVal}
          aria-label="Monthly contribution amount in AMD"
          aria-valuemin={PATRON_MIN}
          aria-valuemax={PATRON_MAX}
          aria-valuenow={sliderVal}
          aria-valuetext={`${formatAmd(sliderVal)} AMD per month`}
          style={{
            background: `linear-gradient(90deg, var(--teal) ${sliderFill}, rgba(255,255,255,.07) ${sliderFill})`,
          }}
          onChange={(event) => onSliderChange(Number(event.target.value))}
        />
        <div className="tick-row" aria-hidden>
          {PATRON_SLIDER_TICKS.map((tick, index) => {
            const passed = tick < sliderVal;
            const lit = Math.abs(tick - sliderVal) < 120;
            return (
              <span
                key={tick}
                className={['tick', passed ? 'passed' : '', lit ? 'lit' : ''].filter(Boolean).join(' ')}
              >
                {TICK_LABELS[index]}
              </span>
            );
          })}
        </div>
      </div>

      <div className="chips" role="group" aria-label="Quick amount selection">
        {PATRON_QUICK_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`chip${sliderVal === chip ? ' on' : ''}`}
            aria-label={`Select ${formatAmd(chip)} AMD`}
            onClick={() => onSliderChange(chip)}
          >
            {formatAmd(chip)} AMD
          </button>
        ))}
      </div>

      <div className="custom-row">
        <div className="custom-field">
          <span className="custom-pre" aria-hidden>
            ֏
          </span>
          <input
            ref={inputRef}
            type="number"
            className="custom-inp"
            placeholder="Type a custom amount"
            min={PATRON_MIN}
            step={100}
            value={sliderVal}
            aria-label="Enter a custom monthly amount in AMD"
            style={inputNudge ? { borderColor: 'rgba(42,191,191,.5)' } : undefined}
            onChange={(event) => {
              const parsed = parseInt(event.target.value, 10);
              if (!Number.isNaN(parsed)) onSliderChange(parsed);
            }}
            onBlur={(event) => onCustomBlur(event.target.value)}
          />
        </div>
        <div className="custom-unit" aria-label="AMD per month">
          AMD / month
        </div>
      </div>

      <div className="patron-cta-row">
        <button type="button" className="patron-cta" onClick={onConfirm}>
          Confirm ֏{formatAmd(sliderVal)} / month
        </button>
        <div className="patron-cta-note">
          Secured by Stripe · Encrypted · Pause or cancel anytime
          <br />A receipt is sent immediately — no follow-up solicitation
        </div>
      </div>
    </div>
  );
}
