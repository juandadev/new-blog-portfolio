import React from 'react';
import { VaultStory } from '@/types/vault';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';

interface VaultStorySectionProps {
  story: VaultStory | null;
}

export function VaultStorySection({ story }: VaultStorySectionProps) {
  if (!story) {
    return null;
  }

  return (
    <section className="space-y-4">
      <MarkdownRenderer content={story.intro} />
    </section>
  );
}
