import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const sizeMap = {
  ps5: {
    width: 'w-47.5',
    aspectRatio: 'aspect-[13.5/17]',
    background: 'bg-ps5/80',
    layoutClass: 'grid grid-cols-1 grid-rows-[auto_1fr]',
    brandClass: 'border-ps5 w-full border-b bg-neutral-50 px-2 py-1',
    brandImg: (
      <Image
        src="/ps5.png"
        alt="Playstation 5 logo"
        width={400}
        height={102}
        unoptimized
        className="aspect-[400/102] w-15"
      />
    ),
    gameCover:
      'https://image.api.playstation.com/vulcan/ap/rnd/202504/2116/53c76276602fca520ddf3269e1ff9f34aca0ac39ce46e4cb.jpg',
  },
  switch: {
    width: 'w-42.5',
    aspectRatio: 'aspect-[10.5/17]',
    background: 'bg-neutral-400/70',
    layoutClass: 'grid grid-cols-1 grid-rows-1',
    brandClass: 'absolute top-0 left-0 bg-switch w-fit p-1.5',
    brandImg: (
      <Image
        src="/switch.svg"
        alt="Nintendo switch logo"
        width={113}
        height={114}
        unoptimized
        className="aspect-[113/114] w-5"
      />
    ),
    gameCover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%2810%29.webp',
  },
  '3ds': {
    width: 'w-47.5',
    aspectRatio: 'aspect-[14/12.5]`',
    background: 'bg-neutral-50',
    layoutClass: '',
    brandClass: '',
    brandImg: '',
    gameCover: '',
  },
};

interface GameCoverProps {
  containerClassName?: string;
  className?: string;
  variant: 'ps5' | 'switch' | '3ds';
}

export default function GameCover({
  containerClassName,
  className,
  variant,
}: GameCoverProps) {
  const variantProps = sizeMap[variant];

  return (
    <div
      className={cn(
        `absolute isolate ${variantProps.width} ${variantProps.aspectRatio} ${variantProps.background} rounded-md`,
        'before:absolute before:inset-0 before:z-2 before:rounded-[inherit] before:shadow-[-3px_0_4px_rgba(0,0,0,0.25)_inset,_3px_0_4px_rgba(255,_255,_255,_0.40)_inset]',
        containerClassName
      )}
    >
      {/* Front Side */}
      <div
        className={cn(
          variantProps.layoutClass,
          `absolute inset-y-2 right-2 left-0 bg-neutral-50`,
          `before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:bg-[url('/textures/plastic-wrap.png')] before:bg-cover before:bg-center before:opacity-40`,
          className
        )}
      >
        <span className="sr-only">Currently Playing: Ghost of Yotei</span>
        <div className={variantProps.brandClass}>{variantProps.brandImg}</div>
        <Image
          src={variantProps.gameCover}
          width={400}
          height={400}
          alt="Ghost of Yotei game cover"
          className="size-full object-cover object-center"
        />
      </div>
    </div>
  );
}
