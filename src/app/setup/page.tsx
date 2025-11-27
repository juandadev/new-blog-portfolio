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
