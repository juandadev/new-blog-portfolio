import React from 'react';
import { SOCIAL_MEDIA_LINKS } from '@/constants/ui';
import Link from '@/components/ui/Link';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const renderSocialMediaLinks = () => {
    return SOCIAL_MEDIA_LINKS.map(({ href, label, icon }) => (
      <Link
        key={href}
        className="rounded-xs hover:opacity-70"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        preventProgressBar
      >
        {icon()}
      </Link>
    ));
  };

  return (
    <footer className="border-border mt-24 border-t px-4 py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <div className="text-gradient mb-2 text-xl font-bold">
              Juan Daniel Martínez
            </div>
            <p className="text-muted-foreground text-sm leading-loose">
              Built with Next.js, Tailwind CSS and{' '}
              <Link
                href="https://reactbits.dev/"
                className="hyperlink"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Bits
              </Link>
              . Open source and made with 🩷
            </p>
          </div>

          <div className="flex items-center space-x-6">
            {renderSocialMediaLinks()}
          </div>
        </div>

        <div className="border-border mt-6 border-t pt-6">
          <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
            <div className="flex items-center space-x-6 text-sm">
              {/*<Link*/}
              {/*  href="/privacy"*/}
              {/*  className="text-muted-foreground hover:text-primary transition-colors"*/}
              {/*>*/}
              {/*  Privacy Policy*/}
              {/*</Link>*/}
              {/*<Link*/}
              {/*  href="/terms"*/}
              {/*  className="text-muted-foreground hover:text-primary transition-colors"*/}
              {/*>*/}
              {/*  Terms & Conditions*/}
              {/*</Link>*/}
              <Link
                href="/newsletter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Newsletter
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              © {currentYear} Juan Daniel Martínez. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
