import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface PresentationCardProps {
  containerClassName?: string;
}

export default function PresentationCard({
  containerClassName,
}: PresentationCardProps) {
  return (
    <Card className={cn('', containerClassName)}>
      <CardHeader>Hello stranger 👋🏻 I&apos;m Juan </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong className="text-primary">Software Engineer</strong> and{' '}
          <strong className="text-accent">Aspiring Designer</strong> based in
          Guadalajara
        </p>
        <p>
          I always believed that the web should be beautiful, so I spend my time
          turning Figma dreams into flawless code.
        </p>
      </CardContent>
    </Card>
  );
}
