'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import {
  CURRENT_SITE_LANGUAGE,
  resolveEnabledSiteLanguages,
  type SiteLanguage,
} from '@/lib/navigation/site-languages';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
  enabledLocales?: SiteLocaleCode[];
}

export function LanguageSelector({ className, enabledLocales = ['EN'] }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const languages = resolveEnabledSiteLanguages(enabledLocales);
  const active =
    languages.find((locale) => locale.code === CURRENT_SITE_LANGUAGE.code) ?? CURRENT_SITE_LANGUAGE;
  const hasChoice = languages.length > 1;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent): void => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const renderLocaleButton = (locale: SiteLanguage): ReactNode => {
    const isActive = locale.code === active.code;
    const isAvailable = locale.hasTranslations;
    return (
      <button
        key={locale.code}
        type="button"
        disabled={!isAvailable}
        className={cn(
          'flex w-full items-center gap-2 px-3 py-2 text-left font-cinzel text-[10px] font-semibold uppercase tracking-[0.12em] transition',
          isActive ? 'text-heritage-teal' : 'text-[var(--dropdown-text)]',
          isAvailable
            ? 'hover:bg-[rgba(201,168,76,0.08)] hover:text-[var(--dropdown-text-hover)]'
            : 'cursor-not-allowed opacity-55',
        )}
        aria-current={isActive ? 'true' : undefined}
        title={
          isAvailable
            ? `Content in ${locale.name}`
            : `${locale.name} translations coming soon`
        }
        onClick={() => {
          if (!isAvailable) return;
          setOpen(false);
        }}
      >
        <span aria-hidden>{locale.flag}</span>
        <span>{locale.code}</span>
        {!isAvailable ? (
          <span className="ml-auto text-[8px] tracking-[0.18em] text-heritage-teal">Soon</span>
        ) : null}
      </button>
    );
  };

  return (
    <div ref={containerRef} className={cn('relative shrink-0', className)}>
      <button
        type="button"
        className={cn(
          'inline-flex h-9 items-center gap-[7px] px-3.5',
          'bg-[rgba(201,168,76,0.08)] border border-[var(--surface-border)]',
          'font-cinzel text-[9.5px] font-bold uppercase tracking-[0.12em] text-heritage-gold',
          'transition hover:border-[rgba(214,184,90,0.35)]',
          '[clip-path:polygon(6px_0%,100%_0%,calc(100%-6px)_100%,0%_100%)]',
          hasChoice && 'cursor-pointer',
        )}
        aria-expanded={hasChoice ? open : undefined}
        aria-haspopup={hasChoice ? 'listbox' : undefined}
        aria-label={`Site language: ${active.name}. ${hasChoice ? 'Change language' : 'English only'}`}
        onClick={() => {
          if (hasChoice) setOpen((value) => !value);
        }}
      >
        <Globe size={11} strokeWidth={1.5} aria-hidden className="opacity-80" />
        <span>{active.code}</span>
        {hasChoice ? <ChevronDown size={11} aria-hidden className={cn('transition', open && 'rotate-180')} /> : null}
      </button>

      {hasChoice && open ? (
        <div
          role="listbox"
          aria-label="Available languages"
          className="absolute right-0 top-[calc(100%+6px)] z-[1002] min-w-[9.5rem] border border-[var(--dropdown-border)] bg-[var(--dropdown-bg)] py-1 shadow-[var(--shadow-dropdown)] backdrop-blur-[20px]"
        >
          {languages.map(renderLocaleButton)}
        </div>
      ) : null}
    </div>
  );
}
