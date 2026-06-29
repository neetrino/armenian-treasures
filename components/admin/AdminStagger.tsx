import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AdminStaggerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'ul';
}

export function AdminStagger({ children, className, as: Tag = 'div' }: AdminStaggerProps) {
  return (
    <Tag
      className={cn(
        '[&>*]:motion-safe:animate-admin-fade-up [&>*]:motion-reduce:animate-none',
        '[&>*:nth-child(1)]:[animation-delay:0ms] [&>*:nth-child(2)]:[animation-delay:60ms] [&>*:nth-child(3)]:[animation-delay:120ms]',
        '[&>*:nth-child(4)]:[animation-delay:180ms] [&>*:nth-child(5)]:[animation-delay:240ms] [&>*:nth-child(6)]:[animation-delay:300ms]',
        '[&>*:nth-child(7)]:[animation-delay:360ms] [&>*:nth-child(8)]:[animation-delay:420ms]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
