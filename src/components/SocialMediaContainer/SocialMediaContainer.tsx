import React from 'react';
import { SOCIAL_MEDIA_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SocialMediaContainer() {
  const renderSocialMediaLinks = () => {
    return SOCIAL_MEDIA_LINKS.map(({ href, label, icon }) => (
      <Button
        className={
          'border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900'
        }
        variant={'icon'}
        size={'icon'}
        key={href}
        asChild
      >
        <Link
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
