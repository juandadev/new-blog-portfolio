'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus } from 'lucide-react';
import { GetToolsResponse } from '@/types/tool';
import { getTools } from '@/services/tool-client';
import ToolsStats from '@/app/dashboard/tools/ToolsStats';
import ToolsTable from '@/app/dashboard/tools/ToolsTable';
import ToolsActions from '@/app/dashboard/tools/ToolsActions';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import { PaginationParams } from '@/types/pagination';

export default function ToolsManagerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [tools, setTools] = useState<GetToolsResponse>({
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
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    pageSize: 5,
  });

  useEffect(() => {
    setIsLoading(true);

    getTools(paginationParams)
      .then(({ data }) => setTools(data!))
      .finally(() => setIsLoading(false));
  }, [paginationParams]);

  const filteredTools = tools.items.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || tool.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handlePageChange = (page: number) => {
    setPaginationParams((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPaginationParams({ page: 1, pageSize });
  };

  return (
    <DashboardPageLayout
      title="v0 Labs"
      description="Manage the tools you have developed with v0"
    >
      <ToolsStats tools={tools.items} isLoading={isLoading} />
      <div>
        <Card>
          <DashboardCardHeader
            title="Tools Management"
            description="Manage all the tools you have developed"
            actionLabel="New Tool"
            actionHref="/dashboard/tools/new"
            actionIcon={Plus}
          />
          <CardContent>
            <ToolsActions
              tools={tools.items}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <ToolsTable
              tools={{
                items: filteredTools,
                pagination: tools.pagination,
              }}
              isLoading={isLoading}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
