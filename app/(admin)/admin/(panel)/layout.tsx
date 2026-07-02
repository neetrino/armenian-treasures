import type { ReactNode } from 'react';

import { AdminMotionDisabled } from '@/components/admin/AdminMotionDisabled';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

import { requireAdminPage } from '@/lib/auth/require-admin';



async function AdminPanelLayout({ children }: { children: ReactNode }) {

  await requireAdminPage();

  return (
    <AdminMotionDisabled>
      <div className="admin-no-motion relative flex h-screen overflow-hidden bg-gradient-to-br from-parchment-100/90 via-parchment-50 to-stone-100/50">
        <div
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-bronze-300/15 blur-3xl"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-pomegranate/8 blur-3xl"
          aria-hidden
        />

        <AdminSidebar />

        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">{children}</div>
      </div>
    </AdminMotionDisabled>

  );

}



export default AdminPanelLayout;

