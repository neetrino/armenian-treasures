export function SvgDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <radialGradient id="gC" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity=".25" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
        <filter id="fglow" x="-20%" y="-20%" width="140%" height="140%">
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

export function StHripsimeIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5"/>
        <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".35;.65;.35" dur="3s" repeatCount="indefinite"/></circle>
        <circle cx="36" cy="36" r="30" fill="none" stroke="#C9A84C" strokeWidth=".4" opacity=".3"/>
        <rect x="22" y="38" width="28" height="18" rx="1" stroke="#C9A84C" strokeWidth="1.2" fill="#1A1206" filter="url(#fglow)"/>
        <polygon points="36,20 50,38 22,38" stroke="#C9A84C" strokeWidth="1.2" fill="#1A1206" filter="url(#fglow)"/>
        <line x1="36" y1="12" x2="36" y2="20" stroke="#C9A84C" strokeWidth="1.4"/>
        <line x1="32" y1="15" x2="40" y2="15" stroke="#C9A84C" strokeWidth="1.4"/>
        <path d="M31 56 L31 46 Q36 41 41 46 L41 56" stroke="#C9A84C" strokeWidth="1" fill="#0E0A04"/>
        <rect x="24" y="41" width="6" height="8" rx="3" fill="#C9A84C" opacity=".08"><animate attributeName="opacity" values=".06;.18;.06" dur="2.5s" repeatCount="indefinite"/></rect>
        <rect x="42" y="41" width="6" height="8" rx="3" fill="#C9A84C" opacity=".08"><animate attributeName="opacity" values=".06;.18;.06" dur="2.5s" begin=".8s" repeatCount="indefinite"/></rect>
        <circle cx="36" cy="29" r="1.5" fill="#C9A84C" opacity=".7"/>
      </svg>
  );
}

export function SparapetTombIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5"/>
        <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".3;.6;.3" dur="3.5s" repeatCount="indefinite"/></circle>
        <rect x="16" y="36" width="40" height="20" stroke="#C9A84C" strokeWidth="1.2" fill="#1A1206"/>
        <rect x="16" y="30" width="6" height="8" stroke="#C9A84C" strokeWidth="1" fill="#1A1206"/>
        <rect x="26" y="30" width="6" height="8" stroke="#C9A84C" strokeWidth="1" fill="#1A1206"/>
        <rect x="36" y="30" width="6" height="8" stroke="#C9A84C" strokeWidth="1" fill="#1A1206"/>
        <rect x="46" y="30" width="6" height="8" stroke="#C9A84C" strokeWidth="1" fill="#1A1206"/>
        <rect x="28" y="22" width="16" height="16" stroke="#C9A84C" strokeWidth="1.2" fill="#1A1206"/>
        <rect x="30" y="16" width="4" height="8" stroke="#C9A84C" strokeWidth=".8" fill="#1A1206"/>
        <rect x="38" y="16" width="4" height="8" stroke="#C9A84C" strokeWidth=".8" fill="#1A1206"/>
        <path d="M33 56 L33 47 Q36 43 39 47 L39 56" stroke="#C9A84C" strokeWidth=".9" fill="#0E0A04"/>
        <line x1="36" y1="10" x2="36" y2="16" stroke="#C9A84C" strokeWidth="1"/>
        <polygon points="36,10 43,13 36,16" fill="#C9A84C" opacity=".8"><animate attributeName="points" values="36,10 43,13 36,16;36,10 44,12 36,14;36,10 43,13 36,16" dur="1.5s" repeatCount="indefinite"/></polygon>
      </svg>
  );
}

export function StTatevosIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5"/>
        <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".3;.65;.3" dur="2.8s" repeatCount="indefinite"/></circle>
        <polygon points="36,15 39.5,26.5 51.5,26.5 41.5,33.5 45,45 36,38 27,45 30.5,33.5 20.5,26.5 32.5,26.5" stroke="#C9A84C" strokeWidth="1.2" fill="#1A1206"/>
        <polygon points="36,15 39.5,26.5 51.5,26.5 41.5,33.5 45,45 36,38 27,45 30.5,33.5 20.5,26.5 32.5,26.5" fill="#C9A84C" opacity=".1"><animate attributeName="opacity" values=".08;.22;.08" dur="2s" repeatCount="indefinite"/></polygon>
        <rect x="24" y="47" width="24" height="10" rx="2" stroke="#C9A84C" strokeWidth=".9" fill="#1A1206"/>
        <line x1="28" y1="50" x2="44" y2="50" stroke="#C9A84C" strokeWidth=".6"/>
        <line x1="28" y1="53" x2="40" y2="53" stroke="#C9A84C" strokeWidth=".6"/>
        <circle cx="24" cy="52" r="2" stroke="#C9A84C" strokeWidth=".8" fill="#0E0A04"/>
        <circle cx="48" cy="52" r="2" stroke="#C9A84C" strokeWidth=".8" fill="#0E0A04"/>
      </svg>
  );
}

export function CaveDwellingsIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5"/>
        <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".28;.6;.28" dur="4s" repeatCount="indefinite"/></circle>
        <circle cx="36" cy="36" r="22" stroke="#C9A84C" strokeWidth=".8" strokeDasharray="4 3" fill="none" opacity=".5"><animateTransform attributeName="transform" type="rotate" from="0 36 36" to="360 36 36" dur="18s" repeatCount="indefinite"/></circle>
        <path d="M16 52 Q20 36 36 30 Q52 36 56 52" stroke="#C9A84C" strokeWidth="1.2" fill="#1A1206"/>
        <rect x="22" y="42" width="10" height="12" rx="1" stroke="#C9A84C" strokeWidth="1" fill="#0E0A04"/>
        <rect x="34" y="40" width="12" height="14" rx="1" stroke="#C9A84C" strokeWidth="1" fill="#0E0A04"/>
        <rect x="46" y="44" width="8" height="10" rx="1" stroke="#C9A84C" strokeWidth="1" fill="#0E0A04"/>
        <rect x="24" y="44" width="6" height="7" rx="3" fill="#C9A84C" opacity=".08"><animate attributeName="opacity" values=".05;.16;.05" dur="2.5s" repeatCount="indefinite"/></rect>
        <circle cx="36" cy="36" r="5" stroke="#C9A84C" strokeWidth="1" fill="#140F04"/>
        <circle cx="36" cy="36" r="2.5" fill="#C9A84C" opacity=".25"/>
        <circle cx="36" cy="36" r="2.5" fill="#C9A84C"><animate attributeName="opacity" values=".7;1;.7" dur="2s" repeatCount="indefinite"/></circle>
      </svg>
  );
}

export function SuspensionBridgeIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5"/>
        <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".3;.6;.3" dur="3.2s" repeatCount="indefinite"/></circle>
        <rect x="14" y="53" width="44" height="4" rx=".5" stroke="#C9A84C" strokeWidth="1" fill="#1A1206"/>
        <line x1="14" y1="55" x2="14" y2="30" stroke="#C9A84C" strokeWidth="1.2"/>
        <line x1="58" y1="55" x2="58" y2="30" stroke="#C9A84C" strokeWidth="1.2"/>
        <path d="M14 30 Q36 20 58 30" stroke="#C9A84C" strokeWidth="1.1" fill="none"/>
        <path d="M14 30 Q36 26 58 30" stroke="#C9A84C" strokeWidth=".6" fill="none" opacity=".4"/>
        <line x1="22" y1="28" x2="22" y2="53" stroke="#C9A84C" strokeWidth=".7" opacity=".6"/>
        <line x1="30" y1="24" x2="30" y2="53" stroke="#C9A84C" strokeWidth=".7" opacity=".6"/>
        <line x1="36" y1="22" x2="36" y2="53" stroke="#C9A84C" strokeWidth=".7" opacity=".6"/>
        <line x1="42" y1="24" x2="42" y2="53" stroke="#C9A84C" strokeWidth=".7" opacity=".6"/>
        <line x1="50" y1="28" x2="50" y2="53" stroke="#C9A84C" strokeWidth=".7" opacity=".6"/>
        <circle cx="36" cy="22" r="2" fill="#2ABFBF" opacity=".8"><animate attributeName="opacity" values=".5;1;.5" dur="2s" repeatCount="indefinite"/></circle>
        <rect x="14" y="53" width="44" height="4" fill="#C9A84C" opacity=".04"><animate attributeName="opacity" values=".03;.09;.03" dur="2.5s" repeatCount="indefinite"/></rect>
      </svg>
  );
}

export function VillageMuseumIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="33" fill="#0E0A04" stroke="#C9A84C" strokeWidth=".8" opacity=".5"/>
        <circle cx="36" cy="36" r="33" fill="url(#gC)"><animate attributeName="opacity" values=".28;.58;.28" dur="3.4s" repeatCount="indefinite"/></circle>
        <path d="M36 18 L36 56 Q24 58 14 54 L14 14 Q24 16 36 18Z" stroke="#C9A84C" strokeWidth="1.1" fill="#1A1206"/>
        <path d="M36 18 L36 56 Q48 58 58 54 L58 14 Q48 16 36 18Z" stroke="#C9A84C" strokeWidth="1.1" fill="#1A1206"/>
        <rect x="16" y="20" width="10" height="10" rx=".5" stroke="#C9A84C" strokeWidth=".8" fill="#C9A84C" fillOpacity=".1"/>
        <text x="21" y="29" fontSize="8" fill="#C9A84C" textAnchor="middle" fontFamily="serif" opacity=".8">Ա</text>
        <rect x="38" y="20" width="10" height="10" rx=".5" stroke="#C9A84C" strokeWidth=".8" fill="#C9A84C" fillOpacity=".1"/>
        <text x="43" y="29" fontSize="8" fill="#C9A84C" textAnchor="middle" fontFamily="serif" opacity=".8">Բ</text>
        <line x1="16" y1="33" x2="34" y2="32" stroke="#C9A84C" strokeWidth=".5" opacity=".45"/>
        <line x1="16" y1="37" x2="34" y2="36" stroke="#C9A84C" strokeWidth=".5" opacity=".45"/>
        <line x1="16" y1="41" x2="34" y2="40" stroke="#C9A84C" strokeWidth=".5" opacity=".45"/>
        <line x1="38" y1="33" x2="56" y2="32" stroke="#C9A84C" strokeWidth=".5" opacity=".45"/>
        <line x1="38" y1="37" x2="56" y2="36" stroke="#C9A84C" strokeWidth=".5" opacity=".45"/>
        <rect x="16" y="20" width="10" height="10" fill="#C9A84C" opacity=".05"><animate attributeName="opacity" values=".03;.12;.03" dur="2.5s" repeatCount="indefinite"/></rect>
        <rect x="38" y="20" width="10" height="10" fill="#C9A84C" opacity=".05"><animate attributeName="opacity" values=".03;.12;.03" dur="2.5s" begin=".8s" repeatCount="indefinite"/></rect>
      </svg>
  );
}

