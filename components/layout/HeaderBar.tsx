'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Container } from './Container';
import { Logo } from '@/components/brand/Logo';
import { DesktopNav } from '@/components/navigation/DesktopNav';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { HeaderSupportCta } from '@/components/navigation/HeaderSupportCta';
import { useHeaderTheme } from '@/components/layout/header-theme';
import { HEADER_EASE } from '@/components/layout/header-motion';
import { cn } from '@/lib/utils';
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
  const theme = useHeaderTheme();
  const isSolid = theme === 'solid';
  const reduced = useReducedMotion();

  return (
    <motion.header
      data-site-header
      initial={reduced ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: HEADER_EASE }}
      className="fixed inset-x-0 top-0 z-[100] isolate w-full overflow-visible border-b text-parchment-50"
      style={{
        borderColor: isSolid ? 'rgba(214, 202, 186, 0.75)' : 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-20 backdrop-blur-sm supports-[backdrop-filter]:bg-[#0c0818]/6"
          animate={{
            opacity: isSolid ? 0 : 1,
            backgroundColor: 'rgba(12, 8, 24, 0.1)',
          }}
          transition={{ duration: 0.4, ease: HEADER_EASE }}
        />
        <motion.div
          className="absolute inset-0 -z-20 backdrop-blur-md supports-[backdrop-filter]:bg-parchment/90"
          animate={{
            opacity: isSolid ? 1 : 0,
            backgroundColor: 'rgba(250, 246, 238, 0.95)',
          }}
          transition={{ duration: 0.4, ease: HEADER_EASE }}
        />

        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            boxShadow: isSolid
              ? '0 4px 24px -12px rgba(26, 23, 20, 0.08)'
              : '0 4px 24px -12px rgba(0, 0, 0, 0.35)',
          }}
          transition={{ duration: 0.4, ease: HEADER_EASE }}
        />

        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-bronze-500/50 to-transparent"
          animate={{
            opacity: isSolid ? 0.55 : 0,
            scaleX: isSolid ? 1 : 0.35,
          }}
          transition={{ duration: 0.45, ease: HEADER_EASE }}
        />
      </div>

      <Container className="relative flex h-[4.5rem] items-center justify-between gap-3 sm:h-[4.75rem] sm:gap-4 lg:h-[5.5rem] lg:gap-6 xl:h-24">
        <motion.div
          className="shrink-0"
          initial={reduced ? false : { opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: HEADER_EASE, delay: 0.08 }}
          whileHover={reduced ? undefined : { scale: 1.02 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          <Logo
            variant={isSolid ? 'on-light' : 'on-dark'}
            title={foundationName}
            subtitle={foundationSubtitle}
          />
        </motion.div>

        <motion.div
          className="relative z-20 hidden min-w-0 flex-1 lg:flex lg:justify-center lg:px-2 xl:px-4"
          initial={reduced ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: HEADER_EASE, delay: 0.16 }}
        >
          <DesktopNav menuTree={menuTree} />
        </motion.div>

        <motion.div
          className={cn(
            'relative z-10 flex shrink-0 items-center gap-2 sm:gap-3',
            isSolid ? 'text-ink' : 'text-parchment-50',
          )}
          initial={reduced ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: HEADER_EASE, delay: 0.22 }}
        >
          <HeaderSupportCta className="hidden lg:inline-flex" />
          <HeaderSupportCta compact />
          <MobileMenu tree={menuTree} />
        </motion.div>
      </Container>
    </motion.header>
  );
}
