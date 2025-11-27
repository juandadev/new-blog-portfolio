import React from 'react';
import { SOCIAL_MEDIA_LINKS } from '@/constants/ui';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import { cn } from '@/lib/utils';

interface SocialMediaContainerProps {
  compact?: boolean;
}

export default function SocialMediaContainer({
  compact = false,
}: SocialMediaContainerProps) {
  const renderSocialMediaLinks = () => {
    return SOCIAL_MEDIA_LINKS.map(({ href, label, icon }, index) => (
      <Button key={href} variant="ghost" size="icon" asChild>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          {icon()}
        </Link>
      </Button>
    ));
  };

  return (
    <div className={cn('flex', compact ? 'gap-2' : 'gap-3')}>
      {renderSocialMediaLinks()}
    </div>
  );
}
