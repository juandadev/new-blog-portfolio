'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { DRAWINGS } from '@/constants/drawings';
import { useSideDrawings } from '@/contexts/SideDrawingsContext';
import { cn, isBlogPostPath } from '@/lib/utils';

function shuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const REPEAT_COUNT = 8;

interface DrawingsColumnProps {
  side: 'left' | 'right';
}

export default function DrawingsColumn({ side }: DrawingsColumnProps) {
  const pathname = usePathname();
  const { sideDrawingsVisible } = useSideDrawings();
  const showSideDrawings = isBlogPostPath(pathname)
    ? sideDrawingsVisible
    : true;

  const images = useMemo(() => {
    const seed = hashString(pathname + side);
    const shuffled = shuffle([...DRAWINGS], seed);

    const repeated = [];
    for (let i = 0; i < REPEAT_COUNT; i++) {
      repeated.push(...shuffled);
    }
    return repeated;
  }, [pathname, side]);

  return (
    <aside
      className={cn(
        'relative overflow-hidden',
        'hidden',
        showSideDrawings ? 'md:flex' : 'md:hidden'
      )}
      aria-hidden={!showSideDrawings}
    >
      <div
        className="absolute inset-0 flex flex-col items-center gap-8 overflow-y-hidden py-4"
        style={{
          maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 90%, transparent 100%)',
        }}
      >
        {images.map((drawing, i) => (
          <Image
            key={`${side}-${drawing.src}-${i}`}
            src={drawing.src}
            alt={drawing.alt}
            width={150}
            height={150}
            className="h-auto w-full max-w-37.5 object-contain select-none"
            draggable={false}
          />
        ))}
      </div>
    </aside>
  );
}
