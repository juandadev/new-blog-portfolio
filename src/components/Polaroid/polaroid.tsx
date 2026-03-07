import React, { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface PolaroidProps extends React.HTMLProps<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Polaroid({
  orientation = 'vertical',
  className,
}: PolaroidProps): JSX.Element {
  return (
    <div
      className={twMerge(
        'bg-taupe-100 relative flex items-center rounded-sm shadow-sm/25',
        orientation === 'vertical' ? 'aspect-[82/133]' : 'aspect-[133/82]',
        className
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden rounded-sm bg-[url('/textures/paper_texture.png')] bg-repeat opacity-15" />
      <div className="z-1 h-full w-full pb-[20%]">
        <span className="sr-only">Polaroid</span>
        <div className="inset-shadow-polaroid flex h-full w-full shrink-0 rounded-t-sm px-[7%] pt-[13%] pb-[7%]">
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
