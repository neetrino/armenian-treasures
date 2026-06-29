import type { TextareaHTMLAttributes } from 'react';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  labelClassName?: string;
  textareaClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
}

export function TextareaField({
  label,
  required,
  error,
  hint,
  id,
  labelClassName,
  textareaClassName,
  errorClassName,
  hintClassName,
  ...props
}: TextareaFieldProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputId} required={required} className={labelClassName}>
        {label}
      </Label>
      <Textarea id={inputId} aria-invalid={Boolean(error)} className={textareaClassName} {...props} />
      {error ? (
        <p className={errorClassName ?? 'text-xs text-pomegranate'}>{error}</p>
      ) : hint ? (
        <p className={hintClassName ?? 'text-xs text-ink-muted'}>{hint}</p>
      ) : null}
    </div>
  );
}
