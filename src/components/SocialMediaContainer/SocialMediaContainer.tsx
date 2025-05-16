import React from 'react';
import { SOCIAL_MEDIA_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';

export default function SocialMediaContainer() {
  const renderSocialMediaLinks = () => {
    return SOCIAL_MEDIA_LINKS.map(({ href, label, icon }) => (
      <Button
        className={
          'border-border bg-card hover:bg-accent border hover:border-neutral-300 dark:hover:border-neutral-800'
        }
        variant={'icon'}
        size={'icon'}
        key={href}
        asChild
      >
        <Link
          className={'rounded-10!'}
          href={href}
          target={'_blank'}
          rel={'noopener noreferrer'}
          aria-label={label}
        >
          {icon()}
        </Link>
      </Button>
    ));
  };

  return <div className={'flex gap-150'}>{renderSocialMediaLinks()}</div>;
}
