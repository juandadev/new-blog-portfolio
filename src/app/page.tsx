import React from 'react';
import Pegboard from '@/components/Pegboard/pegboard';
import Polaroid from '@/components/Polaroid/polaroid';
import PresentationCard from '@/components/views/landing/presentation-card';
import CurrentReading from '@/components/views/landing/current-reading';
import AmbassadorBadges from '@/components/views/landing/ambassador-badges';
import ToolsIUse from '@/components/views/landing/tools-i-use';
import GameNCoffee from '@/components/views/landing/game-n-coffee';
import Lanyard from '@/components/lanyard';
import LatestPosts from '@/components/views/landing/latest-posts';
import LegoPieces from '@/components/views/landing/lego-pieces';
import SocialCards from '@/components/views/landing/social-cards';

export default function Home() {
  return (
    <div className="relative mx-auto h-full w-full max-w-[1440px] py-16">
      <Pegboard />
      <div className="relative grid grid-cols-1 grid-rows-[repeat(3,auto)_minmax(300px,auto)_repeat(6,auto)] place-items-stretch gap-6 md:grid-cols-5 md:grid-rows-[auto_minmax(300px,auto)_repeat(2,auto)] xl:grid-rows-[repeat(3,auto)]">
        <Polaroid
          src="/juan.webp"
          className="z-1 col-span-1 w-50 md:col-span-2 lg:col-span-1"
          withClip
          clipClassName="-top-16 -right-6 rotate-52"
        >
          Juanda - 19/05/2025
        </Polaroid>
        <PresentationCard containerClassName="md:col-span-3 xl:col-span-2 z-1" />
        <AmbassadorBadges containerClassName="col-span-1 z-1 self-end" />
        <div className="relative col-span-1 md:col-span-2 xl:col-span-1">
          <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
        </div>
        <LatestPosts containerClassName="md:col-span-2 lg:col-span-3 xl:col-span-2" />
        <ToolsIUse containerClassName="md:col-span-5 xl:col-span-3" />
        <SocialCards containerClassName="md:col-span-2 lg:col-span-1" />
        <GameNCoffee className="self-end md:col-span-3 lg:col-span-2" />
        <LegoPieces containerClassName="lg:col-span-1 md:col-span-3" />
        <CurrentReading
          containerClassName="col-span-1 md:col-span-2 lg:col-span-1"
          title="The Creative Act: A Way Of Being, Rick Rubin"
        />
      </div>
    </div>
  );
}
