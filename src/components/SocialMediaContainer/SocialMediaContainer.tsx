import React from 'react';
import { SOCIAL_MEDIA_LINKS } from '@/constants/ui';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';

export default function SocialMediaContainer() {
  const renderSocialMediaLinks = () => {
    return SOCIAL_MEDIA_LINKS.map(({ href, label, icon }) => (
      <Button variant="secondary" size="icon" key={href} asChild>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          preventProgressBar
        >
          {icon()}
        </Link>
      </Button>
    ));
  };

  return <div className="flex gap-3">{renderSocialMediaLinks()}</div>;
}
