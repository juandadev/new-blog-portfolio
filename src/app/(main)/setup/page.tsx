import React from 'react';
import { categoryLabels, categoryOrder, setupItems } from '@/data/setup-data';
import { SetupGallery } from '@/components/views/setup/SetupGallery';
import { SetupCategory } from '@/components/views/setup/SetupCategory';
import PageHeader from '@/components/views/page-header';
import { JsonLd } from '@/components/JsonLd';
import { buildPageMetadata, absoluteUrl } from '@/lib/seo';
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from '@/lib/structured-data';

const yearsSince2021 = new Date().getFullYear() - 2022;
const SETUP_TITLE = 'WFH Desk Setup & Gear';
const SETUP_DESCRIPTION =
  'Explore the work-from-home desk setup, peripherals, accessories, and gear Juan Martinez uses for frontend engineering and design work.';

export const metadata = buildPageMetadata({
  title: SETUP_TITLE,
  description: SETUP_DESCRIPTION,
  path: '/setup',
  keywords: [
    'desk setup',
    'WFH setup',
    'developer setup',
    'design engineer setup',
    'peripherals',
    'workspace gear',
    'Juan Martinez',
  ],
});

export default function SetupPage() {
  const groupedItems = categoryOrder.map((category) => ({
    category,
    label: categoryLabels[category],
    items: setupItems.filter((item) => item.category === category),
  }));
  const pageSchema = generateWebPageSchema({
    title: SETUP_TITLE,
    description: SETUP_DESCRIPTION,
    path: '/setup',
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Setup', url: absoluteUrl('/setup') },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
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
