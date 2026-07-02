'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

interface AdminMotionDisabledProps {
  children: ReactNode;
}

export function AdminMotionDisabled({ children }: AdminMotionDisabledProps) {
  return <MotionConfig reducedMotion="always">{children}</MotionConfig>;
}
