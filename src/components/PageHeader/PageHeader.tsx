'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constants/ui';

export default function PageHeader() {
  const pathname = usePathname();
  const navItem = NAV_ITEMS.find((item) => item.href === pathname);

  if (pathname === '/' || !navItem) return null;

  return (
    <header className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-primary font-mono text-sm">{navItem.index}</span>
        <div className="from-primary/50 h-px flex-1 bg-gradient-to-r to-transparent" />
      </div>
      <h1 className="text-foreground text-3xl font-bold tracking-tight capitalize md:text-4xl">
        {navItem.label}
      </h1>
      {navItem.text && (
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          {navItem.text}
        </p>
      )}
    </header>
  );
}
