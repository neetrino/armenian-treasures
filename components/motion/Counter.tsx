'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CounterProps {
  value: string;
  durationMs?: number;
  className?: string;
}

interface Parsed {
  numeric: number | null;
  prefix: string;
  suffix: string;
}

function parseValue(raw: string): Parsed {
  const match = raw.match(/^(\D*?)(\d[\d.,]*)(\D*)$/);
  if (!match) {
    return { numeric: null, prefix: raw, suffix: '' };
  }
  const numericString = (match[2] ?? '').replace(/[,\s]/g, '');
  const numeric = Number(numericString);
  if (!Number.isFinite(numeric)) {
    return { numeric: null, prefix: raw, suffix: '' };
  }
  return {
    numeric,
    prefix: match[1] ?? '',
    suffix: match[3] ?? '',
  };
}

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

export function Counter({ value, durationMs = 1400, className }: CounterProps) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState<string>(
    parsed.numeric === null ? value : `${parsed.prefix}0${parsed.suffix}`,
  );

  useEffect(() => {
    if (parsed.numeric === null) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    if (reduced) {
      setDisplay(`${parsed.prefix}${formatNumber(parsed.numeric)}${parsed.suffix}`);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const target = parsed.numeric;
    const step = (now: number): void => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = target * eased;
      setDisplay(`${parsed.prefix}${formatNumber(next)}${parsed.suffix}`);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed.numeric, parsed.prefix, parsed.suffix, value, durationMs, reduced]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
