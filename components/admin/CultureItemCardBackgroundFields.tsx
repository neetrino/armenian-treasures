import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { TextField } from '@/components/forms/fields/TextField';

interface CultureItemCardBackgroundFieldsProps {
  colorDefaultValue?: string;
  imageDefaultValue?: string;
  colorError?: string;
  imageError?: string;
}

export function CultureItemCardBackgroundFields({
  colorDefaultValue = '',
  imageDefaultValue = '',
  colorError,
  imageError,
}: CultureItemCardBackgroundFieldsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <TextField
        label="Card background color"
        name="cardBackgroundColor"
        defaultValue={colorDefaultValue}
        placeholder="#0f1419"
        hint="Optional hex color for Featured Treasures cards on the homepage."
        error={colorError}
      />
      <AdminImageDropzoneField
        label="Card background image"
        name="cardBackgroundImage"
        folder="culture"
        layout="card"
        defaultValue={imageDefaultValue}
        hint="Optional image behind the card text on Featured Treasures."
        error={imageError}
      />
    </div>
  );
}
