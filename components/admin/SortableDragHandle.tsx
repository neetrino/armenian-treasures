'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortableDragHandleProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string;
  overlay?: boolean;
  disabled?: boolean;
}

export const SortableDragHandle = forwardRef<HTMLButtonElement, SortableDragHandleProps>(
  function SortableDragHandle(
    { label = 'Drag to reorder', overlay = false, disabled = false, className, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || overlay}
        aria-label={label}
        title={label}
        className={cn(
          'inline-flex h-8 w-8 shrink-0 touch-none items-center justify-center rounded-lg border border-stone-200 bg-white text-ink-muted shadow-sm transition',
          overlay ? 'cursor-grabbing' : 'cursor-grab active:cursor-grabbing',
          'hover:border-bronze-400 hover:text-ink focus:outline-none focus:ring-2 focus:ring-bronze-500/30',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <GripVertical size={16} aria-hidden />
      </button>
    );
  },
);
