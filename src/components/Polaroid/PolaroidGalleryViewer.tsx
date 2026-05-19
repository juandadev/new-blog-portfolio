'use client';

import React, {
  CSSProperties,
  JSX,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { PolaroidImageManifestEntry, PolaroidImageVariant } from './types';
import {
  getPlaceholderEffectClassName,
  springWithoutBounceTransition,
} from './shared';

type GalleryImageStyle = CSSProperties & {
  '--polaroid-photo-aspect-ratio'?: string;
};

export interface PolaroidGalleryViewerItem {
  image: PolaroidImageManifestEntry;
  expandedImage: PolaroidImageVariant;
  imageClassName?: string;
  layoutId?: string;
  photoAspectRatio?: string;
}

interface PolaroidGalleryViewerProps {
  initialIndex: number;
  isExpanded: boolean;
  items: PolaroidGalleryViewerItem[];
  onClose: () => void;
  shouldReduceMotion: boolean | null;
}

function clampIndex(index: number, length: number): number {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}

export function PolaroidGalleryViewer({
  initialIndex,
  isExpanded,
  items,
  onClose,
  shouldReduceMotion,
}: PolaroidGalleryViewerProps): JSX.Element | null {
  const [activeIndex, setActiveIndex] = useState(() =>
    clampIndex(initialIndex, items.length)
  );
  const [loadedExpandedSrcs, setLoadedExpandedSrcs] = useState<Set<string>>(
    () => new Set()
  );
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRafRef = useRef<number | null>(null);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      slideRefs.current[index]?.scrollIntoView({
        block: 'nearest',
        inline: 'center',
        behavior: shouldReduceMotion ? 'auto' : behavior,
      });
    },
    [shouldReduceMotion]
  );

  const updateActiveIndexFromScroll = useCallback(() => {
    scrollRafRef.current = null;

    const container = scrollContainerRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const closestIndex = slideRefs.current.reduce(
      (closest, slide, index) => {
        if (!slide) return closest;

        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(containerCenter - slideCenter);

        return distance < closest.distance ? { distance, index } : closest;
      },
      { distance: Number.POSITIVE_INFINITY, index: activeIndex }
    ).index;

    setActiveIndex((currentIndex) =>
      currentIndex === closestIndex ? currentIndex : closestIndex
    );
  }, [activeIndex]);

  const handleScroll = useCallback(() => {
    if (scrollRafRef.current != null) return;
    scrollRafRef.current = window.requestAnimationFrame(
      updateActiveIndexFromScroll
    );
  }, [updateActiveIndexFromScroll]);

  const handleViewerClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('[data-polaroid-gallery-image]')) return;

      onClose();
    },
    [onClose]
  );

  const navigateToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return;

      setActiveIndex(index);
      scrollToIndex(index);
    },
    [items.length, scrollToIndex]
  );

  const markExpandedImageLoaded = useCallback((src: string) => {
    setLoadedExpandedSrcs((currentSrcs) => {
      if (currentSrcs.has(src)) return currentSrcs;

      const nextSrcs = new Set(currentSrcs);
      nextSrcs.add(src);
      return nextSrcs;
    });
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const nextIndex = clampIndex(initialIndex, items.length);

    const animationFrame = window.requestAnimationFrame(() => {
      scrollToIndex(nextIndex, 'auto');
      viewerRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [initialIndex, isExpanded, items.length, scrollToIndex]);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current != null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  if (typeof document === 'undefined' || items.length === 0) {
    return null;
  }

  const canNavigatePrevious = activeIndex > 0;
  const canNavigateNext = activeIndex < items.length - 1;

  return createPortal(
    <AnimatePresence>
      {isExpanded && (
        <div
          ref={viewerRef}
          aria-modal="true"
          className="fixed inset-0 top-0 isolate z-50 flex h-dvh w-dvw items-center justify-center outline-none"
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              navigateToIndex(activeIndex - 1);
            }

            if (event.key === 'ArrowRight') {
              event.preventDefault();
              navigateToIndex(activeIndex + 1);
            }

            if (event.key === 'Escape') {
              event.preventDefault();
              onClose();
            }
          }}
          role="dialog"
          tabIndex={-1}
        >
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
          <div
            aria-roledescription="carousel"
            aria-label="Polaroid gallery"
            className="z-1 h-full w-full"
            role="region"
          >
            <div
              ref={scrollContainerRef}
              className="flex h-full snap-x snap-mandatory items-center gap-6 overflow-x-auto scroll-smooth px-[14vw] py-8 [scrollbar-width:none] motion-reduce:scroll-auto md:gap-10 md:px-[25vw] [&::-webkit-scrollbar]:hidden"
              onClick={handleViewerClick}
              onScroll={handleScroll}
            >
              {items.map((item, index) => {
                const isLoaded = loadedExpandedSrcs.has(item.expandedImage.src);
                const shouldLoadImage =
                  isLoaded || Math.abs(activeIndex - index) <= 1;
                const imageStyle: GalleryImageStyle | undefined =
                  item.photoAspectRatio
                    ? {
                        '--polaroid-photo-aspect-ratio': item.photoAspectRatio,
                      }
                    : undefined;
                const imageClassName = cn(
                  'h-100 w-auto flex-1 self-stretch rounded-md md:h-150',
                  item.imageClassName,
                  getPlaceholderEffectClassName(
                    item.image.placeholderEffect,
                    isLoaded
                  )
                );

                return (
                  <div
                    key={`${item.expandedImage.src}-${index}`}
                    ref={(slide) => {
                      slideRefs.current[index] = slide;
                    }}
                    aria-label={`Image ${index + 1} of ${items.length}`}
                    aria-roledescription="slide"
                    className="flex h-full shrink-0 basis-[72vw] snap-center items-center justify-center md:basis-[50vw]"
                    role="group"
                  >
                    <motion.div
                      layoutId={
                        index === activeIndex ? item.layoutId : undefined
                      }
                      className="overflow-hidden rounded-md"
                      data-polaroid-gallery-image
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
                      {shouldLoadImage ? (
                        <Image
                          alt={item.image.alt}
                          blurDataURL={item.image.blurDataURL}
                          className={imageClassName}
                          height={item.expandedImage.height}
                          loading={index === activeIndex ? 'eager' : 'lazy'}
                          onLoad={() =>
                            markExpandedImageLoaded(item.expandedImage.src)
                          }
                          placeholder="blur"
                          src={item.expandedImage.src}
                          style={imageStyle}
                          unoptimized
                          width={item.expandedImage.width}
                        />
                      ) : (
                        <Image
                          alt=""
                          aria-hidden="true"
                          className={imageClassName}
                          height={item.expandedImage.height}
                          src={item.image.blurDataURL}
                          style={imageStyle}
                          unoptimized
                          width={item.expandedImage.width}
                        />
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            aria-label="Previous image"
            className="bg-background/70 text-foreground absolute top-1/2 left-4 z-2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full opacity-40 backdrop-blur-sm transition-opacity duration-150 ease-out hover:opacity-90 focus-visible:opacity-90 focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none disabled:pointer-events-none disabled:opacity-0 motion-reduce:transition-none md:flex"
            disabled={!canNavigatePrevious}
            onClick={() => navigateToIndex(activeIndex - 1)}
            type="button"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            aria-label="Next image"
            className="bg-background/70 text-foreground absolute top-1/2 right-4 z-2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full opacity-40 backdrop-blur-sm transition-opacity duration-150 ease-out hover:opacity-90 focus-visible:opacity-90 focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none disabled:pointer-events-none disabled:opacity-0 motion-reduce:transition-none md:flex"
            disabled={!canNavigateNext}
            onClick={() => navigateToIndex(activeIndex + 1)}
            type="button"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
