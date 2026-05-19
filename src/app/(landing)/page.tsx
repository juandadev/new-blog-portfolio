import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import Polaroid from '@/components/Polaroid/polaroid';
import PresentationCard from '@/components/views/landing/presentation-card';
import CurrentReading from '@/components/views/landing/current-reading';
import AmbassadorBadges from '@/components/views/landing/ambassador-badges';
import ToolsIUse from '@/components/views/landing/tools-i-use';
import LanyardCard from '@/components/views/landing/lanyard-card';
import LatestPost from '@/components/views/landing/latest-post';
import LegoPieces from '@/components/views/landing/lego-pieces';
import SocialCards from '@/components/views/landing/social-cards';
import CoffeeCup from '../../components/views/landing/CoffeeCup';
import GamePlaying from '@/components/views/landing/game-playing';
import { gamingData } from '@/data/gaming-data';
import { SITE_CONFIG } from '@/constants/seo';
import { buildPageMetadata } from '@/lib/seo';
import { generateWebPageSchema } from '@/lib/structured-data';
import { homePolaroidImages } from '@/content/polaroid-manifests/home';

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
    <main className="max-w-app relative mx-auto h-full w-full">
      <div className="relative grid grid-cols-1 grid-rows-[320px_auto_minmax(365px,auto)] place-items-stretch gap-6 md:grid-cols-3 md:grid-rows-[minmax(0,320px)_minmax(365px,auto)] xl:grid-cols-5 xl:grid-rows-[minmax(0,320px)]">
        <JsonLd data={homeSchema} />
        <Polaroid
          images={[
            {
              image: homePolaroidImages.juanda2025,
              footerText: 'Juanda - 19/05/2025',
            },
            {
              image: homePolaroidImages.platziConf2026,
              footerText: 'Platzi Conf 2026',
            },
          ]}
          className="h-80"
          withClip
          withAnimation
        />
        <PresentationCard containerClassName="z-2 md:col-span-2" />
        <LanyardCard />
        <AmbassadorBadges containerClassName="self-start" />
        <LatestPost containerClassName="xl:col-span-2" />
        <ToolsIUse containerClassName="md:col-span-3" />
        <GamePlaying game={gamingData.currentGame!} className="" />
        <CoffeeCup />
        <LegoPieces />
        <CurrentReading
          title="The Creative Act: A Way Of Being, Rick Rubin"
          href="https://www.amazon.com.mx/dp/0593652886?ref=ppx_yo2ov_dt_b_fed_asin_title"
        />
        <SocialCards />
      </div>
    </main>
  );
}
