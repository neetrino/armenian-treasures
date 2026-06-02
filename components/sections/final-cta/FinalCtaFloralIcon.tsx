interface FinalCtaFloralIconProps {
  className?: string;
}

export function FinalCtaFloralIcon({ className }: FinalCtaFloralIconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="0.75" opacity="0.85" />
      <path
        d="M8 2.5 L8.8 5.8 L12 6.5 L8.8 7.2 L8 10.5 L7.2 7.2 L4 6.5 L7.2 5.8 Z"
        stroke="currentColor"
        strokeWidth="0.65"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="1.1" fill="currentColor" />
    </svg>
  );
}
