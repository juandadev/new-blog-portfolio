import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import Link from '@/components/ui/Link';

interface PresentationCardProps {
  containerClassName?: string;
}

export default function PresentationCard({
  containerClassName,
}: PresentationCardProps) {
  return (
    <Card className={cn(containerClassName)}>
      <CardHeader className="gap-2">
        <p className="font-script text-muted-foreground text-2xl">
          Hello stranger 👋🏻
        </p>
        <h1 className="text-foreground font-script text-3xl leading-none text-balance">
          I&apos;m Juan, a developer building polished React and Next.js
          experiences
        </h1>
      </CardHeader>
      <CardContent className="text-muted-foreground space-y-2">
        <p>
          <strong className="text-primary">Design Engineer</strong> based in{' '}
          <strong>Guadalajara, Mexico</strong>. Currently working full time{' '}
          <Link
            href="https://neumo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-base underline hover:underline md:no-underline"
          >
            @Neumo
          </Link>{' '}
          and leading a local{' '}
          <Link
            href="https://aivibegdl.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-base underline hover:underline md:no-underline"
          >
            AI community
          </Link>
          .
        </p>
        <p>
          Right now I&apos;m focused on growing my digital footprint by
          attending and hosting Ai & tech meetings, doing talks and contributing
          to open source.{' '}
          <Link
            href="/now"
            className="text-primary text-base underline hover:underline md:no-underline"
          >
            Learn more
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
