import type { ReactNode } from 'react';

interface PageContentSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageContentSection({ title, description, children }: PageContentSectionProps) {
  return (
    <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
      <legend className="px-2 font-display text-lg text-ink">{title}</legend>
      {description ? <p className="mb-4 text-sm text-ink-muted">{description}</p> : null}
      <div className="flex flex-col gap-4">{children}</div>
    </fieldset>
  );
}
