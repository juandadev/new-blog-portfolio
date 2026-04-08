import React from 'react';
import { cn } from '@/lib/utils';
import Basket from '@/components/Pegboard/basket';
import Lego from '@/components/Pegboard/lego';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface LegoPiecesProps {
  containerClassName?: string;
}

// TODO: this is the Brickver link which displays my full LEGO collection https://brickver.com/@juandadev
// Pieces: 42,343
export default function LegoPieces({ containerClassName }: LegoPiecesProps) {
  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            containerClassName,
            'relative flex flex-col items-center justify-end'
          )}
        >
          <Lego />
          <Basket />
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="font-script text-center text-2xl">
        42,343 <span className="text-muted-foreground">LEGO pieces</span>
      </HoverCardContent>
    </HoverCard>
  );
}
