import React from 'react';
import PerspectiveBook from '@/components/perspective-book';
import { cn } from '@/lib/utils';

interface CurrentReadingProps {
  containerClassName?: string;
}

export default function CurrentReading({
  containerClassName,
}: CurrentReadingProps) {
  return (
    <div className={cn('flex justify-center', containerClassName)}>
      <PerspectiveBook
        className="shadow-pegboard bg-[#FE2D3D] bg-[url('/hp_4.webp')] bg-cover bg-[position:0%_100%] transition-shadow duration-200 hover:shadow-lg/25"
        textured
        withHoverEffect
      >
        <span className="sr-only">
          Currently reading: Harry Potter & The Goblet of Fire, J.K. Rowling
        </span>
      </PerspectiveBook>
    </div>
  );
}
