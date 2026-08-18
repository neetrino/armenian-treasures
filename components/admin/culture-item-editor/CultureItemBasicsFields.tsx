import { TextField } from '@/components/forms/fields/TextField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { CULTURE_ITEM_TYPE_OPTIONS } from '@/lib/admin/enum-labels';
import type { CultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';

interface MenuOption {
  id: string;
  title: string;
}

interface CultureItemBasicsFieldsProps {
  initial?: CultureItemFormInitial;
  menuOptions: MenuOption[];
  lockedMenuItemId?: string;
  fieldErrors?: Record<string, string>;
}

export function CultureItemBasicsFields({
  initial,
  menuOptions,
  lockedMenuItemId,
  fieldErrors,
}: CultureItemBasicsFieldsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <TextField
        label="Slug"
        name="slug"
        defaultValue={initial?.slug ?? ''}
        hint="Lowercase, hyphenated. Leave empty to derive from title."
        error={fieldErrors?.slug}
      />
      {lockedMenuItemId ? (
        <input type="hidden" name="menuItemId" value={lockedMenuItemId} />
      ) : (
        <SelectField
          label="Menu item"
          name="menuItemId"
          required
          options={[
            { value: '', label: 'Select a menu item…', disabled: true },
            ...menuOptions.map((item) => ({ value: item.id, label: item.title })),
          ]}
          defaultValue={initial?.menuItemId ?? ''}
          error={fieldErrors?.menuItemId}
        />
      )}
      <SelectField
        label="Item type"
        name="itemType"
        options={CULTURE_ITEM_TYPE_OPTIONS}
        defaultValue={initial?.itemType ?? 'OTHER'}
        error={fieldErrors?.itemType}
      />
      <TextField label="Region" name="region" defaultValue={initial?.region ?? ''} error={fieldErrors?.region} />
      <TextField
        label="Period label"
        name="periodLabel"
        defaultValue={initial?.periodLabel ?? ''}
        hint='e.g. "9th c." or "782 BC"'
        error={fieldErrors?.periodLabel}
      />
      <TextField
        label="Century (negative for BC)"
        name="century"
        type="number"
        defaultValue={initial?.century ?? ''}
        error={fieldErrors?.century}
      />
      <TextField
        label="Year label"
        name="yearLabel"
        defaultValue={initial?.yearLabel ?? ''}
        error={fieldErrors?.yearLabel}
      />
      <TextField
        label="Order"
        name="order"
        type="number"
        min={0}
        defaultValue={initial?.order ?? 0}
        error={fieldErrors?.order}
      />
    </div>
  );
}
