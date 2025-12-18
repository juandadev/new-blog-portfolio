import React from 'react';
import { Callout } from '@/components/ui/Callout';
import Link from '@/components/ui/Link';
import { Typography } from '@/components/Typography/Typography';

export default function SuccessLayout() {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight text-balance">
        Subscription confirmed!
      </h1>
      <Callout variant="success" className="gap-4">
        <Typography>
          Thanks for confirming your email address. From now on, you’ll receive
          my articles, experiences, and updates directly in your inbox.
        </Typography>
        <Typography>
          You can unsubscribe at any time. No spam, I promise 🙂
        </Typography>
      </Callout>
      <Link href="/blog" className="hyperlink">
        View recent articles
      </Link>
    </div>
  );
}
