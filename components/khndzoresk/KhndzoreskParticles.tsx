import { KHNDZORESK_PARTICLES } from '@/lib/constants/khndzoresk';

export function KhndzoreskParticles() {
  return (
    <div className="pt-wrap" aria-hidden="true">
      {KHNDZORESK_PARTICLES.map((p, i) => (
        <div
          key={i}
          className="pt"
          style={{
            left: `${p.left}%`,
            bottom: `${p.baseY}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.gold ? '#C9A84C' : '#2ABFBF',
            ['--d' as string]: `${p.dur}s`,
            ['--dl' as string]: `${p.delay}s`,
            ['--op' as string]: String(p.op),
          }}
        />
      ))}
    </div>
  );
}
