import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, rows = 5, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        {...props}
        className={cn(
          'w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm transition placeholder:text-ink-muted focus:border-bronze-500 focus:outline-none focus:ring-2 focus:ring-bronze-500/30 disabled:opacity-50',
          className,
        )}
      />
    );
  },
);
