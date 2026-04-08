'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
