import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import { ArrowLeftIcon } from 'lucide-react';
import FuzzyText from '@/components/animations/FuzzyText';

export default function NotFound() {
  return (
    <div className="bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex w-full justify-center">
            <FuzzyText
              baseIntensity={0.2}
              enableHover
              fontSize="180px"
              color="lab(49.5493% 79.8381 2.31768)"
            >
              404
            </FuzzyText>
          </div>
          <div className="bg-primary mx-auto h-1 w-32" />
        </div>
        <div className="space-y-4">
          <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved to another location.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">View Projects</Link>
          </Button>
        </div>
        <div className="pt-12 opacity-50">
          <div className="flex justify-center gap-2">
            <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
            <div className="bg-primary h-2 w-2 animate-pulse rounded-full [animation-delay:200ms]" />
            <div className="bg-primary h-2 w-2 animate-pulse rounded-full [animation-delay:400ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}
