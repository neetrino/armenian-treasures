import { Children, Fragment, isValidElement, type ReactNode } from 'react';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';

function isRenderableSection(child: ReactNode): boolean {
  return child !== null && child !== undefined && child !== false;
}

function getSectionKey(section: ReactNode, index: number): string | number {
  if (isValidElement(section) && section.key != null) {
    return section.key;
  }
  return index;
}

export function LandingSectionStack({ children }: { children: ReactNode }) {
  const sections = Children.toArray(children).filter(isRenderableSection);

  return (
    <>
      {sections.map((section, index) => (
        <Fragment key={getSectionKey(section, index)}>
          {index > 0 ? <KhndzoreskDivider /> : null}
          {section}
        </Fragment>
      ))}
    </>
  );
}
