import React, { JSX } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PolaroidProps extends React.HTMLProps<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  withClip?: boolean;
  clipClassName?: string;
  className?: string;
  label?: string;
  src: string;
}

export default function Polaroid({
  src,
  orientation = 'vertical',
  withClip = false,
  clipClassName,
  children,
  className,
}: PolaroidProps): JSX.Element {
  return (
    <div
      className={cn(
        'bg-polaroid bg-taupe-100 shadow-pegboard relative isolate justify-self-center rounded-sm',
        "before:absolute before:inset-0 before:-z-1 before:overflow-hidden before:rounded-sm before:bg-[url('/textures/paper_texture.png')] before:bg-repeat before:opacity-10",
        orientation === 'vertical'
          ? 'aspect-[82/133] max-w-60'
          : 'aspect-[133/82] max-h-39',
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
          className={cn(
            'absolute aspect-[147/489] w-8.5 select-none',
            clipClassName ? clipClassName : '-top-19 left-0 -rotate-15'
          )}
        />
      )}
      <div
        className={cn(
          'h-full w-full',
          orientation === 'vertical'
            ? 'grid grid-cols-1 grid-rows-[85%_1fr]'
            : 'grid grid-cols-[85%_1fr] grid-rows-1'
        )}
      >
        <span className="sr-only">Polaroid</span>
        <div
          className={cn(
            'inset-shadow-polaroid flex h-full w-full',
            orientation === 'vertical'
              ? 'rounded-t-sm px-[7%] pt-[13%] pb-[7%]'
              : 'rounded-l-sm py-[7%] pr-[7%] pl-[13%]'
          )}
        >
          <Image
            src={src}
            alt="Juan Martinez profile picture"
            width={256}
            height={341}
            className="flex-1 self-stretch object-cover"
          />
        </div>
        <div
          className={cn(
            'font-script p-2 text-2xl',
            orientation === 'horizontal' && 'writing-vertical-rl rotate-180'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
