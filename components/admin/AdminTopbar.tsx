import type { AdminContext } from '@/lib/auth/require-admin';

interface AdminTopbarProps {
  title: string;
  user: AdminContext;
}

export function AdminTopbar({ title, user: _user }: AdminTopbarProps) {
  void title;
  void _user;
  return null;
}
