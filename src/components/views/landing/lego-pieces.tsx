import React from 'react';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Image from 'next/image';

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
            'relative flex flex-col items-center justify-center'
          )}
        >
          <Image
            src="/legos/vader.webp"
            alt="Lego"
            width={600}
            height={1007}
            unoptimized
            className="aspect-[600/1007] w-44 drop-shadow-md/25 select-none"
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="font-script text-center text-2xl">
        42,343 <span className="text-muted-foreground">LEGO pieces</span>
      </HoverCardContent>
    </HoverCard>
  );
}
