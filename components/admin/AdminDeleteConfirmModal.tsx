'use client';

import { useState, useTransition } from 'react';
import { AdminModal } from '@/components/admin/AdminModal';
import { Button } from '@/components/ui/Button';
import type { AdminDeleteResult } from '@/lib/admin/action-result';

interface AdminDeleteConfirmModalProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => Promise<AdminDeleteResult | void>;
}

export function AdminDeleteConfirmModal({
  title,
  message,
  onClose,
  onConfirm,
}: AdminDeleteConfirmModalProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = (): void => {
    setError(null);
    startTransition(() => {
      void onConfirm().then((result) => {
        if (result && !result.ok) {
          setError(result.message);
          return;
        }
        onClose();
      });
    });
  };

  return (
    <AdminModal title={title} onClose={onClose} maxWidthClass="max-w-md">
      <p className="text-sm text-ink-soft">{message}</p>
      {error ? (
        <p className="mt-3 rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{error}</p>
      ) : null}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="button" variant="primary" disabled={pending} onClick={handleConfirm}>
          {pending ? 'Deleting…' : 'Delete'}
        </Button>
        <Button type="button" variant="ghost" disabled={pending} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </AdminModal>
  );
}
