import { cn } from '@/lib/utils';

interface CulturePortalTitleDividerProps {
  className?: string;
}

export function CulturePortalTitleDivider({ className }: CulturePortalTitleDividerProps) {
  return (
    <svg
      viewBox="0 0 280 28"
      className={cn('h-5 w-auto max-w-[13rem] text-bronze sm:h-6 sm:max-w-[15rem]', className)}
      aria-hidden
      fill="none"
    >
      <path
        d="M0 14 H108"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.45"
      />
      <path
        d="M172 14 H280"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.45"
      />
      <path
        fill="currentColor"
        opacity="0.75"
        d="M140 6 143.4 12.6 150 14 143.4 15.4 140 22 136.6 15.4 130 14 136.6 12.6 140 6Z"
      />
      <circle cx="140" cy="14" r="2.25" fill="currentColor" opacity="0.55" />
      <path
        d="M124 14 C128 8 132 6 140 6 C148 6 152 8 156 14"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.35"
      />
      <path
        d="M124 14 C128 20 132 22 140 22 C148 22 152 20 156 14"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.35"
      />
    </svg>
  );
}
