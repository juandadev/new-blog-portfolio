import React from 'react';
import type { PCPart } from '@/types/gaming';
import { Monitor } from 'lucide-react';

interface PCBuildSectionProps {
  parts: PCPart[];
  story: string;
}

export function PCBuildSection({ parts, story }: PCBuildSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Monitor className="text-primary h-5 w-5" />
        <h2 className="text-foreground text-xl font-bold">PC Build</h2>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{story}</p>
      <div className="border-border bg-card overflow-hidden rounded-lg border">
        <div className="divide-border divide-y">
          {parts.map((part, index) => (
            <div
              key={`${part.component}-${index}`}
              className="hover:bg-muted/30 flex items-start gap-4 p-2 transition-colors"
            >
              <div className="w-20 shrink-0">
                <span className="text-primary font-mono text-xs tracking-wider uppercase">
                  {part.component}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm font-medium">
                  {part.name}
                </p>
                {part.notes && (
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {part.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
