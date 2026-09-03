'use client';

import { useState } from 'react';

interface CultureItemExpandableTextProps {
  text: string;
  collapsedLines?: number;
}

export function CultureItemExpandableText({
  text,
  collapsedLines = 4,
}: CultureItemExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const shouldCollapse = text.trim().length > 280;

  if (!shouldCollapse) {
    return <p>{text}</p>;
  }

  return (
    <div className="catalog-expandable">
      <p className={expanded ? undefined : 'catalog-expandable__clamp'} style={{ WebkitLineClamp: collapsedLines }}>
        {text}
      </p>
      <button
        type="button"
        className="catalog-expandable__toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? 'Less' : 'More'}
      </button>
    </div>
  );
}
