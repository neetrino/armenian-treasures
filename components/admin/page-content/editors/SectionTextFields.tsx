'use client';

import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { PageContentSection } from '@/components/admin/page-content/PageContentSection';

interface MetadataFieldsProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function MetadataFields({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: MetadataFieldsProps) {
  return (
    <PageContentSection title="Page metadata" description="SEO title and description shown in browser tabs and search results.">
      <TextField label="Page title" value={title} onChange={(e) => onTitleChange(e.target.value)} required />
      <TextareaField
        label="Meta description"
        rows={3}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </PageContentSection>
  );
}

export interface TextSectionValues {
  eyebrow?: string;
  title?: string;
  accent?: string;
  subtitle?: string;
  description?: string;
  label?: string;
}

interface SectionTextFieldsProps {
  title: string;
  values: TextSectionValues;
  onChange: (values: TextSectionValues) => void;
  fields?: Array<keyof TextSectionValues>;
}

const FIELD_LABELS: Record<keyof TextSectionValues, string> = {
  eyebrow: 'Eyebrow',
  title: 'Title',
  accent: 'Accent line',
  subtitle: 'Subtitle',
  description: 'Description',
  label: 'Section label',
};

export function SectionTextFields({
  title,
  values,
  onChange,
  fields = ['eyebrow', 'title', 'subtitle', 'description'],
}: SectionTextFieldsProps) {
  const update = (key: keyof TextSectionValues, value: string): void => {
    onChange({ ...values, [key]: value });
  };

  return (
    <PageContentSection title={title}>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) =>
          field === 'description' || field === 'subtitle' ? (
            <div key={field} className="sm:col-span-2">
              <TextareaField
                label={FIELD_LABELS[field]}
                rows={field === 'description' ? 4 : 3}
                value={values[field] ?? ''}
                onChange={(e) => update(field, e.target.value)}
              />
            </div>
          ) : (
            <TextField
              key={field}
              label={FIELD_LABELS[field]}
              value={values[field] ?? ''}
              onChange={(e) => update(field, e.target.value)}
            />
          ),
        )}
      </div>
    </PageContentSection>
  );
}
