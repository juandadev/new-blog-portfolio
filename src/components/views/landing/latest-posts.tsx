import React from 'react';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

interface LatestPostsProps {
  containerClassName?: string;
}

export default function LatestPosts({ containerClassName }: LatestPostsProps) {
  return (
    <Card className={cn(containerClassName)}>
      <Hook />
      <CardHeader>Latest Posts</CardHeader>
      <CardContent className="space-y-2">
        <p>foo</p>
      </CardContent>
    </Card>
  );
}
