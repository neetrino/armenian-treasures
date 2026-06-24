'use client';

const PARTICLES = [
  { top: '8%', left: '12%', size: 2, color: 'gold', opacity: 0.45, delay: '0s' },
  { top: '14%', left: '78%', size: 1.5, color: 'teal', opacity: 0.35, delay: '1.2s' },
  { top: '22%', left: '45%', size: 1, color: 'gold', opacity: 0.25, delay: '2.4s' },
  { top: '32%', left: '92%', size: 2, color: 'gold', opacity: 0.4, delay: '0.8s' },
  { top: '38%', left: '6%', size: 1.5, color: 'teal', opacity: 0.3, delay: '3s' },
  { top: '48%', left: '88%', size: 1, color: 'teal', opacity: 0.28, delay: '1.6s' },
  { top: '55%', left: '22%', size: 2.5, color: 'gold', opacity: 0.5, delay: '2s' },
  { top: '62%', left: '68%', size: 1.5, color: 'gold', opacity: 0.32, delay: '0.4s' },
  { top: '70%', left: '38%', size: 1, color: 'teal', opacity: 0.22, delay: '2.8s' },
  { top: '78%', left: '82%', size: 2, color: 'teal', opacity: 0.38, delay: '1s' },
  { top: '85%', left: '15%', size: 1.5, color: 'gold', opacity: 0.3, delay: '3.4s' },
  { top: '18%', left: '58%', size: 1, color: 'teal', opacity: 0.2, delay: '4s' },
  { top: '42%', left: '52%', size: 1.5, color: 'gold', opacity: 0.18, delay: '2.2s' },
  { top: '90%', left: '55%', size: 1, color: 'gold', opacity: 0.25, delay: '1.4s' },
] as const;

export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-heritage-black"
    >
      <div className="absolute inset-0 bg-heritage-radial" />
      <div className="absolute inset-0 bg-heritage-gold-glow" />
      <div className="absolute inset-0 bg-heritage-teal-glow" />
      <div className="absolute inset-0 bg-hero-diamond-grid opacity-30 max-md:opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-heritage-black/30 via-transparent to-heritage-black/50" />

      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full motion-safe:animate-particle-float motion-reduce:animate-none"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDelay: particle.delay,
            backgroundColor: particle.color === 'gold' ? '#D6B85A' : '#27C6C8',
          }}
        />
      ))}

      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-heritage-border-gold to-transparent opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-heritage-border-gold to-transparent opacity-40" />
    </div>
  );
}
