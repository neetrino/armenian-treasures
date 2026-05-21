'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}

export function FadeUp({ children, className, delay = 0, amount = 0.25 }: FadeUpProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
