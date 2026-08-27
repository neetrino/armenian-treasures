'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CultureItemEditorMetaBar } from '@/components/admin/culture-item-editor/CultureItemEditorMetaBar';
import { CultureItemEditorSectionsList } from '@/components/admin/culture-item-editor/CultureItemEditorSectionsList';
import { CultureItemEditorToolbar } from '@/components/admin/culture-item-editor/CultureItemEditorToolbar';
import { CultureItemMenuField } from '@/components/admin/culture-item-editor/CultureItemMenuField';
import {
  CultureItemFormBasicsSection,
  CultureItemFormSectionContent,
} from '@/components/admin/culture-item-editor/CultureItemFormSectionContent';
import {
  createCultureItemAction,
  updateCultureItemAction,
  type CultureItemFormState,
} from '@/app/(admin)/admin/(panel)/culture-items/actions';
import { hydrateCultureItemMedia, type CultureItemMediaContent } from '@/lib/culture-item-media';
import { buildTabErrorMap } from '@/lib/i18n/translatable-content';
import { resolveCultureItemSectionOrder } from '@/lib/admin/culture-item-editor-sections';
import type { CultureItemEditorSectionId } from '@/lib/admin/culture-item-editor-sections';
import type { CultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';
import { resolveCultureItemPreviewHref } from '@/lib/culture-item-url';

interface MenuOption {
  id: string;
  title: string;
}

interface CultureItemFormProps {
  mode: 'create' | 'edit';
  itemId?: string;
  menuOptions: MenuOption[];
  lockedMenuItemId?: string;
  heading?: string;
  initial?: CultureItemFormInitial;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const INITIAL: CultureItemFormState = { status: 'idle' };

function formatFormError(state: CultureItemFormState): string | undefined {
  if (state.status !== 'error') return undefined;
  if (state.fieldErrors?.menuItemId) {
    return 'Pick a menu item before saving.';
  }
  if (state.fieldErrors?.['title.EN'] || state.fieldErrors?.title) {
    return 'Add an English title (at least 2 characters).';
  }
  return state.message ?? 'Please correct the form.';
}

export function CultureItemForm({
  mode,
  itemId,
  menuOptions,
  lockedMenuItemId,
  heading,
  initial,
  onSuccess,
  onCancel,
}: CultureItemFormProps) {
  const router = useRouter();
  const updateBound = itemId ? updateCultureItemAction.bind(null, itemId) : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createCultureItemAction,
    INITIAL,
  );
  const [media, setMedia] = useState<CultureItemMediaContent>(() =>
    hydrateCultureItemMedia({
      mediaContent: initial?.mediaContent,
      description: initial?.description,
      tourUrl: initial?.tourUrl,
      videoUrl: initial?.videoUrl,
      galleryImages: initial?.galleryImages,
    }),
  );
  const [latitude, setLatitude] = useState(initial?.latitude ?? '');
  const [longitude, setLongitude] = useState(initial?.longitude ?? '');
  const [isSaved, setIsSaved] = useState(mode === 'edit');
  const [sectionOrder, setSectionOrder] = useState<CultureItemEditorSectionId[]>(() =>
    resolveCultureItemSectionOrder(
      hydrateCultureItemMedia({
        mediaContent: initial?.mediaContent,
        description: initial?.description,
        tourUrl: initial?.tourUrl,
        videoUrl: initial?.videoUrl,
        galleryImages: initial?.galleryImages,
      }).sectionOrder,
    ),
  );

  useEffect(() => {
    if (state.status !== 'success') return;
    setIsSaved(true);
    if (mode === 'create' && state.itemId) {
      router.push(`/admin/culture-items/${state.itemId}`);
      return;
    }
    if (onSuccess) onSuccess();
    else router.refresh();
  }, [state.status, state.itemId, mode, onSuccess, router]);

  const tabErrors = buildTabErrorMap(state.fieldErrors);
  const previewHref = initial?.slug
    ? resolveCultureItemPreviewHref(initial.slug, initial.status)
    : undefined;
  const formHeading = heading ?? (mode === 'create' ? 'Add new grid card' : 'Edit grid card');
  const errorMessage = formatFormError(state);
  const hasBasicsErrors = Boolean(
    state.fieldErrors?.slug ||
      state.fieldErrors?.itemType ||
      state.fieldErrors?.region ||
      state.fieldErrors?.periodLabel ||
      state.fieldErrors?.century ||
      state.fieldErrors?.yearLabel ||
      state.fieldErrors?.order,
  );

  function patchMedia(patch: Partial<CultureItemMediaContent>): void {
    setMedia((current) => ({ ...current, ...patch }));
    setIsSaved(false);
  }

  function handleSectionOrderChange(order: CultureItemEditorSectionId[]): void {
    setSectionOrder(order);
    setMedia((current) => ({ ...current, sectionOrder: order }));
    setIsSaved(false);
  }

  function renderSection(sectionId: CultureItemEditorSectionId) {
    return (
      <CultureItemFormSectionContent
        sectionId={sectionId}
        initial={initial}
        fieldErrors={state.fieldErrors}
        media={media}
        latitude={latitude}
        longitude={longitude}
        onMediaChange={patchMedia}
        onLatitudeChange={(value) => {
          setLatitude(value);
          setIsSaved(false);
        }}
        onLongitudeChange={(value) => {
          setLongitude(value);
          setIsSaved(false);
        }}
      />
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <CultureItemEditorToolbar
        heading={formHeading}
        isPending={isPending}
        isSaved={isSaved}
        previewHref={previewHref}
        errorMessage={errorMessage}
        onCancel={onCancel}
      />

      <CultureItemEditorMetaBar
        title={initial?.title ?? ''}
        shortDescription={initial?.shortDescription ?? ''}
        statusDefault={initial?.status ?? 'DRAFT'}
        featuredOnCatalog={initial?.featuredOnCatalog ?? false}
        featuredOnHome={initial?.featuredOnHome ?? false}
        featuredOrder={initial?.featuredOrder}
        statusError={state.fieldErrors?.status}
        featuredOrderError={state.fieldErrors?.featuredOrder}
        fieldErrors={state.fieldErrors}
        tabErrors={tabErrors}
      />

      <CultureItemMenuField
        menuOptions={menuOptions}
        lockedMenuItemId={lockedMenuItemId}
        defaultValue={initial?.menuItemId ?? ''}
        error={state.fieldErrors?.menuItemId}
      />

      <CultureItemEditorSectionsList
        sectionOrder={sectionOrder}
        onSectionOrderChange={handleSectionOrderChange}
        renderSection={renderSection}
      />

      <CultureItemFormBasicsSection
        initial={initial}
        fieldErrors={state.fieldErrors}
        forceOpen={hasBasicsErrors}
      />
    </form>
  );
}
