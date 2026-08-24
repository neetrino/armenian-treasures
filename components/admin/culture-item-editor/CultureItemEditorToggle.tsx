'use client';

import { cn } from '@/lib/utils';

interface CultureItemEditorToggleProps {
  name: string;
  label: string;
  defaultChecked?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
}

export function CultureItemEditorToggle({
  name,
  label,
  defaultChecked = false,
  className,
  onChange,
}: CultureItemEditorToggleProps) {
  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-2.5', className)}>
      <span className="text-sm font-medium text-ink-soft">{label}</span>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          onChange={(event) => onChange?.(event.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={cn(
            'absolute inset-0 rounded-full bg-stone-200 transition-colors',
            'peer-checked:bg-bronze-500 peer-focus-visible:ring-2 peer-focus-visible:ring-bronze-500/40',
          )}
        />
        <span
          aria-hidden
          className={cn(
            'absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
            'peer-checked:translate-x-5',
          )}
        />
      </span>
    </label>
  );
}
