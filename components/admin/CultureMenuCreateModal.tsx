'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { CultureMenuForm } from '@/components/admin/CultureMenuForm';

interface CultureMenuCreateModalProps {
  parents: { id: string; title: string }[];
  defaultParentId?: string;
  parentTitle?: string;
}

export function CultureMenuCreateModal({
  parents,
  defaultParentId,
  parentTitle,
}: CultureMenuCreateModalProps) {
  const router = useRouter();
  const isChild = Boolean(defaultParentId);

  const close = useCallback(() => {
    router.push('/admin/culture-menu');
  }, [router]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        onClick={close}
        aria-label="Close dialog"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="culture-menu-create-title"
        className="relative z-10 flex max-h-[min(90vh,900px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-stone-100 px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-eyebrow text-bronze-700">Culture menu</p>
            <h2 id="culture-menu-create-title" className="font-display text-xl text-ink sm:text-2xl">
              {isChild ? 'Add child item' : 'Add category'}
            </h2>
            {isChild && parentTitle ? (
              <p className="mt-1 text-sm text-ink-muted">
                Under <span className="font-medium text-ink-soft">{parentTitle}</span>
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-md p-1.5 text-ink-muted transition hover:bg-stone-100 hover:text-ink"
            aria-label="Close"
            title="Close"
          >
            <X size={18} aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">
          <CultureMenuForm
            mode="create"
            parents={parents}
            defaultParentId={defaultParentId}
          />
        </div>
      </div>
    </div>
  );
}
