import React from 'react';
import { TableHead, TableRow } from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';

const SuspenseRow = () => (
  <TableRow>
    <TableHead>
      <Skeleton className={'h-[40px] w-[448px]'} />
    </TableHead>
  </TableRow>
);

export default function PostRowSuspense() {
  return [...Array(5)].map((_, index) => (
    <SuspenseRow key={`suspense-row-${index}`} />
  ));
}
