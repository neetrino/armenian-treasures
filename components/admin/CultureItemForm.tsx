'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { GalleryImagesField } from '@/components/forms/fields/GalleryImagesField';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { TranslatableFieldsTabs } from '@/components/admin/TranslatableFieldsTabs';
import { AdminHelpCallout } from '@/components/admin/AdminHelpCallout';
import { Button } from '@/components/ui/Button';
import {
  createCultureItemAction,
  updateCultureItemAction,
  type CultureItemFormState,
} from '@/app/(admin)/admin/(panel)/culture-items/actions';
import {
  CULTURE_ITEM_TYPE_OPTIONS,
  CULTURE_MAP_TYPE_OPTIONS,
  CULTURE_STATUS_OPTIONS,
} from '@/lib/admin/enum-labels';
import {
  buildTabErrorMap,
  decodeTranslatableText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

interface MenuOption {
  id: string;
  title: string;
}

interface Initial {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  menuItemId: string;
  region: string;
  locationName: string;
  periodLabel: string;
  century: string;
  yearLabel: string;
  image: string;
  galleryImages: string[];
  tourUrl: string;
  videoUrl: string;
  latitude: string;
  longitude: string;
  mapType: string;
  showOnMap: boolean;
  itemType: string;
  status: string;
  order: number;
}

interface CultureItemFormProps {
  mode: 'create' | 'edit';
  itemId?: string;
  menuOptions: MenuOption[];
  initial?: Initial;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const INITIAL: CultureItemFormState = { status: 'idle' };

export function CultureItemForm({
  mode,
  itemId,
  menuOptions,
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

  useEffect(() => {
    if (state.status === 'success') {
      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    }
  }, [state.status, onSuccess, router]);

  const titleValues = decodeTranslatableText(initial?.title ?? '');
  const shortDescriptionValues = decodeTranslatableText(initial?.shortDescription ?? '');
  const descriptionValues = decodeTranslatableText(initial?.description ?? '');
  const tabErrors = buildTabErrorMap(state.fieldErrors);
  const valueFor = (values: LocaleTextMap, locale: SiteLocaleCode): string => values[locale] ?? '';

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <AdminHelpCallout title="Culture entry">
        Fill in the basics first, then add images and map coordinates. Use <strong>Publication status</strong>{' '}
        to control whether visitors can see this entry.
      </AdminHelpCallout>

      <AdminFormSection title="Basics" description="Title, category, location, and main image.">
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
            <TextareaField
              label="Description"
              name={`description.${locale}`}
              rows={6}
              defaultValue={valueFor(descriptionValues, locale)}
              error={state.fieldErrors?.[`description.${locale}`]}
            />
          </div>
        )}
      </TranslatableFieldsTabs>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Slug"
          name="slug"
          defaultValue={initial?.slug ?? ''}
          hint="Lowercase, hyphenated. Leave empty to derive from title."
          error={state.fieldErrors?.slug}
        />
        <SelectField
          label="Menu item"
          name="menuItemId"
          required
          options={[
            { value: '', label: 'Select a menu item…', disabled: true },
            ...menuOptions.map((m) => ({ value: m.id, label: m.title })),
          ]}
          defaultValue={initial?.menuItemId ?? ''}
          error={state.fieldErrors?.menuItemId}
        />
        <SelectField
          label="Item type"
          name="itemType"
          options={CULTURE_ITEM_TYPE_OPTIONS}
          defaultValue={initial?.itemType ?? 'OTHER'}
          error={state.fieldErrors?.itemType}
        />
        <TextField
          label="Region"
          name="region"
          defaultValue={initial?.region ?? ''}
          error={state.fieldErrors?.region}
        />
        <TextField
          label="Location name"
          name="locationName"
          defaultValue={initial?.locationName ?? ''}
          error={state.fieldErrors?.locationName}
        />
        <TextField
          label="Period label"
          name="periodLabel"
          defaultValue={initial?.periodLabel ?? ''}
          hint='e.g. "9th c." or "782 BC"'
          error={state.fieldErrors?.periodLabel}
        />
        <TextField
          label="Century (negative for BC)"
          name="century"
          type="number"
          defaultValue={initial?.century ?? ''}
          error={state.fieldErrors?.century}
        />
        <TextField
          label="Year label"
          name="yearLabel"
          defaultValue={initial?.yearLabel ?? ''}
          error={state.fieldErrors?.yearLabel}
        />
        <TextField
          label="Order"
          name="order"
          type="number"
          min={0}
          defaultValue={initial?.order ?? 0}
          error={state.fieldErrors?.order}
        />
        <AdminImageDropzoneField
          label="Main image"
          name="image"
          folder="culture"
          layout="card"
          defaultValue={initial?.image ?? ''}
          error={state.fieldErrors?.image}
        />
        <SelectField
          label="Publication status"
          name="status"
          options={CULTURE_STATUS_OPTIONS}
          defaultValue={initial?.status ?? 'PUBLISHED'}
          error={state.fieldErrors?.status}
        />
      </div>
      </AdminFormSection>

      <AdminFormSection title="Photo gallery" description="Additional images shown on the detail page.">
      <GalleryImagesField
        defaultValue={initial?.galleryImages ?? []}
        error={state.fieldErrors?.galleryImages}
      />
      </AdminFormSection>

      <AdminFormSection title="Map & media" description="Coordinates for the public map and optional 3D tour or video links.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Latitude"
            name="latitude"
            type="number"
            step="any"
            defaultValue={initial?.latitude ?? ''}
            error={state.fieldErrors?.latitude}
          />
          <TextField
            label="Longitude"
            name="longitude"
            type="number"
            step="any"
            defaultValue={initial?.longitude ?? ''}
            error={state.fieldErrors?.longitude}
          />
          <SelectField
            label="Map pin style"
            name="mapType"
            options={[{ value: '', label: '— None —' }, ...CULTURE_MAP_TYPE_OPTIONS]}
            defaultValue={initial?.mapType ?? ''}
            error={state.fieldErrors?.mapType}
          />
          <label className="flex items-center gap-2 pt-7 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="showOnMap"
              defaultChecked={initial?.showOnMap ?? false}
              className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
            />
            Show on public map
          </label>
          <TextField
            label="Matterport / 3D Tour URL"
            name="tourUrl"
            type="url"
            placeholder="https://my.matterport.com/show/?m=XXXX"
            hint="Paste a Matterport show link or any external 3D tour URL."
            defaultValue={initial?.tourUrl ?? ''}
            error={state.fieldErrors?.tourUrl}
          />
          <TextField
            label="Video URL"
            name="videoUrl"
            defaultValue={initial?.videoUrl ?? ''}
            error={state.fieldErrors?.videoUrl}
          />
        </div>
      </AdminFormSection>

      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">
          {state.message}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} withArrow>
          {isPending ? 'Saving…' : mode === 'create' ? 'Create item' : 'Save changes'}
        </Button>
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
