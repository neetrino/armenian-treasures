import Link from 'next/link';
import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { ContactInboxTypeBadge } from '@/components/admin/ContactInboxTypeBadge';
import { ContactStatusSelect } from '@/components/admin/ContactStatusSelect';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { deleteContactMessageAction } from '@/app/(admin)/admin/(panel)/contact-messages/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { buildAdminPageCount, parseAdminListQuery } from '@/lib/admin/list-query';
import { getContactMessageKind } from '@/lib/inbox/contact-message-kind';
import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Public inbox', robots: { index: false, follow: false } };

type ContactStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

interface Row {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
}

function inboxPreview(row: Row): string {
  if (getContactMessageKind(row) === 'newsletter') {
    return `Email signup · ${row.email}`;
  }
  return row.message;
}

async function AdminContactMessagesPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const user = await requireAdmin();
  const listQuery = parseAdminListQuery(searchParams);
  const where: Prisma.ContactMessageWhereInput = listQuery.query
    ? {
        OR: [
          { name: { contains: listQuery.query, mode: 'insensitive' } },
          { email: { contains: listQuery.query, mode: 'insensitive' } },
          { message: { contains: listQuery.query, mode: 'insensitive' } },
        ],
      }
    : {};

  const [rows, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: listQuery.skip,
      take: listQuery.pageSize,
    }) as Promise<Row[]>,
    prisma.contactMessage.count({ where }),
  ]);
  const pageCount = buildAdminPageCount(total, listQuery.pageSize);
  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'type',
      header: 'Type',
      cell: (row) => <ContactInboxTypeBadge name={row.name} message={row.message} />,
    },
    {
      key: 'sender',
      header: 'From',
      cell: (row) => {
        const isNewsletter = getContactMessageKind(row) === 'newsletter';
        return (
          <Link
            href={`/admin/contact-messages/${row.id}`}
            className="flex flex-col text-left text-ink hover:text-pomegranate"
          >
            <span className="font-medium">{isNewsletter ? row.email : row.name}</span>
            <span className="text-xs text-ink-muted">
              {isNewsletter ? 'Newsletter subscriber' : row.email}
            </span>
          </Link>
        );
      },
    },
    {
      key: 'preview',
      header: 'Preview',
      cell: (row) => (
        <p className="line-clamp-2 max-w-md text-sm text-ink-soft">{inboxPreview(row)}</p>
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
          confirmText="Delete this inbox entry permanently?"
        />
      ),
    },
  ];
  return (
    <AdminPageShell
      user={user}
      topbarTitle="Public inbox"
      title="Public inbox"
      description="Contact form messages and newsletter signup requests. Newsletter rows are stored here until a dedicated email list is connected — they are not sent to an ESP automatically."
      size="wide"
    >
      <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} empty="No inbox entries yet." />
      <AdminPagination
        page={listQuery.page}
        pageCount={pageCount}
        total={total}
        pageSize={listQuery.pageSize}
        basePath="/admin/contact-messages"
        query={listQuery.query || undefined}
      />
    </AdminPageShell>
  );
}

export default AdminContactMessagesPage;
