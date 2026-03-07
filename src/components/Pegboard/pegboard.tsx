import React from 'react';

export default function Pegboard() {
  return (
    <div className="wood-pegboard-shading absolute inset-0 m-auto flex h-[calc(round(down,100%-40px,59px)+40px)] w-[calc(round(down,100%-49px,62px)+49px)] overflow-hidden rounded-2xl bg-[#C4A47C] py-5 pr-[17px] pl-8">
      <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[url('/textures/fiberboard_pattern_black.png')] bg-[size:571px_400px] bg-repeat opacity-20" />
      <div className="h-full w-full bg-[url('/textures/wood_skadis_shades.png')] bg-[size:62px_59px] bg-[position:-23px_-15px] bg-repeat" />
    </div>
  );
}
