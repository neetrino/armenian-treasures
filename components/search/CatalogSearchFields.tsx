import type { CatalogFilterOption } from '@/lib/culture-catalog/catalog-filter-options';
import type { CatalogSearchFilters } from '@/lib/culture-catalog/catalog-search-params';
import { cn } from '@/lib/utils';

interface CatalogSearchFieldsProps {
  defaults: CatalogSearchFilters;
  regions: CatalogFilterOption[];
  periods: CatalogFilterOption[];
  types: CatalogFilterOption[];
  variant?: 'header' | 'page';
}

const FIELD_BASE =
  'w-full border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-[rgba(214,184,90,0.45)]';

const FIELD_BY_VARIANT = {
  header:
    'border-[var(--dropdown-border)] text-[var(--dropdown-text)] placeholder:text-[var(--dropdown-text)]/55',
  page: 'catalog-search-field',
} as const;

function FilterSelect({
  name,
  label,
  value,
  options,
  allLabel,
  fieldClassName,
}: {
  name: string;
  label: string;
  value: string;
  options: CatalogFilterOption[];
  allLabel: string;
  fieldClassName: string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="font-cinzel text-[9px] font-bold uppercase tracking-[0.16em] text-heritage-teal">
        {label}
      </span>
      <select name={name} defaultValue={value} className={cn(fieldClassName, 'cursor-pointer')}>
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CatalogSearchFields({
  defaults,
  regions,
  periods,
  types,
  variant = 'page',
}: CatalogSearchFieldsProps) {
  const isHeader = variant === 'header';
  const fieldClassName = cn(FIELD_BASE, FIELD_BY_VARIANT[variant]);

  return (
    <div className={cn('grid gap-3', isHeader ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-4')}>
      <label className="flex min-w-0 flex-col gap-1 sm:col-span-2 lg:col-span-1">
        <span className="font-cinzel text-[9px] font-bold uppercase tracking-[0.16em] text-heritage-teal">
          Search
        </span>
        <input
          type="search"
          name="q"
          defaultValue={defaults.q}
          placeholder="Site, region, period…"
          className={fieldClassName}
        />
      </label>
      <FilterSelect
        name="region"
        label="Region"
        value={defaults.region}
        options={regions}
        allLabel="All regions"
        fieldClassName={fieldClassName}
      />
      <FilterSelect
        name="period"
        label="Period"
        value={defaults.period}
        options={periods}
        allLabel="All periods"
        fieldClassName={fieldClassName}
      />
      <FilterSelect
        name="type"
        label="Type"
        value={defaults.type}
        options={types}
        allLabel="All types"
        fieldClassName={fieldClassName}
      />
    </div>
  );
}
