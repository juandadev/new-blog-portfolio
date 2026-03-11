import React from 'react';
import Pegboard from '@/components/Pegboard/pegboard';
import Polaroid from '@/components/Polaroid/polaroid';
import PresentationCard from '@/components/views/landing/presentation-card';
import CurrentReading from '@/components/views/landing/current-reading';
import AmbassadorBadges from '@/components/views/landing/ambassador-badges';
import ToolsIUse from '@/components/views/landing/tools-i-use';
import GameNCoffee from '@/components/views/landing/game-n-coffee';
import Lanyard from '@/components/lanyard';

export default function Home() {
  return (
    <div className="relative h-full w-full py-16">
      <Pegboard />
      <div className="relative grid grid-cols-1 place-items-stretch gap-6 md:grid-cols-5">
        <Polaroid
          src="/juan.webp"
          className="w-50 md:col-span-2 xl:col-span-1"
          withClip
          clipClassName="-top-16 -right-6 rotate-52"
        >
          Juanda - 19/05/2025
        </Polaroid>
        <PresentationCard containerClassName="md:col-span-3 xl:col-span-2" />
        <AmbassadorBadges containerClassName="md:col-span-2 xl:col-span-1" />
        <div className="relative">
          <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
        </div>
        <div />
        <div />
        <ToolsIUse containerClassName="md:col-span-5 xl:col-span-3" />
        <div />
        <GameNCoffee className="md:col-span-2" />
        <div />
        <CurrentReading containerClassName="md:col-span-3 xl:col-span-1" />
      </div>
    </div>
  );
}
