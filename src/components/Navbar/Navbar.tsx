'use client';

import React from 'react';
import ControlPanelTrigger from '@/components/ControlPanel/ControlPanelTrigger';
import AnimatedContent from '@/components/animations/AnimatedContent';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Navbar() {
  const isMobile = useMediaQuery(920);

  if (!isMobile) return null;

  return (
    <AnimatedContent
      distance={20}
      direction="vertical"
      reverse
      duration={1.2}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={1}
      className="fixed top-4 right-4 z-40"
    >
      <div className="flex max-w-[640px] rounded-lg border border-neutral-400 bg-transparent backdrop-blur-md">
        <ControlPanelTrigger />
      </div>
    </AnimatedContent>
  );
}
