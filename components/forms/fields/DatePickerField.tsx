'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_FORMATTER = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
const DISPLAY_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

interface DatePickerFieldProps {
  name: string;
  label: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  onValueChange?: (value: string) => void;
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function buildCalendarDays(month: Date): Date[] {
  const first = startOfMonth(month);
  const startOffset = first.getDay();
  const days: Date[] = [];
  for (let index = 0; index < 42; index += 1) {
    days.push(new Date(first.getFullYear(), first.getMonth(), index - startOffset + 1));
  }
  return days;
}

export function DatePickerField({
  name,
  label,
  value,
  defaultValue,
  required,
  error,
  hint,
  onValueChange,
}: DatePickerFieldProps) {
  const isControlled = typeof value === 'string';
  const [internalValue, setInternalValue] = useState(defaultValue ?? toIsoDate(new Date()));
  const selectedIso = isControlled ? value : internalValue;
  const selectedDate = parseIsoDate(selectedIso) ?? new Date();
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(selectedDate));
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent): void {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const parsed = parseIsoDate(selectedIso);
    if (!parsed) return;
    setVisibleMonth(startOfMonth(parsed));
  }, [selectedIso]);

  const days = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);
  const displayLabel = DISPLAY_FORMATTER.format(selectedDate);

  function commit(next: string): void {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative flex flex-col gap-1.5">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input type="hidden" name={name} value={selectedIso} />
      <button
        id={name}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'flex w-full items-center justify-between gap-3 rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm text-ink shadow-sm transition',
          error
            ? 'border-pomegranate focus:ring-2 focus:ring-pomegranate/20'
            : 'border-stone-200 hover:border-bronze-400 focus:border-bronze-500 focus:outline-none focus:ring-2 focus:ring-bronze-500/30',
        )}
      >
        <span>{displayLabel}</span>
        <CalendarDays size={16} className="shrink-0 text-bronze-700" aria-hidden />
      </button>
      {open ? (
        <div
          role="dialog"
          aria-label="Choose publish date"
          className="absolute z-40 mt-1 w-72 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl"
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-stone-100 hover:text-ink"
              onClick={() =>
                setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))
              }
              aria-label="Previous month"
            >
              <ChevronLeft size={16} aria-hidden />
            </button>
            <p className="text-sm font-semibold text-ink">{MONTH_FORMATTER.format(visibleMonth)}</p>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-stone-100 hover:text-ink"
              onClick={() =>
                setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))
              }
              aria-label="Next month"
            >
              <ChevronRight size={16} aria-hidden />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {days.map((day) => {
              const iso = toIsoDate(day);
              const inMonth = day.getMonth() === visibleMonth.getMonth();
              const selected = iso === selectedIso;
              const today = iso === toIsoDate(new Date());
              return (
                <button
                  key={iso + String(inMonth)}
                  type="button"
                  onClick={() => commit(iso)}
                  className={cn(
                    'h-8 rounded-lg text-sm transition',
                    inMonth ? 'text-ink' : 'text-ink-muted/50',
                    selected
                      ? 'bg-pomegranate text-white'
                      : today
                        ? 'border border-bronze-400 bg-bronze-50 text-bronze-800'
                        : 'hover:bg-parchment-100',
                  )}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      {error ? (
        <p className="text-xs text-pomegranate">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-muted">{hint}</p>
      ) : null}
    </div>
  );
}
