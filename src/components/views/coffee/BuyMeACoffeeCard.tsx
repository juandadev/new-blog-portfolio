import React from 'react';
import { Coffee } from 'lucide-react';
import Link from 'next/link';
import { BUY_ME_A_COFFEE_LINK } from '@/constants/ui';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from '@/components/ui/Card';

export function BuyMeACoffeeCard() {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <p className="text-card-foreground">
          Buy Me a <span className="text-primary">Coffee</span>
        </p>
      </CardHeader>
      <CardContent>
        Yes, I have a semi-pro espresso setup at home. Yes, I&apos;m still
        asking you to buy me a coffee. The audacity, I know. But hey, those
        beans aren&apos;t gonna fund themselves, and my upgrade fund isn&apos;t
        growing on its own 😛
      </CardContent>
      <CardAction>
        <Link
          href={BUY_ME_A_COFFEE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm font-medium transition-colors"
        >
          <Coffee className="size-4" />
          Fund my addiction
        </Link>
      </CardAction>
    </Card>
  );
}
