import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface AdminTableColumn<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  width?: string;
  align?: 'left' | 'right' | 'center';
}

interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  empty?: ReactNode;
  className?: string;
  onRowClick?: (row: T) => void;
}

export function AdminTable<T>({
  columns,
  rows,
  getRowId,
  empty,
  className,
  onRowClick,
}: AdminTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300/70 bg-parchment-50/80 px-6 py-14 text-center text-sm text-ink-muted motion-safe:animate-admin-fade-up">
        {empty ?? 'No records yet.'}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-stone-200/70 bg-white/95 shadow-card backdrop-blur-sm motion-safe:animate-admin-fade-up',
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200/60 text-sm">
          <thead className="bg-gradient-to-r from-parchment-100/90 to-parchment-50/80 text-left text-[11px] uppercase tracking-eyebrow text-ink-muted">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn('px-4 py-3.5 font-semibold', col.align === 'right' && 'text-right')}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100/80">
            {rows.map((row, index) => (
              <tr
                key={getRowId(row)}
                className={cn(
                  'motion-safe:animate-admin-fade-up transition duration-200',
                  onRowClick
                    ? 'cursor-pointer hover:-translate-y-px hover:bg-bronze-50/45'
                    : 'hover:bg-parchment-50/70',
                )}
                style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                onKeyDown={
                  onRowClick
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          onRowClick(row);
                        }
                      }
                    : undefined
                }
                tabIndex={onRowClick ? 0 : undefined}
                role={onRowClick ? 'button' : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3.5 align-middle text-ink',
                      col.align === 'right' && 'text-right',
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
