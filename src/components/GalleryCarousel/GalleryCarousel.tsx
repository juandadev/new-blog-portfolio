import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { GalleryPhotoItem } from '@/types';
import Image from 'next/image';

interface GalleryCarouselProps {
  slides: GalleryPhotoItem[];
}

export default function GalleryCarousel({ slides }: GalleryCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent>
        {slides.map((photo, index) => (
          <CarouselItem
            key={`carousel-photo-${index}-${photo.src}`}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <div
              key={index}
              className="border-border bg-card/50 group relative aspect-[3/2] overflow-hidden rounded-lg border"
            >
              <Image
                src={photo.src || '/placeholder.svg'}
                alt={photo.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
              />

              <div className="from-background/60 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
