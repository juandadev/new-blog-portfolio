'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import { SkadisSurfaceProvider } from '@/components/Providers/SkadisSurfaceProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <SkadisSurfaceProvider>{children}</SkadisSurfaceProvider>
    </ThemeProvider>
  );
}
