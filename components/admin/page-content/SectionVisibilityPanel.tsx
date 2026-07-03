'use client';

import { PageContentSection } from '@/components/admin/page-content/PageContentSection';
import type { SectionToggleOption } from '@/lib/landing/landing-section-visibility';
import { isSectionEnabled } from '@/lib/landing/landing-section-utils';

interface SectionVisibilityPanelProps {
  title?: string;
  description?: string;
  sections: SectionToggleOption[];
  visibility: Record<string, boolean | undefined> | undefined;
  onChange: (visibility: Record<string, boolean | undefined>) => void;
}

export function SectionVisibilityPanel({
  title = 'Section visibility',
  description = 'Disabled sections are hidden on the public page. Empty sections are also hidden automatically.',
  sections,
  visibility,
  onChange,
}: SectionVisibilityPanelProps) {
  const setEnabled = (id: string, enabled: boolean): void => {
    onChange({ ...visibility, [id]: enabled });
  };

  return (
    <PageContentSection title={title} description={description}>
      <div className="grid gap-2 sm:grid-cols-2">
        {sections.map((section) => {
          const enabled = isSectionEnabled(visibility, section.id);
          return (
            <label
              key={section.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-100 bg-white px-4 py-3"
            >
              <input
                type="checkbox"
                checked={enabled}
                onChange={(event) => setEnabled(section.id, event.target.checked)}
                className="size-4 rounded border-stone-300 text-bronze-600 focus:ring-bronze-500/30"
              />
              <span className="text-sm text-ink">{section.label}</span>
            </label>
          );
        })}
      </div>
    </PageContentSection>
  );
}
