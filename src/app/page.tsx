import React from 'react';
import Pegboard from '@/components/Pegboard/pegboard';
import Polaroid from '@/components/Polaroid/polaroid';

export default function Home() {
  return (
    <div className="relative h-full w-full py-16">
      <Polaroid />
      <Pegboard />
    </div>
  );
}
