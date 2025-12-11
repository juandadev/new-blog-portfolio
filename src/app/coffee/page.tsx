import React from 'react';
import { CoffeeStorySection } from '@/components/views/coffee/CoffeeStorySection';
import { CoffeeGearGrid } from '@/components/views/coffee/CoffeeGearGrid';
import { BuyMeACoffeeCard } from '@/components/views/coffee/BuyMeACoffeeCard';
import { Metadata } from 'next';
import { fetchCoffeeData } from '@/services/coffee-server';

export const metadata: Metadata = {
  title: 'Coffee | Juan Martinez',
  description: 'My home coffee setup and journey from barista to enthusiast',
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
