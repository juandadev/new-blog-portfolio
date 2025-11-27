import React from 'react';
import Image from 'next/image';
import { coffeeGallery } from '@/data/coffee-data';

export function CoffeeGallery() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Shots & Pours</h2>
        <p className="text-muted-foreground text-sm">
          Documenting the journey, one cup at a time.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {coffeeGallery.map((photo) => (
          <div
            key={photo.id}
            className="group border-border bg-card relative aspect-[4/3] overflow-hidden rounded-lg border"
          >
            <Image
              src={photo.image || '/placeholder.svg'}
              alt={photo.caption}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="from-background/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <p className="text-foreground absolute right-3 bottom-3 left-3 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
