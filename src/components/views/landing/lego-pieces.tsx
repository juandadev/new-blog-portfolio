import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import StickerLabel from '@/components/sticker-label';

interface LegoPiecesProps {
  containerClassName?: string;
}

// TODO: this is the Brickver link which displays my full LEGO collection https://brickver.com/@juandadev
// Pieces: 42,343
export default function LegoPieces({ containerClassName }: LegoPiecesProps) {
  return (
    <div
      className={cn(
        containerClassName,
        'group relative flex items-center justify-center'
      )}
    >
      <Image
        src="/legos/vader.webp"
        alt="Lego"
        width={238}
        height={400}
        unoptimized
        className="sticker-shadow h-auto w-44 select-none"
      />
      <StickerLabel>
        <Link
          href="https://brickver.com/@juandadev"
          target="_blank"
          rel="noopener noreferrer"
          className="w-40"
        >
          <span>42,343</span> LEGO pieces
        </Link>
      </StickerLabel>
    </div>
  );
}
