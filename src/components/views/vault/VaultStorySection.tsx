import React from 'react';
import { VaultStory } from '@/types/vault';

interface VaultStorySectionProps {
  story: VaultStory | null;
}

export function VaultStorySection({ story }: VaultStorySectionProps) {
  if (!story) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">
        {story.headline}
      </h2>
      <p className="text-muted-foreground leading-relaxed">{story.intro}</p>
    </section>
  );
}
