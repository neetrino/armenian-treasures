'use client';

import { ChevronDown, Globe } from 'lucide-react';
import { useHeaderTheme } from '@/components/layout/header-theme';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
}

/** Default locale until i18n routing is added. */
const CURRENT_LOCALE = 'EN';

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const theme = useHeaderTheme();
  const isSolid = theme === 'solid';

  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-8 min-w-[68px] shrink-0 items-center justify-center gap-1 px-2',
        'border border-[rgba(214,184,90,0.28)] bg-[rgba(20,16,7,0.82)]',
        'font-cinzel text-[9px] font-bold uppercase tracking-[0.08em] text-heritage-nav',
        'transition-[color,border-color,box-shadow] duration-200 ease-out',
        'hover:border-[rgba(39,198,200,0.45)] hover:text-heritage-teal hover:shadow-[0_0_22px_rgba(39,198,200,0.08)]',
        'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[rgba(39,198,200,0.75)]',
        isSolid && 'focus-visible:outline-offset-parchment',
        className,
      )}
      aria-label="Select language"
      aria-haspopup="listbox"
    >
      <Globe size={10} strokeWidth={1.5} aria-hidden className="opacity-80" />
      <span>{CURRENT_LOCALE}</span>
      <ChevronDown size={8} strokeWidth={1.5} aria-hidden className="opacity-70" />
    </button>
  );
}
