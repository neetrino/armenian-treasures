import { SelectField } from '@/components/forms/fields/SelectField';

interface MenuOption {
  id: string;
  title: string;
}

interface CultureItemMenuFieldProps {
  menuOptions: MenuOption[];
  lockedMenuItemId?: string;
  defaultValue?: string;
  error?: string;
}

/** Always-visible required menu path — must be outside collapsed sections. */
export function CultureItemMenuField({
  menuOptions,
  lockedMenuItemId,
  defaultValue = '',
  error,
}: CultureItemMenuFieldProps) {
  if (lockedMenuItemId) {
    return <input type="hidden" name="menuItemId" value={lockedMenuItemId} />;
  }

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
      <SelectField
        label="Menu item"
        name="menuItemId"
        required
        options={[
          { value: '', label: 'Select a menu item…' },
          ...menuOptions.map((item) => ({ value: item.id, label: item.title })),
        ]}
        defaultValue={defaultValue}
        hint="Required. Chooses where this card appears in the Culture Portal."
        error={error}
      />
    </div>
  );
}
