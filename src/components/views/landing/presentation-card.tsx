import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';

interface PresentationCardProps {
  containerClassName?: string;
}

export default function PresentationCard({
  containerClassName,
}: PresentationCardProps) {
  return (
    <div className={cn('relative isolate', containerClassName)}>
      <Hook />
      <Card className="card-animate">
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
            <strong className="text-primary">Bilingual Design Engineer</strong>{' '}
            based in <strong>Guadalajara, Mexico</strong>.
          </p>
          <p>
            I always believed the web should feel clear, useful, and beautiful,
            so I spend my time turning thoughtful product ideas into fast,
            accessible interfaces.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
