'use client';

import { cn } from '@/lib/utils';

export interface AdminFormTab {
  id: string;
  label: string;
  hint?: string;
}

interface AdminFormTabsProps {
  tabs: AdminFormTab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function AdminFormTabs({ tabs, activeId, onChange, className }: AdminFormTabsProps) {
  return (
    <div
      className={cn(
        'relative flex flex-wrap gap-1 rounded-2xl border border-stone-200/70 bg-parchment-50/80 p-1.5 shadow-sm',
        className,
      )}
      role="tablist"
      aria-label="Form sections"
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative z-10 rounded-xl px-4 py-2.5 text-left transition-colors duration-200',
              active
                ? 'bg-pomegranate-600 text-parchment-50 shadow-md shadow-pomegranate/20'
                : 'text-ink-soft hover:bg-white/70 hover:text-ink',
            )}
          >
            <span className="relative block text-sm font-medium">{tab.label}</span>
            {tab.hint ? (
              <span
                className={cn(
                  'relative mt-0.5 block text-xs',
                  active ? 'text-parchment-50/85' : 'text-ink-muted',
                )}
              >
                {tab.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
