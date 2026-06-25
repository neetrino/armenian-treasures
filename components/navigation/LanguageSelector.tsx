'use client';

import { Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavDropdownArrow } from '@/components/navigation/NavDropdownArrow';
import { SITE_LANGUAGES } from '@/lib/navigation/site-languages';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [activeCode, setActiveCode] = useState('EN');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent): void => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn('relative ml-2 shrink-0', className)}>
      <button
        type="button"
        className={cn(
          'inline-flex h-9 items-center gap-[7px] px-3.5',
          'bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.22)]',
          'font-cinzel text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#C9A84C]',
          'transition-[background-color,border-color] duration-200 ease-out',
          'hover:bg-[rgba(201,168,76,0.16)] hover:border-[rgba(201,168,76,0.4)]',
          'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[rgba(39,198,200,0.75)]',
          '[clip-path:polygon(6px_0%,100%_0%,calc(100%-6px)_100%,0%_100%)]',
        )}
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe size={11} strokeWidth={1.5} aria-hidden className="opacity-80" />
        <span>{activeCode}</span>
        <NavDropdownArrow open={open} className="opacity-50" />
      </button>

      <div
        role="listbox"
        aria-label="Languages"
        className={cn(
          'absolute right-0 top-[calc(100%+12px)] z-[1001] min-w-[270px]',
          'border border-[rgba(201,168,76,0.2)] border-t-2 border-t-[#C9A84C]',
          'bg-[rgba(10,10,10,0.98)] px-5 pb-4 pt-5 backdrop-blur-[24px]',
          'transition-[opacity,transform] duration-200 ease-out',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0',
        )}
      >
        <p className="mb-3.5 font-cinzel text-[8.5px] uppercase tracking-[0.32em] text-[#2ABFBF]">
          Select Language
        </p>
        <div className="grid grid-cols-2 gap-[5px]">
          {SITE_LANGUAGES.map((language) => {
            const isActive = language.code === activeCode;

            return (
              <button
                key={language.code}
                type="button"
                role="option"
                aria-selected={isActive}
                className={cn(
                  'flex items-center gap-2.5 border px-[11px] py-[9px] text-left transition-[background-color,border-color] duration-150',
                  isActive
                    ? 'border-[rgba(201,168,76,0.38)] bg-[rgba(201,168,76,0.14)]'
                    : 'border-transparent bg-[rgba(255,255,255,0.03)] hover:border-[rgba(201,168,76,0.28)] hover:bg-[rgba(201,168,76,0.1)]',
                )}
                onClick={() => {
                  setActiveCode(language.code);
                  setOpen(false);
                }}
              >
                <span className="text-[17px] leading-none" aria-hidden>
                  {language.flag}
                </span>
                <span
                  className={cn(
                    'font-cinzel text-[10px] tracking-[0.05em]',
                    isActive ? 'text-[#C9A84C]' : 'text-[#D4C89A]',
                  )}
                >
                  {language.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
