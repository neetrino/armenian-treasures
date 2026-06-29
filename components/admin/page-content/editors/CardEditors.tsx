'use client';

import { Trash2 } from 'lucide-react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import { PageContentImageField } from '@/components/admin/page-content/PageContentImageField';

export interface HighlightCard {
  num: string;
  tag: string;
  title: string;
  excerpt: string;
  href: string;
  featured?: boolean;
  icon?: string;
}

interface HighlightCardsEditorProps {
  items: HighlightCard[];
  onChange: (items: HighlightCard[]) => void;
}

const DEFAULT: HighlightCard = {
  num: '01',
  tag: 'Category',
  title: 'Card title',
  excerpt: 'Short description of this highlight.',
  href: '#',
};

export function HighlightCardsEditor({ items, onChange }: HighlightCardsEditorProps) {
  const updateAt = (index: number, patch: Partial<HighlightCard>): void => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number): void => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = (): void => {
    onChange([...items, { ...DEFAULT, num: String(items.length + 1).padStart(2, '0') }]);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={`highlight-${index}`} className="rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-ink">Highlight {index + 1}</p>
            <button
              type="button"
              onClick={() => removeAt(index)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 hover:text-pomegranate"
              aria-label={`Remove highlight ${index + 1}`}
            >
              <Trash2 size={16} aria-hidden />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="#" value={item.num} onChange={(e) => updateAt(index, { num: e.target.value })} />
            <TextField label="Tag" value={item.tag} onChange={(e) => updateAt(index, { tag: e.target.value })} />
            <TextField
              label="Title"
              value={item.title}
              onChange={(e) => updateAt(index, { title: e.target.value })}
              className="sm:col-span-2"
            />
            <TextareaField
              label="Excerpt"
              rows={3}
              value={item.excerpt}
              onChange={(e) => updateAt(index, { excerpt: e.target.value })}
              className="sm:col-span-2"
            />
            <TextField label="Link" value={item.href} onChange={(e) => updateAt(index, { href: e.target.value })} />
            <TextField
              label="Icon key"
              value={item.icon ?? ''}
              onChange={(e) => updateAt(index, { icon: e.target.value })}
              hint="Internal icon identifier used by the page"
            />
            <label className="flex items-center gap-2 text-sm text-ink-soft sm:col-span-2">
              <input
                type="checkbox"
                checked={Boolean(item.featured)}
                onChange={(e) => updateAt(index, { featured: e.target.checked || undefined })}
                className="rounded border-stone-300"
              />
              Featured card (larger layout)
            </label>
          </div>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={addItem}>
        Add highlight
      </Button>
    </div>
  );
}

export interface CardGridItem {
  id: string;
  title: string;
  sub: string;
  href: string;
  icon?: string;
}

interface CardGridEditorProps {
  items: CardGridItem[];
  onChange: (items: CardGridItem[]) => void;
}

const DEFAULT_GRID: CardGridItem = {
  id: 'item',
  title: 'Title',
  sub: 'Subtitle',
  href: '#',
};

export function CardGridEditor({ items, onChange }: CardGridEditorProps) {
  const updateAt = (index: number, patch: Partial<CardGridItem>): void => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number): void => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = (): void => {
    onChange([...items, { ...DEFAULT_GRID, id: `item-${items.length + 1}` }]);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={`grid-${index}`} className="grid gap-3 rounded-xl border border-stone-100 bg-white p-4 sm:grid-cols-2">
          <TextField label="ID" value={item.id} onChange={(e) => updateAt(index, { id: e.target.value })} />
          <TextField label="Icon key" value={item.icon ?? ''} onChange={(e) => updateAt(index, { icon: e.target.value })} />
          <TextField label="Title" value={item.title} onChange={(e) => updateAt(index, { title: e.target.value })} />
          <TextField label="Subtitle" value={item.sub} onChange={(e) => updateAt(index, { sub: e.target.value })} />
          <TextField label="Link" value={item.href} onChange={(e) => updateAt(index, { href: e.target.value })} className="sm:col-span-2" />
          <Button type="button" variant="secondary" size="sm" onClick={() => removeAt(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={addItem}>
        Add item
      </Button>
    </div>
  );
}

export interface RestorationPair {
  before: string;
  after: string;
  caption: string;
}

interface RestorationPairsEditorProps {
  items: RestorationPair[];
  onChange: (items: RestorationPair[]) => void;
}

const DEFAULT_RESTORATION: RestorationPair = { before: '', after: '', caption: 'Caption' };

export function RestorationPairsEditor({ items, onChange }: RestorationPairsEditorProps) {
  const updateAt = (index: number, patch: Partial<RestorationPair>): void => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number): void => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = (): void => {
    onChange([...items, { ...DEFAULT_RESTORATION }]);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={`restoration-${index}`} className="rounded-xl border border-stone-100 bg-white p-4">
          <p className="mb-3 text-sm font-medium text-ink">Before / After {index + 1}</p>
          <div className="grid gap-4 lg:grid-cols-2">
            <PageContentImageField label="Before" layout="card" value={item.before} onChange={(v) => updateAt(index, { before: v })} />
            <PageContentImageField label="After" layout="card" value={item.after} onChange={(v) => updateAt(index, { after: v })} />
          </div>
          <div className="mt-3 flex gap-3">
            <TextField label="Caption" value={item.caption} onChange={(e) => updateAt(index, { caption: e.target.value })} className="flex-1" />
            <Button type="button" variant="secondary" size="sm" onClick={() => removeAt(index)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={addItem}>
        Add comparison
      </Button>
    </div>
  );
}

export interface AudioTrackItem {
  title: string;
  sub: string;
  url: string;
}

export function AudioTracksEditor({ items, onChange }: { items: AudioTrackItem[]; onChange: (items: AudioTrackItem[]) => void }) {
  const updateAt = (index: number, patch: Partial<AudioTrackItem>): void => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number): void => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = (): void => {
    onChange([...items, { title: 'Track title', sub: 'Category', url: '' }]);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={`audio-${index}`} className="grid gap-3 rounded-xl border border-stone-100 bg-white p-4 sm:grid-cols-2">
          <TextField label="Title" value={item.title} onChange={(e) => updateAt(index, { title: e.target.value })} />
          <TextField label="Category" value={item.sub} onChange={(e) => updateAt(index, { sub: e.target.value })} />
          <TextField label="Audio URL" value={item.url} onChange={(e) => updateAt(index, { url: e.target.value })} className="sm:col-span-2" />
          <Button type="button" variant="secondary" size="sm" onClick={() => removeAt(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={addItem}>
        Add audio track
      </Button>
    </div>
  );
}

export interface ExhibitionItem {
  num: string;
  status: string;
  statusLabel: string;
  dates: string;
  title: string;
  desc: string;
}

export function ExhibitionsEditor({ items, onChange }: { items: ExhibitionItem[]; onChange: (items: ExhibitionItem[]) => void }) {
  const updateAt = (index: number, patch: Partial<ExhibitionItem>): void => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number): void => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = (): void => {
    onChange([
      ...items,
      { num: '01', status: 'current', statusLabel: '● Current', dates: 'Dates', title: 'Title', desc: 'Description' },
    ]);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={`exhibition-${index}`} className="rounded-xl border border-stone-100 bg-white p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="#" value={item.num} onChange={(e) => updateAt(index, { num: e.target.value })} />
            <TextField label="Status label" value={item.statusLabel} onChange={(e) => updateAt(index, { statusLabel: e.target.value })} />
            <TextField label="Status key" value={item.status} onChange={(e) => updateAt(index, { status: e.target.value })} hint="current or recent" />
            <TextField label="Dates" value={item.dates} onChange={(e) => updateAt(index, { dates: e.target.value })} />
            <TextField label="Title" value={item.title} onChange={(e) => updateAt(index, { title: e.target.value })} className="sm:col-span-2" />
            <TextareaField label="Description" rows={3} value={item.desc} onChange={(e) => updateAt(index, { desc: e.target.value })} className="sm:col-span-2" />
          </div>
          <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={() => removeAt(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={addItem}>
        Add exhibition
      </Button>
    </div>
  );
}

export interface MiniTourItem {
  title: string;
  sub: string;
  href: string;
  image: string;
}

export function MiniToursEditor({ items, onChange }: { items: MiniTourItem[]; onChange: (items: MiniTourItem[]) => void }) {
  const updateAt = (index: number, patch: Partial<MiniTourItem>): void => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number): void => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = (): void => {
    onChange([...items, { title: 'Tour', sub: 'Matterport 3D', href: '', image: '' }]);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={`tour-${index}`} className="rounded-xl border border-stone-100 bg-white p-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <PageContentImageField label="Thumbnail" layout="card" value={item.image} onChange={(v) => updateAt(index, { image: v })} />
            <div className="flex flex-col gap-3">
              <TextField label="Title" value={item.title} onChange={(e) => updateAt(index, { title: e.target.value })} />
              <TextField label="Subtitle" value={item.sub} onChange={(e) => updateAt(index, { sub: e.target.value })} />
              <TextField label="Tour URL" value={item.href} onChange={(e) => updateAt(index, { href: e.target.value })} />
              <Button type="button" variant="secondary" size="sm" onClick={() => removeAt(index)}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={addItem}>
        Add mini tour
      </Button>
    </div>
  );
}
