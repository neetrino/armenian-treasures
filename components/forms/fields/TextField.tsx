import type { InputHTMLAttributes, ReactNode } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  rightAccessory?: ReactNode;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
}

export function TextField({
  label,
  required,
  error,
  hint,
  id,
  rightAccessory,
  labelClassName,
  inputClassName,
  errorClassName,
  hintClassName,
  ...props
}: TextFieldProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputId} required={required} className={labelClassName}>
        {label}
      </Label>
      <div className="relative">
        <Input id={inputId} aria-invalid={Boolean(error)} className={inputClassName} {...props} />
        {rightAccessory ? (
          <span className="absolute inset-y-0 right-3 inline-flex items-center text-ink-muted">
            {rightAccessory}
          </span>
        ) : null}
      </div>
      {error ? (
        <p className={errorClassName ?? 'text-xs text-pomegranate'}>{error}</p>
      ) : hint ? (
        <p className={hintClassName ?? 'text-xs text-ink-muted'}>{hint}</p>
      ) : null}
    </div>
  );
}
