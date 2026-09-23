'use client';

import { createContext, useContext, type ReactNode } from 'react';

const VirtualTourAccessContext = createContext(false);

export function VirtualTourAccessProvider({
  unlocked,
  children,
}: {
  unlocked: boolean;
  children: ReactNode;
}) {
  return <VirtualTourAccessContext.Provider value={unlocked}>{children}</VirtualTourAccessContext.Provider>;
}

export function useVirtualTourUnlocked(): boolean {
  return useContext(VirtualTourAccessContext);
}
