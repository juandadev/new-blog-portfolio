import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';

export default function DashboardPage() {
  return (
    <div>
      <Heading level={1} preset={2}>
        Dashboard
      </Heading>
      <Typography>Welcome to the dashboard!</Typography>
    </div>
  );
}
