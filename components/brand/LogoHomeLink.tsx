'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode, MouseEvent } from 'react';

interface LogoHomeLinkProps {
  className?: string;
  ariaLabel: string;
  children: ReactNode;
}

export function LogoHomeLink({ className, ariaLabel, children }: LogoHomeLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/') return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Link href="/" className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}
