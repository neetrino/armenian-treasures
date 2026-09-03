'use client';

import { useRouter } from 'next/navigation';
import { AdminSheet } from '@/components/admin/AdminSheet';
import { CultureItemForm } from '@/components/admin/CultureItemForm';
import type { CultureCatalogEntryAdmin } from '@/lib/admin/culture-catalog-entry';
import type { CultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';

type SheetMode =
  | { type: 'edit'; entry: CultureCatalogEntryAdmin; index: number }
  | { type: 'create' };

interface CultureCatalogEntrySheetProps {
  open: boolean;
  onClose: () => void;
  mode: SheetMode | null;
  menuItemId: string;
  pageLabel: string;
  nextOrder: number;
}

function createDraftInitial(menuItemId: string, order: number): CultureItemFormInitial {
  return {
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    menuItemId,
    region: '',
    locationName: '',
    periodLabel: '',
    century: '',
    yearLabel: '',
    image: '',
    coverImage: '',
    cardBackgroundColor: '',
    cardBackgroundImage: '',
    galleryImages: [],
    tourUrl: '',
    videoUrl: '',
    mediaContent: null,
    mapUrl: '',
    mapType: '',
    showOnMap: false,
    featuredOnHome: false,
    featuredOnCatalog: false,
    featuredOrder: null,
    itemType: 'MONUMENT',
    status: 'DRAFT',
    order,
  };
}

export function CultureCatalogEntrySheet({
  open,
  onClose,
  mode,
  menuItemId,
  pageLabel,
  nextOrder,
}: CultureCatalogEntrySheetProps) {
  const router = useRouter();
  if (!open || !mode) return null;

  const isEdit = mode.type === 'edit';
  const entry = isEdit ? mode.entry : null;
  const cardNumber = isEdit ? String(mode.index + 1).padStart(2, '0') : null;

  return (
    <AdminSheet
      open
      onClose={onClose}
      eyebrow={isEdit ? `Grid card ${cardNumber}` : 'New entry'}
      title={isEdit ? entry?.title ?? 'Edit grid card' : 'Add new grid card'}
      description="White card editor — same structure as the grid-card mockup."
      size="2xl"
    >
      <CultureItemForm
        key={isEdit && entry ? entry.id : 'create'}
        mode={isEdit ? 'edit' : 'create'}
        itemId={entry?.id}
        heading={isEdit ? 'Edit grid card' : 'Add new grid card'}
        menuOptions={[{ id: menuItemId, title: pageLabel }]}
        lockedMenuItemId={menuItemId}
        initial={isEdit && entry ? entry.formInitial : createDraftInitial(menuItemId, nextOrder)}
        onSuccess={() => {
          onClose();
          router.refresh();
        }}
        onCancel={onClose}
      />
    </AdminSheet>
  );
}
