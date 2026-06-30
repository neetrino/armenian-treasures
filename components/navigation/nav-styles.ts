import { cn } from '@/lib/utils';

export function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isAboutNavActive(pathname: string): boolean {
  return pathname === '/about' || pathname.startsWith('/about/') || pathname === '/contacts';
}

export function isCultureNavActive(pathname: string): boolean {
  return pathname === '/culture' || pathname.startsWith('/culture/');
}

export function isProjectsNavActive(pathname: string): boolean {
  return pathname === '/projects' || pathname.startsWith('/projects/');
}

const NAV_ITEM_BASE =
  'relative inline-flex h-site-header shrink-0 items-center whitespace-nowrap border-none bg-transparent px-3 font-cinzel text-[9.5px] font-semibold uppercase leading-none tracking-[0.12em] transition-[color,text-shadow] duration-200 ease-out cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[rgba(39,198,200,0.75)] motion-reduce:transition-none';

export function navItemClassName(active: boolean, open?: boolean): string {
  const isHighlighted = active || open;

  return cn(
    NAV_ITEM_BASE,
    isHighlighted
      ? 'text-[var(--nav-text-active)] [text-shadow:var(--nav-text-shadow)]'
      : 'text-[var(--nav-text)] hover:text-[var(--nav-text-active)] hover:[text-shadow:var(--nav-text-shadow)]',
  );
}

export function navLinkClassName(active: boolean, className?: string): string {
  return cn(navItemClassName(active), 'no-underline', className);
}

export const SIMPLE_DROPDOWN_PANEL =
  'pointer-events-auto min-w-[200px] border border-[var(--dropdown-border)] border-t-2 border-t-[var(--dropdown-heading)] bg-[var(--dropdown-bg)] py-2.5 shadow-[var(--shadow-dropdown)] backdrop-blur-[24px]';

export const MEGA_MENU_PANEL =
  'pointer-events-auto w-[min(860px,calc(100vw-80px))] border border-[var(--dropdown-border)] border-t-2 border-t-[var(--dropdown-heading)] bg-[var(--dropdown-bg)] px-7 py-7 shadow-[var(--shadow-dropdown)] backdrop-blur-[24px] sm:px-9';

export const SIMPLE_DROPDOWN_ITEM =
  'block px-[22px] py-[9px] font-display text-[15px] leading-[1.25] text-[var(--dropdown-text)] no-underline transition-[color,padding-left] duration-150 ease-out hover:pl-7 hover:text-[var(--dropdown-text-hover)]';

export const MEGA_MENU_HEADING =
  'mb-2.5 border-b border-[var(--surface-border)] pb-2.5 font-cinzel text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--dropdown-heading)]';

export const MEGA_MENU_HEADING_LINK = cn(
  MEGA_MENU_HEADING,
  'inline-block no-underline transition-[color,text-shadow] duration-150 hover:text-[var(--dropdown-text-hover)] hover:[text-shadow:0_0_10px_rgba(42,191,191,0.35)]',
);

export const MEGA_MENU_ITEM =
  'group flex items-center gap-[9px] py-[5px] font-display text-[14.5px] leading-[1.25] text-[var(--dropdown-text)] no-underline transition-[color,gap] duration-150 ease-out hover:gap-[13px] hover:text-[var(--dropdown-text-hover)]';

export const MEGA_MENU_ICON =
  'h-4 w-4 shrink-0 opacity-60 transition-opacity duration-150 group-hover:opacity-100';
