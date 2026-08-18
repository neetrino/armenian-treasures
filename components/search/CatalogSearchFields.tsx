import { Search } from 'lucide-react';
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

function FieldLabel({ children }: { children: string }) {
  return (
    <span className="catalog-search-field-label font-cinzel text-[9px] font-bold uppercase tracking-[0.16em] text-heritage-teal">
      {children}
    </span>
  );
}

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
    <label className="catalog-search-control flex min-w-0 flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
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
    <div
      className={cn(
        'catalog-search-fields',
        isHeader ? 'grid grid-cols-1 gap-3' : 'catalog-search-fields--page',
      )}
    >
      <label className="catalog-search-control catalog-search-control--query flex min-w-0 flex-col gap-1.5">
        <FieldLabel>Search</FieldLabel>
        <span className={cn(!isHeader && 'catalog-search-field-shell')}>
          {!isHeader ? (
            <Search size={15} aria-hidden className="catalog-search-field-icon" />
          ) : null}
          <input
            type="search"
            name="q"
            defaultValue={defaults.q}
            placeholder="Site, region, period…"
            className={cn(fieldClassName, !isHeader && 'catalog-search-field--query')}
          />
        </span>
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
