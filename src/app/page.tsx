import React from 'react';
import Pegboard from '@/components/Pegboard/pegboard';
import Polaroid from '@/components/Polaroid/polaroid';
import PresentationCard from '@/components/views/landing/presentation-card';
import CurrentReading from '@/components/views/landing/current-reading';
import AmbassadorBadges from '@/components/views/landing/ambassador-badges';
import ToolsIUse from '@/components/views/landing/tools-i-use';

export default function Home() {
  return (
    <div className="relative h-full w-full py-16">
      <Pegboard />
      <div className="relative grid grid-cols-1 place-items-stretch gap-4 lg:grid-cols-5 lg:grid-rows-2">
        <Polaroid
          src="/juan.webp"
          className="w-50"
          withClip
          clipClassName="-top-16 -right-6 rotate-52"
        >
          Juanda - 19/05/2025
        </Polaroid>
        <PresentationCard containerClassName="lg:col-span-2" />
        <AmbassadorBadges />
        <CurrentReading />
        <ToolsIUse containerClassName="lg:col-span-3" />
      </div>
    </div>
  );
}
