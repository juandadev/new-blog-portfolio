'use client';

import { useState } from 'react';
import Link from 'next/link';
import Lanyard from '@/components/lanyard';
import StickerLabel from '@/components/sticker-label';

export default function LanyardCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="group relative z-0">
      <div
        className="absolute inset-0 z-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <Lanyard
        position={[0, 0, 10]}
        gravity={[0, -40, 0]}
        isHovered={isHovered}
      />
      <StickerLabel position="z-2 bottom-0 left-0">
        <Link
          href="https://luma.com/o9kjjum9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next Event
        </Link>
      </StickerLabel>
    </div>
  );
}
