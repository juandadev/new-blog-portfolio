import React from 'react';
import { SOCIAL_MEDIA_LINKS } from '@/lib/constants';
import Link from '@/components/ui/Link';

export default function Footer() {
  const renderSocialMediaLinks = () => {
    return SOCIAL_MEDIA_LINKS.map(({ href, label, icon }) => (
      <Link
        key={href}
        className={'rounded-xs hover:opacity-70'}
        href={href}
        target={'_blank'}
        rel={'noopener noreferrer'}
        aria-label={label}
      >
        {icon()}
      </Link>
    ));
  };

  return (
    <footer
      className={'border-border mx-400 flex justify-between border-t py-200'}
    >
      <div>Hecho con ❤️ y ☕️</div>
      <div className={'flex items-center gap-200'}>
        {renderSocialMediaLinks()}
      </div>
    </footer>
  );
}
