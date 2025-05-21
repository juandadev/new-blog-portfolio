import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function GenericLoadingSkeleton() {
  return (
    <div className={'flex flex-col gap-2'}>
      <Skeleton className={'h-[48px] w-[300px] rounded-md'} />
      <Skeleton className={'h-[100px] w-full rounded-md'} />
    </div>
  );
}
