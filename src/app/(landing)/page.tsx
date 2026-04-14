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
import Link from 'next/link';
import StickerLabel from '@/components/sticker-label';

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
      <main className="max-w-app relative mx-auto h-full w-full">
        <div className="relative grid grid-cols-1 grid-rows-[repeat(2,auto)_minmax(300px,auto)] place-items-stretch gap-6 md:grid-cols-3 md:grid-rows-[auto_minmax(300px,auto)] xl:grid-cols-5 xl:grid-rows-[repeat(3,auto)]">
          <Polaroid
            src="/juan.webp"
            className="z-2 h-80 self-start"
            withClip
            clipClassName="-top-16 -right-6 rotate-52"
          >
            Juanda - 19/05/2025
          </Polaroid>
          <PresentationCard containerClassName="z-2 md:col-span-2" />
          <div className="relative z-1">
            <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
            <StickerLabel position="bottom-0 left-0">
              <Link
                href="https://luma.com/o9kjjum9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next Event
              </Link>
            </StickerLabel>
          </div>
          <AmbassadorBadges containerClassName="self-start " />
          <LatestPost containerClassName="xl:col-span-2" />
          <ToolsIUse containerClassName="md:col-span-3" />
          <GamePlaying game={gamingData.currentGame!} className="" />
          <CoffeeCups />
          <LegoPieces />
          <CurrentReading
            title="The Creative Act: A Way Of Being, Rick Rubin"
            href="https://www.amazon.com.mx/dp/0593652886?ref=ppx_yo2ov_dt_b_fed_asin_title"
          />
          <SocialCards containerClassName="" />
        </div>
      </main>
    </>
  );
}
