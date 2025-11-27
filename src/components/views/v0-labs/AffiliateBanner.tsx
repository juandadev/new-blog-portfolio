import React from 'react';
import { ExternalLink, Info, Sparkles } from 'lucide-react';
import Link from '@/components/ui/Link';
import { V0_LINK } from '@/constants/ui';

export default function AffiliateBanner() {
  return (
    <div className="border-primary/30 from-primary/10 via-accent/10 to-primary/10 relative overflow-hidden rounded-lg border bg-gradient-to-r p-6">
      <div className="bg-primary/10 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl" />
      <div className="bg-accent/10 absolute bottom-0 left-0 h-24 w-24 rounded-full blur-2xl" />

      <div className="relative space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/20 rounded-md p-2">
            <Sparkles className="text-primary h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-foreground text-lg font-semibold">
              Try v0 yourself
            </h3>
            <p className="text-muted-foreground text-sm">
              Build UIs faster with AI. I use v0 daily to prototype ideas and
              ship experiments.
            </p>
          </div>
        </div>

        <Link
          href={V0_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Get started with v0
          <ExternalLink className="h-4 w-4" />
        </Link>

        <div className="border-border/50 flex items-start gap-2 border-t pt-2">
          <Info className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-muted-foreground text-xs leading-relaxed">
            This is an affiliate link. If you sign up through this link, I may
            receive a commission at no extra cost to you. Full transparency, no
            tricks.
          </p>
        </div>
      </div>
    </div>
  );
}
