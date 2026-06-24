import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { requireAdminPage } from '@/lib/auth/require-admin';

async function AdminPanelLayout({ children }: { children: ReactNode }) {
  await requireAdminPage();
  return (
    <div className="flex h-screen overflow-hidden bg-parchment-200/30">
      <AdminSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}

export default AdminPanelLayout;
