export function SvgDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <radialGradient id="gC" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity=".25" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function GayaneIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5" />
      <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".35;.65;.35" dur="3s" repeatCount="indefinite" /></circle>
      <rect x="20" y="28" width="9" height="32" rx="4" transform="rotate(-35 20 28)" stroke="#C9A84C" strokeWidth="1.2" fill="#1A1206" />
      <ellipse cx="49" cy="52" rx="6" ry="4" transform="rotate(-35 49 52)" stroke="#C9A84C" strokeWidth="1" fill="#1A1206" />
      <circle cx="58" cy="20" r="5" stroke="#C9A84C" strokeWidth="1" fill="#1A1206" />
      <path d="M58 25 L55 40 L58 38 L61 40 L58 25" stroke="#C9A84C" strokeWidth="1" fill="#1A1206" />
    </svg>
  );
}

export function SpartacusIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5" />
      <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".3;.62;.3" dur="2.8s" repeatCount="indefinite" /></circle>
      <path d="M36 12 L38 46 L36 50 L34 46 Z" stroke="#C9A84C" strokeWidth="1.1" fill="#1A1206" />
      <rect x="22" y="44" width="28" height="4" rx="2" stroke="#C9A84C" strokeWidth="1.2" fill="#1A1206" />
      <rect x="33" y="48" width="6" height="12" rx="1" stroke="#C9A84C" strokeWidth="1" fill="#1A1206" />
    </svg>
  );
}

export function MasqueradeIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5" />
      <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".28;.6;.28" dur="3.5s" repeatCount="indefinite" /></circle>
      <ellipse cx="28" cy="32" rx="10" ry="12" stroke="#C9A84C" strokeWidth="1.1" fill="#140F04" />
      <ellipse cx="46" cy="36" rx="10" ry="12" stroke="#C9A84C" strokeWidth="1.1" fill="#140F04" />
    </svg>
  );
}

export function ViolinIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5" />
      <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".3;.65;.3" dur="2.5s" repeatCount="indefinite" /></circle>
      <path d="M36 14 C32 18 28 22 28 28 C28 34 32 36 36 40 C40 44 44 46 44 52 C44 58 40 60 36 60 C32 60 28 58 28 52" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
      <ellipse cx="36" cy="28" rx="6" ry="8" stroke="#C9A84C" strokeWidth="1" fill="#1A1206" />
      <ellipse cx="36" cy="52" rx="8" ry="6" stroke="#C9A84C" strokeWidth="1" fill="#1A1206" />
    </svg>
  );
}

export function SymphoniesIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5" />
      <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".28;.6;.28" dur="4s" repeatCount="indefinite" /></circle>
      <circle cx="36" cy="36" r="20" stroke="#C9A84C" strokeWidth="1.2" fill="#120D04" />
      <line x1="36" y1="36" x2="36" y2="22" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 36 36" to="360 36 36" dur="60s" repeatCount="indefinite" />
      </line>
      <circle cx="36" cy="36" r="2" fill="#C9A84C" />
    </svg>
  );
}

export function FilmMusicIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5" />
      <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".28;.58;.28" dur="3.4s" repeatCount="indefinite" /></circle>
      <rect x="14" y="20" width="44" height="28" rx="2" stroke="#C9A84C" strokeWidth="1.2" fill="#140F04" />
      <rect x="17" y="28" width="14" height="11" stroke="#C9A84C" strokeWidth=".8" fill="#0E0A04" />
      <rect x="41" y="28" width="14" height="11" stroke="#C9A84C" strokeWidth=".8" fill="#0E0A04" />
    </svg>
  );
}
