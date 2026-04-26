import React from 'react';
import { CoffeeStorySection } from '@/components/views/coffee/CoffeeStorySection';
import { BuyMeACoffeeCard } from '@/components/views/coffee/BuyMeACoffeeCard';
import { JsonLd } from '@/components/JsonLd';
import { buildPageMetadata, absoluteUrl } from '@/lib/seo';
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from '@/lib/structured-data';
import CoffeeCups from '@/components/views/landing/CoffeeCups';
import CoffeeIntro from '../../../components/views/coffee/CoffeeIntro';

const COFFEE_TITLE = 'Coffee Setup & Gear';
const COFFEE_DESCRIPTION =
  'A former barista building a tiny home coffee sanctuary. Explore coffee gear, espresso experiments, and the story behind the setup.';

export const metadata = buildPageMetadata({
  title: COFFEE_TITLE,
  description: COFFEE_DESCRIPTION,
  path: '/coffee',
  keywords: [
    'coffee setup',
    'home coffee setup',
    'coffee gear',
    'espresso setup',
    'barista',
    'coffee enthusiast',
    'developer coffee',
    'Juan Martinez',
  ],
});

export const dynamic = 'force-static';

export default function CoffeePage() {
  const pageSchema = generateWebPageSchema({
    title: COFFEE_TITLE,
    description: COFFEE_DESCRIPTION,
    path: '/coffee',
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Coffee', url: absoluteUrl('/coffee') },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <CoffeeCups mug="mugs/dev_mug.webp" showLabel={false} />
      <CoffeeIntro />
      <CoffeeCups mug="mugs/starbucks_mug.webp" showLabel={false} />
      <CoffeeStorySection />
      <CoffeeCups mug="mugs/stormtrooper_mug.webp" showLabel={false} />
      <BuyMeACoffeeCard />
    </>
  );
}
