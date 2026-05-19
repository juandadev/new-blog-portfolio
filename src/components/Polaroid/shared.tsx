'use client';

import React, { CSSProperties, JSX, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import type { Transition } from 'motion';
import { cn } from '@/lib/utils';
import type {
  PolaroidImageManifestEntry,
  PolaroidImageVariant,
  PolaroidPlaceholderEffect,
} from './types';

type ExpandedImageStyle = CSSProperties & {
  '--polaroid-photo-aspect-ratio'?: string;
};

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

interface ExpandedImagePortalProps {
  image: PolaroidImageManifestEntry;
  expandedImage: PolaroidImageVariant;
  isExpanded: boolean;
  layoutId: string | undefined;
  onClose: () => void;
  imageClassName?: string;
  photoAspectRatio?: string;
  shouldReduceMotion: boolean | null;
}

export function ExpandedImagePortal({
  image,
  expandedImage,
  isExpanded,
  layoutId,
  onClose,
  imageClassName,
  photoAspectRatio,
  shouldReduceMotion,
}: ExpandedImagePortalProps): JSX.Element | null {
  const [loadedExpandedSrc, setLoadedExpandedSrc] = useState<string | null>(
    null
  );
  const isExpandedImageLoaded = loadedExpandedSrc === expandedImage.src;
  const imageStyle: ExpandedImageStyle | undefined = photoAspectRatio
    ? { '--polaroid-photo-aspect-ratio': photoAspectRatio }
    : undefined;

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isExpanded && (
        <div className="fixed inset-0 top-0 isolate z-50 flex h-dvh w-dvw items-center justify-center">
          <motion.div
            className="bg-background/95 absolute inset-0 z-0"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, backdropFilter: 'blur(0px)' }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, backdropFilter: 'blur(5px)' }
            }
            // @ts-expect-error AnimatePresence wrapper present
            exit={
              shouldReduceMotion
                ? false
                : { opacity: 0, backdropFilter: 'blur(0px)' }
            }
            onClick={onClose}
          />
          <motion.div
            layoutId={layoutId}
            className="z-1 overflow-hidden rounded-md"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, backdropFilter: 'blur(0px)' }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, backdropFilter: 'blur(5px)' }
            }
            // @ts-expect-error AnimatePresence wrapper present
            exit={
              shouldReduceMotion
                ? false
                : { opacity: 0, backdropFilter: 'blur(0px)' }
            }
            transition={springWithoutBounceTransition}
          >
            <Image
              alt={image.alt}
              blurDataURL={image.blurDataURL}
              className={cn(
                'h-100 w-auto flex-1 self-stretch rounded-md md:h-150',
                imageClassName,
                getPlaceholderEffectClassName(
                  image.placeholderEffect,
                  isExpandedImageLoaded
                )
              )}
              height={expandedImage.height}
              loading="eager"
              onLoad={() => setLoadedExpandedSrc(expandedImage.src)}
              placeholder="blur"
              src={expandedImage.src}
              style={imageStyle}
              unoptimized
              width={expandedImage.width}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
