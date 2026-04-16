import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import StickerLabel from '@/components/sticker-label';

interface AmbassadorBadgesProps {
  containerClassName?: string;
}

export default function AmbassadorBadges({
  containerClassName,
}: AmbassadorBadgesProps) {
  return (
    <div
      className={cn(
        'relative isolate flex h-full flex-wrap items-center justify-center gap-4',
        containerClassName
      )}
    >
      <StickerLabel position="-top-4 -left-8" className="z-2" withIcon={false}>
        Ambassador:
      </StickerLabel>
      <Image
        src="/v0_badge.png"
        alt="v0 ambassador badge"
        width={212}
        height={120}
        unoptimized
        className="sticker-shadow aspect-639/360 h-auto w-full max-w-40"
      />
      <Image
        src="/cursor_badge.png"
        alt="Cursor ambassador badge"
        width={154}
        height={172}
        unoptimized
        className="sticker-shadow aspect-462/516 h-auto w-auto max-w-29"
      />
      <Image
        src="/raycast_badge.png"
        alt="Raycast ambassador badge"
        width={154}
        height={172}
        unoptimized
        className="sticker-shadow aspect-square h-auto w-full max-w-34"
      />
    </div>
  );
}
