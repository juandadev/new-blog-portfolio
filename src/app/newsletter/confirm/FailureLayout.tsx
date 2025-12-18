import React from 'react';
import { Typography } from '@/components/Typography/Typography';
import { Callout } from '@/components/ui/Callout';
import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';

export default function FailureLayout() {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight text-balance">
        Invalid or Expired Token
      </h1>
      <Callout variant="error" className="flex flex-col gap-4">
        <Typography>
          It looks like the link you used is no longer valid or has expired.
          Please try subscribing again, or check whether you’ve already
          confirmed your email previously.
        </Typography>
        <Button asChild>
          <Link href="/newsletter">Retry</Link>
        </Button>
      </Callout>
      <Link href="/" className="hyperlink">
        Back to home
      </Link>
    </div>
  );
}
