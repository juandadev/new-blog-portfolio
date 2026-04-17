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
        <Card
          key={`social-${href}`}
          className="select-nonet-ease-in-out-quint h-fit items-center justify-center transition-transform hover:scale-105"
        >
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit items-center gap-4"
          >
            {icon()}
            <span className="font-script text-muted-foreground text-xl underline group-hover:underline group-hover:opacity-80 lg:no-underline">
              {label}
            </span>
          </Link>
        </Card>
      ))}
    </div>
  );
}
