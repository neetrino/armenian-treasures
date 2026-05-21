import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          'w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm transition placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none focus:ring-2 focus:ring-bronze-500/30 disabled:opacity-50',
          className,
        )}
      />
    );
  },
);
