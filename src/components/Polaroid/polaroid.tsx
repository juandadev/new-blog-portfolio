'use client';

import React, { JSX, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import PegboardClip from '@/components/Pegboard/pegboard-clip';
import { motion, useReducedMotion } from 'motion/react';
import { Transition } from 'motion';
import { polaroidImageManifest } from './polaroid-image-manifest';
import type {
  PolaroidImageManifestKey,
  PolaroidPlaceholderEffect,
} from './polaroid-image-manifest';

interface PolaroidProps extends React.HTMLProps<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  withClip?: boolean;
  clipClassName?: string;
  className?: string;
  src: PolaroidImageManifestKey;
  label?: string;
  withAnimation?: boolean;
}

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

function getPlaceholderEffectClassName(
  effect: PolaroidPlaceholderEffect | undefined,
  isLoaded: boolean
): string {
  const placeholderEffect = effect ?? 'blur';

  return cn(
    'transition-[filter,transform,opacity] duration-300 ease-out motion-reduce:transition-none',
    placeholderEffectClasses[placeholderEffect][isLoaded ? 'loaded' : 'loading']
  );
}

export default function Polaroid({
  src,
  orientation = 'vertical',
  withClip = false,
  clipClassName,
  children,
  className,
  withAnimation = false,
}: PolaroidProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadedInlineSrc, setLoadedInlineSrc] = useState<string | null>(null);
  const [loadedExpandedSrc, setLoadedExpandedSrc] = useState<string | null>(
    null
  );
  const shouldReduceMotion = useReducedMotion();

  const polaroidId = useId();
  const openCloseAnimation: Transition = {
    duration: shouldReduceMotion ? 0 : 0.2,
    ease: [0.215, 0.61, 0.355, 1],
  };
  const image = polaroidImageManifest[src];
  const previewSrc = src;
  const previewImage = image.preview;
  const expandedImage = image.expanded;
  const isInlineImageLoaded = loadedInlineSrc === previewSrc;
  const isExpandedImageLoaded = loadedExpandedSrc === expandedImage.src;

  return (
    <>
      <div className="group relative isolate z-3 h-fit w-fit justify-self-center">
        {withClip && (
          <PegboardClip
            className={
              clipClassName ? clipClassName : '-top-19 left-0 -rotate-15'
            }
          />
        )}
        <div
          className={cn(
            'shadow-pegboard relative cursor-zoom-in rounded-sm bg-taupe-100',
            'before:absolute before:inset-0 before:-z-1 before:overflow-hidden before:rounded-sm before:bg-repeat before:opacity-10',
            orientation === 'vertical'
              ? 'aspect-82/133 h-auto max-w-60'
              : 'aspect-133/82 max-h-39 w-auto',
            withAnimation && 'polaroid-animate',
            className
          )}
          onClick={() => {
            setIsExpanded(true);
          }}
        >
          <div
            className={cn(
              'h-full w-full',
              orientation === 'vertical'
                ? 'grid grid-cols-1 grid-rows-[85%_1fr]'
                : 'grid grid-cols-[85%_1fr] grid-rows-1'
            )}
          >
            <span className="sr-only">Polaroid</span>
            <div
              className={cn(
                'inset-shadow-polaroid flex h-full w-full',
                orientation === 'vertical'
                  ? 'rounded-t-sm px-[7%] pt-[13%] pb-[7%]'
                  : 'rounded-l-sm py-[7%] pr-[7%] pl-[13%]'
              )}
            >
              {!isExpanded && (
                <motion.div
                  layoutId={shouldReduceMotion ? undefined : polaroidId}
                  className="h-full w-full overflow-hidden"
                  transition={openCloseAnimation}
                >
                  <Image
                    alt={image.alt}
                    blurDataURL={image.blurDataURL}
                    className={cn(
                      'h-full w-full object-cover',
                      getPlaceholderEffectClassName(
                        image.placeholderEffect,
                        isInlineImageLoaded
                      )
                    )}
                    height={previewImage.height}
                    onLoad={() => setLoadedInlineSrc(previewSrc)}
                    placeholder="blur"
                    src={previewSrc}
                    unoptimized
                    width={previewImage.width}
                  />
                </motion.div>
              )}
            </div>
            <div
              className={cn(
                'font-script flex items-center justify-center text-2xl',
                orientation === 'horizontal' && 'writing-vertical-rl rotate-180'
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      {isExpanded &&
        createPortal(
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
              transition={openCloseAnimation}
              onClick={() => setIsExpanded(false)}
            />
            <motion.div
              layoutId={shouldReduceMotion ? undefined : polaroidId}
              className="z-1 overflow-hidden rounded-md"
              transition={openCloseAnimation}
            >
              <Image
                alt={image.alt}
                blurDataURL={image.blurDataURL}
                className={cn(
                  'aspect-170/226 h-100 w-auto flex-1 self-stretch rounded-md object-cover md:h-150',
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
          </div>,
          document.body
        )}
    </>
  );
}
