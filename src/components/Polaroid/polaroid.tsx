import React, { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface PolaroidProps extends React.HTMLProps<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  withClip?: boolean;
  clipClassName?: string;
  className?: string;
}

export default function Polaroid({
  orientation = 'vertical',
  withClip = false,
  clipClassName,
  className,
}: PolaroidProps): JSX.Element {
  // TODO: Need to test the horizontal variant to be correct and make the proper changes
  return (
    <div
      className={twMerge(
        'bg-polaroid bg-taupe-100 relative isolate flex items-center rounded-sm shadow-sm/25',
        "before:absolute before:inset-0 before:-z-1 before:overflow-hidden before:rounded-sm before:bg-[url('/textures/paper_texture.png')] before:bg-repeat before:opacity-10 before:content-['']",
        orientation === 'vertical' ? 'aspect-[82/133]' : 'aspect-[133/82]',
        className
      )}
    >
      {withClip && (
        <Image
          src="/pegboard/clip-white.png"
          alt="Clip"
          width={147}
          height={489}
          unoptimized
          className={twMerge(
            'absolute aspect-[147/489] w-8.5 select-none',
            clipClassName ? clipClassName : '-top-19 left-0 -rotate-15'
          )}
        />
      )}
      <div className="h-full w-full pb-[20%]">
        <span className="sr-only">Polaroid</span>
        <div className="inset-shadow-polaroid flex h-full w-full rounded-t-sm px-[7%] pt-[13%] pb-[7%]">
          <Image
            src="/juan.webp"
            alt="Juan Martinez profile picture"
            width={256}
            height={341}
            className="flex-1 self-stretch object-cover"
          />
        </div>
      </div>
    </div>
  );
}
