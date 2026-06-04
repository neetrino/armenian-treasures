'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { NavLink } from './NavLink';
import { PRIMARY_LINKS } from './primary-links';
import { AboutDropdown } from './AboutDropdown';
import { CultureDropdown } from './CultureDropdown';
import {
  headerStaggerContainer,
  headerStaggerItem,
} from '@/components/layout/header-motion';
import type { MenuNode } from '@/lib/culture-menu';

interface DesktopNavProps {
  menuTree: MenuNode[];
}

export function DesktopNav({ menuTree }: DesktopNavProps) {
  const visibleTree = menuTree.filter((node) => node.isActive);
  const reduced = useReducedMotion();

  return (
    <motion.nav
      aria-label="Primary"
      className="relative z-10 hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 lg:flex xl:gap-1"
      variants={headerStaggerContainer}
      initial={reduced ? false : 'hidden'}
      animate="show"
    >
      {PRIMARY_LINKS.slice(0, 1).map((link) => (
        <motion.div key={link.href} variants={headerStaggerItem} className="inline-flex">
          <NavLink href={link.href}>{link.label}</NavLink>
        </motion.div>
      ))}
      <motion.div variants={headerStaggerItem} className="inline-flex">
        <AboutDropdown />
      </motion.div>
      <motion.div variants={headerStaggerItem} className="inline-flex">
        <CultureDropdown tree={visibleTree} />
      </motion.div>
      {PRIMARY_LINKS.slice(1).map((link) => (
        <motion.div key={link.href} variants={headerStaggerItem} className="inline-flex">
          <NavLink href={link.href}>{link.label}</NavLink>
        </motion.div>
      ))}
    </motion.nav>
  );
}
