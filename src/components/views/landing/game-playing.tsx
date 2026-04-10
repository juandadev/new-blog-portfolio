import React from 'react';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Image from 'next/image';

interface GamePlayingProps {
  className?: string;
}

export default function GamePlaying({ className }: GamePlayingProps) {
  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            className,
            'relative flex flex-col items-center justify-center'
          )}
        >
          <Image
            src="/games/crimson_desert.webp"
            alt="Game"
            width={600}
            height={572}
            unoptimized
            className={cn(
              'aspect-[600/572] w-55 drop-shadow-md/25 select-none lg:w-60'
            )}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="flex flex-col text-center">
        <span className="font-script text-2xl font-medium">
          Currently playing:
        </span>
        <span className="text-muted-foreground text-lg font-semibold">
          Crimson Desert, PS5
        </span>
      </HoverCardContent>
    </HoverCard>
  );
}
