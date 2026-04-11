import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import Link from 'next/link';

interface PresentationCardProps {
  containerClassName?: string;
}

export default function PresentationCard({
  containerClassName,
}: PresentationCardProps) {
  return (
    <Card className={cn('', containerClassName)}>
      <Hook />
      <CardHeader>Hello stranger 👋🏻 I&apos;m Juan</CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong className="text-primary">Software Engineer</strong> and{' '}
          <strong className="text-accent underline">
            <Link href="/vault">Aspiring Designer</Link>
          </strong>{' '}
          based in Guadalajara 🇲🇽
        </p>
        <p>
          Always believed that the web should be beautiful, so I spend my time
          turning Figma dreams into flawless code.
        </p>
        <p>
          I also host events regularly in my city to boost the local AI
          community 🫰🏻
        </p>
      </CardContent>
    </Card>
  );
}
