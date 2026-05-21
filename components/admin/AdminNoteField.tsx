'use client';

import { useState, useTransition } from 'react';
import { Save } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface AdminNoteFieldProps {
  id: string;
  initialValue: string;
  action: (id: string, value: string) => Promise<void>;
}

export function AdminNoteField({ id, initialValue, action }: AdminNoteFieldProps) {
  const [value, setValue] = useState(initialValue);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(async () => {
          await action(id, value);
          setSaved(true);
          setTimeout(() => setSaved(false), 1800);
        });
      }}
    >
      <Textarea value={value} rows={4} onChange={(event) => setValue(event.target.value)} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-ink-muted">{saved ? 'Saved.' : value.length + ' characters'}</span>
        <Button type="submit" disabled={pending} size="sm">
          <Save size={14} aria-hidden /> {pending ? 'Saving…' : 'Save note'}
        </Button>
      </div>
    </form>
  );
}
