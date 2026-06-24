'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { isNavActive, navLinkClassName } from './nav-styles';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const active = isNavActive(pathname, href);

  return (
    <Link
      href={href}
      className={navLinkClassName(active, className)}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
