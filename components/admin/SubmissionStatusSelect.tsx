'use client';

import { StatusSelect } from './StatusSelect';
import { updateSubmissionStatusAction } from '@/app/(admin)/admin/(panel)/submissions/actions';

const OPTIONS = [
  { value: 'PENDING' as const, label: 'Pending' },
  { value: 'REVIEWING' as const, label: 'Reviewing' },
  { value: 'APPROVED' as const, label: 'Approved' },
  { value: 'REJECTED' as const, label: 'Rejected' },
  { value: 'ARCHIVED' as const, label: 'Archived' },
];

type Status = (typeof OPTIONS)[number]['value'];

interface SubmissionStatusSelectProps {
  id: string;
  value: Status;
}

export function SubmissionStatusSelect({ id, value }: SubmissionStatusSelectProps) {
  return (
    <StatusSelect
      value={value}
      options={OPTIONS}
      onChange={async (next) => {
        await updateSubmissionStatusAction(id, next);
      }}
    />
  );
}
