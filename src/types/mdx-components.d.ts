import type PolaroidComponent from '@/components/Polaroid/polaroid';
import type { PolaroidFooter as PolaroidFooterComponent } from '@/components/Polaroid/polaroid';
import type FrameComponent from '@/components/Frame/frame';
import type { FrameFooter as FrameFooterComponent } from '@/components/Frame/frame';
import type { Callout as CalloutComponent } from '@/components/ui/Callout';

declare global {
  const Callout: typeof CalloutComponent;
  const Frame: typeof FrameComponent;
  const FrameFooter: typeof FrameFooterComponent;
  const Polaroid: typeof PolaroidComponent;
  const PolaroidFooter: typeof PolaroidFooterComponent;
}

export {};
