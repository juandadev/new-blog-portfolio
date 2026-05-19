'use client';

import React, { JSX, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type {
  PolaroidImageManifestEntry,
  PolaroidImageVariant,
} from '@/components/Polaroid/types';
import {
  getPlaceholderEffectClassName,
  springWithoutBounceTransition,
} from '@/components/Polaroid/shared';

interface FrameImagePortalProps {
  image: PolaroidImageManifestEntry;
  expandedImage: PolaroidImageVariant;
  isExpanded: boolean;
  layoutId: string | undefined;
  onClose: () => void;
  shouldReduceMotion: boolean | null;
}

export function FrameImagePortal({
  image,
  expandedImage,
  isExpanded,
  layoutId,
  onClose,
  shouldReduceMotion,
}: FrameImagePortalProps): JSX.Element | null {
  const [loadedExpandedSrc, setLoadedExpandedSrc] = useState<string | null>(
    null
  );
  const isExpandedImageLoaded = loadedExpandedSrc === expandedImage.src;

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
                'h-100 w-auto flex-1 self-stretch rounded-md object-contain md:h-150',
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
