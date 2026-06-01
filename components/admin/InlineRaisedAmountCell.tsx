'use client';

import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { updateProjectRaisedAmountAction } from '@/app/(admin)/admin/(panel)/projects/actions';
import { cn, formatCurrency } from '@/lib/utils';

interface InlineRaisedAmountCellProps {
  projectId: string;
  value: number;
  onSaved: (raisedAmount: number) => void;
}

type ParseResult =
  | { ok: true; value: number }
  | { ok: false; error: string };

function parseRaisedInput(raw: string): ParseResult {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, error: 'Enter an amount.' };
  if (!/^\d+$/.test(trimmed)) return { ok: false, error: 'Numbers only.' };
  const num = Number(trimmed);
  if (num < 0) return { ok: false, error: 'Cannot be negative.' };
  return { ok: true, value: num };
}

export function InlineRaisedAmountCell({
  projectId,
  value,
  onSaved,
}: InlineRaisedAmountCellProps) {
  const errorId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
    setDraft('');
    setError(null);
  }, []);

  const startEdit = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (isSaving) return;
      setDraft(String(value));
      setError(null);
      setIsEditing(true);
    },
    [isSaving, value],
  );

  const save = useCallback(async () => {
    const parsed = parseRaisedInput(draft);
    if (!parsed.ok) {
      setError(parsed.error);
      return false;
    }
    if (parsed.value === value) {
      cancelEdit();
      return true;
    }
    setIsSaving(true);
    setError(null);
    const result = await updateProjectRaisedAmountAction(projectId, parsed.value);
    setIsSaving(false);
    if (!result.ok) {
      setError(result.error);
      return false;
    }
    onSaved(result.raisedAmount);
    cancelEdit();
    return true;
  }, [cancelEdit, draft, onSaved, projectId, value]);

  const handleOutside = useCallback(async () => {
    const parsed = parseRaisedInput(draft);
    if (!parsed.ok) {
      cancelEdit();
      return;
    }
    await save();
  }, [cancelEdit, draft, save]);

  useEffect(() => {
    if (!isEditing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing) return;
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      void handleOutside();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') cancelEdit();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [cancelEdit, handleOutside, isEditing]);

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={startEdit}
        disabled={isSaving}
        className={cn(
          'text-left text-xs text-ink-soft underline-offset-2 transition hover:text-ink hover:underline',
          isSaving && 'pointer-events-none opacity-60',
        )}
        aria-label={`Edit raised amount, currently ${formatCurrency(value)}`}
      >
        {isSaving ? (
          <span className="inline-flex items-center gap-1">
            <Loader2 size={12} className="animate-spin" aria-hidden />
            Saving…
          </span>
        ) : (
          formatCurrency(value)
        )}
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-0.5"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={draft}
          disabled={isSaving}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            setDraft(event.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === 'Enter') {
              event.preventDefault();
              void save();
            }
            if (event.key === 'Escape') {
              event.preventDefault();
              cancelEdit();
            }
          }}
          className={cn(
            'w-24 rounded border bg-white px-1.5 py-0.5 text-xs text-ink',
            'focus:border-pomegranate focus:outline-none focus:ring-1 focus:ring-pomegranate/30',
            error ? 'border-pomegranate' : 'border-stone-200',
          )}
        />
        {isSaving ? <Loader2 size={12} className="animate-spin text-ink-muted" aria-hidden /> : null}
      </div>
      {error ? (
        <p id={errorId} className="text-[10px] text-pomegranate">
          {error}
        </p>
      ) : null}
    </div>
  );
}
