'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeleteActionButtonProps {
  action: (id: string) => Promise<void>;
  id: string;
  label?: string;
  confirmText?: string;
  className?: string;
}

export function DeleteActionButton({
  action,
  id,
  label = 'Delete',
  confirmText = 'Are you sure?',
  className,
}: DeleteActionButtonProps) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (typeof window === 'undefined' || !window.confirm(confirmText)) return;
        startTransition(() => {
          void action(id);
        });
      }}
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-pomegranate hover:bg-pomegranate/10 disabled:opacity-50',
        className,
      )}
    >
      <Trash2 size={12} aria-hidden /> {label}
    </button>
  );
}
