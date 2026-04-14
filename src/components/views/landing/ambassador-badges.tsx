import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
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
        'isolate flex flex-col items-center gap-4',
        containerClassName
      )}
    >
      <div className="relative isolate z-1">
        <Image
          src="/v0_badge.png"
          alt="v0 ambassador badge"
          width={212}
          height={120}
          unoptimized
          className="sticker-shadow h-auto w-auto max-w-53"
        />
        <StickerLabel position="-bottom-5 -right-5">
          <Link
            href="https://v0-guadalajara.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>v0</span> Ambassador
          </Link>
        </StickerLabel>
      </div>
      <div className="relative isolate">
        <Image
          src="/cursor_badge.png"
          alt="Cursor ambassador badge"
          width={154}
          height={172}
          unoptimized
          className="sticker-shadow h-auto w-auto max-w-38.5"
        />
        <StickerLabel position="-bottom-3 -right-11">
          <Link
            href="https://cursor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-39"
          >
            <span>Cursor</span> Ambassador
          </Link>
        </StickerLabel>
      </div>
    </div>
  );
}
