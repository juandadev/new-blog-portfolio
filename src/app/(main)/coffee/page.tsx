import React from 'react';
import { CoffeeStorySection } from '@/components/views/coffee/CoffeeStorySection';
import { CoffeeGearGrid } from '@/components/views/coffee/CoffeeGearGrid';
import { BuyMeACoffeeCard } from '@/components/views/coffee/BuyMeACoffeeCard';
import { coffeeData } from '@/data/coffee-data';
import PageHeader from '@/components/views/page-header';
import { JsonLd } from '@/components/JsonLd';
import { buildPageMetadata, absoluteUrl } from '@/lib/seo';
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from '@/lib/structured-data';

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
      <PageHeader title="A Coffee Story" />
      <CoffeeStorySection
        story={coffeeData.story}
        journey={coffeeData.journey}
      />
      <CoffeeGearGrid gear={coffeeData.gear} />
      <BuyMeACoffeeCard />
      <div className="border-border border-t pt-8">
        <p className="text-muted-foreground font-mono text-sm">
          <span className="text-primary">$</span> echo {'"'}Next on the
          wishlist: dedicated coffee bar furniture...{'"'}
        </p>
      </div>
    </>
  );
}
