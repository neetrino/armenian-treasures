import Link from 'next/link';
import { cn } from '@/lib/utils';

type HeritageCtaVariant = 'gold' | 'teal';

interface HeritageCtaButtonProps {
  href: string;
  label: string;
  variant?: HeritageCtaVariant;
  className?: string;
}

const VARIANT_STYLES: Record<HeritageCtaVariant, string> = {
  gold: [
    'bg-[#C4A04A] text-[#050504]',
    'shadow-[0_0_26px_rgba(214,184,90,0.14)]',
    'hover:shadow-[0_4px_32px_rgba(214,184,90,0.28)]',
    'focus-visible:ring-heritage-gold',
  ].join(' '),
  teal: [
    'bg-[#27C6C8] text-white',
    'shadow-[0_0_26px_rgba(39,198,200,0.16)]',
    'hover:shadow-[0_4px_32px_rgba(39,198,200,0.28)]',
    'focus-visible:ring-heritage-teal',
  ].join(' '),
};

export function HeritageCtaButton({
  href,
  label,
  variant = 'gold',
  className,
}: HeritageCtaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'heritage-cta-clip inline-flex h-[54px] w-full max-w-[320px] items-center justify-center',
        'whitespace-nowrap px-[34px] font-cinzel text-xs font-extrabold uppercase leading-none tracking-[0.14em]',
        'transition-[transform,box-shadow,filter] duration-200 ease-out motion-reduce:transition-none',
        'hover:-translate-y-0.5 hover:brightness-[1.08] active:translate-y-0 motion-reduce:hover:translate-y-0',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-black',
        'sm:min-w-[315px] sm:max-w-[340px] sm:w-auto',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      {label}
    </Link>
  );
}
