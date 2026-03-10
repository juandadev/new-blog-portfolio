import React from 'react';
import Shelf from '@/components/Pegboard/shelf';
import { cn } from '@/lib/utils';
import GameCover from '@/components/game-cover';
import Image from 'next/image';

interface GameNCoffeeProps {
  className?: string;
}

export default function GameNCoffee({ className }: GameNCoffeeProps) {
  return (
    <div className={cn('relative h-70', className)}>
      <GameCover
        variant="switch"
        containerClassName="xl:bottom-2 bottom-1 xl:right-[calc(50%+20px)] right-[calc(50%-5px)] select-none"
      />
      <Image
        src="/mugs/dev_mug.png"
        alt="Mug"
        width={591}
        height={435}
        unoptimized
        className="absolute bottom-3 left-[calc(50%+15px)] aspect-[591/435] w-37.5 drop-shadow-md/25 select-none xl:bottom-4 xl:left-[calc(50%+20px)]"
      />
      <Shelf />
    </div>
  );
}
