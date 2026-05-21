'use client';

import { useTransition } from 'react';
import { cn } from '@/lib/utils';

interface StatusSelectProps<T extends string> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (next: T) => Promise<void>;
  className?: string;
}

export function StatusSelect<T extends string>({
  value,
  options,
  onChange,
  className,
}: StatusSelectProps<T>) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      value={value}
      disabled={pending}
      onChange={(event) => {
        const next = event.target.value as T;
        startTransition(() => {
          void onChange(next);
        });
      }}
      className={cn(
        'rounded-md border border-stone-200 bg-white px-2 py-1 text-xs focus:border-bronze-500 focus:outline-none focus:ring-2 focus:ring-bronze-500/30 disabled:opacity-50',
        className,
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
