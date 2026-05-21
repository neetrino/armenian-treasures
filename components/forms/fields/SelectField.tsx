import type { SelectHTMLAttributes } from 'react';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  options: SelectOption[];
}

export function SelectField({
  label,
  required,
  error,
  hint,
  options,
  id,
  ...props
}: SelectFieldProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputId} required={required}>
        {label}
      </Label>
      <Select id={inputId} aria-invalid={Boolean(error)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </Select>
      {error ? (
        <p className="text-xs text-pomegranate">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-muted">{hint}</p>
      ) : null}
    </div>
  );
}
