'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { ChevronDown, Pencil, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import {
  deleteMenuItemAction,
  moveMenuItemAction,
  toggleMenuItemAction,
} from '@/app/(admin)/admin/(panel)/culture-menu/actions';
import type { MenuNode } from '@/lib/culture-menu';

interface CultureMenuTreeProps {
  tree: MenuNode[];
}

export function CultureMenuTree({ tree }: CultureMenuTreeProps) {
  return (
    <ul className="flex flex-col gap-2">
      {tree.map((node) => (
        <MenuTreeRow key={node.id} node={node} />
      ))}
    </ul>
  );
}

interface RowProps {
  node: MenuNode;
  parent?: MenuNode;
  depth?: number;
}

function MenuTreeRow({ node, parent, depth = 0 }: RowProps) {
  const [open, setOpen] = useState(true);
  const [pending, startTransition] = useTransition();
  const children = node.children ?? [];

  function handleDelete(): void {
    if (typeof window === 'undefined') return;
    if (!window.confirm(`Delete "${node.title}" and all its children?`)) return;
    startTransition(() => {
      void deleteMenuItemAction(node.id);
    });
  }

  function handleToggle(next: boolean): void {
    startTransition(() => {
      void toggleMenuItemAction(node.id, next);
    });
  }

  function handleMove(direction: 'up' | 'down'): void {
    startTransition(() => {
      void moveMenuItemAction(node.id, direction);
    });
  }

  return (
    <li className="flex flex-col">
      <div
        className={cn(
          'flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-3 shadow-sm transition',
          !node.isActive && 'opacity-60',
        )}
        style={{ paddingLeft: `${12 + depth * 20}px` }}
      >
        {children.length > 0 ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Collapse' : 'Expand'}
            className="rounded p-1 text-ink-muted hover:bg-stone-100"
          >
            <ChevronDown
              size={14}
              aria-hidden
              className={cn('transition-transform', !open && '-rotate-90')}
            />
          </button>
        ) : (
          <span className="w-6" aria-hidden />
        )}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink">
              <span className="truncate">{node.title}</span>
              <Badge tone={badgeToneFor(node.routeType)} className="text-[10px]">
                {formatRouteType(node.routeType)}
              </Badge>
              {!node.isActive ? <Badge tone="stone">Hidden</Badge> : null}
            </p>
            <p className="truncate text-xs text-ink-muted">
              /{parent ? `${parent.slug}/` : ''}
              {node.slug}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleMove('up')}
            disabled={pending}
            className="rounded p-1 text-ink-muted hover:bg-stone-100 disabled:opacity-50"
            aria-label="Move up"
          >
            <ArrowUp size={14} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => handleMove('down')}
            disabled={pending}
            className="rounded p-1 text-ink-muted hover:bg-stone-100 disabled:opacity-50"
            aria-label="Move down"
          >
            <ArrowDown size={14} aria-hidden />
          </button>
          <label className="ml-2 inline-flex items-center gap-2 text-xs text-ink-muted">
            <input
              type="checkbox"
              checked={node.isActive}
              onChange={(event) => handleToggle(event.target.checked)}
              disabled={pending}
              className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
              aria-label="Active"
            />
            Active
          </label>
          {!isFormType(node.routeType) ? (
            <Link
              href={`/admin/culture-menu/new?parentId=${node.id}`}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
              aria-label="Add child"
            >
              <Plus size={12} aria-hidden /> Child
            </Link>
          ) : null}
          <Link
            href={`/admin/culture-menu/${node.id}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
            aria-label="Edit"
          >
            <Pencil size={12} aria-hidden /> Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-pomegranate hover:bg-pomegranate/10 disabled:opacity-50"
            aria-label="Delete"
          >
            <Trash2 size={12} aria-hidden /> Delete
          </button>
        </div>
      </div>
      {open && children.length > 0 ? (
        <ul className="mt-2 flex flex-col gap-2">
          {children.map((child) => (
            <MenuTreeRow key={child.id} node={child} parent={node} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function badgeToneFor(type: string): 'bronze' | 'pomegranate' | 'stone' | 'midnight' {
  switch (type) {
    case 'CATEGORY':
      return 'bronze';
    case 'SUBCATEGORY':
      return 'stone';
    case 'SUBCATEGORY_FORM':
    case 'PROJECT_SUBMIT_FORM':
      return 'pomegranate';
    case 'CUSTOM_URL':
      return 'midnight';
    default:
      return 'stone';
  }
}

function isFormType(type: string): boolean {
  return type === 'SUBCATEGORY_FORM' || type === 'PROJECT_SUBMIT_FORM';
}

function formatRouteType(type: string): string {
  switch (type) {
    case 'CATEGORY':
      return 'Category';
    case 'SUBCATEGORY':
      return 'Subcategory';
    case 'SUBCATEGORY_FORM':
      return '+ Form';
    case 'PROJECT_SUBMIT_FORM':
      return '+ Form';
    case 'CUSTOM_URL':
      return 'Custom URL';
    default:
      return type;
  }
}
