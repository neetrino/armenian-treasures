'use client';

import { useState } from 'react';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { looksLikeHtml, stripRichText, toSafeRichTextHtml } from '@/lib/rich-text';
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
  const plainLength = stripRichText(text).length;
  const shouldCollapse = plainLength > 280;
  const isHtml = looksLikeHtml(text);
  const html = isHtml ? toSafeRichTextHtml(text) : '';
  const textClassName = cn(
    preserveLineBreaks && !isHtml && 'catalog-expandable__preline',
    isHtml && 'catalog-rich-text',
  );

  const body = isHtml ? (
    <div
      className={cn(textClassName, shouldCollapse && !expanded && 'catalog-expandable__clamp')}
      style={shouldCollapse && !expanded ? { WebkitLineClamp: collapsedLines } : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <p
      className={cn(textClassName, shouldCollapse && !expanded && 'catalog-expandable__clamp')}
      style={shouldCollapse && !expanded ? { WebkitLineClamp: collapsedLines } : undefined}
    >
      {text}
    </p>
  );

  if (!shouldCollapse) {
    return body;
  }

  return (
    <div className="catalog-expandable">
      {body}
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
