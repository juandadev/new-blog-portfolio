import React from 'react';
import { TableCell, TableRow } from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';

const SuspenseRow = () => (
  <TableRow>
    <TableCell className={'p-4 align-middle'}>
      <div className={'flex w-[480px] flex-col gap-1'}>
        <Skeleton className={'h-[40px] w-[448px]'} />
        <Skeleton className={'h-[20px] w-[448px]'} />
        <div className={'flex gap-1'}>
          <Skeleton className={'h-[22px] w-[55px]'} />
          <Skeleton className={'h-[22px] w-[62px]'} />
          <Skeleton className={'h-[22px] w-[97px]'} />
        </div>
      </div>
    </TableCell>
    <TableCell className={'p-4 align-middle'}>
      <Skeleton className={'h-[22px] w-[88px]'} />
    </TableCell>
    <TableCell className={'p-4 align-middle'}>
      <div className={'flex items-center gap-1'}>
        <Skeleton className={'h-[16px] w-[16px]'} />
        <Skeleton className={'h-[18px] w-[12px]'} />
      </div>
    </TableCell>
    <TableCell className={'p-4 align-middle'}>
      <div className={'flex w-[82px] flex-col gap-1'}>
        <Skeleton className={'h-[40px] w-[82px]'} />
        <Skeleton className={'h-[40px] w-[82px]'} />
      </div>
    </TableCell>
    <TableCell className={'p-4 align-middle'}>
      <Skeleton className={'h-[40px] w-[40px]'} />
    </TableCell>
  </TableRow>
);

export default function PostRowSuspense() {
  return [...Array(5)].map((_, index) => (
    <SuspenseRow key={`suspense-row-${index}`} />
  ));
}
