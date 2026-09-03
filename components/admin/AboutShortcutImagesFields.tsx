import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';

interface AboutShortcutImagesFieldsProps {
  missionShortcutImage?: string;
  teamShortcutImage?: string;
  careerShortcutImage?: string;
  contactShortcutImage?: string;
}

export function AboutShortcutImagesFields({
  missionShortcutImage = '',
  teamShortcutImage = '',
  careerShortcutImage = '',
  contactShortcutImage = '',
}: AboutShortcutImagesFieldsProps) {
  return (
    <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
      <legend className="px-2 font-display text-lg text-ink">About shortcut backgrounds</legend>
      <p className="mb-4 text-sm text-ink-muted">
        Optional photos behind Mission, Team, Career, and Contact shortcuts.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <AdminImageDropzoneField
          label="Mission"
          name="missionShortcutImage"
          folder="culture"
          layout="card"
          defaultValue={missionShortcutImage}
        />
        <AdminImageDropzoneField
          label="Team"
          name="teamShortcutImage"
          folder="culture"
          layout="card"
          defaultValue={teamShortcutImage}
        />
        <AdminImageDropzoneField
          label="Career"
          name="careerShortcutImage"
          folder="culture"
          layout="card"
          defaultValue={careerShortcutImage}
        />
        <AdminImageDropzoneField
          label="Contact"
          name="contactShortcutImage"
          folder="culture"
          layout="card"
          defaultValue={contactShortcutImage}
        />
      </div>
    </fieldset>
  );
}
