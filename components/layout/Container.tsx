import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'nav';
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn('container-page', className)}>{children}</Tag>;
}
