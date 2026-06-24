'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { isNavActive, navLinkClassName } from './nav-styles';
import { useHeaderTheme } from '@/components/layout/header-theme';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const theme = useHeaderTheme();
  const active = isNavActive(pathname, href);

  return (
    <Link
      href={href}
      className={navLinkClassName(active, className, theme)}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
