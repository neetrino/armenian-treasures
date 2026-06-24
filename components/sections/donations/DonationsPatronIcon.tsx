import type { DonationsPatronIconKey } from '@/lib/constants/home-donations-section';
import { cn } from '@/lib/utils';

interface DonationsPatronIconProps {
  type: DonationsPatronIconKey;
  className?: string;
}

export function DonationsPatronIcon({ type, className }: DonationsPatronIconProps) {
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
      {type === 'gold' ? (
        <path d="M12 3.5 14.1 9.4 20.5 9.9 15.75 14.1 17.2 20.5 12 17.2 6.8 20.5 8.25 14.1 3.5 9.9 9.9 9.4 12 3.5Z" />
      ) : null}
      {type === 'silver' ? (
        <>
          <circle cx="12" cy="12" r="7.25" />
          <path d="M12 7.5v4.5l3 1.5" />
        </>
      ) : null}
      {type === 'bronze' ? <circle cx="12" cy="12" r="7.25" /> : null}
    </svg>
  );
}
