'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import type { HomeSectionId } from '@/lib/navigation/home-sections';
import { useHomeSectionNav } from '@/components/navigation/useHomeSectionNav';
import { isNavActive, navLinkClassName } from './nav-styles';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  homeSectionId?: HomeSectionId;
  onNavigate?: () => void;
}

export function NavLink({ href, children, className, homeSectionId, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = isNavActive(pathname, href);
  const { handleHomeSectionClick } = useHomeSectionNav({
    homeSectionId,
    onScroll: onNavigate,
  });

  return (
    <Link
      href={href}
      className={navLinkClassName(active, className)}
      aria-current={active ? 'page' : undefined}
      onClick={handleHomeSectionClick}
    >
      {children}
    </Link>
  );
}
