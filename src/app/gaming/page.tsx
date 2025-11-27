import React from 'react';
import {
  currentGame,
  gameBacklog,
  pcBuild,
  pcBuildStory,
  consoles,
  gamingBlogPosts,
  gamingPhotos,
} from '@/data/gaming-data';
import { CurrentGameCard } from '@/components/views/gaming/CurrentGameCard';
import { GameBacklog } from '@/components/views/gaming/GameBacklog';
import { PCBuildSection } from '@/components/views/gaming/PCBuildSection';
import { ConsolesSection } from '@/components/views/gaming/ConsolesSection';
import { GamingBlogSection } from '@/components/views/gaming/GameBlogSection';
import GalleryCarousel from '@/components/GalleryCarousel/GalleryCarousel';

export default function GamingPage() {
  return (
    <>
      <section>
        <CurrentGameCard game={currentGame} />
      </section>
      <section>
        <GameBacklog games={gameBacklog} />
      </section>
      <section className="space-y-4">
        <h2 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Gallery
        </h2>
        <GalleryCarousel slides={gamingPhotos} />
      </section>
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <PCBuildSection parts={pcBuild} story={pcBuildStory} />
        </section>
        <section>
          <ConsolesSection consoles={consoles} />
        </section>
      </div>
      <section>
        <GamingBlogSection posts={gamingBlogPosts} />
      </section>
    </>
  );
}
