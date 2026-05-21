interface OrnamentRightProps {
  className?: string;
}

export function OrnamentRight({ className }: OrnamentRightProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.95">
        <path d="M120 20 L160 60 L120 100 L80 60 Z" />
        <path d="M120 100 L160 140 L120 180 L80 140 Z" />
        <path d="M120 180 L160 220 L120 260 L80 220 Z" />
        <path d="M120 260 L160 300 L120 340 L80 300 Z" />
        <path d="M120 340 L160 380 L120 420 L80 380 Z" />
        <circle cx="120" cy="60" r="3" fill="currentColor" />
        <circle cx="120" cy="140" r="3" fill="currentColor" />
        <circle cx="120" cy="220" r="3" fill="currentColor" />
        <circle cx="120" cy="300" r="3" fill="currentColor" />
        <circle cx="120" cy="380" r="3" fill="currentColor" />
        <path d="M40 40 L40 440" strokeDasharray="4 8" opacity="0.6" />
        <path d="M200 40 L200 440" strokeDasharray="4 8" opacity="0.6" />
        <path d="M120 0 L120 460" opacity="0.4" />
      </g>
    </svg>
  );
}
