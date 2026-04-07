import React from 'react';
import Shelf from '@/components/Pegboard/shelf';
import { cn } from '@/lib/utils';
import GameCover from '@/components/game-cover';
import Image from 'next/image';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface GameNCoffeeProps {
  className?: string;
}

export default function GameNCoffee({ className }: GameNCoffeeProps) {
  return (
    <div className={cn('relative h-70', className)}>
      <HoverCard openDelay={50} closeDelay={50}>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              'absolute right-[calc(50%-50px)] bottom-1 aspect-[13.5/17] w-47.5 xl:right-1/2 xl:bottom-2',
              'after:absolute after:inset-0 after:z-2'
            )}
          >
            <GameCover variant="ps5" containerClassName="select-none" />
          </div>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="flex flex-col text-center">
          <span className="font-script text-2xl font-medium">
            Currently playing:
          </span>
          <span className="text-muted-foreground text-lg font-semibold">
            Ghost of Yotei, PS5
          </span>
        </HoverCardContent>
      </HoverCard>
      <HoverCard openDelay={50} closeDelay={50}>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              'absolute bottom-3 left-[calc(50%+5px)] xl:bottom-4 xl:left-[calc(50%+20px)]',
              'after:absolute after:inset-0 after:z-2'
            )}
          >
            <Image
              src="/mugs/dev_mug.png"
              alt="Mug"
              width={591}
              height={435}
              unoptimized
              className={cn(
                'aspect-[591/435] w-37.5 drop-shadow-md/25 select-none'
              )}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="flex flex-col text-center">
          <span className="font-script text-2xl font-medium">
            75 Cups of coffee in 2026
          </span>
          <span className="text-muted-foreground font-semibold">
            (and it&apos;s just March)
          </span>
        </HoverCardContent>
      </HoverCard>
      <Shelf />
    </div>
  );
}
