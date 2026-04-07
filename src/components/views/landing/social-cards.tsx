import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { SOCIAL_MEDIA_LINKS } from '@/constants/ui';

interface SocialCardsProps {
  containerClassName?: string;
}

export default function SocialCards({ containerClassName }: SocialCardsProps) {
  return (
    <div className={cn(containerClassName, 'grid grid-cols-1 gap-2')}>
      {SOCIAL_MEDIA_LINKS.map(({ href, label, icon }) => (
        <Card key={`social-${label}`} className="justify-center">
          <div className="flex items-center gap-2">
            {icon()}
            {label}
          </div>
        </Card>
      ))}
    </div>
  );
}
