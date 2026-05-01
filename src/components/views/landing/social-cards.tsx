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
          className="group t-ease-in-out-quint flex h-fit w-full items-center justify-center transition-transform select-none motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:scale-102"
          withHook={false}
          withAnimation={false}
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
