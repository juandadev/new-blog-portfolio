'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { FilePlus2Icon } from 'lucide-react';
import { getVaultProjects } from '@/services/vault-client';
import { VaultProject } from '@/types/vault';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import { PaginationParams, PaginatedResponse } from '@/types/pagination';
import ProjectsTable from './ProjectsTable';

export default function VaultProjectsPage() {
  const [projects, setProjects] = useState<PaginatedResponse<VaultProject>>({
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

    getVaultProjects(paginationParams)
      .then(({ data }) => setProjects(data!))
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
    getVaultProjects(paginationParams)
      .then(({ data }) => setProjects(data!))
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardPageLayout
      title="Vault Projects"
      description="Manage your Figma design projects in The Vault"
    >
      <Card>
        <DashboardCardHeader
          title="Projects"
          description="All Figma projects in The Vault"
          action={{
            label: 'Add Project',
            url: '/dashboard/vault/projects/new',
            icon: FilePlus2Icon,
          }}
        />
        <CardContent>
          <ProjectsTable
            projects={projects}
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
