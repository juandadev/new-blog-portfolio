import React from 'react';
import DrawingsColumn from '@/components/DrawingsColumn';
import { cn } from '@/lib/utils';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative mx-auto w-full max-w-[1440px]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_minmax(0,835px)_1fr]">
        <DrawingsColumn side="left" className="hidden md:flex" />
        <main
          className={cn(
            'bg-border text-card-foreground shadow-pegboard relative isolate flex flex-col gap-6 rounded-xl p-6',
            'dotted-pattern-card before:bg-card before:absolute before:inset-0 before:-z-2 before:m-2 before:rounded-lg before:shadow-[0_0_4px_rgba(0,0,0,0.1)]'
          )}
        >
          {children}
        </main>
        <DrawingsColumn side="right" className="hidden md:flex" />
      </div>
    </div>
  );
}
