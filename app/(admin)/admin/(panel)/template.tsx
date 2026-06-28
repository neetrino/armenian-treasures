'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function AdminPanelTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="motion-safe:animate-admin-fade-up motion-reduce:animate-none flex min-h-0 min-w-0 flex-1 flex-col"
    >
      {children}
    </div>
  );
}
