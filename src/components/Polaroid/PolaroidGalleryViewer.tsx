'use client';

import React, {
  CSSProperties,
  JSX,
  useCallback,
  useEffect,
  useLayoutEffect,
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

interface DragState {
  hasMoved: boolean;
  pointerId: number | null;
  startIndex: number;
  startScrollLeft: number;
  startX: number;
}

export interface PolaroidGalleryViewerItem {
  footerText?: React.ReactNode;
  image: PolaroidImageManifestEntry;
  expandedImage: PolaroidImageVariant;
  imageClassName?: string;
  layoutId?: string;
  photoAspectRatio?: string;
}

interface PolaroidGalleryViewerProps {
  isExpanded: boolean;
  items: PolaroidGalleryViewerItem[];
  onClose: () => void;
  shouldReduceMotion: boolean | null;
}

export function PolaroidGalleryViewer({
  isExpanded,
  items,
  onClose,
  shouldReduceMotion,
}: PolaroidGalleryViewerProps): JSX.Element | null {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPointerDragging, setIsPointerDragging] = useState(false);
  const [loadedExpandedSrcs, setLoadedExpandedSrcs] = useState<Set<string>>(
    () => new Set()
  );
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragStateRef = useRef<DragState>({
    hasMoved: false,
    pointerId: null,
    startIndex: 0,
    startScrollLeft: 0,
    startX: 0,
  });
  const ignoreNextClickRef = useRef(false);
  const scrollRafRef = useRef<number | null>(null);
  const wasExpandedRef = useRef(false);

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

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'touch' || event.button !== 0) return;

      dragStateRef.current = {
        hasMoved: false,
        pointerId: event.pointerId,
        startIndex: activeIndex,
        startScrollLeft: event.currentTarget.scrollLeft,
        startX: event.clientX,
      };
      setIsPointerDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [activeIndex]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current;
      if (dragState.pointerId !== event.pointerId) return;

      const dragDistance = event.clientX - dragState.startX;

      if (Math.abs(dragDistance) > 4) {
        dragState.hasMoved = true;
        ignoreNextClickRef.current = true;
      }

      event.currentTarget.scrollLeft = dragState.startScrollLeft - dragDistance;
    },
    []
  );

  const navigateToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return;

      setActiveIndex(index);
      scrollToIndex(index);
    },
    [items.length, scrollToIndex]
  );

  const finishPointerDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current;
      if (dragState.pointerId !== event.pointerId) return;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      if (dragState.hasMoved) {
        const dragDistance = event.clientX - dragState.startX;
        const snapDistance = Math.max(
          48,
          Math.min(120, event.currentTarget.clientWidth * 0.14)
        );
        const nextIndex =
          Math.abs(dragDistance) < snapDistance
            ? dragState.startIndex
            : dragDistance < 0
              ? dragState.startIndex + 1
              : dragState.startIndex - 1;

        navigateToIndex(nextIndex);
      }

      dragStateRef.current = {
        hasMoved: false,
        pointerId: null,
        startIndex: 0,
        startScrollLeft: 0,
        startX: 0,
      };
      setIsPointerDragging(false);
    },
    [navigateToIndex]
  );

  const markExpandedImageLoaded = useCallback((src: string) => {
    setLoadedExpandedSrcs((currentSrcs) => {
      if (currentSrcs.has(src)) return currentSrcs;

      const nextSrcs = new Set(currentSrcs);
      nextSrcs.add(src);
      return nextSrcs;
    });
  }, []);

  useLayoutEffect(() => {
    if (!isExpanded) {
      wasExpandedRef.current = false;
      return;
    }

    if (wasExpandedRef.current) return;
    wasExpandedRef.current = true;

    scrollToIndex(0, 'auto');
    viewerRef.current?.focus({ preventScroll: true });
  }, [isExpanded, scrollToIndex]);

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
    <AnimatePresence onExitComplete={() => setActiveIndex(0)}>
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
              handleClose();
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
            onClick={handleClose}
          />
          <div
            aria-roledescription="carousel"
            aria-label="Polaroid gallery"
            className="h-full w-full"
            role="region"
          >
            <div
              ref={scrollContainerRef}
              className={cn(
                'flex h-full snap-x snap-mandatory items-center gap-6 overflow-x-auto scroll-smooth px-[14vw] py-8 [scrollbar-width:none] motion-reduce:scroll-auto md:gap-10 md:px-[25vw] [&::-webkit-scrollbar]:hidden',
                isPointerDragging && 'snap-none scroll-auto',
                isPointerDragging ? 'cursor-grabbing' : 'cursor-grab'
              )}
              onPointerCancel={finishPointerDrag}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={finishPointerDrag}
              onScroll={handleScroll}
              data-polaroid-gallery-content
            >
              {items.map((item, index) => {
                const isLoaded = loadedExpandedSrcs.has(item.expandedImage.src);
                const shouldLoadImage =
                  item.layoutId != null ||
                  isLoaded ||
                  Math.abs(activeIndex - index) <= 1;
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
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        layoutId={item.layoutId}
                        className="overflow-hidden rounded-md"
                        data-polaroid-gallery-image
                        transition={springWithoutBounceTransition}
                      >
                        {shouldLoadImage ? (
                          <Image
                            alt={item.image.alt}
                            blurDataURL={item.image.blurDataURL}
                            className={imageClassName}
                            height={item.expandedImage.height}
                            loading={
                              index === activeIndex || item.layoutId != null
                                ? 'eager'
                                : 'lazy'
                            }
                            onLoad={() =>
                              markExpandedImageLoaded(item.expandedImage.src)
                            }
                            placeholder="blur"
                            draggable={false}
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
                            draggable={false}
                            src={item.image.blurDataURL}
                            style={imageStyle}
                            unoptimized
                            width={item.expandedImage.width}
                          />
                        )}
                      </motion.div>
                      {item.footerText != null && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0 } }}
                          className="text-muted-foreground z-0 text-center text-sm leading-relaxed font-normal"
                        >
                          {item.footerText}
                        </motion.div>
                      )}
                    </div>
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
