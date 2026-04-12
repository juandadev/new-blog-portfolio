import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import Polaroid from '@/components/Polaroid/polaroid';
import PresentationCard from '@/components/views/landing/presentation-card';
import CurrentReading from '@/components/views/landing/current-reading';
import AmbassadorBadges from '@/components/views/landing/ambassador-badges';
import ToolsIUse from '@/components/views/landing/tools-i-use';
import Lanyard from '@/components/lanyard';
import LatestPost from '@/components/views/landing/latest-post';
import LegoPieces from '@/components/views/landing/lego-pieces';
import SocialCards from '@/components/views/landing/social-cards';
import CoffeeCups from '@/components/views/landing/CoffeeCups';
import GamePlaying from '@/components/views/landing/game-playing';
import { gamingData } from '@/data/gaming-data';
import { SITE_CONFIG } from '@/constants/seo';
import { buildPageMetadata } from '@/lib/seo';
import { generateWebPageSchema } from '@/lib/structured-data';

const HOME_TITLE = 'Design Engineer based in Guadalajara';
const HOME_DESCRIPTION =
  'Explore the portfolio, blog, setup, and experiments of Juan Martinez, a bilingual design engineer focused on React, Next.js, TypeScript, and polished web experiences.';

export const metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: '/',
  keywords: [
    'frontend developer portfolio',
    'design engineer portfolio',
    'React portfolio',
    'Next.js portfolio',
    'TypeScript developer',
    'Guadalajara frontend developer',
    'Mexico design engineer',
    'Juandadev',
  ],
});

export default function Home() {
  const homeSchema = generateWebPageSchema({
    title: `${SITE_CONFIG.author.name} | ${SITE_CONFIG.author.jobTitle}`,
    description: HOME_DESCRIPTION,
    path: '/',
    type: 'ProfilePage',
  });

  return (
    <>
      <JsonLd data={homeSchema} />
      <main className="relative mx-auto h-full w-full max-w-[1440px]">
        <div className="relative grid grid-cols-1 grid-rows-[repeat(2,auto)_minmax(300px,auto)_repeat(7,auto)] place-items-stretch gap-6 md:grid-cols-5 md:grid-rows-[auto_minmax(300px,auto)_repeat(2,auto)] xl:grid-rows-[repeat(3,auto)]">
          <Polaroid
            src="/juan.webp"
            className="col-span-1 w-50 self-start md:col-span-2 lg:col-span-1"
            withClip
            clipClassName="-top-16 -right-6 rotate-52"
          >
            Juanda - 19/05/2025
          </Polaroid>
          <PresentationCard containerClassName="md:col-span-3 xl:col-span-2 self-start" />
          <div className="relative col-span-1 md:col-span-2 lg:col-span-1">
            <Lanyard
              position={[0, 0, 10]}
              gravity={[0, -40, 0]}
              href="https://luma.com/o9kjjum9"
            />
          </div>
          <AmbassadorBadges containerClassName="self-start col-span-1 lg:col-span-2 xl:col-span-1" />
          <LatestPost containerClassName="md:col-span-2 lg:col-span-3 xl:col-span-2" />
          <ToolsIUse containerClassName="md:col-span-5 xl:col-span-3" />
          <GamePlaying
            game={gamingData.currentGame!}
            className="md:col-span-2 lg:col-span-1"
          />
          <CoffeeCups className="md:col-span-2 lg:col-span-1" />
          <LegoPieces />
          <CurrentReading
            containerClassName="col-span-1 md:col-span-2 lg:col-span-1"
            title="The Creative Act: A Way Of Being, Rick Rubin"
            href="https://www.amazon.com.mx/dp/0593652886?ref=ppx_yo2ov_dt_b_fed_asin_title"
          />
          <SocialCards containerClassName="md:col-span-3 lg:col-span-1" />
        </div>
      </main>
    </>
  );
}
