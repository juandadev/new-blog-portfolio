'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  getPegboardAccessoryTone,
  type PegboardAccessoryTone,
  useSkadisSurface,
} from '@/components/Providers/SkadisSurfaceProvider';

const CLIP_SRC: Record<PegboardAccessoryTone, string> = {
  orange: '/pegboard/clip_orange.png',
  white: '/pegboard/clip_white.png',
  black: '/pegboard/clip_black.png',
};

interface PegboardClipProps {
  className?: string;
}

export default function PegboardClip({ className }: PegboardClipProps) {
  const { variant } = useSkadisSurface();
  const tone = getPegboardAccessoryTone(variant);

  return (
    <Image
      src={CLIP_SRC[tone]}
      alt="Clip"
      width={147}
      height={489}
      unoptimized
      className={cn(
        'absolute z-4 aspect-147/489 h-auto w-8.5 select-none',
        className
      )}
      draggable={false}
    />
  );
}
