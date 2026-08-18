import type { ReactNode } from 'react';
import { Plus, Trash2 } from 'lucide-react';

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
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 px-4 py-3 text-sm font-medium text-ink-soft transition hover:border-bronze-500 hover:text-ink"
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
  children: ReactNode;
}

export function RepeatableFieldCard({ title, onRemove, children }: RepeatableFieldCardProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">{title}</p>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-pomegranate hover:bg-pomegranate/10"
        >
          <Trash2 size={12} aria-hidden />
          Remove
        </button>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
