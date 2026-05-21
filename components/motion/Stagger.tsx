'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul' | 'ol';
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  as = 'div',
}: StaggerProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : stagger } },
      }}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li';
}

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={cn(className)}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
        visible: reduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </Component>
  );
}
