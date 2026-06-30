'use client';

import { Globe } from 'lucide-react';
import { CURRENT_SITE_LANGUAGE } from '@/lib/navigation/site-languages';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  return (
    <div className={cn('relative ml-2 shrink-0', className)}>
      <div
        className={cn(
          'inline-flex h-9 items-center gap-[7px] px-3.5',
          'bg-[rgba(201,168,76,0.08)] border border-[var(--surface-border)]',
          'font-cinzel text-[9.5px] font-bold uppercase tracking-[0.12em] text-heritage-gold',
          'cursor-default opacity-90',
          '[clip-path:polygon(6px_0%,100%_0%,calc(100%-6px)_100%,0%_100%)]',
        )}
        role="status"
        aria-label={`Site content is in ${CURRENT_SITE_LANGUAGE.name} only. Additional languages coming soon.`}
        title="Additional languages coming soon"
      >
        <Globe size={11} strokeWidth={1.5} aria-hidden className="opacity-80" />
        <span>{CURRENT_SITE_LANGUAGE.code}</span>
        <span className="font-cinzel text-[8px] font-semibold tracking-[0.18em] text-heritage-teal">
          Soon
        </span>
      </div>
      <p className="mt-2 font-sans text-[11px] leading-snug text-surface-body lg:sr-only">
        All site content is currently in English. Multilingual support is coming soon.
      </p>
    </div>
  );
}
