import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import StickerLabel from '@/components/sticker-label';

interface CoffeeCupsProps {
  className?: string;
}

const currentYear = new Date().getFullYear();

const MUG_IMAGES = ['/mugs/dev_mug.webp', '/mugs/starbucks_mug.webp'];

export default function CoffeeCups({ className }: CoffeeCupsProps) {
  // eslint-disable-next-line
  const mugSrc = MUG_IMAGES[Math.floor(Math.random() * MUG_IMAGES.length)];

  return (
    <div
      className={cn(
        className,
        'group relative flex items-center justify-center'
      )}
    >
      <Image
        src={mugSrc}
        alt="Mug"
        width={399}
        height={400}
        unoptimized
        className="sticker-shadow sticker-animate h-auto w-55 select-none lg:w-60"
      />
      <StickerLabel>
        <Link href="/coffee" className="w-54 md:w-49 lg:w-54">
          <span>125</span> Cups of coffee in <span>{currentYear}</span>
        </Link>
      </StickerLabel>
    </div>
  );
}
