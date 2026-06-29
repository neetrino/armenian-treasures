'use client';

import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSectionCardProps {
  title: string;
  description?: string;
  preview?: string;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
}

export function AdminSectionCard({
  title,
  description,
  preview,
  icon,
  onClick,
  className,
}: AdminSectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex w-full items-start gap-4 rounded-2xl border border-stone-200/70 bg-white p-5 text-left shadow-sm transition duration-300 ease-cinematic hover:-translate-y-1 hover:border-bronze-300/80 hover:shadow-card-hover active:scale-[0.995]',
        className,
      )}
    >
      {icon ? (
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-parchment-100 text-bronze-800 transition group-hover:bg-pomegranate/10 group-hover:text-pomegranate">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg text-ink group-hover:text-bronze-900">{title}</span>
        {description ? (
          <span className="mt-1 block text-sm text-ink-muted">{description}</span>
        ) : null}
        {preview ? (
          <span className="mt-2 block truncate text-xs text-ink-muted/80">{preview}</span>
        ) : null}
      </span>
      <ChevronRight
        size={18}
        className="mt-1 shrink-0 text-bronze-600 transition group-hover:translate-x-0.5"
        aria-hidden
      />
    </button>
  );
}
