'use client';

import React, { CSSProperties, JSX, useContext, useId, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import PegboardClip from '@/components/Pegboard/pegboard-clip';
import { motion, useReducedMotion } from 'motion/react';
import type { PolaroidImageManifestEntry } from './types';
import {
  getAspectRatioValue,
  getPlaceholderEffectClassName,
  springWithoutBounceTransition,
} from './shared';
import {
  PolaroidGalleryViewer,
  type PolaroidGalleryViewerItem,
} from './PolaroidGalleryViewer';

type PolaroidOrientation = 'horizontal' | 'vertical' | 'dynamic';
type PolaroidLayout = Exclude<PolaroidOrientation, 'dynamic'>;
type PolaroidMaxWidth = NonNullable<CSSProperties['maxWidth']>;

interface PolaroidBaseProps extends React.HTMLProps<HTMLDivElement> {
  withClip?: boolean;
  clipClassName?: string;
  containerClassName?: string;
  className?: string;
  images: PolaroidPicture[];
  withAnimation?: boolean;
}

export interface PolaroidPicture {
  image: PolaroidImageManifestEntry;
  footerText?: React.ReactNode;
}

type PolaroidProps =
  | (PolaroidBaseProps & {
      orientation?: PolaroidLayout;
      maxWidth?: never;
    })
  | (PolaroidBaseProps & {
      orientation: 'dynamic';
      maxWidth: PolaroidMaxWidth;
    });

type PolaroidStyle = CSSProperties & {
  '--polaroid-frame-aspect-ratio'?: string;
  '--polaroid-photo-aspect-ratio'?: string;
};

interface PolaroidFooterContextValue {
  layout: PolaroidLayout;
}

const PolaroidFooterContext =
  React.createContext<PolaroidFooterContextValue | null>(null);

type PolaroidPictureProps = Omit<PolaroidBaseProps, 'images'> & {
  item: PolaroidPicture;
  layoutId: string | undefined;
  maxWidth?: PolaroidMaxWidth;
  orientation: PolaroidOrientation;
  index: number;
};

function getPolaroidLayout(
  orientation: PolaroidOrientation,
  imageAspectRatio: number
): PolaroidLayout {
  if (orientation !== 'dynamic') {
    return orientation;
  }

  return imageAspectRatio > 1 ? 'horizontal' : 'vertical';
}

function getDynamicFrameAspectRatio(
  layout: PolaroidLayout,
  imageAspectRatio: number
): number {
  // The math mirrors the existing percentage tracks and padding so only the photo well changes shape.
  if (layout === 'vertical') {
    return 0.85 / (0.86 / imageAspectRatio + 0.2);
  }

  return 1 / (0.68 / imageAspectRatio + 0.119);
}

function getDefaultSpreadClassName(index: number): string | undefined {
  switch (index) {
    case 0:
      return 'max-lg:-translate-x-3 max-lg:rotate-[-15deg]';
    case 1:
      return 'max-lg:translate-x-7 max-lg:translate-y-[5px] max-lg:rotate-[-5deg]';
    case 2:
      return 'max-lg:translate-x-[68px] max-lg:translate-y-2.5 max-lg:rotate-[5deg]';
    case 3:
      return 'max-lg:translate-x-[108px] max-lg:translate-y-[15px] max-lg:rotate-[15deg]';
    default:
      return undefined;
  }
}

export function PolaroidFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const context = useContext(PolaroidFooterContext);
  const layout = context?.layout ?? 'vertical';

  return (
    <div
      className={cn(
        'font-script flex items-center justify-center text-2xl',
        layout === 'horizontal' && 'writing-vertical-rl rotate-180',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default function Polaroid({
  images,
  orientation = 'vertical',
  withClip = false,
  clipClassName,
  className,
  containerClassName,
  withAnimation = false,
  style,
  maxWidth,
}: PolaroidProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const polaroidGalleryId = useId();
  const visibleImages = images.slice(-4);
  const firstVisibleImageIndex = images.length - visibleImages.length;
  const viewerItems: PolaroidGalleryViewerItem[] = images
    .toReversed()
    .map((item, index) => {
      const originalIndex = images.length - 1 - index;
      const { image } = item;
      const previewImage = image.preview;
      const imageAspectRatio =
        image.aspectRatio ?? `${previewImage.width}/${previewImage.height}`;
      const isDynamic = orientation === 'dynamic';

      return {
        footerText: item.footerText,
        image,
        expandedImage: image.expanded ?? previewImage,
        imageClassName: cn(
          'object-cover',
          isDynamic
            ? 'aspect-(--polaroid-photo-aspect-ratio)'
            : 'aspect-170/226'
        ),
        layoutId:
          shouldReduceMotion || originalIndex < firstVisibleImageIndex
            ? undefined
            : `${polaroidGalleryId}-${originalIndex - firstVisibleImageIndex}`,
        photoAspectRatio: isDynamic ? imageAspectRatio : undefined,
      };
    });

  return (
    <>
      <motion.div
        whileHover="hover"
        className="group relative isolate z-3"
        onClick={() => setIsExpanded(true)}
      >
        {withClip && (
          <PegboardClip
            className={cn(
              clipClassName
                ? clipClassName
                : '-top-16 right-[calc(50%-125px)] rotate-52',
              withAnimation && !shouldReduceMotion
                ? 't-ease-in-out-back transition-transform group-hover:-translate-x-2 group-hover:-translate-y-3 group-hover:rotate-70'
                : undefined
            )}
          />
        )}
        {visibleImages.map((item, index) => (
          <PolaroidPictureFrame
            key={`${item.image.preview.src}-${index}`}
            index={index}
            item={item}
            layoutId={
              shouldReduceMotion ? undefined : `${polaroidGalleryId}-${index}`
            }
            orientation={orientation}
            className={className}
            containerClassName={containerClassName}
            withAnimation={withAnimation}
            style={style}
            maxWidth={maxWidth}
          />
        ))}
      </motion.div>
      <PolaroidGalleryViewer
        isExpanded={isExpanded}
        items={viewerItems}
        onClose={() => setIsExpanded(false)}
        shouldReduceMotion={shouldReduceMotion}
      />
    </>
  );
}

function PolaroidPictureFrame({
  item,
  layoutId,
  orientation,
  className,
  containerClassName,
  withAnimation = false,
  style,
  maxWidth,
  index,
}: PolaroidPictureProps): JSX.Element {
  const [loadedInlineSrc, setLoadedInlineSrc] = useState<string | null>(null);

  const { image, footerText } = item;
  const previewImage = image.preview;
  const previewSrc = previewImage.src;
  const isInlineImageLoaded = loadedInlineSrc === previewSrc;
  const imageAspectRatio =
    image.aspectRatio ?? `${previewImage.width}/${previewImage.height}`;
  const imageAspectRatioValue = getAspectRatioValue(imageAspectRatio);
  const layout = getPolaroidLayout(orientation, imageAspectRatioValue);
  const isDynamic = orientation === 'dynamic';
  const dynamicStyle: PolaroidStyle | undefined = isDynamic
    ? {
        ...style,
        '--polaroid-frame-aspect-ratio': String(
          getDynamicFrameAspectRatio(layout, imageAspectRatioValue)
        ),
        '--polaroid-photo-aspect-ratio': imageAspectRatio,
        maxWidth,
      }
    : style;

  return (
    <PolaroidFooterContext.Provider value={{ layout }}>
      <figure
        className={cn(
          'absolute inset-x-0 isolate z-3 mx-auto h-fit w-fit cursor-zoom-in',
          containerClassName
        )}
      >
        <motion.div
          variants={
            withAnimation
              ? {
                  hover: {
                    x: -12 + index * 40,
                    y: index * 5,
                    rotate: -15 + index * 10,
                  },
                }
              : {}
          }
          transition={{ duration: 0.3, ease: [0.68, -0.55, 0.27, 1.55] }}
          className={cn(
            'shadow-pegboard relative rounded-sm bg-taupe-100',
            'before:absolute before:inset-0 before:-z-1 before:overflow-hidden before:rounded-sm before:bg-repeat before:opacity-10',
            withAnimation && getDefaultSpreadClassName(index),
            layout === 'vertical'
              ? cn(
                  'h-auto',
                  isDynamic
                    ? 'aspect-(--polaroid-frame-aspect-ratio) w-full'
                    : 'aspect-82/133 max-w-60'
                )
              : cn(
                  'w-auto',
                  isDynamic
                    ? 'aspect-(--polaroid-frame-aspect-ratio) w-full'
                    : 'aspect-133/82 max-h-39'
                ),
            className
          )}
          style={dynamicStyle}
        >
          <div
            className={cn(
              'h-full w-full',
              layout === 'vertical'
                ? 'grid grid-cols-1 grid-rows-[85%_1fr]'
                : 'grid grid-cols-[85%_1fr] grid-rows-1'
            )}
          >
            <span className="sr-only">Polaroid</span>
            <div
              className={cn(
                'inset-shadow-polaroid flex h-full w-full',
                layout === 'vertical'
                  ? 'rounded-t-sm px-[7%] pt-[13%] pb-[7%]'
                  : 'rounded-l-sm py-[7%] pr-[7%] pl-[13%]'
              )}
            >
              <motion.div
                layoutId={layoutId}
                className="h-full w-full overflow-hidden"
                transition={springWithoutBounceTransition}
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
            </div>
            {footerText != null && (
              <PolaroidFooter>{footerText}</PolaroidFooter>
            )}
          </div>
        </motion.div>
      </figure>
    </PolaroidFooterContext.Provider>
  );
}
