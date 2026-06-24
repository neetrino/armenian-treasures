type IconProps = { className?: string; color?: string };

export function FeatureCheckIcon({ color = '#C9A84C' }: IconProps) {
  return (
    <svg className="feat-check" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <circle cx="6.5" cy="6.5" r="5.5" stroke={color} strokeWidth="1" />
      <path d="M4 6.5l1.7 1.7L9.5 5" stroke={color} strokeWidth="1.1" />
    </svg>
  );
}

export function FeatureLockedIcon() {
  return (
    <svg className="feat-check" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <circle cx="6.5" cy="6.5" r="5.5" stroke="#5A504A" strokeWidth="1" />
      <line x1="4" y1="4" x2="9" y2="9" stroke="#5A504A" strokeWidth="1.1" />
      <line x1="9" y1="4" x2="4" y2="9" stroke="#5A504A" strokeWidth="1.1" />
    </svg>
  );
}

export function ToastCheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <circle cx="6.5" cy="6.5" r="5.5" stroke="#2ABFBF" strokeWidth="1.2" />
      <path d="M4 6.5l1.7 1.7L9.5 5" stroke="#2ABFBF" strokeWidth="1.3" />
    </svg>
  );
}

export function NarrativeOrnamentIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="21" y="3" width="6" height="42" fill="var(--gold)" opacity="0.45" />
      <rect x="3" y="21" width="42" height="6" fill="var(--gold)" opacity="0.45" />
      <rect x="14" y="14" width="20" height="20" fill="var(--gold)" opacity="0.12" />
      <circle cx="24" cy="24" r="8" stroke="var(--teal)" strokeWidth="1.1" fill="none" />
      <circle cx="24" cy="24" r="2.5" fill="var(--gold)" opacity="0.7" />
    </svg>
  );
}

export function HeroBadgeClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1" />
      <path d="M5.5 2.5v3l2 1.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function HeroBadgeStarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path
        d="M5.5 1 L7 4.5H10L7.5 6.5L8.5 10L5.5 8L2.5 10L3.5 6.5L1 4.5H4Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export function HeroBadgeCheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1" />
      <path d="M3.5 5.5l1.5 1.5L7.5 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function WallTierIcon({ tier }: { tier: 'gold' | 'silver' | 'bronze' }) {
  if (tier === 'gold') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden style={{ opacity: 0.35, flexShrink: 0 }}>
        <path d="M12 2L20 6v8L12 18 4 14V6z" stroke="#C9A84C" strokeWidth="1.2" />
      </svg>
    );
  }
  if (tier === 'silver') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden style={{ opacity: 0.28, flexShrink: 0 }}>
        <circle cx="12" cy="12" r="9" stroke="#ADADAD" strokeWidth="1.2" />
        <path d="M12 7v5l3 2" stroke="#ADADAD" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden style={{ opacity: 0.25, flexShrink: 0 }}>
      <path d="M12 3c-4 3.5-7 7-7 10.5a7 7 0 0 0 14 0C19 10 16 6.5 12 3z" stroke="#C47A38" strokeWidth="1.2" />
    </svg>
  );
}
