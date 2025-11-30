import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

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
}

function DashboardTableSkeleton({
  columns,
  actions,
  rows = 5,
}: {
  columns: DashboardTableColumn<unknown>[];
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
}: DashboardTableProps<T>) {
  return (
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
          <DashboardTableSkeleton
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
                    : (item as Record<string, unknown>)[column.key]}
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
    </Table>
  );
}
