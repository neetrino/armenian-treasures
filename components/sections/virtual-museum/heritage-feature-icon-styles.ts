export const VIRTUAL_MUSEUM_CONTAINER_CLASS =
  'relative z-10 mx-auto w-full max-w-[45rem] md:max-w-[62.5rem] xl:max-w-[70rem]';

export const HERITAGE_ICON_BADGE_CLASS = [
  'heritage-icon-badge relative mb-8 flex h-[3.875rem] w-[3.875rem] shrink-0 items-center justify-center rounded-full',
  'border border-[rgba(214,184,90,0.42)]',
  'bg-black',
  'shadow-[inset_0_0_22px_rgba(214,184,90,0.045),0_0_22px_rgba(214,184,90,0.055)]',
  'transition-[border-color,box-shadow,transform] duration-[320ms] ease-out',
  'motion-safe:group-hover:border-[rgba(214,184,90,0.68)]',
  'motion-safe:group-hover:shadow-[inset_0_0_24px_rgba(214,184,90,0.07),0_0_26px_rgba(214,184,90,0.10)]',
  'motion-safe:group-hover:-translate-y-px motion-safe:group-hover:scale-[1.02]',
  'motion-reduce:transition-none motion-reduce:group-hover:transform-none',
  'sm:h-[4.375rem] sm:w-[4.375rem]',
].join(' ');

export const HERITAGE_ICON_SVG_CLASS = [
  'heritage-icon-svg h-12 w-12 shrink-0 text-heritage-gold',
  'transition-[transform,color] duration-[320ms] ease-out',
  'motion-safe:group-hover:scale-[1.02] motion-safe:group-hover:text-[#F2DA83]',
  'motion-reduce:transition-none motion-reduce:group-hover:scale-100',
  'sm:h-[3.5rem] sm:w-[3.5rem]',
].join(' ');

export const HERITAGE_ICON_GOLD_STROKE = 1.55;
