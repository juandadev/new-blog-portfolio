'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { getVaultStory } from '@/services/vault-client';
import { VaultStory } from '@/types/vault';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import { VaultStoryForm } from './VaultStoryForm';

export default function VaultStoryPage() {
  const [story, setStory] = useState<VaultStory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getVaultStory()
      .then(({ data }) => setStory(data!))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <DashboardPageLayout
      title="Vault Story"
      description="Manage the intro story displayed on The Vault page"
    >
      <Card>
        <DashboardCardHeader
          title="Intro Story"
          description="The headline and introduction paragraph shown at the top of The Vault"
        />
        <CardContent>
          {isLoading ? (
            <div className="text-muted-foreground py-8 text-center">
              Loading...
            </div>
          ) : (
            <VaultStoryForm story={story} />
          )}
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
}
