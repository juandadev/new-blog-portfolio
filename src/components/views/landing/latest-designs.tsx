import React from 'react';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

interface LatestDesignsProps {
  containerClassName?: string;
}

export default function LatestDesigns({
  containerClassName,
}: LatestDesignsProps) {
  return (
    <Card className={cn(containerClassName)}>
      <Hook />
      <CardHeader>Latest Designs</CardHeader>
      <CardContent className="space-y-2">
        <p>bar</p>
      </CardContent>
    </Card>
  );
}
