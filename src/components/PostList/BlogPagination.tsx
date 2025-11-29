'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/ui/Pagination';
import { PaginationMeta } from '@/types/pagination';

interface BlogPaginationProps {
  pagination: PaginationMeta;
}

export default function BlogPagination({ pagination }: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/blog?${params.toString()}`);
  };

  return <Pagination pagination={pagination} onPageChange={handlePageChange} />;
}

