import React from 'react';
import Link from '@/components/ui/Link';
import { ArrowLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="relative mx-auto w-full max-w-[1440px]">
      <div className="grid grid-cols-1 gap-6 md:mx-auto md:max-w-[672px] md:grid-cols-1">
        <main
          className={cn(
            'bg-border text-card-foreground shadow-pegboard relative isolate flex flex-col items-center gap-6 rounded-xl p-6',
            'dotted-pattern-card before:bg-card before:absolute before:inset-0 before:-z-2 before:m-2 before:rounded-lg before:shadow-[0_0_4px_rgba(0,0,0,0.1)]'
          )}
        >
          <h2 className="font-script text-foreground text-7xl font-bold underline">
            404
          </h2>
          <h2 className="font-script text-foreground text-7xl font-medium">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved to another location.
          </p>
          <Link
            href="/"
            className="font-script text-primary hover:text-primary/80 flex items-center gap-2 text-3xl transition-colors"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Home
          </Link>
        </main>
      </div>
    </div>
  );
}
