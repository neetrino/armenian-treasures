'use client';

import { useCallback, useState, type MouseEvent } from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AdminDeleteConfirmModal } from '@/components/admin/AdminDeleteConfirmModal';

interface DeleteIconButtonProps {
  action: (id: string) => Promise<void>;
  id: string;
  confirmTitle?: string;
  confirmMessage: string;
  ariaLabel?: string;
  className?: string;
}

export function DeleteIconButton({
  action,
  id,
  confirmTitle = 'Confirm deletion',
  confirmMessage,
  ariaLabel = 'Delete',
  className,
}: DeleteIconButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleConfirm = useCallback(async () => {
    await action(id);
  }, [action, id]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        aria-label={ariaLabel}
        className={cn(
          'inline-flex items-center justify-center rounded-md p-1.5 text-pomegranate transition hover:bg-pomegranate/10',
          className,
        )}
      >
        <Trash2 size={14} aria-hidden />
      </button>
      {isOpen ? (
        <AdminDeleteConfirmModal
          title={confirmTitle}
          message={confirmMessage}
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      ) : null}
    </>
  );
}
