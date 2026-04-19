import React from 'react';
import PegboardScrew from '@/components/Pegboard/pegboard-screw';

export default function Pegboard() {
  return (
    <div className="skadis-surface max-w-app @container/pegboard absolute inset-0 isolate -z-1 m-auto flex h-[calc(round(down,100%-40px,59px)+40px)] w-[calc(round(down,100%-49px,62px)+49px)] overflow-hidden rounded-2xl py-5 pr-4.25 pl-8 transition-colors duration-200">
      <p className="sr-only">Pegboard</p>
      <PegboardScrew className="top-4 left-15 rotate-75" />
      <PegboardScrew className="top-4 right-6.5 rotate-90 @min-[1391px]/pegboard:right-13.5" />
      <PegboardScrew className="bottom-4 left-7 -rotate-20" />
      <PegboardScrew className="right-14 bottom-4 rotate-65 @min-[1391px]/pegboard:right-5.5" />
    </div>
  );
}
