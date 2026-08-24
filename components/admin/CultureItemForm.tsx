'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CultureItemEditorMetaBar } from '@/components/admin/culture-item-editor/CultureItemEditorMetaBar';
import { CultureItemEditorSectionsList } from '@/components/admin/culture-item-editor/CultureItemEditorSectionsList';
import { CultureItemEditorToolbar } from '@/components/admin/culture-item-editor/CultureItemEditorToolbar';
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
import { resolveCultureItemHref } from '@/lib/culture-item-url';

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
  const previewHref = initial?.slug && initial.status === 'PUBLISHED'
    ? resolveCultureItemHref(initial.slug)
    : undefined;
  const formHeading = heading ?? (mode === 'create' ? 'Add new grid card' : 'Edit grid card');

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

      <CultureItemEditorSectionsList
        sectionOrder={sectionOrder}
        onSectionOrderChange={handleSectionOrderChange}
        renderSection={renderSection}
      />

      <CultureItemFormBasicsSection
        initial={initial}
        menuOptions={menuOptions}
        lockedMenuItemId={lockedMenuItemId}
        fieldErrors={state.fieldErrors}
      />

      {state.status === 'error' && state.message ? (
        <p className="rounded-xl bg-pomegranate/10 px-4 py-3 text-sm text-pomegranate">{state.message}</p>
      ) : null}
    </form>
  );
}
