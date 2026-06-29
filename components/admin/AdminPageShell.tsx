import type { ReactNode } from 'react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageBody } from '@/components/admin/AdminPageBody';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import type { AdminContext } from '@/lib/auth/require-admin';

interface AdminPageShellProps {
  user: AdminContext;
  topbarTitle: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  backHref?: string;
  backLabel?: string;
  beforeHeader?: ReactNode;
  size?: 'default' | 'wide' | 'full';
  children: ReactNode;
}

export function AdminPageShell({
  user,
  topbarTitle,
  title: _title,
  description: _description,
  actions,
  backHref,
  backLabel,
  beforeHeader,
  size = 'default',
  children,
}: AdminPageShellProps) {
  return (
    <>
      <AdminTopbar title={topbarTitle} user={user} />
      <AdminPageBody size={size}>
        {beforeHeader}
        {backHref ? <AdminBackLink href={backHref} label={backLabel} /> : null}
        {actions ? <div className="flex flex-wrap items-center justify-end gap-2">{actions}</div> : null}
        {children}
      </AdminPageBody>
    </>
  );
}
