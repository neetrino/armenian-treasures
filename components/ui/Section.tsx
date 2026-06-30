import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  bare?: boolean;
  bg?: 'default' | 'stone' | 'dark' | 'transparent';
  id?: string;
}

const BG_CLASSES: Record<NonNullable<SectionProps['bg']>, string> = {
  default: 'bg-parchment',
  stone: 'bg-parchment-200/40',
  dark: 'bg-midnight-900 text-parchment-200',
  transparent: '',
};

export function Section({
  children,
  className,
  bare = false,
  bg = 'default',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('heritage-section-py', BG_CLASSES[bg], className)}
    >
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}
