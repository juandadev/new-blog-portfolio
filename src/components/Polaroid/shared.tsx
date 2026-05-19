import type { Transition } from 'motion';
import { cn } from '@/lib/utils';
import type { PolaroidPlaceholderEffect } from './types';

const placeholderEffectClasses: Record<
  PolaroidPlaceholderEffect,
  { loading: string; loaded: string }
> = {
  blur: {
    loading: 'scale-[1.03] blur-lg opacity-90 saturate-75',
    loaded: 'scale-100 blur-0 opacity-100 saturate-100',
  },
  pixelate: {
    loading: '[image-rendering:pixelated] scale-[1.02] opacity-90 contrast-110',
    loaded: '[image-rendering:auto] scale-100 opacity-100 contrast-100',
  },
};

export const springWithoutBounceTransition: Transition = {
  type: 'spring',
  duration: 0.3,
  bounce: 0,
};

export function getPlaceholderEffectClassName(
  effect: PolaroidPlaceholderEffect | undefined,
  isLoaded: boolean
): string {
  const placeholderEffect = effect ?? 'blur';

  return cn(
    'transition-[filter,transform,opacity] duration-300 ease-out motion-reduce:transition-none',
    placeholderEffectClasses[placeholderEffect][isLoaded ? 'loaded' : 'loading']
  );
}

export function getAspectRatioValue(aspectRatio: string): number {
  const [width, height] = aspectRatio.split('/').map(Number);

  return height === undefined ? width : width / height;
}
