'use client';

import { useEffect, useRef, useState } from 'react';
import { Link2, List, ListOrdered, Pilcrow } from 'lucide-react';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';

interface RichTextFieldProps {
  label: string;
  name?: string;
  required?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  hint?: string;
  compact?: boolean;
}

function toolbarButtonClass(active: boolean): string {
  return cn(
    'inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-xs font-medium',
    active
      ? 'border-bronze-400 bg-bronze-50 text-bronze-800'
      : 'border-stone-200 bg-white text-ink-soft hover:border-bronze-300 hover:text-ink',
  );
}

export function RichTextField({
  label,
  name,
  required,
  defaultValue = '',
  value,
  onValueChange,
  error,
  hint,
  compact = false,
}: RichTextFieldProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(defaultValue);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const isControlled = typeof value === 'string';
  const currentHtml = isControlled ? value : html;

  useEffect(() => {
    if (!isControlled) {
      setHtml(defaultValue);
    }
  }, [defaultValue, isControlled]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (editor.innerHTML !== currentHtml) editor.innerHTML = currentHtml;
  }, [currentHtml]);

  function commitHtml(next: string) {
    if (!isControlled) {
      setHtml(next);
    }
    onValueChange?.(next);
  }

  function updateToolbarState() {
    setIsBold(document.queryCommandState('bold'));
    setIsItalic(document.queryCommandState('italic'));
    setIsUnderline(document.queryCommandState('underline'));
  }

  function runCommand(command: string, value?: string) {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, value);
    commitHtml(editor.innerHTML);
    updateToolbarState();
  }

  function applyLink() {
    const url = window.prompt('Enter URL');
    if (!url) return;
    runCommand('createLink', url.trim());
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>

      <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 p-2">
          <button type="button" className={toolbarButtonClass(isBold)} onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('bold')} aria-label="Bold">
            B
          </button>
          <button type="button" className={toolbarButtonClass(isItalic)} onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('italic')} aria-label="Italic">
            I
          </button>
          <button type="button" className={toolbarButtonClass(isUnderline)} onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('underline')} aria-label="Underline">
            U
          </button>
          <button type="button" className={toolbarButtonClass(false)} onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('formatBlock', 'P')} aria-label="Paragraph">
            <Pilcrow size={14} aria-hidden />
          </button>
          <button type="button" className={toolbarButtonClass(false)} onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('insertUnorderedList')} aria-label="Bullet list">
            <List size={14} aria-hidden />
          </button>
          <button type="button" className={toolbarButtonClass(false)} onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('insertOrderedList')} aria-label="Numbered list">
            <ListOrdered size={14} aria-hidden />
          </button>
          <button type="button" className={toolbarButtonClass(false)} onMouseDown={(event) => event.preventDefault()} onClick={applyLink} aria-label="Insert link">
            <Link2 size={14} aria-hidden />
          </button>
        </div>

        <div
          id={name}
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className={cn(
            compact ? 'min-h-[10rem]' : 'min-h-[18rem]',
            'w-full px-3.5 py-2.5 text-sm text-ink outline-none',
            'focus:ring-2 focus:ring-bronze-500/30',
            '[&_p]:my-0 [&_p+*]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-heritage-teal [&_a]:underline',
          )}
          onInput={(event) => commitHtml(event.currentTarget.innerHTML)}
          onKeyUp={updateToolbarState}
          onMouseUp={updateToolbarState}
          aria-invalid={Boolean(error)}
        />
      </div>

      {name ? <input type="hidden" name={name} value={currentHtml} /> : null}

      {error ? (
        <p className="text-xs text-pomegranate">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-muted">{hint}</p>
      ) : null}
    </div>
  );
}
