interface HeroLeftPatternProps {
  className?: string;
}

export function HeroLeftPattern({ className }: HeroLeftPatternProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 96 480"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
    >
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.55">
        <path d="M20 24 L44 48 L20 72 L44 96 L20 120" />
        <path d="M52 36 L68 60 L52 84" />
        <path d="M12 160 L36 184 L12 208" opacity="0.7" />
        <path d="M28 240 L52 264 L28 288 L52 312 L28 336" opacity="0.5" />
        <path d="M8 0 V480" strokeDasharray="3 12" opacity="0.4" />
      </g>
      <g fill="currentColor" opacity="0.45">
        <circle cx="44" cy="48" r="1.5" />
        <circle cx="44" cy="96" r="1.5" />
        <circle cx="36" cy="184" r="1.25" />
        <circle cx="52" cy="264" r="1.25" />
      </g>
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.35">
        <path d="M48 128 L56 136 L48 144 L40 136 Z" />
        <path d="M40 360 L48 368 L56 360 L48 352 Z" />
      </g>
    </svg>
  );
}
