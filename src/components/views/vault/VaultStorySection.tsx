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
      {story.intro.split('\n\n').map((paragraph) => (
        <p
          key={paragraph}
          className="text-muted-foreground mb-6 leading-relaxed text-pretty"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}
