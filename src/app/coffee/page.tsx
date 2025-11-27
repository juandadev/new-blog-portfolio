import React from 'react';
import { CoffeeStorySection } from '@/components/views/coffee/CoffeeStorySection';
import { CoffeeGearGrid } from '@/components/views/coffee/CoffeeGearGrid';
import { BuyMeACoffeeCard } from '@/components/views/coffee/BuyMeACoffeeCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coffee | Juan Martinez',
  description: 'My home coffee setup and journey from barista to enthusiast',
};

export default function CoffeePage() {
  return (
    <>
      <CoffeeStorySection />
      <CoffeeGearGrid />
      <BuyMeACoffeeCard />
      {/* TODO: Brin back the gallery with actual pictures and videos. Use Kino UI components mimic Instagram posts & Reels */}
      {/*<CoffeeGallery />*/}
      <div className="border-border border-t pt-8">
        <p className="text-muted-foreground font-mono text-sm">
          <span className="text-primary">$</span> echo {'"'}Next on the
          wishlist: dedicated coffee bar furniture...{'"'}
        </p>
      </div>
    </>
  );
}
