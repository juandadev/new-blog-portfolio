import React from 'react';
import Pegboard from '@/components/Pegboard/pegboard';
import Polaroid from '@/components/Polaroid/polaroid';

export default function Home() {
  return (
    <div className="relative h-full w-full py-16">
      <Pegboard />
      <div className="relative grid grid-cols-1 place-items-stretch gap-4 lg:grid-cols-[auto_1fr]">
        <Polaroid
          src="/juan.webp"
          className="w-50"
          withClip
          clipClassName="-top-16 -right-6 rotate-52"
        >
          Juanda - 19/05/2025
        </Polaroid>
      </div>
    </div>
  );
}
