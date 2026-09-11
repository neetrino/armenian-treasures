import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';

interface CultureItemCardBackgroundFieldsProps {
  imageDefaultValue?: string;
  imageError?: string;
}

export function CultureItemCardBackgroundFields({
  imageDefaultValue = '',
  imageError,
}: CultureItemCardBackgroundFieldsProps) {
  return (
    <AdminImageDropzoneField
      label="Card background image"
      name="cardBackgroundImage"
      folder="culture"
      layout="card"
      defaultValue={imageDefaultValue}
      hint="Optional image behind the card text on Featured Treasures."
      error={imageError}
    />
  );
}
