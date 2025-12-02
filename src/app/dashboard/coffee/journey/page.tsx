'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus } from 'lucide-react';
import { getCoffeeJourney } from '@/services/coffee-client';
import { CoffeeJourneyMilestone } from '@/types/coffee';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import JourneyTable from './JourneyTable';

export default function JourneyManagerPage() {
  const [milestones, setMilestones] = useState<CoffeeJourneyMilestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCoffeeJourney()
      .then(({ data }) => setMilestones(data || []))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    getCoffeeJourney()
      .then(({ data }) => setMilestones(data || []))
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardPageLayout
      title="Journey Management"
      description="Manage your coffee journey milestones"
    >
      <Card>
        <DashboardCardHeader
          title="Coffee Journey"
          description="Manage all your coffee journey milestones"
          action={{
            label: 'Add Milestone',
            url: '/dashboard/coffee/journey/new',
            icon: Plus,
          }}
        />
        <CardContent>
          <JourneyTable
            milestones={milestones}
            isLoading={isLoading}
            onRefresh={handleRefresh}
          />
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
}
