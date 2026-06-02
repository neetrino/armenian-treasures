import { cn } from '@/lib/utils';

interface FooterConstellationProps {
  className?: string;
}

export function FooterConstellation({ className }: FooterConstellationProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-bronze-400/20', className)}
    >
      <circle cx="160" cy="160" r="148" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="160" cy="160" r="118" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
      <circle cx="160" cy="160" r="88" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
      <path
        d="M160 24 L176 88 L240 104 L176 120 L160 184 L144 120 L80 104 L144 88 Z"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        d="M160 136 L168 168 L200 176 L168 184 L160 216 L152 184 L120 176 L152 168 Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.8"
      />
      <path d="M160 24 V296 M24 160 H296" stroke="currentColor" strokeWidth="0.4" opacity="0.45" />
      <path
        d="M56 56 L264 264 M264 56 L56 264"
        stroke="currentColor"
        strokeWidth="0.35"
        opacity="0.35"
      />
      {[
        [160, 24],
        [240, 104],
        [160, 184],
        [80, 104],
        [160, 160],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="currentColor" opacity="0.5" />
      ))}
    </svg>
  );
}
