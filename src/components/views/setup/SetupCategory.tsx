import React from 'react';
import { SetupItem } from '@/data/setup-data';
import { SetupItemCard } from '@/components/views/setup/SetupItemCard';

interface SetupCategoryProps {
  title: string;
  items: SetupItem[];
}

export function SetupCategory({ title, items }: SetupCategoryProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
        {title}
      </h2>
      <div className="grid gap-3">
        {items.map((item) => (
          <SetupItemCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
