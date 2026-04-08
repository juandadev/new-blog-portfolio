import React from 'react';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

interface LatestPostProps {
  containerClassName?: string;
}

export default function LatestPost({ containerClassName }: LatestPostProps) {
  return (
    <Card className={cn(containerClassName)}>
      <Hook />
      <CardHeader>Latest Post</CardHeader>
      <CardContent className="space-y-2">
        <p>foo</p>
      </CardContent>
    </Card>
  );
}
