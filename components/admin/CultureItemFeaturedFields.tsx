import { SelectField } from '@/components/forms/fields/SelectField';

const FEATURED_ORDER_OPTIONS = [
  { value: '1', label: '1 — first card' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5 — last card' },
];

interface CultureItemFeaturedFieldsProps {
  featuredOnHome?: boolean;
  featuredOrder?: number | null;
  featuredOrderError?: string;
}

export function CultureItemFeaturedFields({
  featuredOnHome = false,
  featuredOrder = 5,
  featuredOrderError,
}: CultureItemFeaturedFieldsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="flex items-center gap-2 pt-7 text-sm text-ink-soft">
        <input
          type="checkbox"
          name="featuredOnHome"
          defaultChecked={featuredOnHome}
          className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
        />
        Show in STORIES WORTH DISCOVERING
      </label>
      <SelectField
        label="Home slot (1–5)"
        name="featuredOrder"
        options={FEATURED_ORDER_OPTIONS}
        defaultValue={String(featuredOrder ?? 5)}
        hint="Used when the homepage featured toggle is on. Keep slots unique."
        error={featuredOrderError}
      />
    </div>
  );
}
