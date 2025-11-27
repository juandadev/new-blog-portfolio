import React from 'react';
import { categoryLabels, categoryOrder, setupItems } from '@/data/setup-data';
import { SetupGallery } from '@/components/views/setup/SetupGallery';
import { SetupCategory } from '@/components/views/setup/SetupCategory';

export default function SetupPage() {
  const groupedItems = categoryOrder.map((category) => ({
    category,
    label: categoryLabels[category],
    items: setupItems.filter((item) => item.category === category),
  }));

  return (
    <>
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-primary font-mono text-sm">02</span>
          <div className="from-primary/50 h-px flex-1 bg-gradient-to-r to-transparent" />
        </div>
        <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
          My Setup
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          The tools and gear I use for remote work and side projects. This space
          has evolved over years of iteration. Here&apos;s what stuck.
        </p>
      </header>
      <SetupGallery />
      <div className="space-y-12">
        {groupedItems
          .filter((group) => group.items.length > 0)
          .map((group) => (
            <SetupCategory
              key={group.category}
              title={group.label}
              items={group.items}
            />
          ))}
      </div>
    </>
  );
}
