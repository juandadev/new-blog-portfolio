import React from 'react';
import PerspectiveBook from '@/components/perspective-book';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Link from 'next/link';

interface CurrentReadingProps {
  containerClassName?: string;
  title: string;
  href: string;
}

export default function CurrentReading({
  containerClassName,
  title,
  href,
}: CurrentReadingProps) {
  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild>
        <Link href={href} target="_blank" rel="noopener noreferrer">
          <div
            className={cn(
              'group relative isolate flex justify-center',
              containerClassName
            )}
          >
            <PerspectiveBook
              className="shadow-pegboard bg-white bg-[url('/cover.webp')] bg-cover bg-[position:0%_100%] transition-shadow duration-200 hover:shadow-lg/25"
              textured
              withHoverEffect
            >
              <span className="sr-only">Currently reading: {title}</span>
            </PerspectiveBook>
            <Hook
              variant="2"
              className="-bottom-4 left-[calc(50%-70px)] z-1 group-hover:-z-1"
            />
            <Hook
              variant="2"
              className="right-[calc(50%-80px)] -bottom-4 z-1 group-hover:-z-1"
            />
          </div>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="flex flex-col text-center">
        <span className="font-script text-2xl font-medium">
          Currently reading:
        </span>
        <span className="text-muted-foreground text-lg font-semibold">
          {title}
        </span>
      </HoverCardContent>
    </HoverCard>
  );
}
