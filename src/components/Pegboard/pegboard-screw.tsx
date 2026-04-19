'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  getPegboardScrewSrc,
  useSkadisSurface,
} from '@/components/Providers/SkadisSurfaceProvider';

interface PegboardScrewProps {
  className?: string;
}

export default function PegboardScrew({ className }: PegboardScrewProps) {
  const { variant } = useSkadisSurface();
  const src = getPegboardScrewSrc(variant);

  return (
    <Image
      src={src}
      alt="Pegboard screw"
      className={cn('absolute select-none', className)}
      width={26}
      height={26}
      unoptimized
      draggable={false}
    />
  );
}
