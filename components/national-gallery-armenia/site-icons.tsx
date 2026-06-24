export function SvgDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <radialGradient id="ngaGC" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity=".25" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
        <filter id="ngaFglow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function IconRing() {
  return (
    <>
      <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5" />
      <circle cx="36" cy="36" r="33" fill="url(#ngaGC)">
        <animate attributeName="opacity" values=".35;.65;.35" dur="3s" repeatCount="indefinite" />
      </circle>
    </>
  );
}

export function ArmenianPaintingIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <IconRing />
      <rect x="14" y="16" width="44" height="34" rx="1" stroke="#C9A84C" strokeWidth="1.2" fill="#140F04" filter="url(#ngaFglow)" />
      <path d="M16 38 L24 26 L32 34 L40 22 L56 38" stroke="#C9A84C" strokeWidth="1" fill="none" />
      <circle cx="42" cy="20" r="3" stroke="#C9A84C" strokeWidth=".8" fill="none" opacity=".7" />
      <circle cx="52" cy="38" r="4" stroke="#C9A84C" strokeWidth=".9" fill="#140F04" />
      <rect x="20" y="44" width="32" height="4" rx="1" stroke="#C9A84C" strokeWidth=".8" fill="#1A1206" />
    </svg>
  );
}

export function AivazovskyCollectionIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <IconRing />
      <path d="M10 42 Q18 30 28 38 Q36 44 44 32 Q52 20 62 34" stroke="#C9A84C" strokeWidth="1.3" fill="none" />
      <path d="M10 48 Q18 36 28 44 Q36 50 44 38 Q52 26 62 40" stroke="#C9A84C" strokeWidth=".8" fill="none" opacity=".5" />
      <circle cx="48" cy="18" r="6" fill="#C9A84C" opacity=".15" />
      <circle cx="48" cy="18" r="3" fill="#E8D5A3" opacity=".5" />
    </svg>
  );
}

export function EuropeanArtIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <IconRing />
      <circle cx="36" cy="36" r="22" stroke="#C9A84C" strokeWidth=".8" strokeDasharray="4 3" fill="none" opacity=".5" />
      <circle cx="36" cy="36" r="12" stroke="#C9A84C" strokeWidth="1" fill="#140F04" />
      <circle cx="36" cy="36" r="5" stroke="#C9A84C" strokeWidth="1.2" fill="#C9A84C" opacity=".25" />
      <circle cx="36" cy="36" r="2.5" fill="#C9A84C" />
      <circle cx="36" cy="14" r="2.5" fill="#2ABFBF" />
    </svg>
  );
}

export function GraphicsIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <IconRing />
      <rect x="16" y="14" width="40" height="44" rx="1" stroke="#C9A84C" strokeWidth="1.2" fill="#140F04" />
      <path d="M20 42 L28 30 L36 38 L44 26 L52 34" stroke="#C9A84C" strokeWidth="1" fill="none" />
      <line x1="20" y1="50" x2="52" y2="50" stroke="#C9A84C" strokeWidth=".8" opacity=".6" />
      <line x1="20" y1="54" x2="44" y2="54" stroke="#C9A84C" strokeWidth=".6" opacity=".4" />
    </svg>
  );
}

export function SculptureIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <IconRing />
      <ellipse cx="36" cy="18" rx="8" ry="10" stroke="#C9A84C" strokeWidth="1.2" fill="#140F04" />
      <path d="M28 28 Q36 32 44 28 L42 52 Q36 56 30 52 Z" stroke="#C9A84C" strokeWidth="1.2" fill="#1A1206" />
      <rect x="24" y="52" width="24" height="6" rx="1" stroke="#C9A84C" strokeWidth=".8" fill="#140F04" />
    </svg>
  );
}

export function DecorativeArtIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <IconRing />
      <rect x="14" y="16" width="44" height="40" rx="1" stroke="#C9A84C" strokeWidth="1.2" fill="#1A1206" />
      <rect x="18" y="20" width="36" height="32" rx=".5" stroke="#C9A84C" strokeWidth=".6" fill="none" opacity=".5" />
      <polygon points="36,26 40,30 44,30 41,34 42,38 36,36 30,38 31,34 28,30 32,30" stroke="#C9A84C" strokeWidth=".9" fill="none" />
      <circle cx="36" cy="32" r="3" stroke="#C9A84C" strokeWidth=".7" fill="none" />
    </svg>
  );
}
