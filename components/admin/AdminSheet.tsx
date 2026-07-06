'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AdminSheetPlacement = 'right' | 'center';
export type AdminSheetSize = 'md' | 'lg' | 'xl' | '2xl';

interface AdminSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  footer?: ReactNode;
  titleId?: string;
  placement?: AdminSheetPlacement;
  size?: AdminSheetSize;
  icon?: ReactNode;
}

const RIGHT_SIZE_CLASSES: Record<AdminSheetSize, string> = {
  md: 'sm:w-[min(32rem,100%)]',
  lg: 'sm:w-[min(44rem,94vw)]',
  xl: 'sm:w-[min(56rem,96vw)]',
  '2xl': 'sm:w-[min(68rem,96vw)]',
};

const CENTER_SIZE_CLASSES: Record<AdminSheetSize, string> = {
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-3xl',
  xl: 'sm:max-w-5xl',
  '2xl': 'sm:max-w-6xl',
};

export function AdminSheet({
  open,
  onClose,
  title,
  children,
  eyebrow,
  description,
  footer,
  titleId = 'admin-sheet-title',
  placement = 'right',
  size = '2xl',
  icon,
}: AdminSheetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const isCenter = placement === 'center';

  const sheetNode = (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60] flex" role="presentation">
          <motion.button
            type="button"
            className="absolute inset-0 bg-ink/55 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              'relative z-10 flex flex-col overflow-hidden bg-parchment-50 shadow-[0_0_80px_-12px_rgba(28,25,23,0.45)]',
              isCenter
                ? cn(
                    'm-auto h-auto max-h-[min(92vh,960px)] w-[min(100%,96vw)] rounded-3xl border border-stone-200/80',
                    CENTER_SIZE_CLASSES[size],
                  )
                : cn(
                    'ml-auto h-full w-full rounded-l-3xl border-l border-stone-200/90',
                    RIGHT_SIZE_CLASSES[size],
                  ),
            )}
            initial={isCenter ? { opacity: 0, scale: 0.96, y: 12 } : { x: '100%' }}
            animate={isCenter ? { opacity: 1, scale: 1, y: 0 } : { x: 0 }}
            exit={isCenter ? { opacity: 0, scale: 0.96, y: 12 } : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 34 }}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-bronze-400 via-pomegranate to-bronze-600" />

            <div className="relative shrink-0 overflow-hidden border-b border-stone-200/70 bg-gradient-to-br from-parchment-100 via-white to-bronze-50/60 px-8 py-7 sm:px-10">
          <div
            className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-bronze-300/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-6 -top-10 h-44 w-44 rounded-full bg-pomegranate/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgb(120 90 40) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden
          />

          <div className="relative flex items-start justify-between gap-6">
            <div className="flex min-w-0 items-start gap-4">
              {icon ? (
                <span className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pomegranate/15 to-bronze-100 text-pomegranate shadow-sm ring-1 ring-bronze-200/60">
                  {icon}
                </span>
              ) : null}
              <div className="min-w-0">
                {eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bronze-700">
                    {eyebrow}
                  </p>
                ) : null}
                <h2 id={titleId} className="font-display text-2xl text-ink sm:text-3xl lg:text-[2rem]">
                  {title}
                </h2>
                {description ? (
                  <div className="mt-2 max-w-2xl text-base leading-relaxed text-ink-muted">{description}</div>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-stone-200 bg-white p-2.5 text-ink-muted shadow-sm transition hover:border-stone-300 hover:bg-stone-50 hover:text-ink"
              aria-label="Close"
            >
              <X size={20} aria-hidden />
            </button>
          </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col bg-white">
              <div className="flex-1 overflow-x-hidden overflow-y-auto px-8 py-8 sm:px-10 sm:py-9">{children}</div>
              {footer ? (
                <div className="shrink-0 border-t border-stone-200/80 bg-gradient-to-t from-parchment-50 to-white px-8 py-5 sm:px-10">
                  {footer}
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(sheetNode, document.body);
}
