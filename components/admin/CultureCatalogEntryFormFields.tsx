'use client';

import { PageContentImageField } from '@/components/admin/page-content/PageContentImageField';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { CULTURE_STATUS_OPTIONS } from '@/lib/admin/enum-labels';
import type { CultureCatalogEntryFormState } from '@/app/(admin)/admin/(panel)/culture-pages/actions';

interface CultureCatalogEntryFormFieldsProps {
  image: string;
  onImageChange: (url: string) => void;
  defaultValues?: {
    title?: string;
    order?: number;
    region?: string;
    periodLabel?: string;
    tourUrl?: string;
    status?: string;
    description?: string;
  };
  fieldErrors?: CultureCatalogEntryFormState['fieldErrors'];
  orderHidden?: number;
}

export function CultureCatalogEntryFormFields({
  image,
  onImageChange,
  defaultValues,
  fieldErrors,
  orderHidden,
}: CultureCatalogEntryFormFieldsProps) {
  return (
    <div className="flex flex-col gap-5">
      <input type="hidden" name="image" value={image} readOnly />
      {orderHidden !== undefined ? (
        <input type="hidden" name="order" value={orderHidden} readOnly />
      ) : null}

      <PageContentImageField
        label="Card photo"
        layout="card"
        value={image}
        onChange={onImageChange}
        hint="Upload the image shown at the top of the card on the public page (16:10 ratio)."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Title"
          name="title"
          required
          defaultValue={defaultValues?.title ?? ''}
          error={fieldErrors?.title}
        />
        {orderHidden === undefined ? (
          <TextField
            label="Display order"
            name="order"
            type="number"
            min={0}
            defaultValue={defaultValues?.order ?? 0}
            hint="Lower numbers appear first (01, 02, 03…)."
            error={fieldErrors?.order}
          />
        ) : null}
        <TextField
          label="Region"
          name="region"
          defaultValue={defaultValues?.region ?? ''}
          hint='Shown under the photo, e.g. "Syunik".'
          error={fieldErrors?.region}
        />
        <TextField
          label="Period / century"
          name="periodLabel"
          defaultValue={defaultValues?.periodLabel ?? ''}
          hint='e.g. "9th c."'
          error={fieldErrors?.periodLabel}
        />
        <TextField
          label="3D tour link"
          name="tourUrl"
          defaultValue={defaultValues?.tourUrl ?? ''}
          hint="Optional — shows a 3D Tour badge when filled."
          error={fieldErrors?.tourUrl}
        />
        <SelectField
          label="Visibility"
          name="status"
          options={CULTURE_STATUS_OPTIONS}
          defaultValue={defaultValues?.status ?? 'PUBLISHED'}
          error={fieldErrors?.status}
        />
      </div>

      <TextareaField
        label="Card description"
        name="description"
        rows={5}
        required
        defaultValue={defaultValues?.description ?? ''}
        hint="Short paragraph on the card."
        error={fieldErrors?.description}
      />
    </div>
  );
}
