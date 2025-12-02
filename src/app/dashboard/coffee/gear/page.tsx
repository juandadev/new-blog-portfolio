'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { FilePlus2Icon } from 'lucide-react';
import { getCoffeeGear } from '@/services/coffee-client';
import { CoffeeGear } from '@/types/coffee';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import { PaginationParams } from '@/types/pagination';
import { PaginatedResponse } from '@/types/pagination';
import GearTable from './GearTable';

export default function GearManagerPage() {
  const [gear, setGear] = useState<PaginatedResponse<CoffeeGear>>({
    items: [],
    pagination: {
      page: 0,
      pageSize: 0,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    setIsLoading(true);

    getCoffeeGear(paginationParams)
      .then(({ data }) => setGear(data!))
      .finally(() => setIsLoading(false));
  }, [paginationParams]);

  const handlePageChange = (page: number) => {
    setPaginationParams((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPaginationParams({ page: 1, pageSize });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    getCoffeeGear(paginationParams)
      .then(({ data }) => setGear(data!))
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardPageLayout
      title="Gear Management"
      description="Manage your coffee gear collection"
    >
      <Card>
        <DashboardCardHeader
          title="Coffee Gear"
          description="Manage all your coffee gear from one place"
          action={{
            label: 'Add Gear',
            url: '/dashboard/coffee/gear/new',
            icon: FilePlus2Icon,
          }}
        />
        <CardContent>
          <GearTable
            gear={gear}
            isLoading={isLoading}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onRefresh={handleRefresh}
          />
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
}
