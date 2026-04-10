import React from 'react';
import { cn } from '@/lib/utils';
import GameCover from '@/components/game-cover';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface GamePlayingProps {
  className?: string;
}

export default function GamePlaying({ className }: GamePlayingProps) {
  return (
    <div className={className}>
      <div className="relative h-70">
        <HoverCard openDelay={50} closeDelay={50}>
          <HoverCardTrigger asChild>
            <div
              className={cn(
                className,
                'relative flex flex-col items-center justify-center'
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
              Crimson Desert, PS5
            </span>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
