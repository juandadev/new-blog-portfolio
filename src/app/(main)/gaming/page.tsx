import React from 'react';
import { fetchGamingData } from '@/services/gaming-server';
import { CurrentGameCard } from '@/components/views/gaming/CurrentGameCard';
import { GameBacklog } from '@/components/views/gaming/GameBacklog';
import { PCBuildSection } from '@/components/views/gaming/PCBuildSection';
import { ConsolesSection } from '@/components/views/gaming/ConsolesSection';
import GalleryCarousel from '@/components/GalleryCarousel/GalleryCarousel';
import { GalleryPhotoItem } from '@/types';

export const dynamic = 'force-static';

export default async function GamingPage() {
  const gamingData = await fetchGamingData();

  const gamingPhotos: GalleryPhotoItem[] = gamingData.gamingPhotos.map(
    (photo) => ({
      src: photo.src,
      alt: photo.alt,
    })
  );

  return (
    <>
      {gamingData.currentGame && (
        <section>
          <CurrentGameCard game={gamingData.currentGame} />
        </section>
      )}
      {gamingData.gameBacklog.length > 0 && (
        <section>
          <GameBacklog games={gamingData.gameBacklog} />
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
              story={gamingData.pcBuildStory?.story || ''}
            />
          </section>
        )}
        {gamingData.consoles.length > 0 && (
          <section>
            <ConsolesSection consoles={gamingData.consoles} />
          </section>
        )}
      </div>
      {/* TODO: Bring back gaming blog section with actual posts from database */}
      {/*<section>*/}
      {/*  <GamingBlogSection posts={gamingBlogPosts} />*/}
      {/*</section>*/}
    </>
  );
}
