'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Game } from '@/types/gaming';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameBacklogProps {
  games: Game[];
}

export function GameBacklog({ games }: GameBacklogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-border bg-card overflow-hidden rounded-lg border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-muted/50 flex w-full items-center justify-between p-4 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Layers className="text-accent h-5 w-5" />
          <span className="text-foreground font-medium">Game Backlog</span>
          <span className="bg-accent/20 text-accent rounded px-2 py-0.5 font-mono text-xs">
            {games.length} games
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="text-muted-foreground h-5 w-5" />
        ) : (
          <ChevronDown className="text-muted-foreground h-5 w-5" />
        )}
      </button>
      <div
        className={cn(
          'grid transition-all duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="border-border border-t p-4 pt-0">
            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3 md:grid-cols-4">
              {games.map((game) => (
                <div key={game.title} className="group space-y-2">
                  <div className="border-border bg-muted relative aspect-[3/4] overflow-hidden rounded-md border">
                    <Image
                      src={game.cover || '/placeholder.svg'}
                      alt={game.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-foreground line-clamp-2 text-xs leading-tight font-medium">
                      {game.title}
                    </p>
                    <p className="text-muted-foreground font-mono text-xs">
                      {game.platform}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
