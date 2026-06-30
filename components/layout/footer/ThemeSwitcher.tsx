'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useSiteTheme } from '@/components/theme/SiteThemeProvider';
import { cn } from '@/lib/utils';

const TOGGLE_EASE = [0.22, 1, 0.36, 1] as const;

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useSiteTheme();
  const reduced = useReducedMotion();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={isLight}
      className={cn(
        'theme-switcher relative inline-flex h-9 w-[4.25rem] shrink-0 items-center rounded-full border border-surface p-0.5',
        'transition-[background-color,border-color,box-shadow] duration-250 ease-theme',
        'hover:border-[var(--surface-card-hover-border)] hover:shadow-[var(--surface-card-hover-shadow)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]',
        className,
      )}
    >
      <motion.span
        aria-hidden
        className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-[var(--accent)]"
        initial={false}
        animate={{ x: isLight ? '100%' : '0%' }}
        transition={reduced ? { duration: 0 } : { duration: 0.28, ease: TOGGLE_EASE }}
      />

      <span className="relative z-[1] flex w-full items-center justify-between px-2">
        <Moon
          size={13}
          strokeWidth={1.75}
          aria-hidden
          className={cn(
            'transition-[color,opacity,transform] duration-220 ease-theme',
            !isLight ? 'scale-110 text-heritage-gold opacity-100' : 'scale-95 text-surface-subtle opacity-55',
          )}
        />
        <Sun
          size={13}
          strokeWidth={1.75}
          aria-hidden
          className={cn(
            'transition-[color,opacity,transform] duration-220 ease-theme',
            isLight ? 'scale-110 text-bronze-600 opacity-100' : 'scale-95 text-surface-subtle opacity-55',
          )}
        />
      </span>

      {!mounted ? (
        <span className="sr-only" aria-live="polite">
          Theme preference loading
        </span>
      ) : null}
    </button>
  );
}
