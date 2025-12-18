import React from 'react';
import { GetSubscribersResponse } from '@/types/subscriber';
import { UsersIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { DashboardStatsCard } from '@/components/dashboard/DashboardStatsCard';

interface SubscribersStatsProps {
  subscribers: GetSubscribersResponse;
  isLoading: boolean;
}

export default function SubscribersStats({
  subscribers,
  isLoading,
}: SubscribersStatsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      <DashboardStatsCard
        title="Total Subscribers"
        value={subscribers.totalSubscribers}
        description="All subscribers"
        icon={UsersIcon}
        isLoading={isLoading}
      />
      <DashboardStatsCard
        title="Active Subscribers"
        value={subscribers.totalActive}
        description="Subscribed and verified"
        icon={CheckCircleIcon}
        isLoading={isLoading}
      />
      <DashboardStatsCard
        title="Unsubscribed"
        value={subscribers.totalUnsubscribed}
        description="No longer receiving emails"
        icon={XCircleIcon}
        isLoading={isLoading}
      />
    </div>
  );
}
