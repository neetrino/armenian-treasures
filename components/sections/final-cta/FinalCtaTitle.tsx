interface FinalCtaTitleProps {
  title: string;
}

function splitTitleHighlight(title: string): { lead: string; highlight: string } {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) {
    return { lead: title, highlight: '' };
  }
  const highlight = words.pop() ?? '';
  return { lead: words.join(' '), highlight };
}

export function FinalCtaTitle({ title }: FinalCtaTitleProps) {
  const { lead, highlight } = splitTitleHighlight(title);

  return (
    <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] tracking-tight text-ink sm:max-w-none sm:leading-[1.08] lg:text-[3.25rem]">
      <span className="block">{lead}</span>
      {highlight ? (
        <span className="block text-pomegranate-700">{highlight}</span>
      ) : null}
    </h2>
  );
}
