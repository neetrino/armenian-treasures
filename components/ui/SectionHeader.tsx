import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from './Eyebrow';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-3xl text-center items-center' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-ink-soft sm:text-lg leading-relaxed">{description}</p>
      ) : null}
    </header>
  );
}
