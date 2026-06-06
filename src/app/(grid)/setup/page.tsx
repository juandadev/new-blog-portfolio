import React from 'react';
import { categoryOrder, setupCategories, setupItems } from '@/data/setup-data';
import { JsonLd } from '@/components/JsonLd';
import { buildPageMetadata, absoluteUrl } from '@/lib/seo';
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from '@/lib/structured-data';
import SetupIntro from '@/components/views/setup/SetupIntro';
import Polaroid from '@/components/Polaroid/polaroid';
import { setupPolaroidImages } from '@/content/polaroid-manifests/setup';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

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
    ...setupCategories[category],
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
      <SetupIntro />
      <div className="relative mt-15 h-50 lg:mt-8">
        <Polaroid
          images={[
            {
              image: setupPolaroidImages.desk_3,
            },
            {
              image: setupPolaroidImages.desk_keyboard_1,
            },
            {
              image: setupPolaroidImages.custom_pc_1,
            },
            {
              image: setupPolaroidImages.desk_2,
            },
            {
              image: setupPolaroidImages.desk_1,
            },
          ]}
          orientation="horizontal"
          withClip
          withAnimation
        />
      </div>
      {groupedItems.map((group) => (
        <Card key={`card-setup-${group.category}`} className="h-full">
          <CardHeader className="text-card-foreground flex items-center gap-2 font-sans text-lg font-semibold tracking-tight">
            <group.Icon className="text-muted-foreground size-5" aria-hidden />
            {group.label}
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2 text-sm">
              {group.items.map((item) => (
                <li
                  key={`card-${item.category}-${item.name}`}
                  className="orange-marker leading-relaxed"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
