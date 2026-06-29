'use client';

import type { ReactNode } from 'react';
import { AdminSheet, type AdminSheetSize } from '@/components/admin/AdminSheet';

interface AdminModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  titleId?: string;
  maxWidthClass?: string;
  footer?: ReactNode;
}

const WIDTH_TO_SIZE: Record<string, AdminSheetSize> = {
  'max-w-md': 'md',
  'max-w-lg': 'md',
  'max-w-2xl': 'xl',
  'max-w-3xl': '2xl',
};

export function AdminModal({
  title,
  onClose,
  children,
  eyebrow,
  description,
  titleId,
  maxWidthClass = 'max-w-2xl',
  footer,
}: AdminModalProps) {
  const size = WIDTH_TO_SIZE[maxWidthClass] ?? 'lg';

  return (
    <AdminSheet
      open
      onClose={onClose}
      title={title}
      eyebrow={eyebrow}
      description={description}
      titleId={titleId}
      placement="center"
      size={size}
      footer={footer}
    >
      {children}
    </AdminSheet>
  );
}
