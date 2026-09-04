'use client';

import { Search, X } from 'lucide-react';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface CultureCatalogSectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  locale?: SiteLocaleCode;
}

export function CultureCatalogSectionHeader({
  label,
  title,
  description,
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  locale = 'EN',
}: CultureCatalogSectionHeaderProps) {
  const placeholder = searchPlaceholder ?? uiMessage(locale, 'searchEntries');
  return (
    <div className="catalog-section-intro">
      <div className="catalog-section-intro__copy">
        <p className="sec-label">{label}</p>
        <h2 className="sec-title">{title}</h2>
        {description ? <p className="sec-desc">{description}</p> : null}
      </div>
      <label className="catalog-section-intro__search">
        <span className="sr-only">{uiMessage(locale, 'searchEntries')}</span>
        <Search size={15} aria-hidden className="catalog-section-intro__search-icon" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={placeholder}
          className="catalog-section-intro__search-input"
        />
        {searchQuery ? (
          <button
            type="button"
            aria-label={uiMessage(locale, 'clearSearch')}
            onClick={() => onSearchChange('')}
            className="catalog-section-intro__search-clear"
          >
            <X size={14} aria-hidden />
          </button>
        ) : null}
      </label>
    </div>
  );
}
