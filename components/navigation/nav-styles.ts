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
  'relative inline-flex shrink-0 items-center whitespace-nowrap border-none bg-transparent font-cinzel text-[8px] font-bold uppercase leading-none tracking-[0.09em] transition-[color,text-shadow] duration-200 ease-out cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[rgba(39,198,200,0.75)] motion-reduce:transition-none xl:text-[9px]';

export function navItemClassName(active: boolean, open?: boolean): string {
  const isHighlighted = active || open;

  return cn(
    NAV_ITEM_BASE,
    isHighlighted
      ? 'text-heritage-teal [text-shadow:0_0_14px_rgba(39,198,200,0.18)]'
      : 'text-heritage-nav hover:text-heritage-teal hover:[text-shadow:0_0_14px_rgba(39,198,200,0.18)]',
  );
}

export function navLinkClassName(active: boolean, className?: string): string {
  return cn(navItemClassName(active), 'no-underline', className);
}

export const SIMPLE_DROPDOWN_PANEL =
  'pointer-events-auto min-w-[210px] border border-[rgba(214,184,90,0.18)] border-t-2 border-t-heritage-teal bg-[rgba(3,5,4,0.96)] px-5 py-4 shadow-[0_18px_48px_rgba(0,0,0,0.5)] backdrop-blur-[10px]';

export const MEGA_MENU_PANEL =
  'pointer-events-auto w-[min(920px,calc(100vw-80px))] border border-[rgba(214,184,90,0.18)] border-t-2 border-t-heritage-teal bg-[rgba(3,5,4,0.96)] px-7 py-7 shadow-[0_22px_56px_rgba(0,0,0,0.5),0_0_32px_rgba(39,198,200,0.04)] backdrop-blur-[10px] sm:px-9';

export const SIMPLE_DROPDOWN_ITEM =
  'block py-1.5 font-display text-base leading-[1.25] text-[rgba(232,216,155,0.84)] no-underline transition-[color,transform] duration-200 ease-out hover:translate-x-1 hover:text-[#F2DA83] motion-reduce:transform-none';

export const MEGA_MENU_HEADING =
  'mb-4 font-cinzel text-[10px] font-extrabold uppercase tracking-[0.22em] text-heritage-teal';

export const MEGA_MENU_ITEM =
  'group flex items-center gap-2.5 py-1.5 font-display text-base leading-[1.25] text-[rgba(232,216,155,0.82)] no-underline transition-[color,transform] duration-200 ease-out hover:translate-x-1 hover:text-[#F2DA83] motion-reduce:transform-none';

export const MEGA_MENU_ICON =
  'h-3.5 w-3.5 shrink-0 text-[rgba(232,216,155,0.65)] transition-colors duration-200 group-hover:text-[rgba(242,218,131,0.85)]';
