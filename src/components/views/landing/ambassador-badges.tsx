import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface AmbassadorBadgesProps {
  containerClassName?: string;
}

export default function AmbassadorBadges({
  containerClassName,
}: AmbassadorBadgesProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', containerClassName)}>
      <div className="relative isolate">
        <HoverCard openDelay={50} closeDelay={50}>
          <HoverCardTrigger asChild>
            <Image
              src="/v0_badge.png"
              alt="v0 ambassador badge"
              width={212}
              height={120}
              unoptimized
              className="drop-shadow-md/25"
            />
          </HoverCardTrigger>
          <HoverCardContent
            side="top"
            className="font-script text-center text-2xl"
          >
            v0 <span className="text-muted-foreground">Ambassador</span>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="relative isolate">
        <HoverCard openDelay={50} closeDelay={50}>
          <HoverCardTrigger asChild>
            <Image
              src="/cursor_badge.png"
              alt="Cursor ambassador badge"
              width={154}
              height={172}
              unoptimized
              className="drop-shadow-md/25"
            />
          </HoverCardTrigger>
          <HoverCardContent
            side="top"
            className="font-script text-center text-2xl"
          >
            Cursor <span className="text-muted-foreground">Ambassador</span>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
