import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { PaginationMeta } from '@/types/pagination';
import { DashboardTablePagination } from './DashboardTablePagination';

export interface DashboardTableColumn<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

interface DashboardTableProps<T> {
  data: T[];
  columns: DashboardTableColumn<T>[];
  isLoading?: boolean;
  getRowKey: (item: T) => string | number;
  actions?: (item: T) => React.ReactNode;
  skeletonRows?: number;
  pagination?: PaginationMeta;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

function DashboardTableSkeleton<T>({
  columns,
  actions,
  rows = 5,
}: {
  columns: DashboardTableColumn<T>[];
  actions?: boolean;
  rows?: number;
}) {
  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => (
        <TableRow key={`skeleton-row-${rowIndex}`}>
          {columns.map((column) => (
            <TableCell
              key={`skeleton-${column.key}-${rowIndex}`}
              className="p-4 align-middle"
            >
              <Skeleton className="h-5 w-full" />
            </TableCell>
          ))}
          {actions && (
            <TableCell className="p-4 align-middle">
              <Skeleton className="h-10 w-10" />
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  );
}

export function DashboardTable<T>({
  data,
  columns,
  isLoading = false,
  getRowKey,
  actions,
  skeletonRows = 5,
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
}: DashboardTableProps<T>) {
  const hasPagination = pagination && onPageChange && onPageSizeChange;

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  'text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium',
                  column.headerClassName
                )}
              >
                {column.label}
              </TableHead>
            ))}
            {actions && (
              <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium" />
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <DashboardTableSkeleton<T>
              columns={columns}
              actions={!!actions}
              rows={skeletonRows}
            />
          ) : (
            data.map((item) => (
              <TableRow key={getRowKey(item)}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={cn('p-4 align-middle', column.cellClassName)}
                  >
                    {column.render
                      ? column.render(item)
                      : // @ts-expect-error won't cast this 💀
                        item[column.key]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="p-4 align-middle">
                    {actions(item)}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
        {hasPagination && (
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className="p-0"
              >
                <DashboardTablePagination
                  pagination={pagination}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                  pageSizeOptions={pageSizeOptions}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
