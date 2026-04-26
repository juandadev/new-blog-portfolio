import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SetupItem } from '@/data/setup-data';

interface SetupItemCardProps {
  item: SetupItem;
}

export function SetupItemCard({ item }: SetupItemCardProps) {
  const Wrapper = item.link ? 'a' : 'div';
  const wrapperProps = item.link
    ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group border-border bg-card/50 hover:bg-card hover:border-primary/30 block rounded-lg border p-4 transition-[background-color,border-color] duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-foreground group-hover:text-primary font-medium transition-colors">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
        {item.link && (
          <ExternalLink className="text-muted-foreground group-hover:text-primary mt-1 h-4 w-4 flex-shrink-0 transition-colors" />
        )}
      </div>
    </Wrapper>
  );
}
