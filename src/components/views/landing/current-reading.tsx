import React from 'react';
import PerspectiveBook from '@/components/perspective-book';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import GameCover from '@/components/game-cover';

interface CurrentReadingProps {
  containerClassName?: string;
}

export default function CurrentReading({
  containerClassName,
}: CurrentReadingProps) {
  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            'group relative isolate flex justify-center',
            containerClassName
          )}
        >
          <PerspectiveBook
            className="shadow-pegboard bg-[#FE2D3D] bg-[url('/hp_4.webp')] bg-cover bg-[position:0%_100%] transition-shadow duration-200 hover:shadow-lg/25"
            textured
            withHoverEffect
          >
            <span className="sr-only">
              Currently reading: Harry Potter & The Goblet of Fire, J. K.
              Rowling
            </span>
          </PerspectiveBook>
          <Hook
            variant="2"
            className="-bottom-4 left-[calc(50%-70px)] z-1 group-hover:-z-1"
          />
          <Hook
            variant="2"
            className="right-[calc(50%-80px)] -bottom-4 z-1 group-hover:-z-1"
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top">
        Currently reading:{' '}
        <span className="text-muted-foreground">
          Harry Potter & The Goblet of Fire, J. K. Rowling
        </span>
      </HoverCardContent>
    </HoverCard>
  );
}
