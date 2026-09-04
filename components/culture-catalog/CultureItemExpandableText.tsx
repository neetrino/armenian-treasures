'use client';

import { useState } from 'react';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { cn } from '@/lib/utils';

interface CultureItemExpandableTextProps {
  text: string;
  locale?: SiteLocaleCode;
  collapsedLines?: number;
  preserveLineBreaks?: boolean;
}

export function CultureItemExpandableText({
  text,
  locale = 'EN',
  collapsedLines = 4,
  preserveLineBreaks = false,
}: CultureItemExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const shouldCollapse = text.trim().length > 280;
  const textClassName = cn(preserveLineBreaks && 'catalog-expandable__preline');

  if (!shouldCollapse) {
    return <p className={textClassName || undefined}>{text}</p>;
  }

  return (
    <div className="catalog-expandable">
      <p
        className={cn(textClassName, !expanded && 'catalog-expandable__clamp')}
        style={!expanded ? { WebkitLineClamp: collapsedLines } : undefined}
      >
        {text}
      </p>
      <button
        type="button"
        className="catalog-expandable__toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        {uiMessage(locale, expanded ? 'less' : 'more')}
      </button>
    </div>
  );
}
