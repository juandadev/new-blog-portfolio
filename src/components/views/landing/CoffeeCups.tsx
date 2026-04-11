import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

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
          <Link href="/coffee">
            <Image
              src="/mugs/dev.webp"
              alt="Mug"
              width={399}
              height={400}
              unoptimized
              className={cn(
                'sticker-shadow aspect-[399/400] w-55 select-none lg:w-60'
              )}
            />
          </Link>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="font-script text-center text-2xl">
        125 <span className="text-muted-foreground">Cups of coffee in</span>{' '}
        {currentYear}
      </HoverCardContent>
    </HoverCard>
  );
}
