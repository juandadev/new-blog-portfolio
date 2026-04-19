import React from 'react';
import PerspectiveBook from '@/components/perspective-book';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import Link from 'next/link';
import StickerLabel from '@/components/sticker-label';

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
    <div
      className={cn(
        'group relative isolate flex items-center justify-center',
        containerClassName
      )}
    >
      <PerspectiveBook
        className="shadow-pegboard bg-white bg-[url('/cover.webp')] bg-cover bg-[position:0%_100%] transition-shadow hover:shadow-lg/25"
        withHoverEffect
      >
        <span className="sr-only">{title}. Book cover</span>
      </PerspectiveBook>
      <Hook
        variant="2"
        className="-bottom-4 left-[calc(50%-70px)] z-1 group-hover:-z-1"
      />
      <Hook
        variant="2"
        className="right-[calc(50%-80px)] -bottom-4 z-1 group-hover:-z-1"
      />
      <StickerLabel position="bottom-0 left-0" className="z-2">
        <Link href={href} target="_blank" rel="noopener noreferrer">
          Reading <span className="sr-only">{title}</span>
        </Link>
      </StickerLabel>
    </div>
  );
}
