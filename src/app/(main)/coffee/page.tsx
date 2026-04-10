import React from 'react';
import { CoffeeStorySection } from '@/components/views/coffee/CoffeeStorySection';
import { CoffeeGearGrid } from '@/components/views/coffee/CoffeeGearGrid';
import { BuyMeACoffeeCard } from '@/components/views/coffee/BuyMeACoffeeCard';
import { Metadata } from 'next';
import { fetchCoffeeData } from '@/services/coffee-server';

export const metadata: Metadata = {
  title: 'Coffee',
  description:
    'Former barista turned home enthusiast. Building a tiny coffee sanctuary one upgrade at a time. Explore my home coffee setup and journey.',
  keywords: [
    'coffee',
    'home coffee setup',
    'coffee gear',
    'barista',
    'espresso',
    'coffee enthusiast',
    'Juan Martinez',
    'developer coffee',
  ],
  alternates: {
    canonical: 'https://juanda.dev/coffee',
  },
  openGraph: {
    title: 'Coffee – Juan Martinez',
    description:
      'Former barista turned home enthusiast. Building a tiny coffee sanctuary one upgrade at a time.',
    url: 'https://juanda.dev/coffee',
    siteName: 'Juanda.dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coffee – Juan Martinez',
    description:
      'Former barista turned home enthusiast. Building a tiny coffee sanctuary one upgrade at a time.',
    creator: '@juandadotdev',
  },
};

export const dynamic = 'force-static';

export default async function CoffeePage() {
  const coffeeData = await fetchCoffeeData();

  return (
    <>
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
