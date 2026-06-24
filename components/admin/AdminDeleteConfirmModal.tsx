'use client';

import { useTransition } from 'react';
import { AdminModal } from '@/components/admin/AdminModal';
import { Button } from '@/components/ui/Button';

interface AdminDeleteConfirmModalProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function AdminDeleteConfirmModal({
  title,
  message,
  onClose,
  onConfirm,
}: AdminDeleteConfirmModalProps) {
  const [pending, startTransition] = useTransition();

  const handleConfirm = (): void => {
    startTransition(() => {
      void onConfirm().then(() => onClose());
    });
  };

  return (
    <AdminModal title={title} onClose={onClose} maxWidthClass="max-w-md">
      <p className="text-sm text-ink-soft">{message}</p>
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
