import React from 'react';
import Link from '@/components/ui/Link';
import { ArrowLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="max-w-app relative mx-auto w-full">
      <div className="md:max-w-reading grid grid-cols-1 gap-6 md:mx-auto md:grid-cols-1">
        <main className={cn('pegboard-panel items-center')}>
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
