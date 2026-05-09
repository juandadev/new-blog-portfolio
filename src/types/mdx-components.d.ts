import type PolaroidComponent from '@/components/Polaroid/polaroid';
import type { Callout as CalloutComponent } from '@/components/ui/Callout';

declare global {
  const Callout: typeof CalloutComponent;
  const Polaroid: typeof PolaroidComponent;
}

export {};
