import React from 'react';
import Pegboard from '@/components/Pegboard/pegboard';
import Polaroid from '@/components/Polaroid/polaroid';

export default function Home() {
  return (
    <div className="relative h-full w-full py-16">
      <Pegboard />
      <div className="relative flex gap-8">
        <Polaroid
          src="/juan.webp"
          className="w-50"
          withClip
          clipClassName="-top-16 -right-6 rotate-52"
        />
      </div>
    </div>
  );
}
