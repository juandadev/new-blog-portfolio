import React from 'react';
import TwitterIcon from '@/icons/TwitterIcon';
import GitHubIcon from '@/icons/GitHubIcon';
import LinkedinIcon from '@/icons/LinkedinIcon';
import FrontendMentorIcon from '@/icons/FrontendMentorIcon';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className={'border-border mx-400 flex justify-between border-t py-200'}
    >
      <div>Made with ❤️ and ☕️</div>
      <div className={'flex items-center gap-200'}>
        <Link
          href={'https://x.com/juandadotdev'}
          target={'_blank'}
          rel={'noopener noreferrer'}
          aria-label={'Twitter'}
        >
          <TwitterIcon size={16} className={'text-foreground'} />
        </Link>
        <Link
          href={'https://github.com/juandadev'}
          target={'_blank'}
          rel={'noopener noreferrer'}
          aria-label={'Github'}
        >
          <GitHubIcon size={16} className={'text-foreground'} />
        </Link>
        <Link
          href={'https://www.linkedin.com/in/juandadev/'}
          target={'_blank'}
          rel={'noopener noreferrer'}
          aria-label={'Linkedin'}
        >
          <LinkedinIcon size={16} className={'text-foreground'} />
        </Link>
        <Link
          href={'https://www.frontendmentor.io/profile/juandadev'}
          target={'_blank'}
          rel={'noopener noreferrer'}
          aria-label={'Frontend Mentor'}
        >
          <FrontendMentorIcon size={16} className={'text-foreground'} />
        </Link>
      </div>
    </footer>
  );
}
