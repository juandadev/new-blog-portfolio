import React from 'react';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Image from 'next/image';
import Link from 'next/link';

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
          <Link
            href="https://brickver.com/@juandadev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/legos/vader.webp"
              alt="Lego"
              width={238}
              height={400}
              unoptimized
              className="sticker-shadow aspect-[238/400] w-44 select-none"
            />
          </Link>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="font-script text-center text-2xl">
        42,343 <span className="text-muted-foreground">LEGO pieces</span>
      </HoverCardContent>
    </HoverCard>
  );
}
