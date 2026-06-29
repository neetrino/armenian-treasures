export const DEFAULT_ADMIN_PAGE_SIZE = 50;
export const MAX_ADMIN_PAGE_SIZE = 100;

export interface AdminListQuery {
  page: number;
  pageSize: number;
  skip: number;
  query: string;
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function parseAdminListQuery(
  searchParams: Record<string, string | string[] | undefined>,
  options?: { pageSize?: number },
): AdminListQuery {
  const pageSize = Math.min(
    options?.pageSize ?? DEFAULT_ADMIN_PAGE_SIZE,
    MAX_ADMIN_PAGE_SIZE,
  );
  const page = parsePositiveInt(
    typeof searchParams.page === 'string' ? searchParams.page : undefined,
    1,
  );
  const query =
    typeof searchParams.q === 'string' ? searchParams.q.trim().slice(0, 120) : '';

  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    query,
  };
}

export function buildAdminPageCount(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(total / pageSize));
}
