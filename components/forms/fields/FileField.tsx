'use client';

import { useId, useRef, useState } from 'react';
import { Paperclip, X } from 'lucide-react';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';

interface FileFieldProps {
  label: string;
  name: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  hint?: string;
  onFiles?: (files: File[]) => void;
}

export function FileField({
  label,
  name,
  accept,
  multiple = true,
  maxFiles = 5,
  hint,
  onFiles,
}: FileFieldProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const incoming = Array.from(event.target.files ?? []);
    const next = [...files, ...incoming].slice(0, maxFiles);
    setFiles(next);
    onFiles?.(next);
  }

  function removeAt(index: number): void {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFiles?.(next);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId}>{label}</Label>
      <label
        htmlFor={inputId}
        className={cn(
          'flex cursor-pointer items-center justify-between rounded-lg border border-dashed border-stone-300 bg-parchment-50 px-4 py-3 text-sm text-ink-soft transition hover:border-bronze-500 hover:text-ink',
        )}
      >
        <span className="inline-flex items-center gap-2">
          <Paperclip size={16} aria-hidden /> Choose files
        </span>
        <span className="text-xs text-ink-muted">
          {files.length}/{maxFiles}
        </span>
      </label>
      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={handleChange}
      />
      {files.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-md bg-parchment-50 px-3 py-2 text-xs text-ink-soft"
            >
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="rounded p-1 text-ink-muted hover:bg-stone-100"
                aria-label={`Remove ${file.name}`}
              >
                <X size={14} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {hint ? <p className="text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}
