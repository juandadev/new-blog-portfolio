import React from 'react';
import { GalleryPhotoItem } from '@/types';
import GalleryCarousel from '@/components/GalleryCarousel/GalleryCarousel';

const photos: GalleryPhotoItem[] = [
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/desk-close.webp',
    alt: 'Main desk setup at night',
  },
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/keyboard.webp',
    alt: 'Keyboard and peripherals',
  },
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/desk-full-view.webp',
    alt: 'Full room view',
  },
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/pc.webp',
    alt: 'Custom PC Build',
  },
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/desk-close-day.webp',
    alt: 'Main desk setup at day',
  },
];

export function SetupGallery() {
  return (
    <section className="space-y-4">
      <h2 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
        Gallery
      </h2>
      <GalleryCarousel slides={photos} />
    </section>
  );
}
