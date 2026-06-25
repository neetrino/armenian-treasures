'use client';

import { useEffect, useRef, useState } from 'react';
import type { DonationStat } from '@/lib/constants/donation-page';

function animateCount(target: number, suffix: string, onUpdate: (value: string) => void) {
  let current = 0;
  const duration = 2200;
  const stepMs = 16;
  const increment = target / (duration / stepMs);

  const timer = window.setInterval(() => {
    current = Math.min(current + increment, target);
    onUpdate(`${Math.floor(current).toLocaleString()}${suffix}`);
    if (current >= target) {
      window.clearInterval(timer);
    }
  }, stepMs);

  return () => window.clearInterval(timer);
}

type DonationStatsBarProps = {
  stats: DonationStat[];
};

export function DonationStatsBar({ stats }: DonationStatsBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<string[]>(() => stats.map(() => '0'));
  const startedRef = useRef(false);
  const cleanupsRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    const node = barRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || startedRef.current) return;
        startedRef.current = true;

        cleanupsRef.current = stats.map((stat, index) =>
          animateCount(stat.target, stat.suffix, (value) => {
            setCounts((prev) => {
              const next = [...prev];
              next[index] = value;
              return next;
            });
          }),
        );

        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cleanupsRef.current.forEach((cleanup) => cleanup());
    };
  }, [stats]);

  return (
    <div ref={barRef} className="stats-bar reveal" role="list" aria-label="Impact statistics">
      {stats.map((stat, index) => (
        <div key={stat.label} className="stat-item" role="listitem">
          <div className="stat-num">{counts[index]}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
