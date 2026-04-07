import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { SOCIAL_MEDIA_LINKS } from '@/constants/ui';
import Link from 'next/link';

interface SocialCardsProps {
  containerClassName?: string;
}

export default function SocialCards({ containerClassName }: SocialCardsProps) {
  return (
    <div className={cn(containerClassName, 'grid grid-cols-1 gap-2')}>
      {SOCIAL_MEDIA_LINKS.map(({ href, label, icon }) => (
        <Link
          key={`social-${href}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="h-fit"
        >
          <Card key={`social-${label}`} className="justify-center select-none">
            <div className="flex items-center gap-4">
              {icon()}
              <span className="font-script text-muted-foreground text-3xl">
                {label}
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
