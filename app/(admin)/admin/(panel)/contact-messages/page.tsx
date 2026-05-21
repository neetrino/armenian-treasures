import Link from 'next/link';
import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { ContactStatusSelect } from '@/components/admin/ContactStatusSelect';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteContactMessageAction } from '@/app/(admin)/admin/(panel)/contact-messages/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Contact messages', robots: { index: false, follow: false } };

type ContactStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';

interface Row {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
}

async function AdminContactMessagesPage() {
  const user = await requireAdmin();
  const rows = (await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })) as Row[];
  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'sender',
      header: 'Sender',
      cell: (row) => (
        <Link
          href={`/admin/contact-messages/${row.id}`}
          className="flex flex-col text-left text-ink hover:text-pomegranate"
        >
          <span className="font-medium">{row.name}</span>
          <span className="text-xs text-ink-muted">{row.email}</span>
        </Link>
      ),
    },
    {
      key: 'preview',
      header: 'Preview',
      cell: (row) => (
        <p className="line-clamp-2 max-w-md text-sm text-ink-soft">{row.message}</p>
      ),
    },
    {
      key: 'date',
      header: 'Received',
      cell: (row) => <span className="text-xs text-ink-muted">{row.createdAt.toLocaleString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => <ContactStatusSelect id={row.id} value={row.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      cell: (row) => (
        <DeleteActionButton
          action={deleteContactMessageAction}
          id={row.id}
          confirmText="Delete this message permanently?"
        />
      ),
    },
  ];
  return (
    <>
      <AdminTopbar title="Contact messages" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Contact inbox"
          description="Messages submitted through the public /contacts form."
        />
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} empty="No messages yet." />
      </div>
    </>
  );
}

export default AdminContactMessagesPage;
