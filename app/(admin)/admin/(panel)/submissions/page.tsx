import Link from 'next/link';
import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminAlertBanner } from '@/components/admin/AdminAlertBanner';
import { AdminFilterPills } from '@/components/admin/AdminFilterPills';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { SubmissionStatusSelect } from '@/components/admin/SubmissionStatusSelect';
import { Badge } from '@/components/ui/Badge';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { deleteSubmissionAction } from '@/app/(admin)/admin/(panel)/submissions/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { buildAdminPageCount, parseAdminListQuery } from '@/lib/admin/list-query';
import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Submissions', robots: { index: false, follow: false } };

type SubmissionType =
  | 'SUBCATEGORY_REQUEST'
  | 'PROJECT_REQUEST'
  | 'CULTURE_ITEM_REQUEST'
  | 'GENERAL_REQUEST';

type SubmissionStatus = 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED' | 'ARCHIVED';

interface Row {
  id: string;
  type: SubmissionType;
  status: SubmissionStatus;
  title: string | null;
  category: string | null;
  parentCategoryTitle: string | null;
  submitterName: string;
  submitterEmail: string;
  createdAt: Date;
}

const TABS: { value: 'ALL' | SubmissionType; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'SUBCATEGORY_REQUEST', label: 'Sub-catalogs' },
  { value: 'PROJECT_REQUEST', label: 'Projects' },
  { value: 'CULTURE_ITEM_REQUEST', label: 'Items' },
  { value: 'GENERAL_REQUEST', label: 'General' },
];

interface PageProps {
  searchParams: Promise<{ type?: string; page?: string; q?: string }>;
}

async function AdminSubmissionsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const user = await requireAdmin();
  const listQuery = parseAdminListQuery(searchParams);
  const filter = TABS.find((tab) => tab.value === searchParams.type) ?? TABS[0]!;
  const where: Prisma.SubmissionWhereInput = {
    ...(filter.value === 'ALL' ? {} : { type: filter.value }),
    ...(listQuery.query
      ? {
          OR: [
            { title: { contains: listQuery.query, mode: 'insensitive' } },
            { submitterName: { contains: listQuery.query, mode: 'insensitive' } },
            { submitterEmail: { contains: listQuery.query, mode: 'insensitive' } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.submission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: listQuery.skip,
      take: listQuery.pageSize,
    }) as Promise<Row[]>,
    prisma.submission.count({ where }),
  ]);
  const pageCount = buildAdminPageCount(total, listQuery.pageSize);

  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'title',
      header: 'Submission',
      cell: (row) => (
        <Link
          href={`/admin/submissions/${row.id}`}
          className="flex flex-col text-left text-ink hover:text-pomegranate"
        >
          <span className="font-medium">{row.title ?? '(no title)'}</span>
          <span className="text-xs text-ink-muted">
            {row.type.replace(/_/g, ' ').toLowerCase()}
            {row.parentCategoryTitle ? ` · under ${row.parentCategoryTitle}` : ''}
            {row.category && !row.parentCategoryTitle ? ` · ${row.category}` : ''}
          </span>
        </Link>
      ),
    },
    {
      key: 'submitter',
      header: 'Submitter',
      cell: (row) => (
        <div>
          <p className="text-ink">{row.submitterName}</p>
          <p className="text-xs text-ink-muted">{row.submitterEmail}</p>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      cell: (row) => (
        <span className="text-xs text-ink-muted">{row.createdAt.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => <SubmissionStatusSelect id={row.id} value={row.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1">
          <DeleteActionButton
            action={deleteSubmissionAction}
            id={row.id}
            confirmText="Delete this submission permanently?"
          />
        </div>
      ),
    },
  ];

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Submissions inbox"
      title="Public submissions"
      description="Everything submitted through public forms across the site."
      size="wide"
    >
      <AdminAlertBanner title="Approval is for tracking only">
        Use Culture Menu and Culture Items to add approved content. Submission status here is for
        internal triage and audit only.
      </AdminAlertBanner>

      <AdminFilterPills
        pills={TABS.map((tab) => {
          const active = tab.value === filter.value;
          const href =
            tab.value === 'ALL' ? '/admin/submissions' : `/admin/submissions?type=${tab.value}`;
          return {
            href,
            label: tab.label,
            active,
            badge:
              active ? (
                <Badge tone="stone" className="ml-2 bg-white/20 text-parchment-50">
                  {total}
                </Badge>
              ) : undefined,
          };
        })}
      />

      <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} empty="No submissions yet." />
      <AdminPagination
        page={listQuery.page}
        pageCount={pageCount}
        total={total}
        pageSize={listQuery.pageSize}
        basePath="/admin/submissions"
        query={listQuery.query || undefined}
        extraParams={filter.value === 'ALL' ? undefined : { type: filter.value }}
      />
    </AdminPageShell>
  );
}

export default AdminSubmissionsPage;
