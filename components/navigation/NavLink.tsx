'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { isNavActive, navLinkClassName } from './nav-styles';
import { useHeaderTheme } from '@/components/layout/header-theme';
import { navItemInteraction } from '@/components/layout/header-motion';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const theme = useHeaderTheme();
  const active = isNavActive(pathname, href);
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="inline-flex"
      {...(reduced ? {} : navItemInteraction)}
    >
      <Link
        href={href}
        className={navLinkClassName(active, className, theme)}
        aria-current={active ? 'page' : undefined}
      >
        {children}
      </Link>
    </motion.div>
  );
}
