'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  disableTransitionOnChange = true,
  enableColorScheme = false,
  scriptProps,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const resolvedScriptProps =
    typeof window === 'undefined'
      ? scriptProps
      : ({
          ...scriptProps,
          type: 'application/json',
        } as const);

  return (
    <NextThemesProvider
      disableTransitionOnChange={disableTransitionOnChange}
      enableColorScheme={enableColorScheme}
      scriptProps={resolvedScriptProps}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
