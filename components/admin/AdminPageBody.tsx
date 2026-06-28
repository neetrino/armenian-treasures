import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AdminPageBodyProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'full';
}

const SIZE: Record<NonNullable<AdminPageBodyProps['size']>, string> = {
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
};

export function AdminPageBody({ children, className, size = 'default' }: AdminPageBodyProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full flex-1 flex-col gap-6 px-4 py-5 sm:gap-7 sm:px-6 sm:py-6 lg:px-8 lg:py-7',
        SIZE[size],
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-bronze-300/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-bronze-300/10 blur-3xl motion-safe:animate-admin-fade-in"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-14 bottom-8 h-44 w-44 rounded-full bg-pomegranate/10 blur-3xl motion-safe:animate-admin-fade-in"
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col gap-6 [&>*]:motion-safe:animate-admin-fade-up">
        {children}
      </div>
    </div>
  );
}
