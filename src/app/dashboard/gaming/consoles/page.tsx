'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus } from 'lucide-react';
import { getConsoles } from '@/services/gaming-client';
import { Console } from '@/types/gaming';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import ConsolesTable from './ConsolesTable';

export default function ConsolesPage() {
  const [consoles, setConsoles] = useState<Console[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getConsoles()
      .then(({ data }) => setConsoles(data || []))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    getConsoles()
      .then(({ data }) => setConsoles(data || []))
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardPageLayout
      title="Consoles Management"
      description="Manage your gaming consoles"
    >
      <Card>
        <DashboardCardHeader
          title="Consoles"
          description="Manage all your gaming consoles"
          action={{
            label: 'Add Console',
            url: '/dashboard/gaming/consoles/new',
            icon: Plus,
          }}
        />
        <CardContent>
          <ConsolesTable
            consoles={consoles}
            isLoading={isLoading}
            onRefresh={handleRefresh}
          />
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
}
