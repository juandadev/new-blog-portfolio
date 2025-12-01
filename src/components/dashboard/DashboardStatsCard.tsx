import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { LucideIcon } from 'lucide-react';

interface DashboardStatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  isLoading?: boolean;
}

export function DashboardStatsCard({
  title,
  value,
  description,
  icon: Icon,
  isLoading = false,
}: DashboardStatsCardProps) {
  return (
    <Card className="gap-1">
      <CardHeader className="gap-0">
        <CardTitle className="flex justify-between font-sans text-sm font-medium">
          {title}
          {Icon && <Icon size={16} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <span className="text-2xl font-medium">{value}</span>
        )}
        {description &&
          (isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <span className="text-muted-foreground font-sans text-sm">
              {description}
            </span>
          ))}
      </CardContent>
    </Card>
  );
}
