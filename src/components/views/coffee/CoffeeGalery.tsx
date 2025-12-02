import React from 'react';
import Image from 'next/image';
import { CoffeePhoto } from '@/types/coffee';

interface CoffeeGalleryProps {
  photos: CoffeePhoto[];
}

export function CoffeeGallery({ photos }: CoffeeGalleryProps) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Shots & Pours</h2>
        <p className="text-muted-foreground text-sm">
          Documenting the journey, one cup at a time.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group border-border bg-card relative aspect-[4/3] overflow-hidden rounded-lg border"
          >
            <Image
              src={photo.src || '/placeholder.svg'}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="from-background/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {photo.caption && (
              <p className="text-foreground absolute right-3 bottom-3 left-3 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {photo.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
