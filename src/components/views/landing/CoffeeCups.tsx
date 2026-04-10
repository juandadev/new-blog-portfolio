import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CoffeeCupsProps {
  className?: string;
}

const currentYear = new Date().getFullYear();

export default function CoffeeCups({ className }: CoffeeCupsProps) {
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
            src="/mugs/dev.webp"
            alt="Mug"
            width={600}
            height={601}
            unoptimized
            className={cn(
              'aspect-[600/601] w-55 drop-shadow-md/25 select-none lg:w-60'
            )}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="font-script text-center text-2xl">
        125 <span className="text-muted-foreground">Cups of coffee in</span>{' '}
        {currentYear}
      </HoverCardContent>
    </HoverCard>
  );
}
