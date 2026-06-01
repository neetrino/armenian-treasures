import type { HeaderTheme } from '@/components/layout/header-theme';
import { cn } from '@/lib/utils';

export function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isAboutNavActive(pathname: string): boolean {
  return pathname === '/about' || pathname.startsWith('/about/');
}

export function isCultureNavActive(pathname: string): boolean {
  return pathname === '/culture' || pathname.startsWith('/culture/');
}

export function navTriggerClassName(
  active: boolean,
  open?: boolean,
  theme: HeaderTheme = 'over-hero',
): string {
  const base =
    'relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500/80 focus-visible:ring-offset-2 xl:px-3';
  const underline =
    'after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-px after:origin-center after:scale-x-0 after:transition-transform xl:after:left-3 xl:after:right-3';

  if (theme === 'solid') {
    return cn(
      base,
      underline,
      'focus-visible:ring-offset-parchment after:bg-pomegranate',
      active || open
        ? 'text-pomegranate-700 after:scale-x-100'
        : 'text-ink-soft hover:text-ink hover:after:scale-x-100',
    );
  }

  return cn(
    base,
    underline,
    'focus-visible:ring-offset-[#0c0818] after:bg-bronze-500',
    active || open
      ? 'text-parchment-50 after:scale-x-100'
      : 'text-parchment-200/90 hover:text-parchment-50 hover:after:scale-x-100',
  );
}

export function navLinkClassName(
  active: boolean,
  className?: string,
  theme: HeaderTheme = 'over-hero',
): string {
  return cn(navTriggerClassName(active, false, theme), className);
}
