'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition, type HTMLAttributes } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  defaultDropAnimation,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  ChevronDown,
  Eye,
  EyeOff,
  GitBranch,
  GripVertical,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import {
  deleteMenuItemAction,
  reorderMenuSiblingsAction,
  toggleMenuItemAction,
} from '@/app/(admin)/admin/(panel)/culture-menu/actions';
import type { MenuNode } from '@/lib/culture-menu';

interface CultureMenuTreeProps {
  tree: MenuNode[];
  onAddChild?: (parentId: string) => void;
}

export function CultureMenuTree({ tree, onAddChild }: CultureMenuTreeProps) {
  return <MenuSiblingList siblings={tree} depth={0} onAddChild={onAddChild} />;
}

interface SiblingListProps {
  siblings: MenuNode[];
  parent?: MenuNode;
  depth: number;
  onAddChild?: (parentId: string) => void;
}

function MenuSiblingList({ siblings, parent, depth, onAddChild }: SiblingListProps) {
  const [items, setItems] = useState(siblings);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setItems(siblings);
  }, [siblings]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragStart(event: DragStartEvent): void {
    setActiveId(String(event.active.id));
    setSaveError(null);
  }

  function handleDragEnd(event: DragEndEvent): void {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const reordered = arrayMove(items, oldIndex, newIndex);
    const snapshot = items;
    setItems(reordered);

    void reorderMenuSiblingsAction(
      parent?.id ?? null,
      reordered.map((item) => item.id),
    ).then((result) => {
      if (!result.ok) {
        setItems(snapshot);
        setSaveError(result.message);
      }
    });
  }

  const activeItem = activeId ? items.find((item) => item.id === activeId) : null;

  return (
    <div className="flex flex-col gap-2">
      {saveError ? (
        <p className="text-xs text-pomegranate" role="alert">
          {saveError}
        </p>
      ) : null}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col gap-2">
            {items.map((node) => (
              <SortableMenuRow
                key={node.id}
                node={node}
                parent={parent}
                depth={depth}
                onAddChild={onAddChild}
              />
            ))}
          </ul>
        </SortableContext>
        <DragOverlay dropAnimation={defaultDropAnimation}>
          {activeItem ? (
            <MenuRowSurface node={activeItem} parent={parent} depth={depth} overlay />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

interface SortableRowProps {
  node: MenuNode;
  parent?: MenuNode;
  depth: number;
  onAddChild?: (parentId: string) => void;
}

function SortableMenuRow({ node, parent, depth, onAddChild }: SortableRowProps) {
  const [open, setOpen] = useState(true);
  const children = node.children ?? [];
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} className={cn('flex flex-col', isDragging && 'z-0')}>
      <MenuRowSurface
        node={node}
        parent={parent}
        depth={depth}
        open={open}
        onToggleOpen={() => setOpen((value) => !value)}
        hasChildren={children.length > 0}
        isDragging={isDragging}
        dragHandleRef={setActivatorNodeRef}
        dragHandleProps={{ ...attributes, ...listeners }}
        onAddChild={onAddChild}
      />
      {open && children.length > 0 ? (
        <div className="mt-2">
          <MenuSiblingList
            siblings={children}
            parent={node}
            depth={depth + 1}
            onAddChild={onAddChild}
          />
        </div>
      ) : null}
    </li>
  );
}

interface SurfaceProps {
  node: MenuNode;
  parent?: MenuNode;
  depth: number;
  open?: boolean;
  onToggleOpen?: () => void;
  hasChildren?: boolean;
  isDragging?: boolean;
  overlay?: boolean;
  dragHandleRef?: (element: HTMLButtonElement | null) => void;
  dragHandleProps?: HTMLAttributes<HTMLButtonElement>;
  onAddChild?: (parentId: string) => void;
}

function MenuRowSurface({
  node,
  parent,
  depth,
  open = true,
  onToggleOpen,
  hasChildren = false,
  isDragging = false,
  overlay = false,
  dragHandleRef,
  dragHandleProps,
  onAddChild,
}: SurfaceProps) {
  const [rowPending, startTransition] = useTransition();
  const router = useRouter();
  const children = node.children ?? [];
  const showChevron = hasChildren || children.length > 0;

  function handleDelete(): void {
    if (typeof window === 'undefined') return;
    if (!window.confirm(`Delete "${node.title}" and all its children?`)) return;
    startTransition(() => {
      void deleteMenuItemAction(node.id).then((result) => {
        if (!result.ok) {
          window.alert(result.message);
          return;
        }
        router.refresh();
      });
    });
  }

  function handleToggle(next: boolean): void {
    startTransition(() => {
      void toggleMenuItemAction(node.id, next);
    });
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-3 shadow-sm transition',
        !node.isActive && 'opacity-60',
        isDragging && !overlay && 'opacity-40',
        overlay && 'scale-[1.02] border-pomegranate/30 shadow-lg ring-1 ring-pomegranate/20',
      )}
      style={{ paddingLeft: `${12 + depth * 20}px` }}
    >
      <button
        type="button"
        ref={dragHandleRef}
        {...dragHandleProps}
        disabled={rowPending || overlay}
        className={cn(
          'shrink-0 touch-none text-ink-muted disabled:opacity-50',
          overlay ? 'cursor-grabbing' : 'cursor-grab active:cursor-grabbing',
        )}
        aria-label="Drag to reorder"
        title="Drag to reorder"
      >
        <GripVertical size={14} aria-hidden />
      </button>
      {showChevron ? (
        <button
          type="button"
          onClick={onToggleOpen}
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
      {!overlay ? (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleToggle(!node.isActive)}
            disabled={rowPending}
            className="rounded p-1 text-ink-muted hover:bg-stone-100 disabled:opacity-50"
            aria-label="Toggle active"
            title="Toggle active"
          >
            {node.isActive ? (
              <Eye size={14} aria-hidden />
            ) : (
              <EyeOff size={14} aria-hidden />
            )}
          </button>
          {!isFormType(node.routeType) && onAddChild ? (
            <button
              type="button"
              onClick={() => onAddChild(node.id)}
              className="inline-flex rounded-md p-1 text-ink-soft hover:bg-stone-100"
              aria-label="Add child"
              title="Add child"
            >
              <GitBranch size={14} aria-hidden />
            </button>
          ) : null}
          <Link
            href={`/admin/culture-menu/${node.id}`}
            className="inline-flex rounded-md p-1 text-ink-soft hover:bg-stone-100"
            aria-label="Edit item"
            title="Edit item"
          >
            <Pencil size={14} aria-hidden />
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={rowPending}
            className="inline-flex rounded-md p-1 text-pomegranate hover:bg-pomegranate/10 disabled:opacity-50"
            aria-label="Delete item"
            title="Delete item"
          >
            <Trash2 size={14} aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
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
