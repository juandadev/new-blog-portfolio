'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import {
  GetSubscribersResponse,
  SubscriberStatsResponse,
} from '@/types/subscriber';
import {
  getSubscribers,
  getSubscriberStats,
} from '@/services/subscriber-client';
import SubscribersStats from '@/app/dashboard/subscribers/SubscribersStats';
import SubscribersTable from '@/app/dashboard/subscribers/SubscribersTable';
import SubscribersActions from '@/app/dashboard/subscribers/SubscribersActions';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import { PaginationParams } from '@/types/pagination';
import { SubscriberFilterParams } from '@/types/filtering';

export default function SubscribersManagerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [stats, setStats] = useState<SubscriberStatsResponse>({
    totalSubscribers: 0,
    totalActive: 0,
    totalUnsubscribed: 0,
  });
  const [subscribers, setSubscribers] = useState<GetSubscribersResponse>({
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
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [verifiedFilter, setVerifiedFilter] = useState<string>('all');
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    setIsStatsLoading(true);
    getSubscriberStats()
      .then(({ data }) => {
        if (data) {
          setStats(data);
        }
      })
      .finally(() => setIsStatsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const filterParams: SubscriberFilterParams = {
      search: searchTerm || undefined,
      status: statusFilter as 'SUBSCRIBED' | 'UNSUBSCRIBED' | 'all',
      verified: verifiedFilter as 'verified' | 'unverified' | 'all',
    };

    getSubscribers(paginationParams, filterParams)
      .then(({ data }) => setSubscribers(data!))
      .finally(() => setIsLoading(false));
  }, [paginationParams, searchTerm, statusFilter, verifiedFilter]);

  const handlePageChange = (page: number) => {
    setPaginationParams((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPaginationParams({ page: 1, pageSize });
  };

  const handleFilterChange = () => {
    setPaginationParams((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    handleFilterChange();
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    handleFilterChange();
  };

  const handleVerifiedFilterChange = (value: string) => {
    setVerifiedFilter(value);
    handleFilterChange();
  };

  const handleRefresh = () => {
    setIsLoading(true);

    const filterParams: SubscriberFilterParams = {
      search: searchTerm || undefined,
      status: statusFilter as 'SUBSCRIBED' | 'UNSUBSCRIBED' | 'all',
      verified: verifiedFilter as 'verified' | 'unverified' | 'all',
    };

    getSubscribers(paginationParams, filterParams)
      .then(({ data }) => setSubscribers(data!))
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardPageLayout
      title="Newsletter Subscribers"
      description="Manage your newsletter subscribers and their preferences"
    >
      <SubscribersStats stats={stats} isLoading={isStatsLoading} />
      <div>
        <Card>
          <DashboardCardHeader
            title="Subscribers Management"
            description="View and manage all newsletter subscribers"
          />
          <CardContent>
            <SubscribersActions
              searchTerm={searchTerm}
              setSearchTerm={handleSearchChange}
              statusFilter={statusFilter}
              setStatusFilter={handleStatusFilterChange}
              verifiedFilter={verifiedFilter}
              setVerifiedFilter={handleVerifiedFilterChange}
            />
            <SubscribersTable
              subscribers={subscribers}
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
