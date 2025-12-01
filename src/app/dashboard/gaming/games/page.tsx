'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { FilePlus2Icon } from 'lucide-react';
import { getGames } from '@/services/gaming-client';
import { Game } from '@/types/gaming';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import { PaginationParams } from '@/types/pagination';
import { PaginatedResponse } from '@/types/pagination';
import GamesTable from './GamesTable';
import GamesStats from './GamesStats';

export default function GamesManagerPage() {
  const [games, setGames] = useState<PaginatedResponse<Game>>({
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

    getGames(paginationParams)
      .then(({ data }) => setGames(data!))
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
    getGames(paginationParams)
      .then(({ data }) => setGames(data!))
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardPageLayout
      title="Games Management"
      description="Manage your games collection"
    >
      <GamesStats games={games.items} isLoading={isLoading} />
      <div>
        <Card>
          <DashboardCardHeader
            title="Games Management"
            description="Manage all your games from one place"
            actionLabel="Create Game"
            actionHref="/dashboard/gaming/games/new"
            actionIcon={FilePlus2Icon}
          />
          <CardContent>
            <GamesTable
              games={games}
              isLoading={isLoading}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onRefresh={handleRefresh}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
