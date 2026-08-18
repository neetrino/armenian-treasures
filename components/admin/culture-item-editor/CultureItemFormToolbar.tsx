'use client';

import { Button } from '@/components/ui/Button';

interface CultureItemFormToolbarProps {
  heading: string;
  isPending: boolean;
  previewHref?: string;
  onCancel?: () => void;
}

export function CultureItemFormToolbar({
  heading,
  isPending,
  previewHref,
  onCancel,
}: CultureItemFormToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-stone-200/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-display text-2xl text-ink">{heading}</h2>
      <div className="flex flex-wrap items-center gap-2">
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" name="intent" value="draft" variant="secondary" disabled={isPending}>
          {isPending ? 'Saving…' : 'Save draft'}
        </Button>
        {previewHref ? (
          <Button type="button" variant="ghost" onClick={() => window.open(previewHref, '_blank')}>
            Preview
          </Button>
        ) : (
          <Button type="button" variant="ghost" disabled title="Save a draft first to preview.">
            Preview
          </Button>
        )}
        <Button type="submit" name="intent" value="publish" disabled={isPending} withArrow>
          {isPending ? 'Publishing…' : 'Publish'}
        </Button>
      </div>
    </div>
  );
}
