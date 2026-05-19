import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import StickerLabel from '@/components/sticker-label';
import { connection } from 'next/server';

interface CoffeeCupsProps {
  className?: string;
  mug?: string;
  showLabel?: boolean;
}

const currentYear = new Date().getFullYear();

const MUG_IMAGES = [
  '/mugs/dev_mug.webp',
  '/mugs/starbucks_mug.webp',
  '/mugs/stormtrooper_mug.webp',
  '/mugs/stormtrooper_mug_2.webp',
];

function getRandomMug() {
  return MUG_IMAGES[Math.floor(Math.random() * MUG_IMAGES.length)];
}

export default async function CoffeeCup({
  className,
  mug,
  showLabel = true,
}: CoffeeCupsProps) {
  if (!mug) {
    await connection();
  }

  const mugSrc = mug ?? getRandomMug();

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
      {showLabel && (
        <StickerLabel>
          <Link href="/coffee" className="w-54 md:w-49 lg:w-54">
            <span>178</span> Cups of coffee in <span>{currentYear}</span>
          </Link>
        </StickerLabel>
      )}
    </div>
  );
}
