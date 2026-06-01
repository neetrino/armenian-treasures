'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AdminModal } from '@/components/admin/AdminModal';
import { CultureMenuForm } from '@/components/admin/CultureMenuForm';

interface CultureMenuCreateModalProps {
  parents: { id: string; title: string }[];
  defaultParentId?: string;
  parentTitle?: string;
  onClose: () => void;
}

export function CultureMenuCreateModal({
  parents,
  defaultParentId,
  parentTitle,
  onClose,
}: CultureMenuCreateModalProps) {
  const router = useRouter();
  const isChild = Boolean(defaultParentId);

  const handleSuccess = useCallback(() => {
    onClose();
    router.refresh();
  }, [onClose, router]);

  return (
    <AdminModal
      eyebrow="Culture menu"
      title={isChild ? 'Create child menu item' : 'Create menu item'}
      titleId="culture-menu-create-title"
      onClose={onClose}
      description={
        isChild && parentTitle ? (
          <>
            Under <span className="font-medium text-ink-soft">{parentTitle}</span>
          </>
        ) : undefined
      }
    >
      <CultureMenuForm
        mode="create"
        parents={parents}
        defaultParentId={defaultParentId}
        onSuccess={handleSuccess}
        onCancel={onClose}
      />
    </AdminModal>
  );
}
