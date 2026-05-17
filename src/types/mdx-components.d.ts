import type PolaroidComponent from '@/components/Polaroid/polaroid';
import type { PolaroidFooter as PolaroidFooterComponent } from '@/components/Polaroid/polaroid';
import type { Callout as CalloutComponent } from '@/components/ui/Callout';

declare global {
  const Callout: typeof CalloutComponent;
  const Polaroid: typeof PolaroidComponent;
  const PolaroidFooter: typeof PolaroidFooterComponent;
}

export {};
