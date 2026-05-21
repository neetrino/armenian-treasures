import { redirect } from 'next/navigation';

function AdminPanelIndex(): never {
  redirect('/admin/dashboard');
}

export default AdminPanelIndex;
