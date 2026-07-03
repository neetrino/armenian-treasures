import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import { hasNonEmptyArray, hasTrimmedText } from '@/lib/landing/landing-section-utils';

interface CultureCatalogAboutProps {
  content: CultureCatalogContent['about'];
}

function hasAboutContent(content: CultureCatalogContent['about']): boolean {
  return (
    hasTrimmedText(content.description) ||
    content.paragraphs.some((paragraph) => hasTrimmedText(paragraph)) ||
    hasTrimmedText(content.extraHeading) ||
    hasTrimmedText(content.extraParagraph) ||
    hasNonEmptyArray(content.facts)
  );
}

export function CultureCatalogAbout({ content }: CultureCatalogAboutProps) {
  if (!hasAboutContent(content)) {
    return null;
  }

  const hasFacts = content.facts.length > 0;

  return (
    <section id="about">
      <p className="sec-label">{content.label}</p>
      <h2 className="sec-title">{content.title}</h2>
      <p className="sec-desc">{content.description}</p>
      <div className="about-split">
        <div className="about-body reveal">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {content.extraHeading ? <h3>{content.extraHeading}</h3> : null}
          {content.extraParagraph ? <p>{content.extraParagraph}</p> : null}
        </div>
        {hasFacts ? (
          <div className="about-aside">
            {content.facts.map((fact) => (
              <div key={fact.label} className="fact-card reveal">
                <div className="fact-label">{fact.label}</div>
                <div className="fact-value">{fact.value}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
