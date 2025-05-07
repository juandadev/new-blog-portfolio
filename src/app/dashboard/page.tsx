'use client';

import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import useLoginRedirection from '@/hooks/useLoginRedirection';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function DashboardPage() {
  useLoginRedirection();
  const { status } = useSession();

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className={'flex flex-col gap-2'}>
        <Skeleton className={'h-[48px] w-[165px] rounded-md'} />
        <Skeleton className={'h-[23px] w-[230px] rounded-md'} />
      </div>
    );
  }

  return (
    <div>
      <Heading level={1} preset={2}>
        Dashboard
      </Heading>
      <Typography>Welcome to the dashboard!</Typography>
    </div>
  );
}
