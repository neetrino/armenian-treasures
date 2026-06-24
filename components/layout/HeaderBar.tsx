'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Logo } from '@/components/brand/Logo';
import { DesktopNav } from '@/components/navigation/DesktopNav';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { LanguageSelector } from '@/components/navigation/LanguageSelector';
import { HEADER_EASE } from '@/components/layout/header-motion';
import type { MenuNode } from '@/lib/culture-menu';

interface HeaderBarProps {
  menuTree: MenuNode[];
  foundationName: string;
  foundationSubtitle: string;
}

export function HeaderBar({
  menuTree,
  foundationName,
  foundationSubtitle,
}: HeaderBarProps) {
  const reduced = useReducedMotion();

  return (
    <motion.header
      data-site-header
      initial={reduced ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: HEADER_EASE }}
      className="fixed inset-x-0 top-0 z-[1000] isolate w-full overflow-visible border-b border-[rgba(214,184,90,0.16)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[rgba(2,4,3,0.96)] backdrop-blur-[10px]" />
      </div>

      <div className="relative mx-auto flex h-site-header w-full items-center justify-between gap-2 px-[clamp(1.25rem,2.6vw,3rem)]">
        <div className="flex min-w-0 flex-1 items-center gap-[clamp(1.125rem,1.45vw,2rem)]">
          <motion.div
            className="flex shrink-0 items-center"
            initial={reduced ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: HEADER_EASE, delay: 0.08 }}
          >
            <Logo
              variant="on-dark"
              title={foundationName}
              subtitle={foundationSubtitle}
              compact
            />
          </motion.div>

          <DesktopNav />
        </div>

        <motion.div
          className="ml-3 flex shrink-0 items-center gap-2 lg:ml-6"
          initial={reduced ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: HEADER_EASE, delay: 0.22 }}
        >
          <LanguageSelector className="hidden lg:inline-flex" />
          <MobileMenu tree={menuTree} />
        </motion.div>
      </div>
    </motion.header>
  );
}
