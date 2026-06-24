'use client';

import { useReducedMotion } from 'framer-motion';
import { useCallback, useRef, type MouseEvent, type RefObject } from 'react';

interface PointerTiltOptions {
  maxTilt?: number;
}

interface PointerTiltResult {
  groupRef: RefObject<HTMLDivElement | null>;
  cardRef: RefObject<HTMLElement | null>;
  onMouseMove: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
}

interface PendingPointer {
  nx: number;
  ny: number;
}

export function usePointerTilt({ maxTilt = 1 }: PointerTiltOptions = {}): PointerTiltResult {
  const reduced = useReducedMotion() ?? false;
  const groupRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pendingRef = useRef<PendingPointer | null>(null);

  const applyVars = useCallback(() => {
    const card = cardRef.current;
    const pending = pendingRef.current;
    if (!card || !pending) return;

    card.style.setProperty('--tilt-x', `${(-pending.ny * maxTilt).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(pending.nx * maxTilt).toFixed(2)}deg`);
    frameRef.current = null;
  }, [maxTilt]);

  const resetVars = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  }, []);

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (reduced) return;

      const group = groupRef.current;
      if (!group) return;

      const rect = group.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      pendingRef.current = {
        nx: (offsetX / rect.width) * 2 - 1,
        ny: (offsetY / rect.height) * 2 - 1,
      };

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(applyVars);
      }
    },
    [applyVars, reduced],
  );

  const onMouseLeave = useCallback(() => {
    pendingRef.current = null;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    resetVars();
  }, [resetVars]);

  return {
    groupRef,
    cardRef,
    onMouseMove,
    onMouseLeave,
  };
}
