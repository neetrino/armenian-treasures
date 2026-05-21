import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={cn(
        'flex items-center gap-1 text-xs font-medium uppercase tracking-eyebrow text-ink-soft',
        className,
      )}
    >
      {children}
      {required ? <span className="text-pomegranate" aria-hidden>*</span> : null}
    </label>
  );
}
