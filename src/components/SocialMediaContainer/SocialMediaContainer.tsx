import React from 'react';
import { SOCIAL_MEDIA_LINKS } from '@/constants/ui';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import AnimatedContent from '@/components/animations/AnimatedContent';
import { cn } from '@/lib/utils';

interface SocialMediaContainerProps {
  animated?: boolean;
  compact?: boolean;
}

export default function SocialMediaContainer({
  animated = false,
  compact = false,
}: SocialMediaContainerProps) {
  const renderSocialMediaLinks = () => {
    return SOCIAL_MEDIA_LINKS.map(({ href, label, icon }, index) => (
      <AnimatedContent
        key={href}
        enabled={animated}
        distance={100}
        direction="horizontal"
        duration={1.2}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1.1}
        threshold={0.1}
        delay={0.3 * (index + 1)}
      >
        <Button variant={compact ? 'ghost' : 'secondary'} size="icon" asChild>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            {icon()}
          </Link>
        </Button>
      </AnimatedContent>
    ));
  };

  return (
    <div className={cn('flex', compact ? 'gap-2' : 'gap-3')}>
      {renderSocialMediaLinks()}
    </div>
  );
}
