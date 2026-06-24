'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { HEADER_EASE } from '@/components/layout/header-motion';
import { cn } from '@/lib/utils';

interface HeaderSupportCtaProps {
  compact?: boolean;
  className?: string;
  onNavigate?: () => void;
}

export function HeaderSupportCta({
  compact = false,
  className,
  onNavigate,
}: HeaderSupportCtaProps) {
  const reduced = useReducedMotion();

  const motionProps = reduced
    ? {}
    : {
        whileHover: { scale: 1.04, y: -1 },
        whileTap: { scale: 0.96 },
        transition: { type: 'spring' as const, stiffness: 420, damping: 26 },
      };

  if (compact) {
    return (
      <motion.div className="inline-flex lg:hidden" {...motionProps}>
        <Link
          href="/partnership"
          onClick={onNavigate}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2',
            'border border-bronze-500/40 bg-bronze-500/15 text-bronze-400 hover:bg-bronze-500/25 hover:text-parchment-50 focus-visible:ring-offset-[#0c0818]',
            className,
          )}
          aria-label="Support our mission"
        >
          <motion.span
            aria-hidden
            animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: HEADER_EASE }}
            className="inline-flex"
          >
            <Heart size={16} className="fill-bronze-500/25" />
          </motion.span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div className={cn('inline-flex', className)} {...motionProps}>
      <Link
        href="/partnership"
        onClick={onNavigate}
        className={cn(
          'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2',
          'border border-bronze-500/45 bg-bronze-500/15 text-parchment-50 shadow-[0_4px_24px_-8px_rgba(200,132,61,0.35)] hover:border-bronze-400/60 hover:bg-bronze-500/25 focus-visible:ring-offset-[#0c0818]',
        )}
      >
        <motion.span
          aria-hidden
          className="inline-flex"
          animate={reduced ? undefined : { scale: [1, 1.1, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: HEADER_EASE }}
        >
          <Heart size={14} className="fill-bronze-500/30 text-bronze-400" />
        </motion.span>
        Support Our Mission
      </Link>
    </motion.div>
  );
}
