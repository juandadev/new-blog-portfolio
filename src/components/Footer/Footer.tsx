import React from 'react';
import Link from 'next/link';
import { SOCIAL_MEDIA_LINKS } from '@/lib/constants';

export default function Footer() {
  const renderSocialMediaLinks = () => {
    return SOCIAL_MEDIA_LINKS.map(({ href, label, icon }) => (
      <Link
        key={href}
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
