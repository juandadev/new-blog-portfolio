import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { ExternalLinkIcon } from 'lucide-react';

interface StickerLabelProps {
  className?: string;
  position?: string;
  children?: React.ReactNode;
}

export default function StickerLabel({
  className,
  position,
  children,
}: StickerLabelProps) {
  return (
    <Card
      className={cn(
        className,
        'font-script absolute h-fit w-fit p-3 px-4 pb-2',
        position || 'right-0 bottom-0'
      )}
    >
      <CardContent className="font-script text-muted-foreground [&_span]:text-foreground flex items-center gap-2 text-2xl [&_a]:underline [&_a]:hover:underline [&_a]:lg:no-underline">
        {children} <ExternalLinkIcon size={16} />
      </CardContent>
    </Card>
  );
}
