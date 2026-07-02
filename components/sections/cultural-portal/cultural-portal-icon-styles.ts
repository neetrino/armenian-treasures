export const CULTURAL_PORTAL_ICON_SVG_CLASS =
  'h-11 w-11 shrink-0 rounded-full object-cover text-heritage-gold transition-colors duration-[240ms] ease-out group-hover:text-[#F2DA83] sm:h-11 sm:w-11 max-sm:h-9 max-sm:w-9';

export const CULTURAL_PORTAL_ICON_BADGE_CLASS = [
  'cultural-portal-icon-badge flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full',
  'border border-[rgba(214,184,90,0.42)]',
  'bg-black',
  'shadow-[inset_0_0_18px_rgba(214,184,90,0.045),0_0_16px_rgba(214,184,90,0.045)]',
  'transition-[border-color,box-shadow] duration-[240ms] ease-out',
  'group-hover:border-[rgba(214,184,90,0.68)]',
  'group-hover:shadow-[inset_0_0_22px_rgba(214,184,90,0.07),0_0_22px_rgba(214,184,90,0.09)]',
  'max-sm:h-12 max-sm:w-12',
].join(' ');

export const CULTURAL_PORTAL_ICON_GOLD = {
  stroke: 'currentColor' as const,
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const CULTURAL_PORTAL_ICON_TEAL_CLASS =
  'stroke-heritage-teal transition-[stroke] duration-[240ms] group-hover:stroke-[#3ad8da]';
