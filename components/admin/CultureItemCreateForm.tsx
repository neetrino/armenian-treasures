'use client';

import { useRouter } from 'next/navigation';
import { CultureItemForm } from '@/components/admin/CultureItemForm';
import type { CultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';

interface MenuOption {
  id: string;
  title: string;
}

interface CultureItemCreateFormProps {
  menuOptions: MenuOption[];
  lockedMenuItemId?: string;
}

function createDraftInitial(menuItemId: string): CultureItemFormInitial {
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
    order: 0,
  };
}

export function CultureItemCreateForm({
  menuOptions,
  lockedMenuItemId,
}: CultureItemCreateFormProps) {
  const router = useRouter();

  return (
    <CultureItemForm
      mode="create"
      menuOptions={menuOptions}
      lockedMenuItemId={lockedMenuItemId}
      heading="Create culture item"
      initial={lockedMenuItemId ? createDraftInitial(lockedMenuItemId) : undefined}
      onCancel={() => router.push('/admin/culture-items')}
    />
  );
}
