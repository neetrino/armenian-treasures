import { PARTNERSHIP_TIMELINE, PARTNERSHIP_VALUES } from '@/lib/constants/partnership-page';

function ValueIcon({ type }: { type: (typeof PARTNERSHIP_VALUES)[number]['icon'] }) {
  if (type === 'shield-check') {
    return (
      <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    );
  }
  if (type === 'globe') {
    return (
      <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    );
  }
  if (type === 'monitor') {
    return (
      <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );
  }
  return (
    <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function PartnershipTimeline() {
  return (
    <section className="reveal">
      <div className="sec-label">Collaboration Lifecycle</div>
      <div className="sec-title">The Verification Process</div>
      <p className="sec-desc">
        Every partnership follows a rigorous, transparent lifecycle — from first contact to permanent global presence.
      </p>
      <div className="timeline-wrap">
        <div className="timeline-track">
          {PARTNERSHIP_TIMELINE.map((step) => (
            <div key={step.num} className="tl-step reveal">
              <div className="tl-dot">{step.num}</div>
              <div>
                <div className="tl-name">{step.name}</div>
                <div className="tl-desc">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnershipValues() {
  return (
    <section className="reveal">
      <div className="sec-label">Why Elite Institutions Choose Us</div>
      <div className="sec-title">
        The Armenian Treasures
        <br />
        Institutional Value Proposition
      </div>
      <p className="sec-desc">
        We do not offer exposure. We offer permanence — and a rigorous infrastructure worthy of your institution&apos;s
        reputation.
      </p>
      <div className="value-grid">
        {PARTNERSHIP_VALUES.map((item) => (
          <div key={item.title} className="value-card reveal">
            <ValueIcon type={item.icon} />
            <div>
              <div className="value-title">{item.title}</div>
              <div className="value-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
