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
          <GameCover
            variant="ps5"
            containerClassName="xl:bottom-2 bottom-1 xl:right-[calc(50%+20px)] right-[calc(50%-5px)] select-none"
          />
        </HoverCardTrigger>
        <HoverCardContent side="top">
          Currently playing:{' '}
          <span className="text-muted-foreground">Ghost of Yotei, PS5</span>
        </HoverCardContent>
      </HoverCard>
      <HoverCard openDelay={50} closeDelay={50}>
        <HoverCardTrigger asChild>
          <Image
            src="/mugs/dev_mug.png"
            alt="Mug"
            width={591}
            height={435}
            unoptimized
            className="absolute bottom-3 left-[calc(50%+15px)] aspect-[591/435] w-37.5 drop-shadow-md/25 select-none xl:bottom-4 xl:left-[calc(50%+20px)]"
          />
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <div className="flex flex-col">
            <span>75 Cups of coffee in 2026 </span>
            <span className="text-muted-foreground">
              (and it&apos;s just March)
            </span>
          </div>
        </HoverCardContent>
      </HoverCard>
      <Shelf />
    </div>
  );
}
