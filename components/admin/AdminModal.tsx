'use client';

import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  titleId?: string;
  maxWidthClass?: string;
}

export function AdminModal({
  title,
  onClose,
  children,
  eyebrow,
  description,
  titleId = 'admin-modal-title',
  maxWidthClass = 'max-w-2xl',
}: AdminModalProps) {
  useEffect(() => {
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
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'relative z-10 flex max-h-[min(90vh,900px)] w-full flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-xl',
          maxWidthClass,
        )}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-stone-100 px-6 py-4">
          <div>
            {eyebrow ? (
              <p className="text-[11px] uppercase tracking-eyebrow text-bronze-700">{eyebrow}</p>
            ) : null}
            <h2 id={titleId} className="font-display text-xl text-ink sm:text-2xl">
              {title}
            </h2>
            {description ? <div className="mt-1 text-sm text-ink-muted">{description}</div> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-ink-muted transition hover:bg-stone-100 hover:text-ink"
            aria-label="Close"
            title="Close"
          >
            <X size={18} aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
