import React from 'react';
import SocialMediaContainer from '@/components/SocialMediaContainer/SocialMediaContainer';
import Link from '@/components/ui/Link';

export default function SocialFooter() {
  return (
    <div className="space-y-4">
      <div className="from-primary/50 via-accent/50 h-px bg-gradient-to-r to-transparent" />
      <SocialMediaContainer compact />
      <div className="text-muted-foreground font-mono text-xs">
        <p>currently_building:</p>
        <Link
          className="text-primary mt-1"
          href="https://pokemonstats.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          pokemonstats.com
        </Link>
      </div>
    </div>
  );
}
