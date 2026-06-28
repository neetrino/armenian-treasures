'use client';

import { Trash2 } from 'lucide-react';
import { PageContentImageField } from '@/components/admin/page-content/PageContentImageField';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import { createPageContentUiId } from '@/lib/admin/page-content-form/create-ui-id';
import { cn } from '@/lib/utils';

export interface NumLabelStat {
  num: string;
  suffix?: string;
  label: string;
  suffixSize?: string;
  suffixColor?: string;
}

interface NumLabelStatsEditorProps {
  items: NumLabelStat[];
  onChange: (items: NumLabelStat[]) => void;
  showSuffix?: boolean;
  maxItems?: number;
}

const DEFAULT_STAT: NumLabelStat = { num: '0', suffix: '', label: 'New stat' };

export function NumLabelStatsEditor({
  items,
  onChange,
  showSuffix = true,
  maxItems = 12,
}: NumLabelStatsEditorProps) {
  const updateAt = (index: number, patch: Partial<NumLabelStat>): void => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number): void => {
    if (items.length <= 1) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = (): void => {
    if (items.length >= maxItems) return;
    onChange([...items, { ...DEFAULT_STAT }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={`stat-${index}-${item.label}`}
            className="flex flex-col gap-3 rounded-xl border border-stone-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-ink">Stat {index + 1}</p>
              <button
                type="button"
                disabled={items.length <= 1}
                onClick={() => removeAt(index)}
                aria-label={`Remove stat ${index + 1}`}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-ink-soft transition hover:border-bronze-400 hover:text-pomegranate',
                  'disabled:cursor-not-allowed disabled:opacity-40',
                )}
              >
                <Trash2 size={16} aria-hidden />
              </button>
            </div>
            <TextField
              label="Number"
              value={item.num}
              onChange={(event) => updateAt(index, { num: event.target.value })}
            />
            {showSuffix ? (
              <TextField
                label="Suffix"
                value={item.suffix ?? ''}
                onChange={(event) => updateAt(index, { suffix: event.target.value })}
                hint="e.g. +, m, th C"
              />
            ) : null}
            <TextField
              label="Label"
              value={item.label}
              onChange={(event) => updateAt(index, { label: event.target.value })}
            />
          </div>
        ))}
      </div>
      <Button type="button" variant="secondary" size="sm" disabled={items.length >= maxItems} onClick={addItem}>
        Add stat
      </Button>
    </div>
  );
}

export interface LabelValueFact {
  label: string;
  value: string;
}

interface LabelValueFactsEditorProps {
  items: LabelValueFact[];
  onChange: (items: LabelValueFact[]) => void;
  maxItems?: number;
}

const DEFAULT_FACT: LabelValueFact = { label: 'Label', value: 'Value' };

export function LabelValueFactsEditor({ items, onChange, maxItems = 20 }: LabelValueFactsEditorProps) {
  const updateAt = (index: number, patch: Partial<LabelValueFact>): void => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number): void => {
    if (items.length <= 1) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = (): void => {
    if (items.length >= maxItems) return;
    onChange([...items, { ...DEFAULT_FACT }]);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div
          key={`fact-${index}`}
          className="grid gap-3 rounded-xl border border-stone-100 bg-white p-4 shadow-sm sm:grid-cols-[1fr_2fr_auto]"
        >
          <TextField
            label="Label"
            value={item.label}
            onChange={(event) => updateAt(index, { label: event.target.value })}
          />
          <TextField
            label="Value"
            value={item.value}
            onChange={(event) => updateAt(index, { value: event.target.value })}
          />
          <div className="flex items-end pb-1">
            <button
              type="button"
              disabled={items.length <= 1}
              onClick={() => removeAt(index)}
              aria-label={`Remove fact ${index + 1}`}
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-ink-soft transition hover:text-pomegranate',
                'disabled:cursor-not-allowed disabled:opacity-40',
              )}
            >
              <Trash2 size={16} aria-hidden />
            </button>
          </div>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" disabled={items.length >= maxItems} onClick={addItem}>
        Add fact
      </Button>
    </div>
  );
}

export interface GalleryImageItem {
  src: string;
  label: string;
  wide?: boolean;
  archive?: boolean;
}

interface GalleryImagesEditorProps {
  items: GalleryImageItem[];
  onChange: (items: GalleryImageItem[]) => void;
  maxItems?: number;
}

const DEFAULT_GALLERY: GalleryImageItem = { src: '', label: 'Image caption' };

export function GalleryImagesEditor({ items, onChange, maxItems = 24 }: GalleryImagesEditorProps) {
  const updateAt = (index: number, patch: Partial<GalleryImageItem>): void => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number): void => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = (): void => {
    if (items.length >= maxItems) return;
    onChange([...items, { ...DEFAULT_GALLERY, src: '' }]);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={`gallery-${index}`} className="rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-ink">Image {index + 1}</p>
            <button
              type="button"
              onClick={() => removeAt(index)}
              aria-label={`Remove image ${index + 1}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-ink-soft hover:text-pomegranate"
            >
              <Trash2 size={16} aria-hidden />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <PageContentImageField
              label="Photo"
              layout="card"
              value={item.src}
              onChange={(src) => updateAt(index, { src })}
            />
            <div className="flex flex-col gap-3">
              <TextField
                label="Caption"
                value={item.label}
                onChange={(event) => updateAt(index, { label: event.target.value })}
              />
              <label className="flex items-center gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={Boolean(item.wide)}
                  onChange={(event) => updateAt(index, { wide: event.target.checked || undefined })}
                  className="rounded border-stone-300"
                />
                Wide layout
              </label>
              <label className="flex items-center gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={Boolean(item.archive)}
                  onChange={(event) => updateAt(index, { archive: event.target.checked || undefined })}
                  className="rounded border-stone-300"
                />
                Archive style
              </label>
            </div>
          </div>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" disabled={items.length >= maxItems} onClick={addItem}>
        Add gallery image
      </Button>
    </div>
  );
}

export interface RelatedLinkItem {
  num: string;
  name: string;
  type: string;
  href: string;
}

interface RelatedLinksEditorProps {
  items: RelatedLinkItem[];
  onChange: (items: RelatedLinkItem[]) => void;
}

const DEFAULT_RELATED: RelatedLinkItem = { num: '01', name: 'Site name', type: 'Category', href: '/culture' };

export function RelatedLinksEditor({ items, onChange }: RelatedLinksEditorProps) {
  const updateAt = (index: number, patch: Partial<RelatedLinkItem>): void => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number): void => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = (): void => {
    onChange([...items, { ...DEFAULT_RELATED, num: String(items.length + 1).padStart(2, '0') }]);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={`related-${index}`} className="grid gap-3 rounded-xl border border-stone-100 bg-white p-4 sm:grid-cols-2">
          <TextField label="#" value={item.num} onChange={(e) => updateAt(index, { num: e.target.value })} />
          <TextField label="Name" value={item.name} onChange={(e) => updateAt(index, { name: e.target.value })} />
          <TextField label="Type" value={item.type} onChange={(e) => updateAt(index, { type: e.target.value })} />
          <TextField label="Link" value={item.href} onChange={(e) => updateAt(index, { href: e.target.value })} />
          <div className="sm:col-span-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => removeAt(index)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={addItem}>
        Add related link
      </Button>
    </div>
  );
}

export { createPageContentUiId };
