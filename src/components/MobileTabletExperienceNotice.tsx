'use client';

import React, { useCallback, useState } from 'react';
import { Monitor, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MobileTabletExperienceNotice() {
  const [dismissed, setDismissed] = useState(false);

  const onDismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  if (dismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Desktop experience notice"
      className="border-border/80 from-muted/95 to-muted/80 text-foreground relative border-b bg-gradient-to-r px-4 py-3 text-sm shadow-sm lg:hidden"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDismiss}
        className="text-muted-foreground hover:text-foreground absolute end-2 top-6 size-11 -translate-y-1/2"
        aria-label="Dismiss desktop experience notice"
      >
        <X className="size-5" aria-hidden />
      </Button>
      <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
        <Monitor
          className="text-muted-foreground mx-auto size-5 shrink-0 sm:mx-0 sm:mt-0.5"
          aria-hidden
        />
        <div className="text-center sm:text-left">
          <p className="text-foreground font-medium">
            This site is designed for desktop
          </p>
          <p className="text-muted-foreground mt-1 leading-relaxed text-pretty">
            The mobile and tablet experience is still a work in progress. Touch
            interactions are not fully supported yet, and you might notice
            missing details or shifting layouts. Thanks for your patience, a
            polished experience across all devices is on the way.
          </p>
        </div>
      </div>
    </div>
  );
}
