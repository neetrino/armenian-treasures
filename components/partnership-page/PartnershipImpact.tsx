import { PARTNERSHIP_IMPACT } from '@/lib/constants/partnership-page';

function ImpactIcon({ type }: { type: (typeof PARTNERSHIP_IMPACT)[number]['icon'] }) {
  if (type === 'shield') {
    return (
      <svg className="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (type === 'layers') {
    return (
      <svg className="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M12 3L2 9l10 6 10-6-10-6z" />
        <path d="M2 17l10 6 10-6M2 13l10 6 10-6" />
      </svg>
    );
  }
  if (type === 'spark') {
    return (
      <svg className="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    );
  }
  if (type === 'globe') {
    return (
      <svg className="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    );
  }
  if (type === 'people') {
    return (
      <svg className="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    );
  }
  return (
    <svg className="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function PartnershipImpact() {
  return (
    <section className="reveal">
      <div className="sec-label">Strategic Impact Ecosystem</div>
      <div className="sec-title">What Partnership Makes Possible</div>
      <p className="sec-desc">
        Each alliance unlocks a distinct dimension of cultural permanence — six interconnected pillars that together
        build an unbreakable infrastructure for heritage.
      </p>
      <div className="impact-grid">
        {PARTNERSHIP_IMPACT.map((item) => (
          <div key={item.ghost} className="impact-card reveal">
            <ImpactIcon type={item.icon} />
            <div className="impact-tag">{item.tag}</div>
            <div className="impact-title">{item.title}</div>
            <div className="impact-desc">{item.desc}</div>
            <div className="impact-ghost">{item.ghost}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
