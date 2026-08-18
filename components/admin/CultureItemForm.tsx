'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { TextField } from '@/components/forms/fields/TextField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { TranslatableFieldsTabs } from '@/components/admin/TranslatableFieldsTabs';
import { CultureItemCardBackgroundFields } from '@/components/admin/CultureItemCardBackgroundFields';
import { CultureItemFeaturedFields } from '@/components/admin/CultureItemFeaturedFields';
import { CultureItemFormToolbar } from '@/components/admin/culture-item-editor/CultureItemFormToolbar';
import { CultureItemBasicsFields } from '@/components/admin/culture-item-editor/CultureItemBasicsFields';
import { CultureItemDescriptionBlocksField } from '@/components/admin/culture-item-editor/CultureItemDescriptionBlocksField';
import { CultureItemToursField } from '@/components/admin/culture-item-editor/CultureItemToursField';
import { CultureItemVideosField } from '@/components/admin/culture-item-editor/CultureItemVideosField';
import { CultureItemGalleryBlocksField } from '@/components/admin/culture-item-editor/CultureItemGalleryBlocksField';
import { AdminLocationMapField } from '@/components/admin/culture-item-editor/AdminLocationMapField';
import {
  createCultureItemAction,
  updateCultureItemAction,
  type CultureItemFormState,
} from '@/app/(admin)/admin/(panel)/culture-items/actions';
import { CULTURE_STATUS_OPTIONS } from '@/lib/admin/enum-labels';
import { hydrateCultureItemMedia } from '@/lib/culture-item-media';
import {
  buildTabErrorMap,
  decodeTranslatableText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
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
  const [media, setMedia] = useState(() =>
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

  useEffect(() => {
    if (state.status === 'success') {
      if (onSuccess) onSuccess();
      else router.refresh();
    }
  }, [state.status, onSuccess, router]);

  const titleValues = decodeTranslatableText(initial?.title ?? '');
  const shortDescriptionValues = decodeTranslatableText(initial?.shortDescription ?? '');
  const tabErrors = buildTabErrorMap(state.fieldErrors);
  const valueFor = (values: LocaleTextMap, locale: SiteLocaleCode): string => values[locale] ?? '';
  const previewHref = initial?.slug && initial.status === 'PUBLISHED'
    ? resolveCultureItemHref(initial.slug)
    : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <CultureItemFormToolbar
        heading={heading ?? (mode === 'create' ? 'Add new grid card' : 'Edit grid card')}
        isPending={isPending}
        previewHref={previewHref}
        onCancel={onCancel}
      />

      <TranslatableFieldsTabs tabErrors={tabErrors}>
        {(locale) => (
          <div className="grid gap-5">
            <TextField
              label="Title"
              name={`title.${locale}`}
              required={locale === 'EN'}
              defaultValue={valueFor(titleValues, locale)}
              error={state.fieldErrors?.[`title.${locale}`]}
            />
            <TextareaField
              label="Short description"
              name={`shortDescription.${locale}`}
              rows={2}
              defaultValue={valueFor(shortDescriptionValues, locale)}
              error={state.fieldErrors?.[`shortDescription.${locale}`]}
            />
          </div>
        )}
      </TranslatableFieldsTabs>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Status"
          name="status"
          options={CULTURE_STATUS_OPTIONS}
          defaultValue={initial?.status ?? 'DRAFT'}
          error={state.fieldErrors?.status}
        />
      </div>
      <CultureItemFeaturedFields
        featuredOnHome={initial?.featuredOnHome ?? false}
        featuredOnCatalog={initial?.featuredOnCatalog ?? false}
        featuredOrder={initial?.featuredOrder}
        featuredOrderError={state.fieldErrors?.featuredOrder}
      />
      <CultureItemCardBackgroundFields
        colorDefaultValue={initial?.cardBackgroundColor ?? ''}
        imageDefaultValue={initial?.cardBackgroundImage ?? ''}
        colorError={state.fieldErrors?.cardBackgroundColor}
        imageError={state.fieldErrors?.cardBackgroundImage}
      />

      <AdminFormSection title="1. Card Image" description="JPG, PNG, or WEBP. Maximum 10MB." tone="white">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminImageDropzoneField
            label="Card photo"
            name="image"
            folder="culture"
            layout="card"
            defaultValue={initial?.image ?? ''}
            hint="Shown on catalog cards."
            error={state.fieldErrors?.image}
          />
          <AdminImageDropzoneField
            label="Cover image"
            name="coverImage"
            folder="culture"
            layout="banner"
            defaultValue={initial?.coverImage ?? ''}
            hint="Hero / cover on the article page."
            error={state.fieldErrors?.coverImage}
          />
        </div>
      </AdminFormSection>

      <AdminFormSection title="Basics" description="Category, slug, and catalog metadata.">
        <CultureItemBasicsFields
          initial={initial}
          menuOptions={menuOptions}
          lockedMenuItemId={lockedMenuItemId}
          fieldErrors={state.fieldErrors}
        />
      </AdminFormSection>

      <AdminFormSection title="2. Description blocks" description="Add as many title, subtitle, text, and image blocks as you need." tone="white">
        <CultureItemDescriptionBlocksField
          blocks={media.blocks}
          onChange={(blocks) => setMedia((current) => ({ ...current, blocks }))}
        />
      </AdminFormSection>

      <AdminFormSection title="3. Map" description="Location name, address, and a draggable pin." tone="white">
        <AdminLocationMapField
          locationName={initial?.locationName}
          address={media.address}
          latitude={latitude}
          longitude={longitude}
          mapType={initial?.mapType}
          showOnMap={initial?.showOnMap}
          fieldErrors={state.fieldErrors}
          onLatitudeChange={setLatitude}
          onLongitudeChange={setLongitude}
        />
      </AdminFormSection>

      <AdminFormSection title="4. Virtual Tour" description="Unlimited LiDAR, Matterport, or other 3D tour embeds." tone="white">
        <CultureItemToursField
          tours={media.tours}
          onChange={(tours) => setMedia((current) => ({ ...current, tours }))}
        />
      </AdminFormSection>

      <AdminFormSection title="5. Videos" description="Unlimited MP4, YouTube, or Vimeo links." tone="white">
        <CultureItemVideosField
          videos={media.videos}
          onChange={(videos) => setMedia((current) => ({ ...current, videos }))}
        />
      </AdminFormSection>

      <AdminFormSection title="6. Gallery" description="Images or Before/After pairs, each with caption and alt text." tone="white">
        <CultureItemGalleryBlocksField
          items={media.gallery}
          onChange={(gallery) => setMedia((current) => ({ ...current, gallery }))}
        />
      </AdminFormSection>

      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
    </form>
  );
}
