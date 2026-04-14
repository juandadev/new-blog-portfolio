import React from 'react';
import PerspectiveBook from '@/components/perspective-book';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import Link from 'next/link';

interface CurrentReadingProps {
  containerClassName?: string;
  title: string;
  href: string;
}

export default function CurrentReading({
  containerClassName,
  title,
  href,
}: CurrentReadingProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative isolate flex h-fit w-fit justify-center place-self-center',
        containerClassName
      )}
    >
      <PerspectiveBook
        className="shadow-pegboard t-ease-in-out-circ bg-white bg-[url('/cover.webp')] bg-cover bg-[position:0%_100%] transition-shadow hover:shadow-lg/25"
        textured
        withHoverEffect
      >
        <span className="sr-only">Currently reading: {title}</span>
      </PerspectiveBook>
      <Hook
        variant="2"
        className="-bottom-4 left-[calc(50%-70px)] z-1 group-hover:-z-1"
      />
      <Hook
        variant="2"
        className="right-[calc(50%-80px)] -bottom-4 z-1 group-hover:-z-1"
      />
    </Link>
  );
}
