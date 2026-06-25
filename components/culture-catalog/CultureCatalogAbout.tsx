import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';

interface CultureCatalogAboutProps {
  content: CultureCatalogContent['about'];
}

export function CultureCatalogAbout({ content }: CultureCatalogAboutProps) {
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
        <div className="about-aside">
          {content.facts.map((fact) => (
            <div key={fact.label} className="fact-card reveal">
              <div className="fact-label">{fact.label}</div>
              <div className="fact-value">{fact.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
