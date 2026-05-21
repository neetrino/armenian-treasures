import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { getAdminOrNull } from '@/lib/auth/require-admin';

async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const user = await getAdminOrNull();
  if (!user) redirect('/admin/login');
  return (
    <div className="flex min-h-screen bg-parchment-200/30">
      <AdminSidebar />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}

export default AdminPanelLayout;
