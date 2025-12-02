'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { getCoffeeStory, updateCoffeeStory } from '@/services/coffee-client';
import { CoffeeStory } from '@/types/coffee';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CoffeeStoryForm } from './CoffeeStoryForm';

export default function StoryManagerPage() {
  const [story, setStory] = useState<CoffeeStory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getCoffeeStory()
      .then(({ data }) => setStory(data!))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (data: {
    headline: string;
    intro: string;
    body: string;
  }) => {
    toast.promise(updateCoffeeStory(data), {
      loading: 'Saving...',
      success: ({ data }) => {
        setStory(data!);
        router.refresh();
        return {
          message: 'Story updated successfully',
        };
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  return (
    <DashboardPageLayout
      title="Story Management"
      description="Manage your coffee story"
    >
      <Card>
        <DashboardCardHeader
          title="Coffee Story"
          description="Update your coffee story headline, intro, and body"
        />
        <CardContent>
          {isLoading ? (
            <div className="text-muted-foreground py-8 text-center">
              Loading...
            </div>
          ) : (
            <CoffeeStoryForm story={story} onSubmit={handleSubmit} />
          )}
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
}
