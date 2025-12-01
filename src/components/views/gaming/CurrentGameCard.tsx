import React from 'react';
import Image from 'next/image';
import type { Game } from '@/types/gaming';
import { Gamepad2 } from 'lucide-react';

interface CurrentGameCardProps {
  game: Game;
}

export function CurrentGameCard({ game }: CurrentGameCardProps) {
  return (
    <div className="border-border bg-card relative overflow-hidden rounded-lg border">
      <div className="from-primary/10 to-accent/10 absolute inset-0 bg-gradient-to-br via-transparent" />
      <div className="relative flex flex-col gap-6 p-6 sm:flex-row">
        <div className="relative mx-auto shrink-0 sm:mx-0">
          <div className="border-border shadow-primary/20 relative h-[200px] w-[150px] overflow-hidden rounded-md border shadow-lg">
            <Image
              src={game.cover || '/placeholder.svg'}
              alt={game.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-primary text-primary-foreground absolute -top-2 -right-2 rounded-md px-2 py-1 font-mono text-xs">
            NOW PLAYING
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-3 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <Gamepad2 className="text-primary h-4 w-4" />
            <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              Currently Playing
            </span>
          </div>
          <h3 className="text-foreground text-2xl font-bold">{game.title}</h3>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="bg-muted text-muted-foreground rounded px-2 py-1 font-mono text-xs">
              {game.platform}
            </span>
          </div>
          {game.notes && (
            <p className="text-muted-foreground max-w-md text-sm">
              {game.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
