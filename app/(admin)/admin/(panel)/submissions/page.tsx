import Link from 'next/link';
import type { Metadata } from 'next';
import { Info } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { SubmissionStatusSelect } from '@/components/admin/SubmissionStatusSelect';
import { Badge } from '@/components/ui/Badge';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteSubmissionAction } from '@/app/(admin)/admin/(panel)/submissions/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { cn } from '@/lib/utils';

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
  searchParams: { type?: string };
}

async function AdminSubmissionsPage({ searchParams }: PageProps) {
  const user = await requireAdmin();
  const filter = TABS.find((tab) => tab.value === searchParams.type) ?? TABS[0]!;
  const where = filter.value === 'ALL' ? {} : { type: filter.value };
  const rows = (await prisma.submission.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })) as Row[];

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
    <>
      <AdminTopbar title="Submissions inbox" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Public submissions"
          description="Everything submitted through public forms across the site."
        />
        <div className="flex items-start gap-3 rounded-2xl border border-pomegranate/20 bg-pomegranate/5 p-4 text-sm text-pomegranate">
          <Info size={18} className="mt-0.5" aria-hidden />
          <div>
            <p className="font-medium">
              Approval is for tracking only. To publish, create the menu item or item manually.
            </p>
            <p className="mt-1 text-xs text-pomegranate/80">
              Use Culture Menu and Culture Items to add approved content. Submission status here
              is for internal triage and audit only.
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const active = tab.value === filter.value;
            const href =
              tab.value === 'ALL' ? '/admin/submissions' : `/admin/submissions?type=${tab.value}`;
            return (
              <Link
                key={tab.value}
                href={href}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                  active
                    ? 'border-pomegranate bg-pomegranate text-parchment-50'
                    : 'border-stone-200 bg-white text-ink-soft hover:border-pomegranate hover:text-pomegranate',
                )}
              >
                {tab.label}
                {active ? (
                  <Badge tone="stone" className="ml-2 bg-white/20 text-parchment-50">
                    {rows.length}
                  </Badge>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} empty="No submissions yet." />
      </div>
    </>
  );
}

export default AdminSubmissionsPage;
