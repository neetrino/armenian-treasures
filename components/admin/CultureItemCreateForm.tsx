'use client';

import { useRouter } from 'next/navigation';
import { CultureItemForm } from '@/components/admin/CultureItemForm';

interface MenuOption {
  id: string;
  title: string;
}

interface CultureItemCreateFormProps {
  menuOptions: MenuOption[];
}

export function CultureItemCreateForm({ menuOptions }: CultureItemCreateFormProps) {
  const router = useRouter();

  return (
    <CultureItemForm
      mode="create"
      menuOptions={menuOptions}
      heading="Create culture item"
      onCancel={() => router.push('/admin/culture-items')}
    />
  );
}
