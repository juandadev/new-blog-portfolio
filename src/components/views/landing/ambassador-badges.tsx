import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AmbassadorBadgesProps {
  containerClassName?: string;
}

export default function AmbassadorBadges({
  containerClassName,
}: AmbassadorBadgesProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', containerClassName)}>
      <Image
        src="/v0_badge.png"
        alt="v0 ambassador badge"
        width={212}
        height={120}
        unoptimized
        className="drop-shadow-md/25"
      />
      <Image
        src="/cursor_badge.png"
        alt="Cursor ambassador badge"
        width={154}
        height={172}
        unoptimized
        className="drop-shadow-md/25"
      />
    </div>
  );
}
