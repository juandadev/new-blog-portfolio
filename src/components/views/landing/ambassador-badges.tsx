import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';

interface AmbassadorBadgesProps {
  containerClassName?: string;
}

export default function AmbassadorBadges({
  containerClassName,
}: AmbassadorBadgesProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', containerClassName)}>
      <div className="relative isolate">
        <Hook className="-top-5 right-3.5 z-1" />
        <Image
          src="/v0_badge.png"
          alt="v0 ambassador badge"
          width={212}
          height={120}
          unoptimized
          className="drop-shadow-md/25"
        />
      </div>
      <div className="relative isolate">
        <Hook className="top-0 right-3.5 z-1" />
        <Image
          src="/cursor_badge.png"
          alt="Cursor ambassador badge"
          width={154}
          height={172}
          unoptimized
          className="drop-shadow-md/25"
        />
      </div>
    </div>
  );
}
