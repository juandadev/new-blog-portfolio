'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationMeta } from '@/types/pagination';

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  pagination,
  onPageChange,
  className,
}: PaginationProps) {
  const { page, totalPages, hasNextPage, hasPreviousPage } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 7;
    const sidePages = 2;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= sidePages + 2) {
        for (let i = 1; i <= sidePages + 3; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (page >= totalPages - sidePages - 1) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - sidePages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = page - sidePages; i <= page + sidePages; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className={cn(
        'flex items-center justify-center gap-1 font-mono',
        className
      )}
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPreviousPage}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </Button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="text-muted-foreground px-2 py-1"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          return (
            <Button
              key={pageNum}
              variant={pageNum === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={pageNum === page ? 'page' : undefined}
            >
              {pageNum.toString().padStart(2, '0')}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        aria-label="Next page"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
}
