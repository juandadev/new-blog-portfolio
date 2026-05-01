import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLinkIcon } from 'lucide-react';

interface StickerLabelProps {
  className?: string;
  position?: string;
  children?: React.ReactNode;
  withIcon?: boolean;
}

export default function StickerLabel({
  className,
  position,
  children,
  withIcon = true,
}: StickerLabelProps) {
  return (
    <div
      className={cn(
        className,
        'pegboard-label',
        position || 'right-0 bottom-0'
      )}
    >
      <div className="font-script text-muted-foreground [&_span]:text-foreground flex items-center gap-2 text-xl [&_a]:underline [&_a]:group-hover:underline [&_a]:hover:underline [&_a]:lg:no-underline">
        {children} {withIcon && <ExternalLinkIcon size={16} />}
      </div>
    </div>
  );
}
