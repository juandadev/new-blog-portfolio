import React from 'react';
import Image from 'next/image';

export default function Pegboard() {
  return (
    <div className="skadis-surface absolute inset-0 isolate -z-1 m-auto flex h-[calc(round(down,100%-40px,59px)+40px)] w-[calc(round(down,100%-49px,62px)+49px)] max-w-[1440px] overflow-hidden rounded-2xl py-5 pr-[17px] pl-8">
      <p className="sr-only">Pegboard</p>
      {/* Screws */}
      <Image
        src="/pegboard/screw.png"
        alt="Pegboard screw"
        className="absolute top-4 left-15 rotate-75 select-none"
        width={26}
        height={26}
        unoptimized
      />
      <Image
        src="/pegboard/screw.png"
        alt="Pegboard screw"
        className="absolute top-4 right-6.5 rotate-90 select-none"
        width={26}
        height={26}
        unoptimized
      />
      <Image
        src="/pegboard/screw.png"
        alt="Pegboard screw"
        className="absolute bottom-4 left-7 -rotate-20 select-none"
        width={26}
        height={26}
        unoptimized
      />
      <Image
        src="/pegboard/screw.png"
        alt="Pegboard screw"
        className="absolute right-14 bottom-4 rotate-65 select-none"
        width={26}
        height={26}
        unoptimized
      />
    </div>
  );
}
