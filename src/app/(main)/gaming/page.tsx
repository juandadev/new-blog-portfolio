import React from 'react';
import { gamingData } from '@/data/gaming-data';
import { CurrentGameCard } from '@/components/views/gaming/CurrentGameCard';
import { PCBuildSection } from '@/components/views/gaming/PCBuildSection';
import { ConsolesSection } from '@/components/views/gaming/ConsolesSection';
import GalleryCarousel from '@/components/GalleryCarousel/GalleryCarousel';
import { GalleryPhotoItem } from '@/types';
import PageHeader from '@/components/views/page-header';
import { JsonLd } from '@/components/JsonLd';
import { buildPageMetadata, absoluteUrl } from '@/lib/seo';
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from '@/lib/structured-data';

const GAMING_TITLE = 'Gaming Setup & Current Games';
const GAMING_DESCRIPTION =
  'A look at Juan Martinez’s gaming setup, current single-player favorites, custom PC build, consoles, and desk-side gaming photos.';

export const metadata = buildPageMetadata({
  title: GAMING_TITLE,
  description: GAMING_DESCRIPTION,
  path: '/gaming',
  keywords: [
    'gaming setup',
    'PC build',
    'console collection',
    'single-player games',
    'gaming desk setup',
    'Juan Martinez',
  ],
});

export const dynamic = 'force-static';

export default function GamingPage() {
  const gamingPhotos: GalleryPhotoItem[] = gamingData.gamingPhotos.map(
    (photo) => ({
      src: photo.src,
      alt: photo.alt,
    })
  );
  const pageSchema = generateWebPageSchema({
    title: GAMING_TITLE,
    description: GAMING_DESCRIPTION,
    path: '/gaming',
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Gaming', url: absoluteUrl('/gaming') },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <PageHeader
        title="Gaming Setup"
        text="I love video games. Although I don't have the free time as when I was a kid, I do have the money to actually buy everything I ever wanted while having so much fun exploring amazing games (single-player only 🚬🗿)"
      />
      {gamingData.currentGame && (
        <section>
          <CurrentGameCard game={gamingData.currentGame} />
        </section>
      )}
      {gamingPhotos.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Gallery
          </h2>
          <GalleryCarousel slides={gamingPhotos} />
        </section>
      )}
      <div className="grid gap-8 lg:grid-cols-2">
        {(gamingData.pcBuild.length > 0 || gamingData.pcBuildStory) && (
          <section>
            <PCBuildSection
              parts={gamingData.pcBuild}
              story={gamingData.pcBuildStory}
            />
          </section>
        )}
        {gamingData.consoles.length > 0 && (
          <section>
            <ConsolesSection consoles={gamingData.consoles} />
          </section>
        )}
      </div>
    </>
  );
}
