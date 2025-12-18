import React from 'react';
import { SubscriberStatsResponse } from '@/types/subscriber';
import { UsersIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { DashboardStatsCard } from '@/components/dashboard/DashboardStatsCard';

interface SubscribersStatsProps {
  stats: SubscriberStatsResponse;
  isLoading: boolean;
}

export default function SubscribersStats({
  stats,
  isLoading,
}: SubscribersStatsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      <DashboardStatsCard
        title="Total Subscribers"
        value={stats.totalSubscribers}
        description="All subscribers"
        icon={UsersIcon}
        isLoading={isLoading}
      />
      <DashboardStatsCard
        title="Active Subscribers"
        value={stats.totalActive}
        description="Subscribed and verified"
        icon={CheckCircleIcon}
        isLoading={isLoading}
      />
      <DashboardStatsCard
        title="Unsubscribed"
        value={stats.totalUnsubscribed}
        description="No longer receiving emails"
        icon={XCircleIcon}
        isLoading={isLoading}
      />
    </div>
  );
}
