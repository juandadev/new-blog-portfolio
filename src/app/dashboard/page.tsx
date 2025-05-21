'use client';

import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import useLoginRedirection from '@/hooks/useLoginRedirection';
import { useSession } from 'next-auth/react';
import GenericLoadingSkeleton from '@/components/ui/GenericLoadingSkeleton';

export default function DashboardPage() {
  useLoginRedirection();
  const { status } = useSession();

  if (status === 'loading' || status === 'unauthenticated') {
    return <GenericLoadingSkeleton />;
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
