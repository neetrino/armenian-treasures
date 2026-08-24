'use client';

import { Check, Eye, ChevronDown, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CultureItemEditorToolbarProps {
  heading: string;
  isPending: boolean;
  isSaved: boolean;
  previewHref?: string;
  onCancel?: () => void;
}

function formatSavedLabel(isPending: boolean, isSaved: boolean): string {
  if (isPending) return 'Saving…';
  if (isSaved) return 'Autosaved just now';
  return 'Unsaved changes';
}

export function CultureItemEditorToolbar({
  heading,
  isPending,
  isSaved,
  previewHref,
  onCancel,
}: CultureItemEditorToolbarProps) {
  const savedLabel = formatSavedLabel(isPending, isSaved);

  return (
    <div className="sticky top-0 z-20 -mx-4 border-b border-stone-200/80 bg-parchment-50/95 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            {onCancel ? (
              <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="shrink-0">
                Cancel
              </Button>
            ) : null}
            <h1 className="font-display text-2xl text-ink sm:text-3xl">{heading}</h1>
          </div>
          <div
            className={cn(
              'flex items-center gap-2 text-sm',
              isSaved && !isPending ? 'text-emerald-700' : 'text-ink-muted',
            )}
          >
            {isSaved && !isPending ? <Check size={16} aria-hidden /> : null}
            <span>{savedLabel}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="submit"
              name="intent"
              value="draft"
              variant="secondary"
              size="sm"
              disabled={isPending}
              className="rounded-lg border border-stone-300 bg-white text-ink shadow-none hover:bg-stone-50"
            >
              {isPending ? 'Saving…' : 'Save draft'}
            </Button>
            {previewHref ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-lg border border-stone-300 bg-white text-ink shadow-none hover:bg-stone-50"
                onClick={() => window.open(previewHref, '_blank')}
              >
                <Eye size={14} aria-hidden />
                Preview
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled
                title="Publish first to preview."
                className="rounded-lg border border-stone-200 bg-stone-50 text-ink-muted shadow-none"
              >
                <Eye size={14} aria-hidden />
                Preview
              </Button>
            )}
            <Button
              type="submit"
              name="intent"
              value="publish"
              size="sm"
              disabled={isPending}
              className="rounded-lg bg-bronze-500 px-4 hover:bg-bronze-600"
            >
              {isPending ? 'Publishing…' : 'Publish'}
              <ChevronDown size={14} aria-hidden />
            </Button>
          </div>
        </div>
        <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
          <GripVertical size={16} aria-hidden />
          Drag sections to set the order for this article.
        </p>
      </div>
    </div>
  );
}
