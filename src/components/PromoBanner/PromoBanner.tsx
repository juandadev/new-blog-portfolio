'use client';

import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/ui/Link';
import { cn } from '@/lib/utils';
import { PromoBanner as PromoBannerType, BannerVariant } from '@/types/banner';
import { getPromoBanner } from '@/services/banner-client';

const variantStyles: Record<BannerVariant, string> = {
  [BannerVariant.DEFAULT]: 'bg-muted/50 border-muted-foreground/20',
  [BannerVariant.INFO]: 'bg-blue-950 border-blue-500/30',
  [BannerVariant.SUCCESS]: 'bg-green-950 border-green-500/30',
  [BannerVariant.WARNING]: 'bg-yellow-950 border-yellow-500/30',
  [BannerVariant.PROMO]: 'border-primary/30 bg-fuchsia-950',
};

export function PromoBanner() {
  const [banner, setBanner] = useState<PromoBannerType | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPromoBanner()
      .then(({ data }) => {
        setBanner(data ?? null);
      })
      .catch((error) => {
        console.error('Failed to fetch banner:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !banner || isDismissed) {
    return null;
  }

  // Dynamic icon rendering
  const IconComponent: React.ComponentType<{ className?: string }> | null =
    banner.icon
      ? ((
          LucideIcons as unknown as Record<
            string,
            React.ComponentType<{ className?: string }>
          >
        )[banner.icon] ?? null)
      : null;

  return (
    <div
      className={cn(
        'fixed right-0 left-0 z-10 mx-auto w-fit rounded-lg border p-4',
        variantStyles[banner.variant]
      )}
    >
      <div className="flex items-start gap-3">
        {IconComponent && !banner.imageUrl && (
          <div className="bg-primary/20 rounded-md p-2">
            <IconComponent className="text-primary h-5 w-5" />
          </div>
        )}
        {banner.imageUrl && (
          <div className="flex-shrink-0">
            <Image
              src={banner.imageUrl}
              alt={banner.title}
              width={64}
              height={64}
              className="h-16 w-16 rounded-md object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="flex-1 space-y-1">
          <h3 className="text-foreground font-semibold">{banner.title}</h3>
          <p className="text-muted-foreground text-sm">{banner.text}</p>
          {banner.linkUrl && banner.linkText && (
            <Link
              href={banner.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              {banner.linkText}
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
