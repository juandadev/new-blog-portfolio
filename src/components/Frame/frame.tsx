'use client';

import React, { CSSProperties, JSX, useId, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import PegboardClip from '@/components/Pegboard/pegboard-clip';
import type { PolaroidImageManifestEntry } from '@/components/Polaroid/types';
import {
  getPlaceholderEffectClassName,
  springWithoutBounceTransition,
} from '@/components/Polaroid/shared';
import { FrameImagePortal } from './FrameImagePortal';

type FrameMaxWidth = NonNullable<CSSProperties['maxWidth']>;

interface FrameProps extends React.HTMLProps<HTMLDivElement> {
  withClip?: boolean;
  clipClassName?: string;
  containerClassName?: string;
  className?: string;
  image: PolaroidImageManifestEntry;
  label?: string;
  maxWidth?: FrameMaxWidth;
  withAnimation?: boolean;
}

export function FrameFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  return (
    <figcaption
      className={cn(
        'text-muted-foreground mt-3 text-center text-sm leading-relaxed font-normal',
        className
      )}
      {...props}
    >
      {children}
    </figcaption>
  );
}

export default function Frame({
  image,
  withClip = false,
  clipClassName,
  children,
  className,
  containerClassName,
  withAnimation = false,
  style,
  maxWidth,
}: FrameProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadedInlineSrc, setLoadedInlineSrc] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const frameId = useId();
  const previewImage = image.preview;
  const expandedImage = image.expanded ?? previewImage;
  const previewSrc = previewImage.src;
  const isInlineImageLoaded = loadedInlineSrc === previewSrc;
  const frameStyle: CSSProperties | undefined = {
    ...style,
    ...(maxWidth === undefined ? undefined : { maxWidth }),
  };

  return (
    <>
      <figure
        className={cn(
          'group relative inset-x-0 isolate z-3 m-auto h-fit w-fit justify-self-center',
          containerClassName
        )}
      >
        {withClip && (
          <PegboardClip
            className={cn(
              clipClassName ? clipClassName : '-top-19 left-0 -rotate-15',
              withAnimation && !shouldReduceMotion
                ? 't-ease-in-out-back transition-transform group-hover:translate-x-2 group-hover:translate-y-3 group-hover:rotate-35'
                : undefined
            )}
          />
        )}
        <div
          className={cn(
            'shadow-pegboard relative cursor-zoom-in rounded-sm bg-taupe-100 p-3',
            'before:absolute before:inset-0 before:-z-1 before:overflow-hidden before:rounded-sm before:bg-repeat before:opacity-10',
            withAnimation &&
              'motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] motion-safe:group-hover:-translate-x-1.25 motion-safe:group-hover:-rotate-3 motion-safe:hover:-translate-x-1.25 motion-safe:hover:-rotate-3',
            className
          )}
          style={frameStyle}
          onClick={() => {
            setIsExpanded(true);
          }}
        >
          <span className="sr-only">Frame</span>
          <motion.div
            layoutId={shouldReduceMotion ? undefined : frameId}
            className="inset-shadow-polaroid overflow-hidden rounded-xs"
            transition={springWithoutBounceTransition}
          >
            <Image
              alt={image.alt}
              blurDataURL={image.blurDataURL}
              className={cn(
                'h-auto max-w-full object-contain',
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
        </div>
        {children}
      </figure>
      <FrameImagePortal
        image={image}
        expandedImage={expandedImage}
        isExpanded={isExpanded}
        layoutId={shouldReduceMotion ? undefined : frameId}
        onClose={() => setIsExpanded(false)}
        shouldReduceMotion={shouldReduceMotion}
      />
    </>
  );
}
