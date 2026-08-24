import type { ReactNode } from 'react';
import { Copy, Plus, Trash2 } from 'lucide-react';

interface RepeatableFieldListProps {
  addLabel: string;
  onAdd: () => void;
  children: ReactNode;
}

export function RepeatableFieldList({ addLabel, onAdd, children }: RepeatableFieldListProps) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-bronze-400 bg-white px-4 py-3 text-sm font-medium text-bronze-800 transition hover:bg-bronze-50"
      >
        <Plus size={16} aria-hidden />
        {addLabel}
      </button>
    </div>
  );
}

interface RepeatableFieldCardProps {
  title: string;
  onRemove: () => void;
  onDuplicate?: () => void;
  children: ReactNode;
}

export function RepeatableFieldCard({ title, onRemove, onDuplicate, children }: RepeatableFieldCardProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-parchment-50/50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <div className="flex items-center gap-1">
          {onDuplicate ? (
            <button
              type="button"
              onClick={onDuplicate}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-ink-soft transition hover:border-bronze-400 hover:text-ink"
              aria-label={`Duplicate ${title}`}
              title="Duplicate"
            >
              <Copy size={14} aria-hidden />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-pomegranate transition hover:border-pomegranate/30 hover:bg-pomegranate/10"
            aria-label={`Remove ${title}`}
            title="Remove"
          >
            <Trash2 size={14} aria-hidden />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
