import type { HomeAboutCardIconKey } from '@/lib/constants/home-about-section';
import { cn } from '@/lib/utils';

interface AboutUsCardIconProps {
  type: HomeAboutCardIconKey;
  className?: string;
}

export function AboutUsCardIcon({ type, className }: AboutUsCardIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-5 w-5 shrink-0 text-heritage-gold sm:h-6 sm:w-6', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {type === 'mission' ? (
        <>
          <circle cx="12" cy="12" r="7.25" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4.75V2.5M12 21.5v-2.25M4.75 12H2.5M21.5 12h-2.25" />
        </>
      ) : null}
      {type === 'team' ? (
        <>
          <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
          <circle cx="10" cy="8.5" r="3" />
          <path d="M18 19v-1a3 3 0 0 0-2.2-2.9" />
          <path d="M15.5 5.1a3 3 0 0 1 0 5.8" />
        </>
      ) : null}
      {type === 'career' ? (
        <>
          <rect x="4" y="8" width="16" height="11" rx="1.25" />
          <path d="M8 8V6.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5V8" />
          <path d="M12 13v2" />
          <path d="M10.5 14.5h3" />
        </>
      ) : null}
      {type === 'contact' ? (
        <>
          <rect x="3.5" y="6.5" width="17" height="11" rx="1.25" />
          <path d="m4 7.5 7.5 5.5L19 7.5" />
        </>
      ) : null}
    </svg>
  );
}
