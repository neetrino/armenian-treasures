'use client';

import { useEffect, useState, type ReactNode } from 'react';

interface ClientMountedProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientMounted({ children, fallback = null }: ClientMountedProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return fallback;
  return children;
}
