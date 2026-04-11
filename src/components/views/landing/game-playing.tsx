import React from 'react';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Image from 'next/image';
import type { Game } from '@/types/gaming';
import Link from 'next/link';

interface GamePlayingProps {
  game: Game;
  className?: string;
}

export default function GamePlaying({ game, className }: GamePlayingProps) {
  const stickerSrc = game.stickerImage ?? game.cover;
  const line = `${game.title}, ${game.platform}`;

  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            className,
            'relative flex flex-col items-center justify-center'
          )}
        >
          <Link href="/gaming">
            <Image
              src={stickerSrc}
              alt={game.title}
              width={419}
              height={400}
              unoptimized
              className={cn(
                'sticker-shadow aspect-[419/400] w-55 select-none lg:w-60'
              )}
            />
          </Link>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="flex flex-col text-center">
        <span className="font-script text-2xl font-medium">
          Currently playing:
        </span>
        <span className="text-muted-foreground text-lg font-semibold">
          {line}
        </span>
      </HoverCardContent>
    </HoverCard>
  );
}
