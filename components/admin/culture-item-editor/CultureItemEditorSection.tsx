'use client';

import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { SortableDragHandle } from '@/components/admin/SortableDragHandle';
import { cn } from '@/lib/utils';

interface CultureItemEditorSectionProps {
  number?: number;
  title: string;
  description?: string;
  unlimited?: boolean;
  defaultOpen?: boolean;
  dragHandleProps?: HTMLAttributes<HTMLButtonElement>;
  overlay?: boolean;
  children: ReactNode;
}

export function CultureItemEditorSection({
  number,
  title,
  description,
  unlimited = false,
  defaultOpen = true,
  dragHandleProps,
  overlay = false,
  children,
}: CultureItemEditorSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      className={cn(
        'overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition',
        overlay && 'scale-[1.01] border-bronze-400/50 shadow-lg ring-1 ring-bronze-400/20',
      )}
    >
      <div className="flex items-start gap-3 border-b border-stone-100 px-4 py-3 sm:px-5">
        {dragHandleProps ? (
          <SortableDragHandle
            {...dragHandleProps}
            overlay={overlay}
            className="mt-0.5"
          />
        ) : null}
        {number != null ? (
          <span
            className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bronze-500 text-xs font-semibold text-white"
            aria-hidden
          >
            {number}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg text-ink">{title}</h3>
            {unlimited ? (
              <span className="rounded-full bg-bronze-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-bronze-800">
                Unlimited
              </span>
            ) : null}
          </div>
          {description ? <p className="mt-0.5 text-sm text-ink-muted">{description}</p> : null}
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-muted transition hover:bg-stone-100 hover:text-ink"
        >
          <ChevronDown
            size={18}
            className={cn('transition-transform', open ? 'rotate-180' : '')}
            aria-hidden
          />
        </button>
      </div>
      {open ? <div className="px-4 py-4 sm:px-5 sm:py-5">{children}</div> : null}
    </section>
  );
}
