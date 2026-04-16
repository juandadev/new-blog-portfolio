import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { Game } from '@/types/gaming';
import Link from 'next/link';
import StickerLabel from '@/components/sticker-label';

interface GamePlayingProps {
  game: Game;
  className?: string;
}

export default function GamePlaying({ game, className }: GamePlayingProps) {
  const stickerSrc = game.stickerImage ?? game.cover;
  const line = `${game.title}, ${game.platform}`;

  return (
    <div
      className={cn(
        className,
        'group relative flex items-center justify-center'
      )}
    >
      <Image
        src={stickerSrc}
        alt={game.title}
        width={419}
        height={400}
        unoptimized
        className="sticker-shadow h-auto w-55 select-none lg:w-60"
      />
      <StickerLabel>
        <Link href="/gaming" className="w-42">
          <p>Currently playing:</p>
          <span>{line}</span>
        </Link>
      </StickerLabel>
    </div>
  );
}
