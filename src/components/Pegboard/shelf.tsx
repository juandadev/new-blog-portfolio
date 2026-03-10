import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ShelfProps {
  className?: string;
}

export default function Shelf({ className }: ShelfProps) {
  return (
    <Image
      src="/pegboard/shelf.png"
      alt="Shelf"
      width={1578}
      height={222}
      unoptimized
      className={cn(
        'absolute aspect-[1578/222] w-130 select-none',
        className ? className : 'inset-x-0 bottom-0 mx-auto'
      )}
    />
  );
}
