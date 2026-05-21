import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'on-dark';
type Size = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-bronze-500 text-white hover:bg-bronze-600 shadow-sm hover:shadow transition',
  secondary:
    'bg-pomegranate text-white hover:bg-pomegranate-600 shadow-sm hover:shadow transition',
  ghost:
    'text-pomegranate hover:underline underline-offset-4 transition decoration-bronze-500',
  'on-dark':
    'bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-white/20 transition',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

interface ButtonBase {
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  children: ReactNode;
}

interface ButtonAsLink extends ButtonBase {
  href: string;
  external?: boolean;
}

type ButtonAsButton = ButtonBase &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBase>;

function baseClasses(variant: Variant, size: Size, className?: string): string {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide whitespace-nowrap',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow,
  className,
  children,
  ...props
}: ButtonAsButton) {
  return (
    <button {...props} className={baseClasses(variant, size, className)}>
      {children}
      {withArrow ? <ArrowRight size={16} aria-hidden /> : null}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  withArrow,
  className,
  external,
  children,
}: ButtonAsLink) {
  const classes = baseClasses(variant, size, className);
  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {children}
        {withArrow ? <ArrowRight size={16} aria-hidden /> : null}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {children}
      {withArrow ? <ArrowRight size={16} aria-hidden /> : null}
    </Link>
  );
}
