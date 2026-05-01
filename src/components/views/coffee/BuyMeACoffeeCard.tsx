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
import { Button } from '@/components/ui/Button';

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
        <Button asChild>
          <Link
            href={BUY_ME_A_COFFEE_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Coffee className="size-4" />
            Fund my addiction
          </Link>
        </Button>
      </CardAction>
    </Card>
  );
}
