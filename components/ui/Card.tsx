import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}

export function Card({ children, className, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-card transition duration-250 ease-cinematic hover:-translate-y-1 hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
