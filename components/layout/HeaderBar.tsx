'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Logo } from '@/components/brand/Logo';
import { DesktopNav } from '@/components/navigation/DesktopNav';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { LanguageSelector } from '@/components/navigation/LanguageSelector';
import { HeaderProfileButton } from '@/components/navigation/HeaderProfileButton';
import { HEADER_EASE } from '@/components/layout/header-motion';
import { useHeaderScrolled } from '@/components/layout/use-header-scrolled';
import type { HeaderMemberSummary } from '@/lib/auth/member-session';
import type { MenuNode } from '@/lib/culture-menu';
import type { MegaMenuColumn } from '@/lib/navigation/culture-mega-menu';
import type { NavDropdownLink } from '@/components/navigation/primary-links';
import { cn } from '@/lib/utils';

interface HeaderBarProps {
  menuTree: MenuNode[];
  cultureMegaMenu: MegaMenuColumn[];
  projectsMenu: NavDropdownLink[];
  foundationName: string;
  foundationSubtitle: string;
  member: HeaderMemberSummary | null;
}

export function HeaderBar({
  menuTree,
  cultureMegaMenu,
  projectsMenu,
  foundationName,
  foundationSubtitle: _foundationSubtitle,
  member,
}: HeaderBarProps) {
  const reduced = useReducedMotion();
  const scrolled = useHeaderScrolled();

  return (
    <motion.header
      data-site-header
      initial={reduced ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: HEADER_EASE }}
      className={cn(
        'fixed inset-x-0 top-0 z-[1000] isolate w-full overflow-visible border-b border-[rgba(201,168,76,0.14)] transition-[background-color,box-shadow] duration-300',
        scrolled && 'shadow-[0_4px_40px_rgba(0,0,0,0.75)]',
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 -z-20 backdrop-blur-[22px] backdrop-saturate-[1.4] transition-[background-color] duration-300',
            scrolled ? 'bg-[rgba(9,9,9,0.99)]' : 'bg-[rgba(9,9,9,0.9)]',
          )}
        />
      </div>

      <div className="relative mx-auto flex h-site-header w-full items-center justify-between gap-2 px-[clamp(1.25rem,2.6vw,3rem)] lg:px-12">
        <div className="flex min-w-0 flex-1 items-center gap-[clamp(1.125rem,1.45vw,2rem)]">
          <motion.div
            className="mr-1 flex shrink-0 items-center lg:mr-7"
            initial={reduced ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: HEADER_EASE, delay: 0.08 }}
          >
            <Logo variant="on-dark" title={foundationName} compact />
          </motion.div>

          <DesktopNav cultureMegaMenu={cultureMegaMenu} projectsMenu={projectsMenu} />
        </div>

        <motion.div
          className="ml-3 flex shrink-0 items-center gap-2 lg:ml-2"
          initial={reduced ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: HEADER_EASE, delay: 0.22 }}
        >
          <LanguageSelector className="hidden lg:inline-flex" />
          <HeaderProfileButton member={member} />
          <MobileMenu
            tree={menuTree}
            cultureMegaMenu={cultureMegaMenu}
            projectsMenu={projectsMenu}
            member={member}
          />
        </motion.div>
      </div>
    </motion.header>
  );
}
