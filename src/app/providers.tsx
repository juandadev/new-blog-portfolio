'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
