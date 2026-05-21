import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        {...props}
        className={cn(
          'w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm transition focus:border-bronze-500 focus:outline-none focus:ring-2 focus:ring-bronze-500/30 disabled:opacity-50',
          className,
        )}
      >
        {children}
      </select>
    );
  },
);
