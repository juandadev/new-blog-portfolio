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
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-primary font-mono text-sm">03</span>
          <div className="from-primary/50 h-px flex-1 bg-gradient-to-r to-transparent" />
        </div>
        <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
          Gaming Corner
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          My gaming corner. Current plays, the eternal backlog, hardware setup,
          and occasional thoughts on games I love.
        </p>
      </div>
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
