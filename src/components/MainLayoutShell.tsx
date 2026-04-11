'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import DrawingsColumn from '@/components/DrawingsColumn';
import {
  SideDrawingsProvider,
  useSideDrawings,
} from '@/contexts/SideDrawingsContext';
import { cn, isBlogPostPath } from '@/lib/utils';

function MainLayoutGrid({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sideDrawingsVisible } = useSideDrawings();
  const showSideDrawings = isBlogPostPath(pathname)
    ? sideDrawingsVisible
    : true;

  return (
    <div className="relative mx-auto w-full max-w-[1440px]">
      <div
        className={cn(
          'grid grid-cols-1 gap-6',
          showSideDrawings
            ? 'md:grid-cols-[1fr_minmax(0,672px)_1fr]'
            : 'md:mx-auto md:max-w-[672px] md:grid-cols-1'
        )}
      >
        <DrawingsColumn side="left" />
        <main
          className={cn(
            'bg-border text-card-foreground shadow-pegboard relative isolate flex flex-col gap-6 rounded-xl p-6',
            'dotted-pattern-card before:bg-card before:absolute before:inset-0 before:-z-2 before:m-2 before:rounded-lg before:shadow-[0_0_4px_rgba(0,0,0,0.1)]'
          )}
        >
          {children}
        </main>
        <DrawingsColumn side="right" />
      </div>
    </div>
  );
}

export default function MainLayoutShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideDrawingsProvider>
      <MainLayoutGrid>{children}</MainLayoutGrid>
    </SideDrawingsProvider>
  );
}
