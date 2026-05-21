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
}

export function AdminTable<T>({
  columns,
  rows,
  getRowId,
  empty,
  className,
}: AdminTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-200 bg-parchment-50 px-6 py-12 text-center text-sm text-ink-muted">
        {empty ?? 'No records yet.'}
      </div>
    );
  }
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-card', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-100 text-sm">
          <thead className="bg-parchment-50 text-left text-[11px] uppercase tracking-eyebrow text-ink-muted">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn('px-4 py-3 font-medium', col.align === 'right' && 'text-right')}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {rows.map((row) => (
              <tr key={getRowId(row)} className="hover:bg-parchment-50/60">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3 align-middle text-ink',
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
