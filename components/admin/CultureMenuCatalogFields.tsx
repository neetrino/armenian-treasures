import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import {
  menuCatalogContentToFormDefaults,
  parseMenuCatalogContent,
} from '@/lib/types/culture-catalog-content';

interface CultureMenuCatalogFieldsProps {
  catalogContent?: unknown;
  fieldErrors?: Record<string, string>;
}

export function CultureMenuCatalogFields({
  catalogContent,
  fieldErrors,
}: CultureMenuCatalogFieldsProps) {
  const parsed = parseMenuCatalogContent(catalogContent);
  const defaults = menuCatalogContentToFormDefaults(parsed);

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-stone-100 bg-parchment-50 p-5">
      <div>
        <h3 className="font-display text-xl text-ink">Catalog page content</h3>
        <p className="mt-1 text-xs text-ink-muted">
          Overrides the public culture catalog hero, about section, and labels for this menu item.
          Leave blank to use built-in defaults. Card image URL above is also used as hero fallback.
        </p>
      </div>

      <AdminImageDropzoneField
        label="Hero banner image"
        name="catalogHeroImage"
        folder="culture"
        defaultValue={defaults.catalogHeroImage}
        hint="Overrides the default heritage background for this catalog page."
        error={fieldErrors?.catalogHeroImage}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Hero eyebrow"
          name="catalogEyebrow"
          defaultValue={defaults.catalogEyebrow}
          error={fieldErrors?.catalogEyebrow}
        />
        <TextField
          label="Hero accent (subtitle line)"
          name="catalogAccent"
          defaultValue={defaults.catalogAccent}
          error={fieldErrors?.catalogAccent}
        />
        <TextField
          label="Hero slogan"
          name="catalogSlogan"
          defaultValue={defaults.catalogSlogan}
          error={fieldErrors?.catalogSlogan}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="About label"
          name="catalogAboutLabel"
          defaultValue={defaults.catalogAboutLabel}
        />
        <TextField
          label="About title"
          name="catalogAboutTitle"
          defaultValue={defaults.catalogAboutTitle}
        />
        <div className="sm:col-span-2">
          <TextareaField
            label="About description"
            name="catalogAboutDescription"
            rows={3}
            defaultValue={defaults.catalogAboutDescription}
          />
        </div>
        <div className="sm:col-span-2">
          <TextareaField
            label="About paragraphs"
            name="catalogAboutParagraphs"
            rows={5}
            defaultValue={defaults.catalogAboutParagraphs}
            hint="Separate paragraphs with a blank line."
          />
        </div>
        <TextField
          label="Extra heading"
          name="catalogExtraHeading"
          defaultValue={defaults.catalogExtraHeading}
        />
        <TextareaField
          label="Extra paragraph"
          name="catalogExtraParagraph"
          rows={3}
          defaultValue={defaults.catalogExtraParagraph}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="grid gap-3 rounded-xl border border-stone-100 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-bronze-700">
              Fact {index}
            </p>
            <TextField
              label="Label"
              name={`catalogFact${index}Label`}
              defaultValue={defaults[`catalogFact${index}Label` as keyof typeof defaults]}
            />
            <TextareaField
              label="Value"
              name={`catalogFact${index}Value`}
              rows={2}
              defaultValue={defaults[`catalogFact${index}Value` as keyof typeof defaults]}
            />
          </div>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Entries section label"
          name="catalogItemsLabel"
          defaultValue={defaults.catalogItemsLabel}
        />
        <TextField
          label="Entries section title"
          name="catalogItemsTitle"
          defaultValue={defaults.catalogItemsTitle}
        />
        <div className="sm:col-span-2">
          <TextareaField
            label="Entries section description"
            name="catalogItemsDescription"
            rows={3}
            defaultValue={defaults.catalogItemsDescription}
          />
        </div>
        <TextField
          label="Submit prompt"
          name="catalogSubmitPrompt"
          defaultValue={defaults.catalogSubmitPrompt}
        />
        <TextField
          label="Empty state message"
          name="catalogEmptyMessage"
          defaultValue={defaults.catalogEmptyMessage}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Map eyebrow"
          name="catalogMapEyebrow"
          defaultValue={defaults.catalogMapEyebrow}
        />
        <TextField
          label="Map title"
          name="catalogMapTitle"
          defaultValue={defaults.catalogMapTitle}
        />
        <div className="sm:col-span-2">
          <TextareaField
            label="Map description"
            name="catalogMapDescription"
            rows={3}
            defaultValue={defaults.catalogMapDescription}
          />
        </div>
        <TextField
          label="Map placeholder title"
          name="catalogMapPlaceholder"
          defaultValue={defaults.catalogMapPlaceholder}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <TextField
          label="Stat: entries label"
          name="catalogStatEntries"
          defaultValue={defaults.catalogStatEntries}
        />
        <TextField
          label="Stat: regions label"
          name="catalogStatRegions"
          defaultValue={defaults.catalogStatRegions}
        />
        <TextField
          label="Stat: third label"
          name="catalogStatThird"
          defaultValue={defaults.catalogStatThird}
        />
        <TextField
          label="Stat: fourth label"
          name="catalogStatFourth"
          defaultValue={defaults.catalogStatFourth}
        />
      </div>
    </section>
  );
}
