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
    <div className="max-w-app relative mx-auto w-full">
      <div
        className={cn(
          'grid grid-cols-1 gap-6',
          showSideDrawings
            ? 'md:grid-cols-[1fr_minmax(0,var(--container-reading))_1fr]'
            : 'md:max-w-reading md:mx-auto md:grid-cols-1'
        )}
      >
        <DrawingsColumn side="left" />
        <main className="pegboard-panel">{children}</main>
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
