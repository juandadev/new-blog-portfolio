import React from 'react';
import { Coffee } from 'lucide-react';
import Link from 'next/link';
import { BUY_ME_A_COFFEE_LINK } from '@/constants/ui';

export function BuyMeACoffeeCard() {
  return (
    <div className="border-primary/30 bg-primary/5 relative overflow-hidden rounded-lg border p-6">
      <div className="text-primary/10 absolute -top-4 -right-4">
        <Coffee className="h-24 w-24" />
      </div>
      <div className="relative space-y-4">
        <div className="space-y-2">
          <h3 className="font-script text-4xl font-bold">
            Buy Me a <span className="text-primary">Coffee</span>
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Yes, I have a semi-pro espresso setup at home. Yes, I&apos;m still
            asking you to buy me a coffee. The audacity, I know. But hey, those
            beans aren&apos;t gonna fund themselves, and my upgrade fund
            isn&apos;t growing on its own 😛
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={BUY_ME_A_COFFEE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm font-medium transition-all hover:scale-105"
          >
            <Coffee className="h-4 w-4" />
            Fund my addiction
          </Link>
        </div>
        <p className="text-muted-foreground/80 font-mono text-xs">
          {'//'} Every coffee helps fuel late-night coding sessions
        </p>
      </div>
    </div>
  );
}
