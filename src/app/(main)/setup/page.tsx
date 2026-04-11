import React from 'react';
import { categoryLabels, categoryOrder, setupItems } from '@/data/setup-data';
import { SetupGallery } from '@/components/views/setup/SetupGallery';
import { SetupCategory } from '@/components/views/setup/SetupCategory';
import PageHeader from '@/components/views/page-header';

const yearsSince2021 = new Date().getFullYear() - 2022;

export default function SetupPage() {
  const groupedItems = categoryOrder.map((category) => ({
    category,
    label: categoryLabels[category],
    items: setupItems.filter((item) => item.category === category),
  }));

  return (
    <>
      <PageHeader
        title="WFH Setup"
        text={`Building my dream setup over the last ${yearsSince2021} years has been a journey that I've enjoyed so much. Here's all the relevant stuff about it`}
      />
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
